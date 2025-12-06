import React, { createContext, useContext, useEffect, useState } from 'react';
import DraggableCollage from '../components/DraggableCollage';
import '../css/notion-theme.css';

const LanguageContext = createContext({ language: 'en' });

const useLanguage = () => useContext(LanguageContext);

const TranslatedText = ({ en, ja, as: Component = 'span', className = '', ...rest }) => {
  const { language } = useLanguage();
  const textContent = language === 'ja' ? ja || en : en;
  return (
    <Component className={className} {...rest}>
      {textContent}
    </Component>
  );
};

// Work Experience Data
const workExperience = [
  {
    id: 'little-help-se',
    date: { en: 'Apr 2025 – Present', ja: '2025年4月～現在' },
    title: { en: 'Software Engineer / Solution Engineer', ja: 'ソフトウェアエンジニア / ソリューションエンジニア' },
    company: { en: 'Little Help Agency LLC', ja: 'Little Help Agency LLC' },
    description: {
      en: 'Full-stack development on LINE integration software and Little Help Connect SaaS. Design and deliver integration workflows while partnering with international clients.',
      ja: 'LINE連携ソフトウェアおよびLittle Help Connect SaaSでフルスタック開発。海外クライアントと連携しながら統合ワークフローを設計・提供。',
    },
    highlights: [
      { en: 'Full-stack feature development with LINE and HubSpot integration', ja: 'LINEとHubSpot連携のフルスタック機能開発' },
      { en: 'Designed group chat management syncing LINE groups as HubSpot objects', ja: 'LINEグループをHubSpotオブジェクトとして同期するグループチャット管理を設計' },
      { en: 'Bilingual bridge for international customers', ja: '海外顧客との橋渡しを担当' },
    ],
  },
  {
    id: 'mejora',
    date: { en: 'Apr 2024 – Aug 2024', ja: '2024年4月～2024年8月' },
    title: { en: 'Software Engineer Intern', ja: 'ソフトウェアエンジニアインターン' },
    company: { en: 'MEJORA Corporation', ja: 'MEJORA株式会社' },
    description: {
      en: 'Worked directly under the CEO in a flat structure. Responsible for developing AI-powered applications using React, Firebase, and OpenAI API.',
      ja: 'CEOの直接指導の下、フラットな組織構造で働く。React、Firebase、OpenAI APIを使用したAIアプリケーション開発を担当。',
    },
    highlights: [
      { en: 'Led implementation of AI survey creation app', ja: 'AIアンケート作成アプリの実装を主導' },
      { en: 'Conducted market research using Selenium and Hugging Face', ja: 'SeleniumとHugging Faceを使用して市場調査を実施' },
    ],
  },
  {
    id: 'diamondhead',
    date: { en: 'Dec 2023 – Feb 2024', ja: '2023年12月～2024年2月' },
    title: { en: 'Software Engineer Intern', ja: 'ソフトウェアエンジニアインターン' },
    company: { en: 'Diamondhead Corporation', ja: 'ダイヤモンドヘッド株式会社' },
    description: {
      en: 'Feature improvement team for centralized e-commerce management SaaS. Tech stack: Django, PostgreSQL, JavaScript.',
      ja: '集中型EC管理SaaSの機能改善チーム。技術スタック：Django、PostgreSQL、JavaScript。',
    },
    link: {
      href: 'https://note.com/diamondhead/n/n4a1f53c731f4',
      label: { en: 'Internship Article', ja: 'インターン記事' },
    },
  },
];

// Projects Data
const projects = [
  {
    id: 'bonsai',
    title: { en: 'Bonsai Flashcard App', ja: 'Bonsaiフラッシュカードアプリ' },
    description: { en: 'Study platform with spaced repetition for university students', ja: '大学生向け間隔反復学習プラットフォーム' },
    tech: 'Swift, Firebase, SwiftUI',
    image: '/images/project/web/quizzoio.png',
  },
  {
    id: 'techextend',
    title: { en: 'TechExtend AI', ja: 'TechExtend AI' },
    description: { en: 'AI-powered learning content creation platform', ja: 'AI学習コンテンツ作成プラットフォーム' },
    tech: 'React, OpenAI API, Firebase',
    link: 'https://techextend.ai/',
    image: '/images/project/web/techextendai.png',
  },
  {
    id: 'quizzo',
    title: { en: 'Quizzo.io', ja: 'Quizzo.io' },
    description: { en: 'Interactive flashcard platform with collaboration', ja: 'コラボレーション機能付きフラッシュカードプラットフォーム' },
    tech: 'React, Firebase, OpenAI API',
    link: 'https://quizzo.io/',
    image: '/images/project/web/quizzoio.png',
  },
  {
    id: 'afl',
    title: { en: 'AFL Game Ranking System', ja: 'AFLゲームランキング' },
    description: { en: 'Automated AFL match ranking and analysis', ja: 'AFL試合の自動ランキング分析' },
    tech: 'React, Node.js, PostgreSQL',
    image: '/images/project/web/aflgrs.png',
  },
];

// Hackathon Projects
const hackathons = [
  {
    id: 'co2ta',
    title: { en: 'Tokyo Open Data Hackathon 2024', ja: '都知事杯オープンデータ・ハッカソン2024' },
    award: { en: 'Business Award Winner', ja: 'ビジネス賞受賞' },
    description: { en: 'Carbon credit acquisition support service using generative AI', ja: '生成AIを使用したカーボンクレジット獲得支援サービス' },
    image: '/images/hackathon/2024Hackson_FinalStage_Panel.png',
  },
];

// Tech Stack
const techStack = [
  { icon: 'devicon-react-original', name: 'React' },
  { icon: 'devicon-typescript-plain', name: 'TypeScript' },
  { icon: 'devicon-python-plain', name: 'Python' },
  { icon: 'devicon-kotlin-plain', name: 'Kotlin' },
  { icon: 'devicon-javascript-plain', name: 'JavaScript' },
  { icon: 'devicon-swift-plain', name: 'Swift' },
  { icon: 'devicon-postgresql-plain', name: 'PostgreSQL' },
  { icon: 'devicon-firebase-plain', name: 'Firebase' },
  { icon: 'devicon-docker-plain', name: 'Docker' },
  { icon: 'devicon-figma-plain', name: 'Figma' },
];

// Navbar Component
const Navbar = ({ language, onToggleLanguage, isDarkMode, onToggleDarkMode }) => (
  <nav className="notion-navbar">
    <div className="navbar-content">
      <a href="#" className="navbar-brand">RK</a>
      <ul className="navbar-links">
        <li><a href="#about"><TranslatedText en="About" ja="紹介" /></a></li>
        <li><a href="#work"><TranslatedText en="Work" ja="職歴" /></a></li>
        <li><a href="#projects"><TranslatedText en="Projects" ja="プロジェクト" /></a></li>
        <li><a href="#contact"><TranslatedText en="Contact" ja="連絡" /></a></li>
      </ul>
      <div className="navbar-actions">
        <button className="navbar-btn" onClick={onToggleLanguage}>
          {language === 'en' ? 'JP' : 'EN'}
        </button>
        <button className="navbar-btn" onClick={onToggleDarkMode}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </nav>
);

// Timeline Item Component
const TimelineItem = ({ item }) => {
  const { language } = useLanguage();
  return (
    <div className="notion-timeline-item">
      <div className="notion-timeline-date">
        <TranslatedText en={item.date.en} ja={item.date.ja} />
      </div>
      <h4 className="notion-timeline-title">
        <TranslatedText en={item.title.en} ja={item.title.ja} />
      </h4>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-sm)' }}>
        <TranslatedText en={item.company.en} ja={item.company.ja} />
      </p>
      <div className="notion-timeline-content">
        <p><TranslatedText en={item.description.en} ja={item.description.ja} /></p>
        {item.highlights && (
          <ul>
            {item.highlights.map((h, i) => (
              <li key={i}><TranslatedText en={h.en} ja={h.ja} /></li>
            ))}
          </ul>
        )}
        {item.link && (
          <a href={item.link.href} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: 'var(--space-sm)' }}>
            <TranslatedText en={item.link.label.en} ja={item.link.label.ja} /> →
          </a>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => (
  <div className="project-card">
    {project.image && (
      <img src={project.image} alt={project.title.en} className="project-card-image" />
    )}
    <div className="project-card-body">
      <h5 className="project-card-title">
        <TranslatedText en={project.title.en} ja={project.title.ja} />
      </h5>
      <p className="project-card-desc">
        <TranslatedText en={project.description.en} ja={project.description.ja} />
      </p>
      <p className="project-card-tech">{project.tech}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: 'var(--space-sm)', padding: 0 }}>
          View →
        </a>
      )}
    </div>
  </div>
);

function MainPage() {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'ja' : 'en'));
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const heroName = language === 'ja' ? '河原理安' : 'Rian Kawahara';
  const heroTitle = language === 'ja' ? 'ソフトウェアエンジニア' : 'Software Engineer';

  return (
    <LanguageContext.Provider value={{ language }}>
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main style={{ paddingTop: '40px' }}>
        {/* Hero - Draggable Collage */}
        <section id="about">
          <DraggableCollage name={heroName} jobTitle={heroTitle} />
        </section>

        {/* Quick Intro */}
        <section className="section">
          <div className="container">
            <div className="callout">
              <div className="callout-icon">👋</div>
              <div className="callout-content">
                <p>
                  <TranslatedText
                    en="I'm a software engineer based in Tokyo, building SaaS products and integrations. Previously studied at Monash University (Australia). I love working on full-stack applications, CRM integrations, and AI-powered tools."
                    ja="東京を拠点にSaaS製品と連携機能を開発するソフトウェアエンジニアです。オーストラリアのモナシュ大学で学びました。フルスタックアプリケーション、CRM連携、AIツールの開発に情熱を持っています。"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Tech Stack" ja="技術スタック" />
            </h2>
            <div className="tech-icons-grid">
              {techStack.map((tech) => (
                <div key={tech.name} className="tech-icon-item">
                  <i className={tech.icon}></i>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container"><div className="divider" /></div>

        {/* Work Experience */}
        <section className="section" id="work">
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Work Experience" ja="職歴" />
            </h2>
            <div className="notion-timeline">
              {workExperience.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <div className="container"><div className="divider" /></div>

        {/* Hackathons */}
        <section className="section">
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Hackathons" ja="ハッカソン" />
            </h2>
            {hackathons.map((h) => (
              <div key={h.id} className="notion-card" style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
                <img src={h.image} alt={h.title.en} style={{ width: '200px', borderRadius: 'var(--radius-md)' }} />
                <div>
                  <span className="tag tag-orange" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>
                    <TranslatedText en={h.award.en} ja={h.award.ja} />
                  </span>
                  <h4 className="notion-card-title">
                    <TranslatedText en={h.title.en} ja={h.title.ja} />
                  </h4>
                  <p className="notion-card-content">
                    <TranslatedText en={h.description.en} ja={h.description.ja} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="container"><div className="divider" /></div>

        {/* Projects */}
        <section className="section" id="projects">
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Projects" ja="プロジェクト" />
            </h2>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <div className="container"><div className="divider" /></div>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Get in Touch" ja="連絡先" />
            </h2>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <a href="mailto:rbar0032@student.monash.edu" className="btn btn-primary">
                Email Me
              </a>
              <a href="https://github.com/rbarmon" target="_blank" rel="noreferrer" className="btn btn-secondary">
                GitHub
              </a>
              <a href="https://linkedin.com/in/rian-kawahara" target="_blank" rel="noreferrer" className="btn btn-secondary">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="notion-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h5><TranslatedText en="Rian Kawahara" ja="河原理安" /></h5>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                <TranslatedText en="Software Engineer in Tokyo" ja="東京のソフトウェアエンジニア" />
              </p>
            </div>
            <div className="footer-section">
              <h5><TranslatedText en="Links" ja="リンク" /></h5>
              <ul className="footer-links">
                <li><a href="#about"><TranslatedText en="About" ja="紹介" /></a></li>
                <li><a href="#work"><TranslatedText en="Work" ja="職歴" /></a></li>
                <li><a href="#projects"><TranslatedText en="Projects" ja="プロジェクト" /></a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5><TranslatedText en="Social" ja="ソーシャル" /></h5>
              <ul className="footer-links">
                <li><a href="https://github.com/rbarmon" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/rian-kawahara" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </LanguageContext.Provider>
  );
}

export default MainPage;
