import React, { useState, useEffect } from 'react';
import { Infinity } from 'ldrs/react';
import 'ldrs/react/Infinity.css';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

// Apple-style native emojis for quick selection
const APPLE_EMOJIS = ['🥂', '❤️', '💍', '✨', '🎉', '🌴', '🕊️', '💐', '🥳', '💌'];

export default function Wishes({ guestInfo = { name: 'Guest', id: '0' }, t = {} }) {
  const [wishes, setWishes] = useState([]);
  const [formData, setFormData] = useState({ message: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all wishes from Google Sheets on load
  const fetchWishes = async () => {
    setFetching(true);
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?type=wish`);
      if (response.ok) {
        const data = await response.json();
        // Assuming data is an array of objects: [{ name, message, date }]
        // Sort chronologically (newest first)
        const sortedWishes = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
          : [];
        setWishes(sortedWishes);
      }
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Append clicked Apple emoji to the current text area
  const handleEmojiClick = (emoji) => {
    setFormData((prev) => ({
      ...prev,
      message: prev.message + emoji,
    }));
  };

  // Submit wish to Google Sheets
  const submitWishes = async (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setLoading(true);

    const payload = {
      ...formData,
      name: guestInfo.name,
      id: guestInfo.id,
      type: 'wish',
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
        // Add new wish directly to list for instant UX feedback
        setWishes((prev) => [
          {
            name: guestInfo.name,
            message: formData.message,
            date: new Date().toISOString(),
          },
          ...prev,
        ]);
        setFormData({ message: '' });
      } else {
        setSubmitted(false);
        setErrorMessage(t[result.message] || 'Could not submit your wish.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* SUBMISSION CARD */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#B2B699]/30">
          {loading && (
            <div className="flex justify-center mb-6">
              <Infinity size="50" stroke="4" strokeLength="0.15" bgOpacity="0.1" speed="1.3" color="var(--pink)" />
            </div>
          )}

          {errorMessage && (
            <div className="text-[var(--pink)] font-medium bg-[var(--pink)]/10 py-3 px-4 rounded-xl text-center mb-6 text-sm">
              {errorMessage}
            </div>
          )}

          {submitted ? (
            <div className="text-center py-6">
              <h4 className="tangerine-regular text-4xl text-[var(--pink)] mb-2">
                {t.thankYou}, {guestInfo.name}!
              </h4>
              <p className="text-sm font-medium text-[var(--green)]/80">
                {t.wish.submitted}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-noto tracking-wider text-[var(--pink)] underline underline-offset-4"
              >
                {t.wish.sendAnother}
              </button>
            </div>
          ) : (
            <section className="px-4 sm:px-6 pb-4 z-20 relative">
                <form onSubmit={submitWishes} className="space-y-6">
                <div className="flex flex-col">
                    <h2 className="font-noto uppercase tracking-[0.2em] pb-6 text-sm text-[var(--green)]">
                    {t.wish.leaveNote}
                    </h2>
                    
                    <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ message: e.target.value })}
                    placeholder={t.wish.placeholderNote}
                    className="w-full font-noto rounded-2xl border border-[#B2B699]/40 bg-white/50 px-4 py-3 text-[var(--green)] font-medium outline-none resize-none focus:border-[var(--pink)] focus:ring-1 focus:ring-[var(--pink)] transition-all text-sm placeholder-[#B2B699]"
                    />
                </div>

                {/* APPLE EMOJI BAR */}
                <div className="flex items-center justify-between bg-white/40 border border-[#B2B699]/20 rounded-2xl p-2 px-3 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-1.5">
                    {APPLE_EMOJIS.map((emoji, index) => (
                        <button
                        key={index}
                        type="button"
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-xs hover:scale-125 transition-transform duration-150 active:scale-95 p-1 rounded-lg hover:bg-[#F1EFEC]"
                        >
                        {emoji}
                        </button>
                    ))}
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading || !formData.message.trim()}
                    className="w-full mt-4 text-xs rounded-full bg-[var(--pink)] text-white py-4 font-noto text-base tracking-[0.15em] uppercase transition-all hover:bg-[var(--green)] hover:shadow-lg active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
                >
                    {loading ? t.wish.sending : t.wish.send}
                </button>
                </form>
            </section>
          )}
        </div>

        {/* CHRONOLOGICAL WISHES FEED */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="font-noto text-xs uppercase tracking-widest text-[#B2B699]">
              {t.wish.guestBook}
            </span>
          </div>

          {fetching ? (
            <div className="flex justify-center py-8">
              <Infinity size="40" stroke="3" strokeLength="0.15" bgOpacity="0.1" speed="1.3" color="#B2B699" />
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-8 bg-white/20 rounded-2xl border border-[#B2B699]/20">
              <p className="text-sm text-[var(--green)]/70 font-medium">{t.wish.beFirst}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishes.map((wish, idx) => (
                <div
                  key={idx}
                  className="bg-white/40 backdrop-blur-sm rounded-2xl p-5 border border-[#B2B699]/20 shadow-[0_4px_20px_rgb(0,0,0,0.01)] transition-transform hover:-translate-y-0.5 duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-noto text-base text-sm tracking-wide text-[var(--pink)]">
                      {wish.name || 'Anonymous Guest'}
                    </p>
                    {wish.date && (
                      <span className="text-[11px] font-medium text-[#B2B699]">
                        {new Date(wish.date).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-left font-noto text-[var(--green)]/90 leading-relaxed whitespace-pre-line">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>  
  );
}