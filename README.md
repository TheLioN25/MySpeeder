# MySpeeder 🚀

Extensión ligera (Manifest V3) para **Brave**, **Google Chrome** y navegadores basados en Chromium que mantiene automáticamente tu velocidad de reproducción preferida (1.25x, 1.5x, etc.) en sitios de streaming y anime (como `animeav1.com`).

Diseñada especialmente para funcionar sin problemas en reproductores incrustados dentro de `<iframe>` (**Byse**, **MP4Upload**, **Voe**, **UPNShare**, etc.), donde otras extensiones fallan.

---

## ✨ Características

- ⚡ **Persistencia Automática:** Configura tu velocidad preferida una vez y olvídate. Al cambiar de episodio o servidor, se mantiene automáticamente.
- 🖼️ **Soporte Completo para Iframes:** Inyección en todos los marcos (`all_frames: true`) para tomar el control de reproductores embebidos de terceros.
- 🛡️ **Anti-Reseteo:** Si el reproductor del sitio web intenta forzar la velocidad a 1.0x al empezar a reproducir o cargar un nuevo stream, MySpeeder la restaura al instante.
- 🎵 **Preservación de Tono (Pitch):** Mantiene la corrección de tono de audio para evitar el efecto de "ardilla".
- 🏷️ **HUD Visual No Intrusivo:** Un indicador sutil y elegante en la esquina superior del video confirma la velocidad activa.
- 🎛️ **Popup Rápido:** Selector con botones directos (1.00x, 1.25x, 1.50x, 1.75x, 2.00x) y slider para ajuste fino en tiempo real.
- 🔒 **100% Privado y Local:** Cero telemetría, cero analíticas, sin conexión a servidores externos.

---

## 📥 Instalación

Puedes instalar la extensión en menos de 1 minuto usando cualquiera de estos dos métodos:

### Método 1: Vía Git (Recomendado para usuarios de Linux / Devs)

1. Abre tu terminal y clona el repositorio en tu carpeta preferida:
   ```bash
   git clone https://github.com/TheLioN25/MySpeeder.git ~/.local/share/myspeeder
   ```

2. Abre tu navegador y ve al gestor de extensiones:
   - **Brave:** `brave://extensions`
   - **Chrome:** `chrome://extensions`
   - **Edge:** `edge://extensions`

3. Activa la casilla o interruptor **"Modo de desarrollador"** (*Developer mode*) en la esquina superior derecha.

4. Haz clic en el botón **"Cargar extensión sin empaquetar"** (*Load unpacked*).

5. Selecciona la carpeta donde clonaste el repositorio (ej. `~/.local/share/myspeeder`).

---

### Método 2: Descarga directa en ZIP (Para cualquier usuario)

1. Descarga el archivo comprimido desde la sección de [Releases de GitHub](https://github.com/TheLioN25/MySpeeder/releases/latest) o haz clic en el botón verde **Code** ➔ **Download ZIP** en este repositorio.
2. Descomprime el archivo `.zip` en una carpeta permanente de tu equipo (por ejemplo en tu carpeta de Documentos o Aplicaciones).
3. Entra a `brave://extensions` (o `chrome://extensions`).
4. Activa **"Modo de desarrollador"**.
5. Haz clic en **"Cargar extensión sin empaquetar"** y selecciona la carpeta descomprimida.

---

## 🔄 ¿Cómo actualizar a una nueva versión?

- **Si usaste Git:**
  Entra a la carpeta y ejecuta:
  ```bash
  cd ~/.local/share/myspeeder && git pull
  ```
  Luego ve a `brave://extensions` y haz clic en el icono de **Actualizar / Recargar** (🔄) en la tarjeta de MySpeeder.

- **Si usaste ZIP:**
  Descarga el nuevo `.zip`, reemplaza los archivos en la carpeta existente y presiona el botón de **Recargar** (🔄) en la página de extensiones.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE). Siéntete libre de usarlo, modificarlo y compartirlo.
