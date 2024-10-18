// src/components/Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('日本語'); // Default to Japanese

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add additional logic to actually toggle dark mode styling
  };

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? '日本語' : 'English');
    // Add additional logic to change language
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
        <img id="topLogo" src="/images/logo/white_favicon_nonbg.png" alt="Top Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a href="#about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#work" className="nav-link">Work Exp.</a>
            </li>
            <li className="nav-item">
              <a href="#oss-hackathon" className="nav-link">OSS/Hackathon</a>
            </li>
            <li className="nav-item">
              <a href="#web" className="nav-link">Software</a>
            </li>
            <li className="nav-item">
              <a href="#prototype" className="nav-link">Prototype</a>
            </li>
            <li className="nav-item">
              <a href="#technical" className="nav-link">Technical</a>
            </li>
            <li className="nav-item">
              <a href="#datascience" className="nav-link">Data</a>
            </li>
          </ul>

          <ul className="navbar-nav ml-lg-auto">
            <div className="ml-lg-4">
              <div className="color-mode d-lg-flex justify-content-center align-items-center" id="logoSwitch" onClick={toggleDarkMode}>
                <i className="color-mode-icon"></i>
                Toggle Dark Mode
              </div>
            </div>
            <div className="ml-lg-4">
              <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={toggleLanguage}>
                  {language}
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
