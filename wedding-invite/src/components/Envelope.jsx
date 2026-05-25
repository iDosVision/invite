import React, { useEffect, useState, useRef } from 'react';

const Envelope = ({ cardImg, envBackImg, envFrontImg }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate 0 to 1 progress based on the container's position
      const totalHeight = rect.height - windowHeight;
      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ANIMATION MATH
  // Starts at 200px (hidden) and moves to -400px (fully out)
  const translateY = 200 - (scrollProgress * 600); 
  const scale = 0.9 + (scrollProgress * 0.15);

  const styles = {
    container: {
      height: '300vh', // Increase this for a longer, smoother scroll
      position: 'relative',
    },
    stickyBox: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Keeps the card from showing outside the viewport
    },
    envelopeWrapper: {
      position: 'relative',
      width: '450px',
      height: '350px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    // The "Pocket" (Back Layer)
    back: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      zIndex: 1,
    },
    // The Card (Middle Layer)
    card: {
      position: 'absolute',
      width: '90%',
      bottom: '10px',
      zIndex: 2, 
      transform: `translateY(${translateY}px) scale(${scale})`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      borderRadius: '8px',
      transition: 'transform 0.1s linear', // Linear makes scroll feel connected
    },
    // The "Cover" (Front Layer)
    front: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      zIndex: 3, 
      pointerEvents: 'none', // Important: let clicks go to the card
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.stickyBox}>
        <div style={styles.envelopeWrapper}>
          
          {/* 1. Interior of envelope */}
          <img src={envBackImg} style={styles.back} alt="back" />

          {/* 2. The Card sliding out */}
          <img src={cardImg} style={styles.card} alt="invite" />

          {/* 3. The Front "Pocket" (MUST BE A TRANSPARENT PNG) */}
          <img src={envFrontImg} style={styles.front} alt="front" />

        </div>
      </div>
    </div>
  );
};

export default Envelope;