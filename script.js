// ===============================
// CONFIG — edit these values
// ===============================
const CONFIG = {
  BRIDE_PARENTS: "En Zulkiflie",
  GROOM_PARENTS: "En Mohd Nasir & Puan Kartina Suria",
  ADDRESS_TEXT: "24, Persiaran Tuanku Syed Sirajuddin, Bukit Tunku, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
  VENUE_QUERY: "ISTAC Syed Muhammad Naquib al-Attas Library",
  RSVP_FORM_URL: "https://forms.gle/jQHufPeoAjx3ZGP1A", // paste your Google Form link here
  // Event time (local to venue, Malaysia Time GMT+8)
  EVENT_START_LOCAL: "2026-10-03T11:00:00+08:00", // <-- adjust
  EVENT_END_LOCAL:   "2026-10-03T15:00:00+08:00", // <-- adjust
  ITINERARY: [
    { time: "11:00", en: "Guest arrival & registration", ms: "Ketibaan tetamu & pendaftaran"},
    { time: "11:30", en: "Nikah ceremony", ms: "Majlis akad nikah"},
    { time: "12:30", en: "Doa & photo session", ms: "Doa & sesi bergambar"},
    { time: "13:00", en: "Luncheon", ms: "Jamuan"},
    { time: "15:00", en: "Farewell", ms: "Sesi bersurai"},
  ],
};

// i18n dictionary
const i18n = {
  en: {
    salam: "Assalamualaikum warahmatullahi wabarakatuh",
    openingDua: "With the blessings of Allah, we warmly invite you to our wedding.",
    eventDetails: "Event Details",
    bride: "Bride",
    groom: "Groom",
    brideParentsLabel: "Parents:",
    groomParentsLabel: "Parents:",
    dateTime: "Date & Time",
    venue: "Venue",
    dressCode: "Dress Code",
    dressCodeValue: "Formal or Traditional Attire",
    itinerary: "Itinerary",
    location: "Location & Map",
    mapCaption: "Map image placeholder — replace with an actual map screenshot if you like.",
    rsvpNote: "Kindly confirm your attendance via the form below:",
    openRSVP: "Open RSVP Form",
    closingDua: "May Allah bless this union and grant us a home filled with sakinah, mawaddah, and rahmah.",
    addToCalendar: "Add to Calendar",
    addToGoogleCalendar: "Google Calendar",
    countdownLabels: ["days","hours","minutes","seconds"],
  },
  ms: {
    salam: "Assalamualaikum warahmatullahi wabarakatuh",
    openingDua: "Dengan keberkatan Allah, kami menjemput anda ke majlis perkahwinan kami.",
    eventDetails: "Butiran Majlis",
    bride: "Pengantin Perempuan",
    groom: "Pengantin Lelaki",
    brideParentsLabel: "Ibu bapa:",
    groomParentsLabel: "Ibu bapa:",
    dateTime: "Tarikh & Masa",
    venue: "Lokasi",
    dressCode: "Kod Pakaian",
    dressCodeValue: "Formal atau Pakaian Tradisional",
    itinerary: "Atur Cara Majlis",
    location: "Lokasi & Peta",
    mapCaption: "Imej peta contoh — ganti dengan tangkap layar peta sebenar jika mahu.",
    rsvpNote: "Sila sahkan kehadiran anda melalui borang di bawah:",
    openRSVP: "Buka Borang RSVP",
    closingDua: "Semoga Allah memberkati penyatuan ini dan mengurniakan rumah tangga yang dipenuhi sakinah, mawaddah dan rahmah.",
    addToCalendar: "Tambah ke Kalendar",
    addToGoogleCalendar: "Google Calendar",
    countdownLabels: ["hari","jam","minit","saat"],
  }
};

let currentLang = 'en';

function setLanguage(lang){
  currentLang = lang;
  const dict = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
  // Update itinerary labels
  buildItinerary();
  // Update date-time card text (keep Saturday, 3 October 2026; only time label changes)
  const dt = document.getElementById('date-time-text');
  if(dt){
    const start = new Date(CONFIG.EVENT_START_LOCAL);
    const end = new Date(CONFIG.EVENT_END_LOCAL);
    const timeFmt = new Intl.DateTimeFormat(lang==='ms'?'ms-MY':'en-MY', { hour:'2-digit', minute:'2-digit' });
    dt.textContent = `Saturday, 3 October 2026 — ${timeFmt.format(start)} – ${timeFmt.format(end)}`;
  }
}

function buildItinerary(){
  const ul = document.getElementById('itinerary-list');
  ul.innerHTML = '';
  CONFIG.ITINERARY.forEach(item => {
    const li = document.createElement('li');
    const t = document.createElement('time'); t.textContent = item.time;
    const p = document.createElement('p'); p.textContent = currentLang==='ms'? item.ms : item.en;
    li.appendChild(t); li.appendChild(p);
    ul.appendChild(li);
  });
}

function buildMapLinks(){
  const q = encodeURIComponent(CONFIG.VENUE_QUERY + ', ' + CONFIG.ADDRESS_TEXT);
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const waze = `https://waze.com/ul?q=${q}`;
  // Apple Maps works best with query param
  const apple = `https://maps.apple.com/?q=${q}`;
  document.getElementById('btn-gmaps').href = gmaps;
  document.getElementById('btn-waze').href = waze;
  document.getElementById('btn-apple').href = apple;
  // Update iframe
  const iframe = document.getElementById('map-iframe');
  iframe.src = `https://www.google.com/maps?q=${q}&output=embed`;
}

function toGoogleDateRangeZ(startLocalISO, endLocalISO){
  // Convert local ISO strings to UTC YYYYMMDDTHHMMSSZ format
  const s = new Date(startLocalISO);
  const e = new Date(endLocalISO);
  const pad = n => String(n).padStart(2,'0');
  function fmt(d){
    return d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate()) + 'T' +
      pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
  }
  return `${fmt(s)}/${fmt(e)}`;
}

function buildCalendarLinks(){
  const title = encodeURIComponent('Fathihah & Asyraf — Wedding');
  const location = encodeURIComponent('ISTAC, Syed Muhammad Naquib al-Attas Library, ' + CONFIG.ADDRESS_TEXT);
  const details = encodeURIComponent('We look forward to your presence.');
  const dates = toGoogleDateRangeZ(CONFIG.EVENT_START_LOCAL, CONFIG.EVENT_END_LOCAL);
  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${location}&details=${details}`;
  const a = document.getElementById('btn-google-calendar');
  a.href = gcal;
}

function downloadICS(){
  // Build a basic ICS for Apple/Outlook
  const s = new Date(CONFIG.EVENT_START_LOCAL);
  const e = new Date(CONFIG.EVENT_END_LOCAL);
  const pad = n => String(n).padStart(2,'0');
  function fmt(d){
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
  }
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//F&A Wedding//EN',
    'BEGIN:VEVENT',
    'UID:' + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
    'DTSTAMP:' + fmt(new Date()),
    'DTSTART:' + fmt(s),
    'DTEND:' + fmt(e),
    'SUMMARY:Fathihah & Asyraf — Wedding',
    'DESCRIPTION:We look forward to your presence.',
    'LOCATION:ISTAC, Syed Muhammad Naquib al-Attas Library, ' + CONFIG.ADDRESS_TEXT,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('

');

  const blob = new Blob([ics], {type:'text/calendar'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Fathihah-Asyraf-Wedding.ics';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

function setupCountdown(){
  const el = document.getElementById('countdown');
  const target = new Date('2026-10-03T00:00:00+08:00').getTime();
  const labels = i18n[currentLang].countdownLabels;
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000*60*60*24)); diff -= d*24*60*60*1000;
    const h = Math.floor(diff / (1000*60*60)); diff -= h*60*60*1000;
    const m = Math.floor(diff / (1000*60)); diff -= m*60*1000;
    const s = Math.floor(diff / 1000);
    el.textContent = `${d} ${labels[0]} • ${h} ${labels[1]} • ${m} ${labels[2]} • ${s} ${labels[3]}`;
  }
  tick();
  setInterval(tick, 1000);
}

function setupMusic(){
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  let playing = false;
  btn.addEventListener('click', async ()=>{
    try{
      if(!playing){ await audio.play(); playing = true; btn.textContent = '❚❚'; }
      else{ audio.pause(); playing = false; btn.textContent = '♫'; }
    }catch(e){ console.log('Autoplay blocked or no audio file', e); }
  });
}

// ============== INIT ==============
document.addEventListener('DOMContentLoaded', ()=>{
  // Fill parents
  document.getElementById('bride-parents').textContent = CONFIG.BRIDE_PARENTS;
  document.getElementById('groom-parents').textContent = CONFIG.GROOM_PARENTS;

  buildMapLinks();
  buildCalendarLinks();
  buildItinerary();
  setupCountdown();
  setupMusic();

  document.getElementById('btn-rsvp').href = CONFIG.RSVP_FORM_URL;

  document.getElementById('btn-add-calendar').addEventListener('click', downloadICS);
  document.getElementById('lang-toggle').addEventListener('click', ()=>{
    setLanguage(currentLang==='en'?'ms':'en');
  });

  // Set initial language to English
  setLanguage('en');
});
