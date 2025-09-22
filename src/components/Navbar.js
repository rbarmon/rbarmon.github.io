import React, { useMemo, useState, useEffect } from 'react';

const navItems = [
  { href: '#about', en: 'About', ja: '紹介' },
  { href: '#work', en: 'Work', ja: '職歴' },
  { href: '#oss-hackathon', en: 'OSS/Hackathon', ja: 'OSS/ハッカソン' },
  { href: '#web', en: 'Software', ja: 'ソフトウェア' },
  { href: '#prototype', en: 'Prototype', ja: 'プロトタイプ' },
  { href: '#technical', en: 'Technical', ja: '技術' },
  { href: '#datascience', en: 'Data', ja: 'データ' },
];

const Navbar = ({ language, onToggleLanguage, isDarkMode, onToggleDarkMode, logoSrc, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const impactWords = ['impact', 'change', 'innovation', 'solutions', 'growth', 'excellence', 'progress'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % impactWords.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [impactWords.length]);

  const languageLabel = language === 'en' ? '日本語' : 'English';

  const handleNavClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleDarkMode = () => {
    onToggleDarkMode();
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleLanguage = () => {
    onToggleLanguage();
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const colorModeClasses = useMemo(
    () => `color-mode tron-toggle d-lg-flex justify-content-center align-items-center${isDarkMode ? ' active' : ''}`,
    [isDarkMode]
  );

  return (
    <nav className="glass-navbar" style={style}>
      <div className="nav-container">
        <a className="nav-brand" href="#about">
          <div className="functional-logo">
            <span className="function-def">const</span>
            <span className="function-name">&nbsp;rian</span>
            <span className="function-params">&nbsp;=&nbsp;(x)&nbsp;</span>
            <span className="arrow">=>&nbsp;</span>
            <span className="function-output">
              <span className="rotating-word" key={currentWordIndex}>
                {impactWords[currentWordIndex]}
              </span>
            </span>
            <span className="function-type">;</span>
          </div>
        </a>

        <button
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={handleNavClick}
            >
              {language === 'ja' ? item.ja : item.en}
            </a>
          ))}

          <div className="nav-actions">
            <button
              type="button"
              className="nav-action-btn"
              onClick={handleDarkMode}
              title="Toggle Dark Mode"
            >
              <i className="uil uil-moon"></i>
            </button>
            <button
              type="button"
              className="nav-action-btn language-btn"
              onClick={handleLanguage}
            >
              {languageLabel}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
