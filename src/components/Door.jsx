import { useEffect, useRef, useState } from "react";
import imgClosed from '../assets/door-closed.png';
import imgOpen from '../assets/door-open.png';

/**
 * Door.jsx — animated wedding-invitation door.
 *
 * Flow:
 *  1. Closed-door image fills the screen with the invitation text
 *     ("tap to open" + guest name) overlaid on top of it.
 *  2. One tap: the closed image fades out first (fadeDuration). Only
 *     once that fade finishes does the open-door image (a transparent
 *     PNG) start its slow zoom-in (zoomDuration) — sequential, not
 *     simultaneous — so whatever Home.jsx renders behind Door becomes
 *     visible through it as it zooms.
 *  3. Once the zoom finishes, `onComplete` fires — Home.jsx should stop
 *     rendering <Door /> at that point, leaving its own content
 *     unobstructed. Total time before onComplete = fadeDuration + zoomDuration.
 *
 * Door renders as a fixed full-screen overlay (z-50), so mount it
 * above your page content in Home.jsx:
 *
 *   {showDoor && <Door t={t} guestName="Marina & Sofía" onComplete={() => setShowDoor(false)} />}
 *   <HomeContent />
 *
 * ─────────────────────────────────────────────────────────────────
 * PROPS
 * ─────────────────────────────────────────────────────────────────
 * t             (required) Translation object for the current locale:
 *                 {
 *                   door: {
 *                     eyebrow:       string,
 *                     tapToOpen:     string,
 *                     invitationFor: string, // use {name} as placeholder
 *                   }
 *                 }
 * guestName     (string) Replaces {name} in invitationFor.
 * imgClosed     (string) Closed-door image path. Default "/images/door-closed.jpg"
 * imgOpen       (string) Open-door image path (transparent PNG recommended).
 *                        Default "/images/door-open.png"
 * onComplete    (fn)     Called once, after the open/zoom animation finishes.
 * fadeDuration  (number) ms for the closed-image fade-out. Default 700.
 * zoomDuration  (number) ms for the open-image zoom + fade. Default 3200.
 *
 * ─────────────────────────────────────────────────────────────────
 * FONTS — assumes `font-tangerine` and `font-ledger` are already
 * mapped in tailwind.config from your index.css @font-face rules.
 */
export default function Door({
  t,
  guestName = "",
  onComplete,
  fadeDuration = 1200,
  zoomDuration = 3200,
}) {
  const [isOpening, setIsOpening] = useState(false); // closed image fading out
  const [isZooming, setIsZooming] = useState(false); // open image zoom, starts after fade
  const firedRef = useRef(false);

  const dt = t?.door ?? {};

  // Step 1: once tapped, the closed image starts fading. Only once that
  // fade is fully done does the open image begin its zoom — sequential,
  // not simultaneous.
  useEffect(() => {
    if (!isOpening) return;
    const fadeTimer = window.setTimeout(() => setIsZooming(true), fadeDuration);
    return () => window.clearTimeout(fadeTimer);
  }, [isOpening, fadeDuration]);

  // Step 2: once the zoom starts, fire onComplete after it finishes.
  useEffect(() => {
    if (!isZooming) return;
    const zoomTimer = window.setTimeout(() => {
      if (!firedRef.current) {
        firedRef.current = true;
        onComplete?.();
      }
    }, zoomDuration);
    return () => window.clearTimeout(zoomTimer);
  }, [isZooming, zoomDuration, onComplete]);

  const handleTap = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden">
      {/* OPEN image — transparent PNG, revealed as the closed image fades,
          then slowly zooms in until Home.jsx's own content takes over. */}
      <img
        src={imgOpen}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full origin-center object-cover brightness-140"
        style={{
          transitionProperty: "transform",
          transitionDuration: `${zoomDuration}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          transform: isZooming ? "scale(2.45)" : "scale(1)",
        }}
      />

      {/* CLOSED image + tap prompt — the only interactive step. */}
      <button
        type="button"
        onClick={handleTap}
        disabled={isOpening}
        aria-label={dt.tapToOpen ?? "Tap to open"}
        className="absolute inset-0 h-full w-full ease-out"
        style={{
          transitionProperty: "opacity",
          transitionDuration: `${fadeDuration}ms`,
          transitionTimingFunction: "ease-out",
          opacity: isOpening ? 0 : 1,
          pointerEvents: isOpening ? "none" : "auto",
        }}
      >
        <img
          src={imgClosed}
          alt={dt.tapToOpen ?? "Wedding invitation door, closed"}
          className="h-full w-full object-cover brightness-140"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40" />

        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 px-6 text-center sm:bottom-16">
          <p 
            className="font-tangerine max-w-xs text-xl leading-tight text-[#f4ecd8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:max-w-sm sm:text-4xl"
          >
            {dt.invitationFor}
          </p>
          <p 
            className="tangerine-regular max-w-xs text-4xl leading-tight text-[#f4ecd8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:max-w-sm sm:text-4xl"
          >
            {guestName}
          </p>
          <span className="font-ledger animate-pulse text-[11px] tracking-[0.35em] text-[#e9dfc4]/90">
            {dt.tapToOpen ?? "Tap to open"}
          </span>
        </div>
      </button>
    </div>
  );
}
