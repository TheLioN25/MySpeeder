// MySpeeder - Popup Script
// Maneja la interfaz de configuración y sincroniza con el almacenamiento y las pestañas

document.addEventListener('DOMContentLoaded', async () => {
  const speedValue = document.getElementById('speedValue');
  const speedSlider = document.getElementById('speedSlider');
  const presetButtons = document.querySelectorAll('.btn-preset');

  // Actualizar UI visual
  const updateUI = (speed) => {
    speedValue.textContent = speed.toFixed(2);
    speedSlider.value = speed;

    presetButtons.forEach(btn => {
      const preset = parseFloat(btn.dataset.speed);
      if (Math.abs(preset - speed) < 0.02) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  // Guardar y notificar a la pestaña activa
  const setSpeed = async (speed) => {
    const formattedSpeed = parseFloat(parseFloat(speed).toFixed(2));
    updateUI(formattedSpeed);

    // 1. Guardar persistentemente en storage
    await chrome.storage.local.set({ targetSpeed: formattedSpeed });

    // 2. Transmitir mensaje a todos los frames de la pestaña activa
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        // Enviar a todos los frames
        chrome.tabs.sendMessage(tab.id, {
          type: 'SET_SPEED',
          speed: formattedSpeed
        }).catch(() => {
          // Omitir si la pestaña no contiene nuestro content script
        });
      }
    } catch {
      // Ignorar pestañas internas del navegador
    }
  };

  // Cargar velocidad guardada al abrir popup
  try {
    const data = await chrome.storage.local.get('targetSpeed');
    const initialSpeed = (data && typeof data.targetSpeed === 'number') ? data.targetSpeed : 1.25;
    updateUI(initialSpeed);
  } catch {
    updateUI(1.25);
  }

  // Evento del Slider
  speedSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    setSpeed(val);
  });

  // Eventos de Botones Rápidos
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = parseFloat(btn.dataset.speed);
      setSpeed(speed);
    });
  });
});
