
# Wedding e-Invite (GitHub Pages)

A bilingual (English/Bahasa Melayu) wedding invitation website for **Fathihah & Asyraf** with:
- Islamic opening (Bismillah, salam)
- Couple & parents, date/time, itinerary
- Venue details with map embed + buttons (Google Maps, Waze, Apple Maps)
- RSVP via Google Forms
- Add-to-calendar (Google/ICS)
- Countdown timer
- Background music (user-supplied)
- Responsive & accessible

## Quick Start
1. Put your music file at `assets/music/bg-music.mp3` (or update the path in `index.html`).
2. Update parents' names, exact start/end time, and the Google Form link inside `script.js` under the **CONFIG** section.
3. Replace `assets/hero.jpg` and `assets/map-placeholder.jpg` with your own images (optional).
4. Deploy with GitHub Pages (Settings → Pages → Deploy from branch → `main` → `/root`).

## Customize
- Text & translations are driven by the `i18n` object in `script.js`.
- Colors & typography in `styles.css`.
- Calendar links/timezone controlled by `EVENT_*` variables in `script.js`.

## Notes
- Auto-play music may be blocked by some browsers. The site provides a Play/Pause button.
- For RSVP, create a Google Form and paste its link into `CONFIG.RSVP_FORM_URL`.
