import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import en from '../locales/en.json';
import es from '../locales/es.json';
import kz from '../locales/kz.json';
import { Infinity } from 'ldrs/react';
import 'ldrs/react/Infinity.css';
import Door from './Door';
import firstImage from '../assets/intro-us.png';
import AddToCalendar from './AddToCalendar';
import Wishes from './Wishes';

const languages = { en, es, kz };

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const imgRings = 'src/assets/Rings.png';
const imgLineLeft = 'src/assets/line-left.png';
const imgLineRight = 'src/assets/line-right.png';

const WeddingInvite = () => {
  const [guestInfo, setGuestInfo] = useState({
    name: 'Guest',
    id: '',
    lang: 'en',
    askForTransport: false,
  });
  const [formData, setFormData] = useState({ attending: 'yes', allergies: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);
  const zoomRef = useRef(null);
  const [pageLoaded, setPageLoaded] = useState(false);  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || 'Guest';
    const rawId = params.get('id') || '0.en';

    const idParts = rawId.split('.');
    const id = idParts[0] || '0';
    const finalLang = idParts[1] && languages[idParts[1]] ? idParts[1] : 'en';
    const askForTransport = idParts[2] ? true : false;

    setGuestInfo({
      id,
      name,
      lang: finalLang,
      askForTransport,
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = envelopeOpened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [envelopeOpened]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setZoomProgress(1);
      return;
    }
  }, []);

  useEffect(() => {
    window.setTimeout(() => setPageLoaded(true), 1000);
  }, []);

  const t = languages[guestInfo.lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      name: guestInfo.name,
      id: guestInfo.id,
      total: 1,
      type: 'rsvp'
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 'success') {
        setSubmitted(true);
      } else {
        setSubmitted(false);
        setErrorMessage(t[result.message]);
      }
    } catch (error) {
      alert('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F1EFEC] text-[var(--green)] min-h-screen overflow-x-hidden font-['Ledger'] selection:bg-[var(--pink)] selection:text-[#F1EFEC]">
      {!envelopeOpened && (
        <Door t={t} guestName={guestInfo.name} onComplete={() => setEnvelopeOpened(true)}/>
      )}


      <div className="sticky top-0 relative w-full overflow-hidden" style={{ height: '100svh' }}>
        {/* Header positioned at the top 1/3 mark */}
        <div className={`absolute inset-x-0 top-[7%] sm:top-[12%] z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none`}>
          {/* Subtitle / "The Wedding Of" */}
          <p 
            className={`${pageLoaded && envelopeOpened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              text-xl sm:text-sm md:text-base font-noto-600 tracking-[0.3em] uppercase text-white drop-shadow-lg mb-2 transition-all duration-1000 ease-out`}
          >
            THE WEDDING
          </p>
          <p className={`${pageLoaded && envelopeOpened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
            text-white/90 tangerine-regular text-3xl sm:text-3xl font-light mx-1 mb-1 transition-all duration-1000 ease-out
            `}>
              of
          </p>
          {/* Main Names */}
          <h1 
            className={`${pageLoaded && envelopeOpened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              text-3xl sm:text-5xl md:text-6xl font-serif tracking-wide text-white drop-shadow-xl leading-tight transition-all duration-1000 delay-150 ease-out`}
          >
            AIDOS <span className="font-sans text-xl sm:text-3xl font-light opacity-80 mx-1">&amp;</span> MONICA
          </h1>
        </div>

        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center z-10"
          style={{
            backgroundImage: `url(${firstImage})`,
            backgroundColor: 'white',
            transformOrigin: '62% 40%',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* INVITATION CONTENT */}
      <section className="relative px-6 sm:px-8 mt-10 mb-8 p-6 max-w-3xl mx-auto z-20">
        <div className="text-center">
          <p className="tangerine-regular text-[var(--pink)] text-5xl sm:text-6xl mb-6 ">
            {t.welcome}, <br></br>{guestInfo.name}
          </p>

          <p className="font-medium text-[var(--green)]/90 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
            {t.inviteText}
          </p>
        </div>
      </section>

      {/* Decorative Rings - Centered on boundary */}
      <div className="relative w-full flex items-center justify-center my-6 pointer-events-none">
        {/* Left Line */}
        <div className="shrink-0 mx-2 md:mx-4 z-10">
          <img
            src={imgLineLeft}
            alt="lines"
            className="w-20 max-w-50 md:max-w-xs h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Center Rings */}
        <div className="shrink-0 mx-2 md:mx-4 z-10">
          <img
            src={imgRings}
            alt="rings"
            className="w-32 md:w-32 h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Right Line */}
        <div className="shrink-0 mx-2 md:mx-4 z-10">
          <img
            src={imgLineRight}
            alt=""
            className="w-20 max-w-50 md:max-w-xs h-auto object-contain bg-transparent"
            draggable={false}
          />
        </div>
      </div>


      {/* WEDDING DETAILS */}
      <section className="px-4 sm:px-6 pt-10 pb-12 z-20 relative">
        <div className="max-w-4xl mx-auto">
          {/* Clean, minimalistic grid instead of borders and shadows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">
            
            {/* WHEN */}
            <div className="bg-white/40 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#B2B699]/20
            flex flex-col items-center text-center">
              <span className="font-noto text-sm uppercase tracking-widest text-[var(--pink)] mb-3">
                {t.details.whenLabel}
              </span>
              <p className="font-semibold text-2xl mb-1 text-[var(--green)]">{t.details.date}</p>
              <div className="mt-4 opacity-90 hover:opacity-100 transition-opacity">
                <AddToCalendar />
              </div>
            </div>

            {/* <hr className="place-self-center my-3 border-t border-[var(--green)] w-1/8" /> */}

            {/* WHERE */}
            <div className="bg-white/40 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#B2B699]/20
            flex flex-col items-center text-center">
              <span className="font-noto text-sm uppercase tracking-widest text-[var(--pink)] mb-3">
                {t.details.whereLabel}
              </span>

              <p className="font-semibold text-2xl mb-1 text-[var(--green)]">
                {t.details.church}
                </p>
              <a
                href={t.details.churchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-noto font-bold text-[var(--pink)] hover:text-[var(--green)] transition-colors underline underline-offset-4 mt-2"
              >
                {t.details.mapLinkLabel}
              </a>

              <p className="font-semibold text-2xl mb-1 mt-6 text-[var(--green)]">
                {t.details.venue}
                </p>
              <a
                href={t.details.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-bold font-noto text-[var(--pink)] hover:text-[var(--green)] transition-colors underline underline-offset-4 mt-2"
              >
                {t.details.mapLinkLabel}
              </a>
            </div>            
          </div>
        </div>
      </section>

      {/* RSVP SECTION */}
      <section className="px-4 sm:px-6 pb-4 z-20 relative">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#B2B699]/30">
            {loading && (
              <div className="flex justify-center mb-6">
                <Infinity size="50" stroke="4" strokeLength="0.15" bgOpacity="0.1" speed="1.3" color="var(--pink)" />
              </div>
            )}

            {errorMessage && (
              <div className="text-[var(--pink)] font-noto bg-[var(--pink)]/10 py-3 px-4 rounded-xl text-center mb-6">
                {errorMessage}
              </div>
            )}

            {!submitted ? (
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-10">
                  <h2 className="font-noto uppercase tracking-[0.2em] text-xl text-[var(--green)]">
                    {t.rsvpTitle}
                  </h2>
                </div>
                {/* Attendance */}
                <div className="flex flex-col">
                  <label className="font-noto text-sm tracking-wider text-[var(--pink)] mb-2">
                    {t.attendingLabel}
                  </label>
                  <select
                    className="w-full rounded-xl font-noto border border-[#B2B699]/40 bg-white/50 px-4 py-3 text-[var(--green)] font-medium outline-none focus:border-[var(--pink)] focus:ring-1 focus:ring-[var(--pink)] transition-all cursor-pointer appearance-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attending: e.target.value,
                      })
                    }
                  >
                    <option value="yes">{t.options.yes}</option>
                    <option value="no">{t.options.no}</option>
                  </select>
                </div>

                {/* Allergies */}
                <div className="flex flex-col">
                  <label className="font-noto text-sm tracking-wider text-[var(--pink)] mb-2">
                    {t.allergiesLabel}
                  </label>
                  <textarea
                    rows={3}
                    className="w-full font-noto rounded-xl border border-[#B2B699]/40 bg-white/50 px-4 py-3 text-[var(--green)] font-medium outline-none resize-none focus:border-[var(--pink)] focus:ring-1 focus:ring-[var(--pink)] transition-all"
                    placeholder="None"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        allergies: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Transport */}
                {guestInfo.askForTransport && (
                  <div className="flex items-center gap-3 pt-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="transport-check"
                      className="peer font-noto h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#B2B699] checked:border-[var(--pink)] checked:bg-[var(--pink)] transition-all"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transport: e.target.checked ? 1 : 0,
                        })
                      }
                    />
                    {/* Minimalist custom checkmark */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <label htmlFor="transport-check" className="text-base text-left font-noto text-[var(--green)] cursor-pointer select-none">
                    {t.transport}
                  </label>
                </div>
                )}
                

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-xs mt-4 rounded-full bg-[var(--pink)] text-white py-4 font-noto text-base tracking-[0.15em] uppercase transition-all hover:bg-[var(--green)] hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : t.submitBtn}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <h4 className="tangerine-regular text-4xl text-[var(--pink)] mb-2">
                  {t.thankYou}!
                </h4>
                <p className="font-noto text-l text-[var(--green)]/80">
                  {formData.attending === 'yes' ? t.successMsg : t.sadMsg}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

     {/* DRESSCODE GIFTS SECTION */}
      <section className="px-4 sm:px-6 pt-10 pb-12 z-20 relative">
        <div className="max-w-4xl mx-auto">
          {/* Clean, minimalistic grid instead of borders and shadows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ">

            {/* DRESS CODE */}
            <div className="p-8 sm:p-12
            flex flex-col items-center text-center">
              <span className="font-noto text-sm uppercase tracking-widest text-[var(--pink)] mb-3">
                {t.details.dressLabel}
              </span>
              <p className="font-semibold text-2xl mb-1 text-[var(--green)]">{t.details.dressCode}</p>
              <p className="text-base font-noto text-[var(--green)]/70 mt-1">{t.details.dressNote}</p>
            </div>

            {/* GIFTS */}
            <div className="bg-white/40 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#B2B699]/20
            flex flex-col items-center text-center">
              <span className="font-noto text-sm uppercase tracking-widest text-[var(--pink)] mb-3">
                {t.details.giftsLabel}
              </span>
              <p className="text-base font-noto text-[var(--green)]/70 mt-1">{t.details.giftsText}</p>
            </div>
            
          </div>
        </div>
      </section>


      {/* TRAVEL LINK */}
      <section className="px-4 sm:px-6 pb-12 text-center">
        <Link 
          to="/travel" 
          target="_blank" 
          className="inline-flex items-center gap-2 group"
        >
          <span className="font-noto underline tracking-[0.2em] text-sm text-[var(--pink)] group-hover:text-[#B2B699] transition-colors">
            {t.travel}
          </span>
          <svg className="w-4 h-4 text-[var(--pink)] group-hover:text-[var(--pink)] transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>      
      </section>

      {/* WISHES */}
      <section className="px-4 sm:px-6 pb-12 z-20 relative text-center">
        <Wishes guestInfo={guestInfo} t={t} />   
      </section>
    </div>
  );
};

export default WeddingInvite;