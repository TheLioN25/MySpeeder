# Estado de la Sesión — Proyecto MySpeeder

> **Fecha y Hora de Guardado:** 2026-11-01 15:55 (Hora local)  
> **Estado:** Listo para pruebas tras reinicio.

---

## 1. Resumen del Proyecto y Objetivo
- **Proyecto:** `MySpeeder`
- **Tipo:** Extensión para Brave / Chromium (Manifest V3).
- **Problema que resuelve:** Evitar tener que ajustar manualmente la velocidad de reproducción a 1.25x o 1.50x cada vez que se pasa de capítulo en sitios de anime como `https://animeav1.com/`.
- **Compatibilidad clave:** Resuelve el acceso a reproductores incrustados en `<iframe>` (como Byse, MP4Upload, Voe, UPNShare) mediante inyección en todos los marcos (`all_frames: true`) y re-aplicación defensiva contra reseteos nativos del reproductor.

---

## 2. Ubicación en Disco y Repositorio Git
- **Ruta del Proyecto:** `/home/thelion/SSD/Proyectos/MySpeeder/`
- **Control de Versiones:** Repositorio Git local en rama `main`.
- **Último Commit:** `5fab957 feat: inicializar extensión MySpeeder con soporte para iframes y persistencia`

---

## 3. Ficheros Creados y Verificados

| Archivo | Función |
| :--- | :--- |
| [`manifest.json`](file:///home/thelion/SSD/Proyectos/MySpeeder/manifest.json) | Configuración Manifest V3, permisos (`storage`, `*://*/*`) y content script en `all_frames`. |
| [`content.js`](file:///home/thelion/SSD/Proyectos/MySpeeder/content.js) | Detector dinámico de `<video>`, escucha de eventos (`play`, `loadedmetadata`, `ratechange`), pitch preservation y HUD sutil. |
| [`popup/popup.html`](file:///home/thelion/SSD/Proyectos/MySpeeder/popup/popup.html) | Interfaz visual emergente en modo oscuro. |
| [`popup/popup.css`](file:///home/thelion/SSD/Proyectos/MySpeeder/popup/popup.css) | Estilos modernos y limpios sin dependencias externas. |
| [`popup/popup.js`](file:///home/thelion/SSD/Proyectos/MySpeeder/popup/popup.js) | Sincronización bidireccional entre `chrome.storage.local` y los frames activos. |
| [`icons/`](file:///home/thelion/SSD/Proyectos/MySpeeder/icons/) | Iconos PNG reales en 16x16, 48x48 y 128x128. |
| [`spec.md`](file:///home/thelion/SSD/Proyectos/MySpeeder/spec.md) | Documento de especificación técnica y criterios de aceptación (SDD). |
| [`README.md`](file:///home/thelion/SSD/Proyectos/MySpeeder/README.md) | Guía de instalación rápida paso a paso. |

---

## 4. Próximo Paso Inmediato al Regresar
1. Abrir Brave y navegar a `brave://extensions`.
2. Activar **"Modo de desarrollador"**.
3. Cargar la carpeta `/home/thelion/SSD/Proyectos/MySpeeder`.
4. Abrir un capítulo en `animeav1.com` y verificar la velocidad automática en Byse y MP4Upload.
