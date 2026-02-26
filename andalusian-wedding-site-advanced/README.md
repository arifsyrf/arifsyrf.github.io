
# Siti Nur Fathihah Binti Zulkiflie & Mohd Arif Asyraf Bin Mohd Nasir — Wedding Invite (EN/BM, RSVP→Google Sheets, Calendar, Map)

This package contains a single-page wedding site with:
- Bilingual **English / Bahasa Melayu** toggle
- Countdown & schedule
- **RSVP form → Google Sheets** (with email alerts via Apps Script)
- **Add-to-Calendar** buttons (Google / Outlook / Apple .ics)
- Google Map embed + WhatsApp Directions button

---

## 1) Configure event & venue (index.html)
Open `index.html` and edit the **CONFIG** object near the bottom:

```js
const CONFIG = {
  event: {
    title: 'Siti Nur Fathihah Binti Zulkiflie & Mohd Arif Asyraf Bin Mohd Nasir — Wedding',
    startISO: '2026-10-03T12:00:00+08:00',
    endISO: '2026-10-03T15:00:00+08:00',
    location: '(Add venue name & address)',
    mapUrl: '',     // Google Maps share URL (for opening)
    mapEmbed: '',   // Google Maps "Embed map" src URL (iframe)
    timezone: 'Asia/Kuala_Lumpur'
  },
  rsvp: { endpoint: '' },
  notifyEmail: ''
};
```

- **location** – replace with the exact venue name and address.
- **mapUrl** – paste the normal Google Maps share link (opens Maps app).
- **mapEmbed** – in Google Maps → Share → **Embed a map** → copy the `src` URL (starts with `https://www.google.com/maps/embed?...`) and paste here.

---

## 2) Google Sheets + Apps Script (RSVP endpoint)

1. Create a new **Google Sheet** (name it anything). Copy the **Sheet ID** from the URL (the long `1AbC...` string).
2. In the Sheet, go to **Extensions → Apps Script**. Create a script, delete sample code, paste **`apps_script/Code.gs`**.
3. In `Code.gs`, set:
   - `SHEET_ID` to your Sheet ID
   - `NOTIFY_EMAIL` to your email (or multiple separated by commas)
4. Click **Deploy → New deployment**:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: **Anyone**
   - Click **Deploy** and **Authorize** if prompted. Copy the **Web app URL**.
5. Back in `index.html`, set `CONFIG.rsvp.endpoint = 'PASTE_WEB_APP_URL_HERE'`.
6. Test the form → check the Sheet for new rows and your email inbox for alerts.

> Tip: If the browser blocks the response due to CORS, this template uses `mode: 'no-cors'` so submission still succeeds (but the response body isn’t read). This is fine for simple logging.

---

## 3) Add to Calendar buttons
No extra setup needed. Times are generated from `startISO`/`endISO` and exported to:
- **Google Calendar** (template link with UTC start/end)
- **Outlook.com** (compose link)
- **Apple/Outlook desktop** via a generated **`wedding.ics`** file

Ensure your local times are correct by keeping the `+08:00` offset in `startISO`/`endISO`.

---

## 4) Language toggle (EN ↔ BM)
Click **EN/BM** at the top-right. All key strings swap live. To tweak translations, edit the `I18N.en` / `I18N.bm` dictionaries in `index.html`.

---

## 5) Google Map & WhatsApp Directions
- Paste a **mapEmbed** URL to show the map on the page. If left blank, the map hides automatically.
- `Open in Google Maps` uses `mapUrl` (normal share link).
- `WhatsApp Directions` opens WhatsApp with a pre-filled message that includes your `mapUrl`.

---

## 6) Publish to GitHub Pages
1. Create a repo and upload **`index.html`** (and keep the folder structure if you use `apps_script/Code.gs` for reference).
2. Turn on **Settings → Pages → Deploy from a branch** with folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/` in 1–2 minutes.

---

## 7) FAQ
**Q: Can I customize colors/fonts?**  
Yes—edit the `:root` CSS variables and Google Fonts link.

**Q: Can I capture plus-ones by name?**  
Add fields to the form and the Apps Script will log them (new columns auto-append).

**Q: Can I limit submissions or add CAPTCHA?**  
For basic protection, add a simple question field; for stronger options, use reCAPTCHA Enterprise (requires server-side changes in Apps Script).

---

Made for Siti Nur Fathihah Binti Zulkiflie & Mohd Arif Asyraf Bin Mohd Nasir — Selamat pengantin baru! 💚
