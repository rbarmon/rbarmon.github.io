import React, { useState, useEffect, useRef } from 'react';

const ProgressiveFP = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = useRef(null);

  const impactWords = ['Impact', 'Change', 'Innovation', 'Solutions', 'Growth', 'Excellence', 'Progress'];

  // Stages:
  // 0: λrian (simple lambda)
  // 1: λrian :: Idea -> Impact (full type signature)
  // 2: λrian :: Idea -> [rotating words] (dynamic output)
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

  // Word rotation effect for stage 2
  useEffect(() => {
    if (stage >= 2) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % impactWords.length);
      }, 2000); // Change word every 2 seconds

      return () => clearInterval(interval);
    }
  }, [stage, impactWords.length]);

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
      {/* Stage 0: Simple lambda */}
      <div className={`fp-stage fp-simple ${stage >= 1 ? 'fade-out' : 'active'}`}>
        <span className="fp-const">λ</span>
        <span className="fp-name">rian</span>
      </div>

      {/* Stage 1: Full Haskell-style type signature */}
      <div className={`fp-stage fp-expanded ${stage === 1 ? 'active' : stage > 1 ? 'fade-out' : 'hidden'}`}>
        <span className="fp-const">λ</span>
        <span className="fp-name">rian</span>
        <span className="fp-equals"> :: </span>
        <span className="fp-params">Idea</span>
        <span className="fp-arrow"> -> </span>
        <span className="fp-output">Impact</span>
      </div>

      {/* Stage 2: Dynamic rotating type signature */}
      <div className={`fp-stage fp-expanded ${stage >= 2 ? 'active' : 'hidden'}`}>
        <span className="fp-const">λ</span>
        <span className="fp-name">rian</span>
        <span className="fp-equals"> :: </span>
        <span className="fp-params">Idea</span>
        <span className="fp-arrow"> -> </span>
        <span className="fp-output">
          <span className="rotating-word" key={currentWordIndex}>
            {impactWords[currentWordIndex]}
          </span>
        </span>
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