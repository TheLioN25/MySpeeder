# Estado de la Sesión y Memoria Técnica — MySpeeder

> **Fecha y Hora de Guardado:** 2026-11-02 01:48 (Hora local)  
> **Estado:** Proyecto MySpeeder v1.0.0 completado, publicado y operativo. Documentación técnica de ideas futuras registrada.

---

## 1. Estado Actual de MySpeeder (v1.0.0)

- **Repositorio Local:** `/home/thelion/SSD/Proyectos/MySpeeder/`
- **Repositorio Remoto (Público):** [https://github.com/TheLioN25/MySpeeder](https://github.com/TheLioN25/MySpeeder)
- **Release Oficial:** [`v1.0.0` con ZIP descargable](https://github.com/TheLioN25/MySpeeder/releases/tag/v1.0.0)
- **Pruebas y Verificación:**
  - Montada y probada con éxito en Brave sobre `animeav1.com` con reproductores en iframe (Byse, MP4Upload).
  - Persistencia de velocidad (1.25x por defecto o personalizada), pitch preservation activo y HUD visual funcionando.
  - Compatibilidad universal confirmada (Linux, Windows, macOS).
  - Documentación de instalación en [`README.md`](file:///home/thelion/SSD/Proyectos/MySpeeder/README.md) tanto para terminal (`git clone` / estilo AUR) como para descarga directa ZIP.

---

## 2. Memoria Técnica: Detección y Omisión de Openings y Endings

### A. ¿Cómo lo hace Netflix? (Backend / Servidores)
1. **Audio Fingerprinting:**
   - Extraen espectrogramas de audio de cada episodio de una temporada.
   - Aplican algoritmos de correlación cruzada (tipo Shazam / Chromaprint) para encontrar la subsecuencia de audio continua que se repite exactamente entre múltiples capítulos (la canción del opening).
2. **Visión por Computadora (Computer Vision):**
   - Detección de texto/créditos (OCR) en pantalla.
   - Detección de ritmo de cortes de escena (Shot Boundary Detection): los openings tienen mayor cadencia de planos.
3. **Detección de Endings:**
   - Detección de fundidos a negro (*Black Frames*), créditos desplazables en vertical (*Scrolling Text*) y caídas en la dinámica de volumen.
4. **Entrega al cliente:**
   - El navegador o TV no calcula nada en tiempo real; solo recibe un JSON con marcas de tiempo (`intro_start: 01:25`, `intro_end: 02:55`).

---

### B. ¿Se puede aplicar en una extensión de navegador para sitios como `animeav1.com`?

#### ❌ Por qué el método de audio no es viable directo en el navegador:
1. **Restricción CORS / Cross-Origin:** Los videos están en iframes o CDNs de terceros (Byse, MP4Upload) que no envían cabeceras abiertas (`Access-Control-Allow-Origin: *`). Los navegadores bloquean el acceso al `AudioContext` de videos externos por protección de datos.
2. **Consumo de Red y CPU:** Para comparar el audio de varios episodios, el navegador tendría que descargar y procesar en segundo plano gigabytes de video antes de dar play.

#### ✅ Solución real viable 1: Modelo AniSkip / SponsorBlock (API Comunitaria)
- **AniSkip API (`https://api.aniskip.com/`):** Base de datos abierta que ya almacena los timestamps de inicio y fin de openings (`op`) y endings (`ed`) de casi todos los animes indexados por MyAnimeList / AniList ID.
- **Flujo:**
  1. La extensión extrae el nombre del anime y número de capítulo desde la URL o el DOM de `animeav1.com`.
  2. Hace una consulta ultraligera (1 KB) a la API de AniSkip.
  3. Al llegar a `video.currentTime >= startTime`, la extensión muestra el botón flotante `[Omitir Opening ⏭️]` o salta automáticamente a `endTime`.

#### ✅ Solución real viable 2: Atajo Inteligente "Salto Anime de 90s"
- El 95% de los openings de la industria del anime duran exactamente entre 89 y 90 segundos.
- Se puede añadir un atajo de teclado (ej. tecla `S`) o botón HUD que salte de forma instantánea `+90 segundos`, omitiendo la intro sin requerir internet ni APIs externas.

---

## 3. Próximos Pasos al Reanudar (Ideas para Futuras Versiones)
- Si se decide ampliar MySpeeder o crear una extensión complementaria:
  1. Opción de botón rápido o atajo de teclado para saltar 90 segundos (+90s) de opening.
  2. Integración con la API de AniSkip para detección y salto automático de intros en `animeav1.com`.
