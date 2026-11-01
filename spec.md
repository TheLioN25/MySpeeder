# MySpeeder — Especificación Técnica (SDD)

## 1. Visión y Objetivos
**MySpeeder** es una extensión de navegador (Manifest V3) diseñada específicamente para Brave y Chromium que automatiza y mantiene la velocidad de reproducción preferida (por ejemplo 1.25x, 1.5x) en sitios de streaming y anime (como `animeav1.com`), funcionando sin problemas a través de reproductores incrustados en `<iframe>` (Byse, MP4Upload, Voe, UPNShare, etc.).

### Objetivos Clave:
1. **Persistencia Automática**: Al pasar de capítulo o cambiar de servidor, la velocidad configurada se aplica de inmediato sin requerir clics manuales.
2. **Soporte de Iframes (Cross-Origin)**: Inyección nativa en frames secundarios (`all_frames: true`) para acceder al elemento `<video>` dentro de cualquier reproductor incrustado.
3. **Resistencia a Reseteos**: Prevención de que scripts internos del reproductor (Video.js, JWPlayer, etc.) fuercen la velocidad a 1.0x en eventos `play`, `loadedmetadata` o `canplay`.
4. **Cero Ruido / Cero Errores**: Manejo seguro y defensivo del DOM. Si un frame no contiene video, no emite errores ni advertencias en la consola.
5. **Control Intuitivo**: Popup visual en la barra de herramientas para ajustar la velocidad (botones rápidos + selector numérico) y almacenamiento persistente en `chrome.storage.local`.

---

## 2. Arquitectura de Archivos

```
MySpeeder/
├── manifest.json         # Configuración Manifest V3, permisos y content_scripts
├── content.js            # Script inyectado en todos los frames (detecta y controla el <video>)
├── popup/
│   ├── popup.html        # Interfaz de usuario del menú emergente
│   ├── popup.css         # Estilos visuales modernos (Dark Mode)
│   └── popup.js          # Lógica para leer/guardar preferencias y sincronizar
├── icons/                # Iconos PNG reales (16x16, 48x48, 128x128)
└── spec.md               # Esta especificación técnica
```

---

## 3. Estrategia Técnica de Implementación

### A. Detección y Control del `<video>` (`content.js`)
- **Detección Dinámica**: Usar `MutationObserver` y una verificación inmediata para capturar el elemento `<video>` tan pronto sea creado en el DOM.
- **Escucha de Eventos Defensiva**:
  - `play`: Re-aplica la velocidad deseada.
  - `loadedmetadata`: Re-aplica la velocidad cuando el nuevo capítulo o stream esté listo.
  - `ratechange`: Si el reproductor externo intenta forzarlo a 1.0x sin intervención del usuario, el script detecta la discrepancia y restaura la velocidad configurada (con un flag protector para evitar bucles infinitos).
- **Pitch Preservation**: Garantizar `video.preservesPitch = true` para evitar distorsiones de tono vocal.

### B. Almacenamiento y Sincronización
- Se utiliza `chrome.storage.local` para guardar la clave `targetSpeed` (por defecto `1.25`).
- Al cambiar la velocidad desde el popup:
  1. Se actualiza `chrome.storage.local`.
  2. Se envía un mensaje (`speedUpdated`) a los tabs activos para que los content scripts en ejecución actualicen los videos inmediatamente sin necesidad de recargar la pestaña.

---

## 4. Criterios de Aceptación Verificables
- [x] **Criterio 1**: El proyecto carga limpiamente en `brave://extensions` en "Modo desarrollador" sin advertencias ni errores de manifiesto.
- [x] **Criterio 2**: Al abrir un capítulo en `animeav1.com` con reproductores como MP4Upload o Byse, el video arranca a la velocidad guardada (ej. 1.25x).
- [x] **Criterio 3**: Al cambiar de capítulo, el nuevo video adopta la velocidad configurada sin intervención manual.
- [x] **Criterio 4**: Al cambiar la velocidad desde el popup emergente, el video que se está reproduciendo responde al instante.
- [x] **Criterio 5**: No aparecen excepciones no controladas en la consola de Brave.
