'use client';

import { useState, useEffect, useRef } from 'react';
import DraggableCollage from '@/components/DraggableCollage';
import { useLanguage, TranslatedText } from '@/components/LanguageContext';

// Data
const workExperience = [
  {
    id: 'little-help-se',
    logo: '/images/collage/littlehelp-logo.jpeg',
    companyUrl: 'https://www.littlehelp.co.jp/',
    date: { en: 'Apr 2025 – Present', ja: '2025年4月～現在' },
    title: { en: 'Software Engineer / Solution Engineer', ja: 'ソフトウェアエンジニア / ソリューションエンジニア' },
    company: { en: 'Little Help Agency LLC', ja: 'Little Help Agency LLC' },
    description: {
      en: 'Full-stack development on Little Help Connect SaaS integrating LINE and HubSpot. Also core engineer for Lumo.cx, a new LINE × Shopify integration product.',
      ja: 'LINEとHubSpotを統合するLittle Help Connect SaaSでフルスタック開発。また、LINE × Shopify連携の新製品Lumo.cxのコアエンジニア。',
    },
    highlights: [
      { en: 'Designed LINE Groups → HubSpot Company sync feature, adopted by 10+ clients', ja: 'LINEグループ→HubSpot会社同期機能を設計、10社以上のクライアントが採用' },
      { en: 'Core engineer for Lumo.cx: UI architecture and major features with React/Next.js', ja: 'Lumo.cxコアエンジニア：React/Next.jsでUIアーキテクチャと主要機能を担当' },
      { en: 'Technical representative in 3 business meetings with major US B2C SaaS provider', ja: '米国大手B2C SaaSプロバイダーとの3回のビジネスミーティングで技術代表を担当' },
      { en: 'Technical support for HubSpot Solutions Partner implementation in Taiwan', ja: '台湾のHubSpot Solutions Partnerの実装プロジェクトで技術サポート' },
      { en: 'Resolved 10+ cross-team technical questions, accelerating customer onboarding', ja: '10件以上のクロスチーム技術課題を解決し、顧客オンボーディングを加速' },
    ],
    techStack: [
      { icon: 'devicon-react-original', name: 'React' },
      { icon: 'devicon-nextjs-plain', name: 'Next.js' },
      { icon: 'devicon-kotlin-plain', name: 'Kotlin' },
      { icon: 'devicon-nodejs-plain', name: 'Node.js' },
      { icon: 'devicon-postgresql-plain', name: 'PostgreSQL' },
      { icon: 'devicon-googlecloud-plain', name: 'GCP' },
    ],
    platforms: [
      { name: 'LINE', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg' },
      { name: 'HubSpot', icon: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg' },
      { name: 'Shopify', icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
    ],
  },
  {
    id: 'little-help-intern',
    logo: '/images/collage/littlehelp-logo.jpeg',
    companyUrl: 'https://www.littlehelp.co.jp/',
    date: { en: 'Mar 2025 – Apr 2025', ja: '2025年3月～2025年4月' },
    title: { en: 'Software Engineer Intern', ja: 'ソフトウェアエンジニアインターン' },
    company: { en: 'Little Help Agency LLC', ja: 'Little Help Agency LLC' },
    description: {
      en: 'Worked on a proof-of-concept application exploring upsell timing based on user sign-ups and early interaction signals. Integrated with HubSpot for contact management.',
      ja: 'ユーザー登録と初期のインタラクションシグナルに基づくアップセルタイミングを探るPoCアプリケーションを開発。HubSpotとコンタクト管理で連携。',
    },
    highlights: [
      { en: 'Implemented HubSpot contact creation/updates based on user sign-ups and profile changes', ja: 'ユーザー登録とプロフィール変更に基づくHubSpotコンタクトの作成・更新を実装' },
      { en: 'Developed flows to capture early user activity for upsell timing models', ja: 'アップセルタイミングモデル用の初期ユーザーアクティビティ取得フローを開発' },
      { en: 'Built React components for displaying user information and interaction events', ja: 'ユーザー情報とインタラクションイベント表示用のReactコンポーネントを構築' },
      { en: 'Implemented Kotlin services with PostgreSQL for persistence and HubSpot sync', ja: 'PostgreSQLとHubSpot同期のためのKotlinサービスを実装' },
      { en: 'Participated in design discussions to validate upsell concept feasibility', ja: 'アップセルコンセプトの実現可能性を検証する設計議論に参加' },
    ],
    techStack: [
      { icon: 'devicon-react-original', name: 'React' },
      { icon: 'devicon-kotlin-plain', name: 'Kotlin' },
      { icon: 'devicon-postgresql-plain', name: 'PostgreSQL' },
    ],
    platforms: [
      { name: 'HubSpot', icon: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg' },
    ],
  },
  {
    id: 'mejora',
    logo: '/images/collage/mejora-logo.png',
    companyUrl: 'https://mejora.co.jp/',
    date: { en: 'Apr 2024 – Aug 2024', ja: '2024年4月～2024年8月' },
    title: { en: 'Software Engineer Intern', ja: 'ソフトウェアエンジニアインターン' },
    company: { en: 'MEJORA Corporation', ja: 'MEJORA株式会社' },
    description: {
      en: 'Worked directly under the CEO in a 4-person engineering team with a flat organizational structure. Contributed to product direction, technical research, and feature implementation for AI-driven applications.',
      ja: '4人のエンジニアリングチームでCEOの直接指導の下、フラットな組織構造で働く。AI駆動アプリケーションの製品方針、技術調査、機能実装に貢献。',
    },
    highlights: [
      { en: 'Led implementation of AI-powered survey creation app using OpenAI API', ja: 'OpenAI APIを使用したAIアンケート作成アプリの実装を主導' },
      { en: 'Proposed product directions based on technical evaluations and data analysis', ja: '技術評価とデータ分析に基づく製品方針を提案' },
      { en: 'Conducted market research using Selenium and Hugging Face models', ja: 'SeleniumとHugging Faceモデルを使用して市場調査を実施' },
      { en: 'Analyzed datasets with Python/pandas to support product decisions', ja: 'Python/pandasでデータセットを分析し、製品意思決定を支援' },
      { en: 'Created UI/UX mockups in Figma for stakeholder demos', ja: 'ステークホルダーデモ用のUI/UXモックアップをFigmaで作成' },
    ],
    techStack: [
      { icon: 'devicon-react-original', name: 'React' },
      { icon: 'devicon-firebase-plain', name: 'Firebase' },
      { icon: 'devicon-python-plain', name: 'Python' },
      { icon: 'devicon-figma-plain', name: 'Figma' },
    ],
    platforms: [
      { name: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
      { name: 'Hugging Face', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
    ],
  },
  {
    id: 'diamondhead',
    logo: '/images/collage/diamondhead-logo.jpeg',
    companyUrl: 'https://diamondhead.jp/',
    date: { en: 'Dec 2023 – Feb 2024', ja: '2023年12月～2024年2月' },
    title: { en: 'Software Engineer Intern', ja: 'ソフトウェアエンジニアインターン' },
    company: { en: 'Diamondhead Corporation', ja: 'ダイヤモンドヘッド株式会社' },
    description: {
      en: 'Feature Improvement Team (10 members) for a centralized e-commerce management SaaS used to manage product listings across multiple platforms (Amazon, ZOZOTOWN, etc.).',
      ja: '複数のプラットフォーム（Amazon、ZOZOTOWNなど）での商品掲載を管理する集中型EC管理SaaSの機能改善チーム（10名）に所属。',
    },
    highlights: [
      { en: 'Enhanced word-count feature to support two input modes with improved accuracy', ja: '2つの入力モードに対応した文字数カウント機能を改善し、精度を向上' },
      { en: 'Updated user account modification flow to reflect changes instantly', ja: 'ユーザーアカウント変更フローを更新し、変更を即時反映' },
      { en: 'Redesigned product image positioning settings with configurable options', ja: '商品画像配置設定を再設計し、設定可能なオプションを追加' },
      { en: 'Wrote test specifications and reviewed teammates\' code before release', ja: 'テスト仕様書を作成し、リリース前にチームメイトのコードをレビュー' },
    ],
    techStack: [
      { icon: 'devicon-django-plain', name: 'Django' },
      { icon: 'devicon-postgresql-plain', name: 'PostgreSQL' },
      { icon: 'devicon-javascript-plain', name: 'JavaScript' },
      { icon: 'devicon-html5-plain', name: 'HTML5' },
      { icon: 'devicon-css3-plain', name: 'CSS3' },
    ],
    platforms: [
      { name: 'Amazon', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
      { name: 'ZOZOTOWN', icon: '/images/collage/zozotown-logo.svg' },
    ],
    link: {
      href: 'https://note.com/diamondhead/n/n4a1f53c731f4',
      label: { en: 'Internship Article', ja: 'インターン記事' },
      image: '/images/collage/diamondhead-article.webp',
      title: { en: 'Monash University | Improving Product Information Management System in Sapporo | Long-term Internship Interview', ja: 'モナッシュ大学｜初めての札幌で商品情報管理システムの改善｜札幌の長期インターンシップインタビュー' },
      source: 'Diamondhead Engineer Careers',
    },
  },
];

const projects = [
  {
    id: 'ramp',
    title: { en: 'Ramp', ja: 'Ramp' },
    tagline: { en: 'Onboard to any codebase in hours, not weeks', ja: '数週間ではなく数時間でどんなコードベースにもオンボード' },
    description: { en: 'AI-powered developer onboarding with voice-guided code exploration.', ja: 'AIを使った音声ガイド付きコード探索で開発者オンボーディング。' },
    tech: 'TypeScript, OpenAI API, CLI',
    link: 'https://rampup.dev/',
    image: '/images/project/web/ramp.png',
    status: 'Beta',
  },
  {
    id: 'oboeru',
    title: { en: 'Oboeru', ja: 'Oboeru' },
    tagline: { en: 'Collaborative learning powered by spaced repetition', ja: '間隔反復によるコラボ学習' },
    description: { en: 'Study together with shared flashcard decks and AI-enhanced learning.', ja: '共有フラッシュカードデッキとAI強化学習で一緒に勉強。' },
    tech: 'React, Electron, OpenAI API',
    link: 'https://oboeru.ai/',
    image: '/images/project/web/oboeru.png',
    status: 'Beta',
  },
];

const hackathons = [
  {
    id: 'co2ta',
    title: { en: 'Tokyo Open Data Hackathon 2024', ja: '都知事杯オープンデータ・ハッカソン2024' },
    award: { en: 'Business Award Winner', ja: 'ビジネス賞受賞' },
    description: { en: 'Carbon credit acquisition support service using generative AI', ja: '生成AIを使用したカーボンクレジット獲得支援サービス' },
    image: '/images/hackathon/2024Hackson_FinalStage_Panel.png',
  },
];

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

// Components
function TechIcon({ icon, name }: { icon: string; name: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="tag"
      style={{ padding: '4px 8px', cursor: 'default', position: 'relative' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <i className={icon} style={{ fontSize: '16px' }}></i>
      {showTooltip && (
        <span
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
            padding: '4px 8px',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            fontSize: '11px',
            fontWeight: 500,
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          {name}
        </span>
      )}
    </span>
  );
}

function PlatformIcon({ icon, name }: { icon: string; name: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="tag tag-blue"
      style={{ padding: '4px 8px', cursor: 'default', position: 'relative' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        src={icon}
        alt={name}
        style={{ height: '16px', width: 'auto', maxWidth: '50px', objectFit: 'contain' }}
      />
      {showTooltip && (
        <span
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
            padding: '4px 8px',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            fontSize: '11px',
            fontWeight: 500,
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          {name}
        </span>
      )}
    </span>
  );
}

function Navbar({ showNav, activeSection, isDarkMode, onToggleDarkMode }: { showNav: boolean; activeSection: string; isDarkMode: boolean; onToggleDarkMode: () => void }) {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.25;
    if (distance === 1) return 1.1;
    return 1;
  };

  const navItems = [
    { type: 'link', href: '#about', label: '↑', isTop: true },
    { type: 'link', href: '#about', labelEn: 'About', labelJa: '紹介', section: 'about' },
    { type: 'link', href: '#work', labelEn: 'Work', labelJa: '職歴', section: 'work' },
    { type: 'link', href: '#tech', labelEn: 'Tech', labelJa: '技術', section: 'tech' },
    { type: 'link', href: '#contact', labelEn: 'Contact', labelJa: '連絡', section: 'contact' },
  ];

  if (isMobile) {
    return (
      <nav className="notion-navbar-mobile">
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`mobile-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`} onClick={handleNavClick}>
            <TranslatedText en="About" ja="紹介" />
          </a>
          <a href="#work" className={`mobile-nav-item ${activeSection === 'work' ? 'active' : ''}`} onClick={handleNavClick}>
            <TranslatedText en="Work" ja="職歴" />
          </a>
          <a href="#tech" className={`mobile-nav-item ${activeSection === 'tech' ? 'active' : ''}`} onClick={handleNavClick}>
            <TranslatedText en="Tech" ja="技術" />
          </a>
          <a href="#contact" className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`} onClick={handleNavClick}>
            <TranslatedText en="Contact" ja="連絡" />
          </a>
          <div className="mobile-nav-divider"></div>
          <button className="mobile-nav-item" onClick={() => { toggleLanguage(); handleNavClick(); }}>
            {language === 'en' ? '日本語' : 'English'}
          </button>
          <button className="mobile-nav-item" onClick={() => { onToggleDarkMode(); handleNavClick(); }}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="notion-navbar-dock"
      ref={navRef}
      style={{
        opacity: showNav ? 1 : 0,
        pointerEvents: showNav ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="dock-container">
        {navItems.map((item, index) => {
          const scale = getScale(index);
          const isActive = item.section && activeSection === item.section;

          if (item.type === 'link') {
            return (
              <a
                key={index}
                href={item.href}
                className={`dock-item ${isActive ? 'dock-item-active' : ''}`}
                style={{
                  transform: `scale(${scale})`,
                  zIndex: hoveredIndex === index ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {item.isTop ? item.label : <TranslatedText en={item.labelEn || ''} ja={item.labelJa || ''} />}
              </a>
            );
          }
          return null;
        })}
      </div>
    </nav>
  );
}

interface TimelineItemData {
  id: string;
  logo?: string;
  companyUrl?: string;
  date: { en: string; ja: string };
  title: { en: string; ja: string };
  company: { en: string; ja: string };
  description: { en: string; ja: string };
  highlights?: { en: string; ja: string }[];
  techStack?: { icon: string; name: string }[];
  platforms?: { icon: string; name: string }[];
  link?: {
    href: string;
    label: { en: string; ja: string };
    image?: string;
    title?: { en: string; ja: string };
    source?: string;
  };
}

function TimelineItem({ item }: { item: TimelineItemData }) {
  const logoElement = item.logo && (
    <img
      src={item.logo}
      alt={item.company.en}
      style={{
        width: '48px',
        height: '48px',
        objectFit: 'contain',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-light)',
        flexShrink: 0,
      }}
    />
  );

  return (
    <div className="notion-timeline-item">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
        {item.companyUrl ? (
          <a href={item.companyUrl} target="_blank" rel="noreferrer" style={{ flexShrink: 0 }}>
            {logoElement}
          </a>
        ) : logoElement}
        <div style={{ flex: 1 }}>
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
            {(item.techStack || item.platforms) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                {item.techStack?.map((tech, i) => (
                  <TechIcon key={i} icon={tech.icon} name={tech.name} />
                ))}
                {item.platforms?.map((platform, i) => (
                  <PlatformIcon key={`p-${i}`} icon={platform.icon} name={platform.name} />
                ))}
              </div>
            )}
            {item.link && (
              item.link.image ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    marginTop: 'var(--space-md)',
                    padding: 'var(--space-sm)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'var(--bg-secondary)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <img
                    src={item.link.image}
                    alt=""
                    style={{
                      width: '120px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      <TranslatedText en={item.link.title?.en || ''} ja={item.link.title?.ja || ''} />
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <span style={{ fontSize: '12px' }}>🔗</span>
                      {item.link.source}
                    </div>
                  </div>
                </a>
              ) : (
                <a href={item.link.href} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: 'var(--space-sm)' }}>
                  <TranslatedText en={item.link.label.en} ja={item.link.label.ja} /> →
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectData {
  id: string;
  title: { en: string; ja: string };
  tagline: { en: string; ja: string };
  description: { en: string; ja: string };
  link: string;
  image?: string;
  status?: string;
}

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="project-card-minimal"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '24px 0',
        borderBottom: '1px solid var(--border-color)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'opacity 0.2s ease',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title.en}
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h5 style={{
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.3,
            }}>
              <TranslatedText en={project.title.en} ja={project.title.ja} />
            </h5>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              margin: '4px 0 0 0',
            }}>
              <TranslatedText en={project.tagline.en} ja={project.tagline.ja} />
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}>
            {project.status && (
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {project.status}
              </span>
            )}
            <span style={{
              fontSize: '16px',
              color: 'var(--text-tertiary)',
              transition: 'transform 0.2s ease',
            }}>↗</span>
          </div>
        </div>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          margin: '12px 0 0 0',
          lineHeight: 1.6,
        }}>
          <TranslatedText en={project.description.en} ja={project.description.ja} />
        </p>
      </div>
    </a>
  );
}

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);

      const sections = ['contact', 'tech', 'work', 'about'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const heroName = language === 'ja' ? '河原理安' : 'Rian Kawahara';
  const heroTitle = language === 'ja' ? 'ソフトウェアエンジニア' : 'Software Engineer';

  return (
    <>
      <Navbar
        showNav={showBackToTop}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Fixed settings toggles */}
      <div
        className="fixed-settings"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 999,
        }}
      >
        <button
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-primary)',
          }}
        >
          {language === 'en' ? 'JP' : 'EN'}
        </button>
        <button
          onClick={toggleDarkMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <main style={{ paddingTop: 0 }}>
        {/* Hero - Draggable Collage */}
        <section id="about">
          <DraggableCollage name={heroName} jobTitle={heroTitle} />
        </section>

        {/* Quick Intro */}
        <section className="section" style={{ paddingBottom: 'var(--space-lg)' }}>
          <div className="container">
            <div className="callout">
              <div className="callout-icon">👋</div>
              <div className="callout-content">
                <p>
                  <TranslatedText
                    en="I'm a software engineer based in Tokyo, building SaaS products and integrations. Previously studied at Monash University (Australia). I love working on full-stack applications, CRM integrations, and AI-powered tools."
                    ja="東京を拠点にSaaS製品と連携機能を開発するソフトウェアエンジニアです。オーストラリアのモナッシュ大学で学びました。フルスタックアプリケーション、CRM連携、AIツールの開発に情熱を持っています。"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="section" id="work" style={{ paddingTop: 0 }}>
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

        {/* Tech Stack */}
        <section className="section" id="tech" style={{ paddingBottom: 'var(--space-md)' }}>
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

        {/* GitHub Stats */}
        <section className="section" style={{ paddingBottom: 'var(--space-md)' }}>
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="GitHub Activity" ja="GitHubアクティビティ" />
            </h2>
            <div className="github-section">
              <a
                href="https://github.com/riankawahara"
                target="_blank"
                rel="noreferrer"
                className="github-profile-card"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/106299081?v=4"
                  alt="riankawahara"
                  className="github-avatar"
                />
                <div className="github-info">
                  <div className="github-name-row">
                    <span className="github-username">riankawahara</span>
                    <span className="github-realname">Rian</span>
                  </div>
                  <div className="github-stats-row">
                    <span>📍 Japan</span>
                    <span>📦 4 repos</span>
                    <span>👥 4 followers</span>
                  </div>
                </div>
                <svg className="github-icon" height="40" width="40" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
              </a>

              <div className="github-chart-container">
                <img
                  src="https://ghchart.rshah.org/riankawahara"
                  alt="GitHub Contribution Graph"
                  className="github-chart"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container"><div className="divider" /></div>

        {/* Hackathons */}
        <section className="section" style={{ paddingBottom: 'var(--space-md)' }}>
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

        {/* Projects section hidden
        <div className="container"><div className="divider" /></div>

        <section className="section" id="projects" style={{ paddingBottom: 'var(--space-md)' }}>
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Projects" ja="プロジェクト" />
            </h2>
            <div>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
        */}

        <div className="container"><div className="divider" /></div>

        {/* Contact */}
        <section className="section" id="contact" style={{ paddingBottom: 'var(--space-md)' }}>
          <div className="container">
            <h2 className="section-heading">
              <TranslatedText en="Get in Touch" ja="連絡先" />
            </h2>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <a href="https://github.com/riankawahara" target="_blank" rel="noreferrer" className="btn btn-secondary">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rian-barrett-40a090261/" target="_blank" rel="noreferrer" className="btn btn-secondary">
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
                {/* <li><a href="#projects"><TranslatedText en="Projects" ja="プロジェクト" /></a></li> */}
              </ul>
            </div>
            <div className="footer-section">
              <h5><TranslatedText en="Social" ja="ソーシャル" /></h5>
              <ul className="footer-links">
                <li><a href="https://github.com/riankawahara" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/rian-barrett-40a090261/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
