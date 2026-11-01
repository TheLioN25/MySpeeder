# MySpeeder 🚀

Extensión Manifest V3 para Brave y navegadores basados en Chromium que mantiene automáticamente tu velocidad de reproducción preferida en animes y videos, soportando reproductores incrustados en `<iframe>` (como en `animeav1.com`: MP4Upload, Byse, Voe, etc.).

---

## 🛠️ Cómo cargar la extensión en Brave

1. Abre Brave y dirígete a:
   ```text
   brave://extensions
   ```
2. Activa el interruptor **"Modo de desarrollador"** (*Developer mode*) ubicado en la esquina superior derecha.
3. Haz clic en el botón **"Cargar descomprimida"** (*Load unpacked*).
4. Selecciona la carpeta del proyecto:
   ```text
   /home/thelion/SSD/Proyectos/MySpeeder
   ```
5. ¡Listo! Verás el icono de **MySpeeder** en la barra de extensiones.

---

## ✨ Características

- **Persistencia entre episodios**: Ya no tienes que cambiar manualmente la velocidad a 1.25x o 1.5x cada vez que saltes de capítulo.
- **Soporte de Iframes Cross-Origin**: Se inyecta en todos los marcos (`all_frames: true`) para tomar el control de reproductores como Byse y MP4Upload.
- **Auto-restauración**: Si el reproductor intenta resetear la velocidad a 1.0x al empezar a reproducir o cargar un nuevo stream, MySpeeder la reajusta automáticamente.
- **Preservación de Tono**: Garantiza que el audio mantenga su tono natural sin efecto "ardilla".
- **HUD No intrusivo**: Muestra un pequeño indicador de velocidad en la esquina del video que desaparece a los 1.5 segundos.
- **Selector Rápido**: Popup con botones directos (1.0x, 1.25x, 1.5x, 1.75x, 2.0x) y slider fino.
