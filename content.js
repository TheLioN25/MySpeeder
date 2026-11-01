// MySpeeder - Content Script
// Inyectado en todos los frames para detectar y sincronizar la velocidad en elementos <video>

(() => {
  // Evitar doble inyección en el mismo contexto
  if (window.__mySpeederInjected) return;
  window.__mySpeederInjected = true;

  let currentSpeed = 1.25;
  const controlledVideos = new WeakSet();
  let isApplyingSpeed = false;

  // 1. Obtener la velocidad guardada en storage
  const loadSpeed = async () => {
    try {
      const data = await chrome.storage.local.get('targetSpeed');
      if (data && typeof data.targetSpeed === 'number') {
        currentSpeed = data.targetSpeed;
      }
    } catch {
      // Usar valor por defecto si storage falla
    }
    applySpeedToAllVideos();
  };

  // 2. Mostrar indicador visual sutil (HUD) sobre el video
  const showBadge = (video, speed) => {
    try {
      const parent = video.parentElement;
      if (!parent) return;

      let badge = parent.querySelector('.myspeeder-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'myspeeder-badge';
        Object.assign(badge.style, {
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '13px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '600',
          zIndex: '2147483647',
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          opacity: '1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)'
        });
        parent.style.position = parent.style.position === 'static' ? 'relative' : parent.style.position;
        parent.appendChild(badge);
      }

      badge.textContent = `${speed.toFixed(2)}x`;
      badge.style.opacity = '1';

      if (badge._hideTimeout) clearTimeout(badge._hideTimeout);
      badge._hideTimeout = setTimeout(() => {
        badge.style.opacity = '0';
      }, 1500);
    } catch {
      // Si el contenedor está bloqueado por Shadow DOM o similar, omitir sin error
    }
  };

  // 3. Aplicar velocidad a un elemento de video específico
  const attachToVideo = (video) => {
    if (!video || controlledVideos.has(video)) return;
    controlledVideos.add(video);

    const enforceSpeed = () => {
      if (isApplyingSpeed) return;
      if (Math.abs(video.playbackRate - currentSpeed) > 0.01) {
        isApplyingSpeed = true;
        try {
          video.playbackRate = currentSpeed;
          video.preservesPitch = true;
          showBadge(video, currentSpeed);
        } catch {
          // Ignorar restricciones temporales del navegador
        } finally {
          isApplyingSpeed = false;
        }
      }
    };

    // Aplicar inmediatamente
    enforceSpeed();

    // Re-aplicar cuando el reproductor intente resetear la velocidad o cargue nuevo capítulo
    video.addEventListener('play', enforceSpeed, { passive: true });
    video.addEventListener('loadedmetadata', enforceSpeed, { passive: true });
    video.addEventListener('canplay', enforceSpeed, { passive: true });
    video.addEventListener('ratechange', () => {
      if (!isApplyingSpeed && Math.abs(video.playbackRate - currentSpeed) > 0.01) {
        enforceSpeed();
      }
    }, { passive: true });
  };

  // 4. Buscar todos los videos en el DOM actual
  const applySpeedToAllVideos = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(attachToVideo);
  };

  // 5. Observar inserción de nuevos elementos de video en el DOM
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'VIDEO') {
            attachToVideo(node);
          } else if (node.querySelectorAll) {
            const childVideos = node.querySelectorAll('video');
            childVideos.forEach(attachToVideo);
          }
        }
      }
    }
  });

  // 6. Iniciar observador cuando el DOM esté disponible
  const startObservation = () => {
    if (document.documentElement) {
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      applySpeedToAllVideos();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      startObservation();
      loadSpeed();
    });
  } else {
    startObservation();
    loadSpeed();
  }

  // 7. Escuchar mensajes desde el popup (cuando el usuario cambia la velocidad en tiempo real)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === 'SET_SPEED' && typeof message.speed === 'number') {
      currentSpeed = message.speed;
      isApplyingSpeed = false;
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        try {
          video.playbackRate = currentSpeed;
          video.preservesPitch = true;
          showBadge(video, currentSpeed);
        } catch {}
      });
      sendResponse({ status: 'ok', appliedTo: videos.length });
    }
    return true;
  });

  // 8. Reaccionar a cambios en chrome.storage (por si se actualiza desde otra pestaña)
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.targetSpeed) {
      currentSpeed = changes.targetSpeed.newValue;
      applySpeedToAllVideos();
    }
  });
})();
