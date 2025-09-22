import React, { useState, useEffect, useRef } from 'react';

const ProgressiveFP = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Stages:
  // 0: rian(x) => impact (simple)
  // 1: const rian = (x) => impact; (expanded)
  // 2: Full content reveal
  // 3: Scroll to navbar

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollY(scrollTop);

      // Progress through stages based on scroll position
      if (scrollTop < 50) {
        setStage(0);
      } else if (scrollTop < 200) {
        setStage(1);
      } else if (scrollTop < 400) {
        setStage(2);
      } else if (scrollTop > 500) {
        setStage(3);
        setTimeout(() => {
          onComplete && onComplete();
        }, 500);
      }
    };

    // Auto-progress through first stages with delays
    const timer1 = setTimeout(() => {
      if (window.pageYOffset < 50) {
        setStage(1);
      }
    }, 2500);

    const timer2 = setTimeout(() => {
      if (window.pageYOffset < 200) {
        setStage(2);
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const getTransform = () => {
    const progress = Math.min(scrollY / 600, 1);
    const scale = 1 - progress * 0.3;
    const translateY = -progress * 100;
    return `translateY(${translateY}px) scale(${scale})`;
  };

  return (
    <div
      ref={containerRef}
      className={`progressive-fp stage-${stage}`}
      style={{ transform: getTransform() }}
    >
      {/* Stage 0: Simple FP notation */}
      <div className={`fp-stage fp-simple ${stage >= 1 ? 'fade-out' : 'active'}`}>
        <span className="fp-name">rian</span>
        <span className="fp-params">(x)</span>
        <span className="fp-arrow"> => </span>
        <span className="fp-output">impact</span>
      </div>

      {/* Stage 1: Expanded FP notation */}
      <div className={`fp-stage fp-expanded ${stage === 1 ? 'active' : stage > 1 ? 'fade-out' : 'hidden'}`}>
        <span className="fp-const">const</span>
        <span className="fp-name"> rian</span>
        <span className="fp-equals"> = </span>
        <span className="fp-params">(x)</span>
        <span className="fp-arrow"> => </span>
        <span className="fp-output">impact</span>
        <span className="fp-semicolon">;</span>
      </div>

      {/* Stage 2: Greeting reveal */}
      <div className={`fp-stage fp-greeting ${stage >= 2 ? 'active' : 'hidden'}`}>
        <h1 className="greeting-text">Hi, I'm Rian</h1>
        <p className="greeting-subtitle">Transforming ideas into digital impact</p>
      </div>

      {/* Scroll indicator */}
      {stage < 3 && (
        <div className="scroll-indicator">
          <div className="scroll-chevron"></div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      )}
    </div>
  );
};

export default ProgressiveFP;