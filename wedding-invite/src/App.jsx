import React, { useState, useEffect } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import kz from './locales/kz.json';
import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'
import Envelope from './components/Envelope';

const languages = { en, es, kz};

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const WeddingInvite = () => {
  const [guestInfo, setGuestInfo] = useState({ 
    name: 'Guest', 
    id: '', 
    lang: 'en', 
    askForTransport: false
  });
  const [formData, setFormData] = useState({ attending: 'yes', allergies: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Grab Guest Info from URL (?name=Aidos&id=123)
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
      askForTransport
    });
  }, []);

  // get language texts
  const t = languages[guestInfo.lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // match sheet columns
    const payload = {
      ...formData,
      name: guestInfo.name,
      id: guestInfo.id,
      total: 1
    };

    try {
      // mode: 'no-cors' is used because Google Apps Script doesn't return CORS headers
      const response =  await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // mode: 'no-cors',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      // 1. Check if the HTTP status is 200-299
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // 2. Parse the JSON sent back by ContentService
      const result = await response.json();
      
      console.log("Success message:", result.message); // Access your custom status
      console.log("Status:", result.status);
      
      setSubmitted(result.status == 'success' ? true : false);
      setErrorMessage(result.message);
    } catch (error) {
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // APPLYING THE WRAPPER STYLE
    <div style={styles.wrapper}>
      <div class="intro" style={styles.wrapper}>
        <Envelope  
          cardImg="/src/assets/intro-1.jpg" 
          envBackImg="/src/assets/envBack.jpg"
          envFrontImg="/src/assets/envFront.jpg"
        />
      </div>

      <div style={styles.container}>
        {loading && <Infinity
          size="55"
          stroke="4"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.3"
          color="black" 
        />}
        <h1 style={styles.title}>{t.welcome}, {guestInfo.name}!</h1>
        <p style={styles.subtitle}>{t.inviteText}</p>

        {/* Corrected logic: Error Message */}
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>{t.attendingLabel}</label>
            <select 
              style={styles.input} 
              onChange={(e) => setFormData({...formData, attending: e.target.value})}
            >
              <option value="yes">{t.options.yes}</option>
              <option value="no">{t.options.no}</option>
            </select>

            <label style={styles.label}>{t.allergiesLabel}</label>
            <textarea 
              style={{...styles.input, minHeight: '80px'}} 
              onChange={(e) => setFormData({...formData, allergies: e.target.value})} 
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                onChange={(e) => setFormData({...formData, transportNeeded: e.target.checked})} 
              />
              <label style={styles.label}>{t.transportNeeded}</label>
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "..." : t.submitBtn}
            </button>
          </form>
        ) : (
          <h2 style={styles.success}>{formData.attending === 'yes' ? t.successMsg : t.sadMsg}</h2>
        )}
      </div>
    </div>
  );
};

// Simple inline styles to get you started
const styles = {
  wrapper: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  container: { 
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", 
    textAlign: 'center', 
    height: '100vh', 
    background: 'white', 
    padding: '100px',
    color: '#2d3436', 
    maxWidth: '400px', 
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
  },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' },
  subtitle: { color: '#636e72', marginBottom: '30px', lineHeight: '1.5' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' },
  label: { fontSize: '14px', fontWeight: '600', color: '#636e72' },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #dfe6e9', 
    fontSize: '16px', // 16px prevents mobile zoom-in 
    backgroundColor: '#fdfdfd'
  },
  button: { 
    padding: '14px', 
    background: '#d4af37', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  success: { color: '#27ae60', marginTop: '20px' }
};

export default WeddingInvite;