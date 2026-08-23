import React, { useState } from 'react';

const EVENT = {
  title: 'Monica & Aidos Wedding',
  start: '2027-01-23T14:00:00', // 4:00 PM local time — adjust as needed
  end: '2027-01-23T23:59:00', // 11:00 PM local time — adjust as needed
  location: 'Hotel Campestre - El Valle de Antón, Panamá',
  timezone: 'America/Panama' // Panama has no DST, always UTC-5
};

// "2027-01-23T16:00:00" -> "20270123T160000"
const toCompact = (iso) => iso.replace(/[-:]/g, '');

const buildGoogleUrl = () => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT.title,
    dates: `${toCompact(EVENT.start)}/${toCompact(EVENT.end)}`,
    details: EVENT.description,
    location: EVENT.location,
    ctz: EVENT.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const buildIcs = () => {
  const stamp = toCompact(new Date().toISOString().split('.')[0]) + 'Z';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invite//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding-invite`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${EVENT.timezone}:${toCompact(EVENT.start)}`,
    `DTEND;TZID=${EVENT.timezone}:${toCompact(EVENT.end)}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location}`,
    `DESCRIPTION:${EVENT.description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
};

const downloadIcs = () => {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const AddToCalendar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block font-['Ledger']">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-block font-noto text-sm font-bold underline text-[var(--pink)] hover:text-[var(--green)] underline-offset-4 rounded-full px-5 py-2 hover:bg-[#808B58] hover:border-[#808B58] transition-all duration-300"
      >
        Add to Calendar
      </button>

      {open && (
        <div className="absolute z-20 mt-3 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md border border-[#B2B699]/30 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
          <a
            href={buildGoogleUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-sm font-medium text-center text-[#808B58] border-b border-[#B2B699]/20 hover:bg-[#B2B699]/10 transition-colors"
            onClick={() => setOpen(false)}
          >
            Google Calendar
          </a>
          <button
            type="button"
            onClick={() => {
              downloadIcs();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-sm font-medium text-center text-[#808B58] hover:bg-[#B2B699]/10 transition-colors"
          >
            Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCalendar;