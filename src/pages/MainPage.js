import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import VideoBackground from '../components/VideoBackground';
import ProgressiveFP from '../components/ProgressiveFP';
import '../css/bootstrap.min.css';
import '../css/unicons.css';
import '../css/industrial-theme.css';

const LanguageContext = createContext({ language: 'en' });

const useLanguage = () => useContext(LanguageContext);

const TranslatedText = ({ en, ja, as: Component = 'span', className = '', children, ...rest }) => {
  const { language } = useLanguage();
  const textContent = language === 'ja' ? ja || en : en;
  return (
    <Component className={className} data-en={en} data-ja={ja || en} {...rest}>
      {children || textContent}
    </Component>
  );
};

const timelineItems = [
  {
    id: 'little-help-se',
    alignment: 'left',
    date: {
      en: 'Apr 2025 – Present',
      ja: '2025年4月～現在',
    },
    title: {
      en: 'Software Engineer / Solution Engineer at Little Help Agency LLC',
      ja: 'Little Help Agency LLC ソフトウェアエンジニア / ソリューションエンジニア',
    },
    content: [
      {
        type: 'paragraph',
        en: "I contribute both as a software engineer and as a solution engineer at Little Help Agency. On the engineering side, I work full-stack on the company's LINE integration software and the Little Help Connect SaaS product, shipping new capabilities and iterating on the existing platform.",
        ja: 'Little Help Agencyでソフトウェアエンジニア兼ソリューションエンジニアとして貢献しています。エンジニアリング面では、同社のLINE連携ソフトウェアおよびLittle Help Connect SaaS製品でフルスタック開発に携わり、新機能の提供と既存プラットフォームの改善を行っています。',
      },
      {
        type: 'paragraph',
        en: 'As a solution engineer, I design and deliver integration workflows while partnering directly with international clients in English to implement technical solutions and CRM integrations.',
        ja: 'ソリューションエンジニアとして、英語で海外クライアントと直接連携しながら技術的なワークフローやCRM連携を設計・提供しています。',
      },
      {
        type: 'paragraph',
        en: 'Main tasks undertaken include:',
        ja: '主な業務内容は以下の通りです：',
      },
      {
        type: 'list',
        items: [
          {
            en: 'Full-stack feature development with a focus on integrating LINE and HubSpot.',
            ja: 'LINEとHubSpotの連携に注力したフルスタックでの機能開発。',
          },
          {
            en: 'Designed and implemented group chat management so LINE groups sync as HubSpot company objects.',
            ja: 'LINEグループをHubSpotの企業オブジェクトとして同期できるグループチャット管理機能を設計・実装。',
          },
          {
            en: 'Delivered production bug fixes and iterative enhancements across the stack.',
            ja: '本番環境でのバグ修正およびスタック全体にわたる機能改善を実施。',
          },
          {
            en: 'Worked with clients to design integration workflows and resolve technical issues.',
            ja: 'クライアントと協力して連携ワークフローを設計し、技術的課題を解決。',
          },
          {
            en: 'Acted as a bilingual bridge for international customers, communicating in English and Japanese.',
            ja: '英語と日本語でのコミュニケーションにより、海外顧客との橋渡しを担当。',
          },
        ],
      },
    ],
  },
  {
    id: 'little-help-intern',
    alignment: 'right',
    date: {
      en: 'Mar 2025 – Apr 2025',
      ja: '2025年3月～2025年4月',
    },
    title: {
      en: 'Software Engineer Intern at Little Help Agency LLC',
      ja: 'Little Help Agency LLC ソフトウェアエンジニアインターン',
    },
    content: [
      {
        type: 'paragraph',
        en: 'I helped build the base application for an upsell concept that tracked user clicks to determine optimal upsell timing. The proof of concept integrated with HubSpot and was built with a React frontend, Kotlin services, and PostgreSQL.',
        ja: 'ユーザーのクリックデータを追跡して最適なアップセルタイミングを判断するコンセプト向け基盤アプリケーションの開発に携わりました。HubSpotと連携し、Reactフロントエンド、Kotlinサービス、PostgreSQLで構築しました。',
      },
      {
        type: 'paragraph',
        en: 'Main tasks undertaken include:',
        ja: '主な業務内容は以下の通りです：',
      },
      {
        type: 'list',
        items: [
          {
            en: 'Implemented core logic to analyse user click data and surface upsell opportunities.',
            ja: 'ユーザークリックデータを分析しアップセル機会を抽出するコアロジックを実装。',
          },
          {
            en: 'Integrated HubSpot workflows to track upsell triggers inside the CRM.',
            ja: 'HubSpotのワークフローと連携し、CRM内でアップセルトリガーを追跡。',
          },
          {
            en: 'Developed React UI components to visualise interactions and manage upsell flows.',
            ja: 'React UIコンポーネントを開発し、ユーザーの操作を可視化してアップセルフローを管理。',
          },
          {
            en: 'Built Kotlin services with PostgreSQL for persistence and event processing.',
            ja: '永続化とイベント処理のためにKotlinサービスとPostgreSQLを構築。',
          },
          {
            en: 'Collaborated with the team to validate the upsell proof of concept and present findings.',
            ja: 'チームと連携してアップセルのPoCを検証し、成果を報告。',
          },
        ],
      },
    ],
  },
  {
    id: 'mejora',
    alignment: 'left',
    date: {
      en: 'Apr 2024 – Present',
      ja: '2024年4月～現在',
    },
    title: {
      en: 'Software Engineer Intern at MEJORA Corporation',
      ja: 'MEJORA株式会社 ソフトウェアエンジニアインターン',
    },
    content: [
      {
        type: 'paragraph',
        en: 'I am currently working as a software engineer at MEJORA Corporation under the direct supervision of the CEO, in a team of four. We work in a flat organizational structure, where I am entrusted with proposing product directions and implementing features. The technology stack I use includes React, Firebase, Firestore, and the OpenAI API. I am responsible for developing applications using generative AI.',
        ja: '現在、MEJORA株式会社でCEOの直接指導の下、4人チームでソフトウェアエンジニアとして働いています。フラットな組織構造で、製品の方向性提案や機能実装を任されています。使用している技術スタックは、React、Firebase、Firestore、OpenAI APIです。生成AIを活用したアプリケーション開発を担当しています。',
      },
      {
        type: 'paragraph',
        en: 'Main tasks undertaken include:',
        ja: '主な業務内容は以下の通りです：',
      },
      {
        type: 'list',
        items: [
          {
            en: 'Proposing development product directions based on implementation proposals and analysis results.',
            ja: '実装提案や分析結果に基づいて製品開発の方向性を提案。',
          },
          {
            en: 'Using Selenium and Hugging Face to conduct market research.',
            ja: 'SeleniumやHugging Faceを使用して市場調査を実施。',
          },
          {
            en: 'Analyzing scraped data with pandas.',
            ja: 'pandasを使用してスクレイピングデータを分析。',
          },
          {
            en: 'Creating demonstration mockups using Figma.',
            ja: 'Figmaを使用してデモ用モックアップを作成。',
          },
          {
            en: 'Researching necessary tech stacks and technologies for creating the product.',
            ja: '製品開発に必要な技術スタックや技術を調査。',
          },
          {
            en: 'Leading the implementation of the AI survey creation app product.',
            ja: 'AIアンケート作成アプリの実装を主導。',
          },
          {
            en: 'Completing the implementation of the AI survey creation app and demonstrating the final product to the CEO.',
            ja: 'AIアンケート作成アプリの実装を完了し、最終製品をCEOにデモンストレーション。',
          },
        ],
      },
    ],
  },
  {
    id: 'diamondhead',
    alignment: 'right',
    date: {
      en: 'Dec 2023 – Feb 2024',
      ja: '2023年12月～2024年2月',
    },
    title: {
      en: 'Software Engineer Intern at Diamondhead Corporation',
      ja: 'ダイヤモンドヘッド株式会社 ソフトウェアエンジニアインターン',
    },
    content: [
      {
        type: 'paragraph',
        en: 'I worked as a software developer on the feature improvement team at Diamondhead Corporation. The technology stack included HTML, CSS, JS, Django, and PostgreSQL, and the team consisted of about ten people. The SaaS I worked on was a centralized e-commerce management software that manages clients\' products on multiple ecommerce platforms (e.g., Amazon, Zozotown).',
        ja: 'ダイヤモンドヘッド株式会社の機能改善チームでソフトウェア開発者として働いていました。使用した技術スタックは、HTML、CSS、JavaScript、Django、PostgreSQLで、チームは約10人で構成されていました。私が携わったSaaSは、クライアントの商品を複数のECプラットフォーム（例：Amazon、Zozotown）で管理する集中型のeコマース管理ソフトウェアです。',
      },
      {
        type: 'paragraph',
        en: 'Main tasks undertaken include:',
        ja: '主な業務内容は以下の通りです：',
      },
      {
        type: 'list',
        items: [
          {
            en: 'Improved the word count feature to display accurate word counts for two different input modes.',
            ja: '2つの異なる入力モードに対して正確な単語数を表示するために単語数機能を改善。',
          },
          {
            en: 'Modified the user account change feature to update immediately instead of being based on old cache information from the original version.',
            ja: 'ユーザーアカウント変更機能を、旧バージョンのキャッシュ情報に基づくのではなく、即時更新されるように修正。',
          },
          {
            en: 'Changed the product image positioning mode button, altered the default function, and implemented adjustable settings according to client preferences.',
            ja: '製品画像の配置モードボタンを変更し、デフォルト機能を調整、クライアントの好みに応じた設定を実装。',
          },
        ],
      },
      {
        type: 'paragraph',
        en: 'Other tasks undertaken include:',
        ja: 'その他の業務内容は以下の通りです：',
      },
      {
        type: 'list',
        items: [
          {
            en: 'Wrote test specifications for the software developed so colleagues could test it.',
            ja: '同僚がテストできるように、開発したソフトウェアのテスト仕様書を作成。',
          },
          {
            en: 'Reviewed test specifications written by colleagues and verified the code for release.',
            ja: '同僚が作成したテスト仕様書をレビューし、リリース用コードを確認。',
          },
          {
            en: 'After project completion, I presented my development progress to the team and summarized the new features implemented.',
            ja: 'プロジェクト完了後、チームに開発進捗を発表し、実装した新機能をまとめました。',
          },
        ],
      },
    ],
    links: [
      {
        href: 'https://note.com/diamondhead/n/n4a1f53c731f4',
        label: {
          en: 'Link to Internship participation article (in Japanese)',
          ja: 'インターンシップ参加記事へのリンク（日本語）',
        },
      },
    ],
  },
  {
    id: 'meiko',
    alignment: 'left',
    date: {
      en: 'Mar 2022 – May 2022',
      ja: '2022年3月～2022年5月',
    },
    title: {
      en: 'Juku Tutor at Meiko Gijuku',
      ja: '明光義塾 講師',
    },
    content: [
      {
        type: 'paragraph',
        en: 'I was responsible for teaching English to students at the tutoring center and managed their study plans for test preparation. I also focused on motivating students during class to maintain their concentration.',
        ja: '明光義塾で生徒に英語を教え、テスト対策のための学習計画を管理していました。また、授業中に生徒の集中力を保つために、やる気を引き出すことにも注力しました。',
      },
    ],
  },
  {
    id: 'mcdonalds',
    alignment: 'right',
    date: {
      en: 'Jul 2020 – Jan 2022',
      ja: '2020年7月～2022年1月',
    },
    title: {
      en: 'Crew at McDonald\'s',
      ja: 'マクドナルド クルー',
    },
    content: [
      {
        type: 'paragraph',
        en: 'My main responsibilities involved serving meals at McDonald\'s in both the delivery and kitchen teams. I also took orders at the front counter and operated the register.',
        ja: 'マクドナルドでデリバリーチームとキッチンチームの両方で食事の提供を担当していました。また、フロントカウンターで注文を受け、レジを操作していました。',
      },
    ],
  },
];

const hackathonProjects = [
  {
    id: 'co2ta',
    title: {
      en: 'Business Award: Tokyo Open Data Hackathon 2024 Co2TA',
      ja: 'ビジネス賞 受賞：都知事杯オープンデータ・ハッカソン2024 カーボンテックアシスト',
    },
    media: {
      type: 'image',
      src: '/images/hackathon/2024Hackson_FinalStage_Panel.png',
      alt: 'Hackathon Project Example',
    },
    description: {
      en: 'During hackathons, I collaborated with teams to rapidly prototype solutions in various fields, such as AI-driven applications and web development tools. A highlight was my participation in the XYZ Hackathon, where we developed an app to streamline disaster relief operations.',
      ja: 'ハッカソンでは、AI駆動アプリケーションやWeb開発ツールなど、さまざまな分野でソリューションのプロトタイプを迅速に作成するためにチームと協力しました。注目すべきは、XYZハッカソンへの参加で、災害救援活動を効率化するアプリを開発しました。生成AIを使用したカーボンクレジット獲得支援サービス from Choufu',
    },
    links: [
      {
        href: 'https://github.com/yourusername/hackathon-project',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
      {
        href: 'https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/MTd5VzlKSHE1ZkxrQ0lNY0xpTjdsQT09',
        label: { en: 'View Award Badge', ja: '受賞バッジを見る' },
      },
    ],
  },
  {
    id: 'mynasafety',
    title: {
      en: 'Tokyo Open Data Hackathon MynaSafety',
      ja: '都知事杯オープンデータ・ハッカソン マイナセーフティ',
    },
    media: {
      type: 'iframe',
      src: 'https://www.youtube.com/embed/IHwf933jD2I',
      title: 'YouTube video player',
    },
    description: {
      en: 'During hackathons, I collaborated with teams to rapidly prototype solutions in various fields, such as AI-driven applications and web development tools. A highlight was my participation in the XYZ Hackathon, where we developed an app to streamline disaster relief operations.',
      ja: 'ハッカソンでは、AI駆動アプリケーションやWeb開発ツールなど、さまざまな分野でソリューションのプロトタイプを迅速に作成するためにチームと協力しました。注目すべきは、XYZハッカソンへの参加で、災害救援活動を効率化するアプリを開発しました。災害時の防災データの標準化・連携を進め復興支援。避難所情報統合や被災者DB構築で地域格差を解消する。DX-ReBridge',
    },
    links: [
      {
        href: 'https://github.com/yourusername/hackathon-project',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
];

const softwareProjects = [
  {
    id: 'bonsai-flashcard',
    title: {
      en: 'Bonsai Flashcard App',
      ja: 'Bonsaiフラッシュカードアプリ',
    },
    media: {
      type: 'iframe',
      src: 'https://www.youtube.com/embed/c53d69AU_jk',
      title: 'Bonsai Flashcard App Demo',
    },
    description: [
      {
        en: 'Bonsai is a dynamic study platform tailored for university students, offering a centralized deck of flashcards for each course. The app features a spaced repetition algorithm that helps students optimize their learning process, ensuring they review material at the perfect time for long-term retention.',
        ja: 'Bonsaiは、大学生向けに設計された動的な学習プラットフォームで、各コースに対して集中型のフラッシュカードデッキを提供します。このアプリには、学生が学習プロセスを最適化し、長期的な記憶のために最適なタイミングで教材を復習できるようにする間隔反復アルゴリズムが搭載されています。',
      },
      {
        en: 'Bonsai allows users to track their progress, set reminders, and collaborate by sharing flashcards with their peers. By making studying more efficient and personalized, Bonsai aims to turn learning into a growth journey, helping students succeed one flashcard at a time.',
        ja: 'Bonsaiでは、ユーザーが進捗を追跡したり、リマインダーを設定したり、仲間とフラッシュカードを共有してコラボレーションすることができます。学習をより効率的かつ個別化することで、Bonsaiは学習を成長の旅に変え、学生が1枚のフラッシュカードずつ成功を収めることを目指しています。',
      },
    ],
    tech: 'Swift, Firebase, UIKit, SwiftUI',
  },
  {
    id: 'afl-ranking',
    title: {
      en: 'AFL Game Ranking System',
      ja: 'AFLゲームランキングシステム',
    },
    media: {
      type: 'image',
      src: '/images/project/web/aflgrs.png',
      alt: 'AFL Game Ranking System',
    },
    description: [
      {
        en: 'The AFL Game Ranking System is a dedicated web application that automates the ranking of AFL matches based on match statistics. It helps users analyse team performance, track game trends, and understand season dynamics more efficiently.',
        ja: 'AFLゲームランキングシステムは、試合統計に基づいてAFLの試合を自動ランキングする専用のWebアプリケーションです。ユーザーがチームのパフォーマンスを分析し、試合の傾向を追跡し、シーズンの動態をより効率的に理解できるようにします。',
      },
      {
        en: 'The platform features a clean UI that presents match summaries, rankings, and historical comparisons. I worked on the data processing pipeline, designing algorithms for ranking calculations and building visual insights for users.',
        ja: 'プラットフォームはクリーンなUIを備え、試合の概要、ランキング、過去との比較を表示します。私はランキング計算のアルゴリズム設計と、ユーザー向けの視覚的インサイトを構築するデータ処理パイプラインに取り組みました。',
      },
    ],
    tech: 'React, Node.js, Express, PostgreSQL, JavaScript',
  },
  {
    id: 'techextend',
    title: {
      en: 'TechExtend AI',
      ja: 'TechExtend AI',
    },
    media: {
      type: 'image',
      src: '/images/project/web/techextendai.png',
      alt: 'TechExtend AI Landing Page',
    },
    description: [
      {
        en: 'TechExtend AI is a platform designed to bring advanced AI-powered solutions to users, helping them automate learning content creation and optimize data-driven decision-making.',
        ja: 'TechExtend AIは、ユーザーに高度なAIソリューションを提供し、学習コンテンツの作成を自動化し、データ主導の意思決定を最適化するために設計されたプラットフォームです。',
      },
      {
        en: 'I focused on building AI models for learning apps, integrating tools like OpenAI API for content generation, and designing a sleek, user-friendly interface. The project also involved cloud integration for storing and analyzing data in real-time.',
        ja: '私は、学習アプリ用のAIモデルの構築に注力し、OpenAI APIのようなツールを統合してコンテンツを生成し、洗練されたユーザーフレンドリーなインターフェースを設計しました。このプロジェクトでは、リアルタイムでデータを保存し分析するためのクラウド統合も行いました。',
      },
    ],
    tech: 'React, Tailwind CSS, OpenAI API, Firebase, JavaScript, Python',
    links: [
      {
        href: 'https://techextend.ai/',
        label: { en: 'View Website', ja: 'ウェブサイトを見る' },
      },
    ],
  },
  {
    id: 'quizzo',
    title: {
      en: 'Quizzo.io',
      ja: 'Quizzo.io',
    },
    media: {
      type: 'image',
      src: '/images/project/web/quizzoio.png',
      alt: 'Quizzo.io Dashboard',
    },
    description: [
      {
        en: 'Quizzo.io is an interactive web platform that allows users to create, share, and study with flashcards in a collaborative environment.',
        ja: 'Quizzo.ioは、ユーザーがフラッシュカードを作成、共有し、コラボレーション環境で学習できるインタラクティブなWebプラットフォームです。',
      },
      {
        en: 'Built with an intuitive user interface, Quizzo.io provides features such as spaced repetition for efficient learning, and a customizable study experience. I worked on integrating features for generating flashcards from external content and implemented Firebase for user authentication and database management.',
        ja: '直感的なユーザーインターフェースで構築されたQuizzo.ioは、効率的な学習のための間隔反復やカスタマイズ可能な学習体験などの機能を提供します。外部コンテンツからフラッシュカードを生成する機能を統合し、Firebaseを使用してユーザー認証とデータベース管理を実装しました。',
      },
    ],
    tech: 'React, Firebase, OpenAI API, JavaScript, CSS, Python',
    links: [
      {
        href: 'https://quizzo.io/',
        label: { en: 'View Website', ja: 'ウェブサイトを見る' },
      },
    ],
  },
  {
    id: 'bestidea',
    title: {
      en: 'React, Redux: Best Idea Decider',
      ja: 'React, Redux: ベストアイディアディサイダー',
    },
    media: {
      type: 'image',
      src: '/images/project/web/bestidea.png',
      alt: 'Best Idea Decider Interface',
    },
    description: [
      {
        en: 'CRUD application that helps users decide on an idea that they want to work on.',
        ja: 'ユーザーが取り組みたいアイディアを決定するのに役立つCRUDアプリケーションです。',
      },
      {
        en: 'Hosted on Netlify and used MongoDB as the database.',
        ja: 'Netlifyでホストされ、データベースとしてMongoDBを使用しています。',
      },
    ],
    tech: 'React, Node.js, MongoDB',
    links: [
      {
        href: 'https://github.com/rbarmon/bestideadecider',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'amigos',
    title: {
      en: "Amigo's Barbershop Website Revamp Project",
      ja: 'アミーゴズバーバーショップのウェブサイトリニューアルプロジェクト',
    },
    media: {
      type: 'image',
      src: '/images/project/web/amigos.png',
      alt: "Amigo's Barbershop Project",
    },
    description: [
      {
        en: 'The concept of this project was about analyzing the current website of an Australian small business and considering how I would be able to redesign the website to benefit the business.',
        ja: 'このプロジェクトのコンセプトは、オーストラリアの小規模企業の現在のウェブサイトを分析し、どのようにしてビジネスに役立つウェブサイトをリニューアルできるかを検討することでした。',
      },
      {
        en: 'In the first stage of the project, high-fidelity mockups were created to complete the initial step towards redesigning the website. In the second phase, the target demographic, WCAG accessibility guidelines, and visual design styles were taken into account to create a new redesign that presents a more up-to-date and interactive webpage, still catering to the original target audience.',
        ja: 'プロジェクトの第一段階では、ウェブサイトをリニューアルするための初期ステップとして高精度モックアップが作成されました。第二段階では、対象とする顧客層、WCAGアクセシビリティガイドライン、ビジュアルデザインスタイルを考慮し、最新のインタラクティブなウェブページを提案しつつ、元のターゲットオーディエンスにも対応できる新しいデザインを作成しました。',
      },
    ],
    tech: 'HTML, CSS, JavaScript, Web Browser',
    links: [
      {
        href: 'https://github.com/rbarmon/Barbershop-Website-Redesign',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
      {
        href: 'https://fanciful-syrniki-edf204.netlify.app/',
        label: { en: 'View Website', ja: 'ウェブサイトを見る' },
      },
    ],
  },
];

const prototypeProjects = [
  {
    id: 'figma-hiking',
    title: {
      en: 'Figma Hiking Application Design Project',
      ja: 'Figma ハイキングアプリケーションデザインプロジェクト',
    },
    media: {
      type: 'image',
      src: '/images/project/prototype/figma1.png',
      alt: 'Figma iPhone Screen Hiking App',
    },
    description: [
      {
        en: 'This project focuses on creating a high-fidelity prototype for a hiking app with a strong emphasis on usability and accessibility principles.',
        ja: 'このプロジェクトは、ユーザビリティとアクセシビリティの原則に強く焦点を当てたハイキングアプリの高精度プロトタイプの作成に重点を置いています。',
      },
      {
        en: 'The process started with Data Gathering and User Analysis, where around 50 responses were collected through Google Forms to understand the target audience and identify their pain points. Using this information, a mobile application prototype was designed to help users identify and navigate hiking trails.',
        ja: 'このプロセスはデータ収集とユーザー分析から始まり、Googleフォームを通じて約50件の回答が収集され、ターゲットオーディエンスを理解し、痛点を特定しました。この情報を使用して、ユーザーがハイキングコースを特定し、ナビゲートするのを助けるモバイルアプリのプロトタイプが設計されました。',
      },
      {
        en: "The development involved multiple stages, and the prototype was enhanced with usability improvements, following established design principles such as Shneiderman's 8 Golden Rules. Additionally, accessibility improvements were incorporated, addressing WCAG guideline violations to ensure inclusivity and usability for all users.",
        ja: '開発は複数の段階で行われ、Shneidermanの8つの黄金律などの確立されたデザイン原則に従って、ユーザビリティの改善が行われました。さらに、すべてのユーザーにとってのインクルーシブ性と使いやすさを確保するために、WCAGガイドライン違反に対処したアクセシビリティの改善も組み込まれました。',
      },
    ],
    links: [
      {
        href: 'https://www.figma.com/file/jGUTqJ7jCssTPiCD2HdQhj/High-Fidelity-Prototypes?type=design&node-id=1831-130&mode=design&t=NLi9vZZj8O2bFyam-0',
        label: { en: 'View Figma', ja: 'Figmaを見る' },
      },
    ],
  },
  {
    id: 'bonsai-prototype',
    title: {
      en: 'Bonsai Study App Prototype Design',
      ja: 'Bonsaiスタディアプリ プロトタイプデザイン',
    },
    media: {
      type: 'image',
      src: '/images/project/prototype/figma2.png',
      alt: 'Bonsai Study App Prototype Design',
      style: { maxWidth: '60%' },
    },
    description: [
      {
        en: 'The Bonsai Study App prototype is designed to streamline the learning process for university students by providing an intuitive platform to create, share, and review flashcards. The design focuses on enhancing the study experience through simplicity, accessibility, and user-centric features.',
        ja: 'Bonsaiスタディアプリのプロトタイプは、大学生が直感的なプラットフォームを通じてフラッシュカードを作成、共有、レビューできるように設計されており、学習プロセスを効率化します。デザインは、シンプルさ、アクセシビリティ、ユーザー中心の機能に重点を置いて、学習体験を向上させます。',
      },
      {
        en: 'Accessibility enhancements were also implemented to ensure full compliance with WCAG guidelines, creating an inclusive experience for all users. The prototype delivers a seamless user experience across devices, balancing both functionality and aesthetic appeal to make study sessions more efficient and engaging.',
        ja: 'WCAGガイドラインに完全準拠するためにアクセシビリティの向上も実施され、すべてのユーザーに包括的な体験を提供します。このプロトタイプは、デバイス全体でシームレスなユーザーエクスペリエンスを提供し、機能性と美的魅力をバランスよく保ちながら、学習セッションをより効率的で魅力的にします。',
      },
      {
        en: 'This prototype lays the groundwork for a fully developed study app designed to improve student learning outcomes.',
        ja: 'このプロトタイプは、学生の学習成果を向上させることを目的とした、完全に開発されたスタディアプリの基盤を築きます。',
      },
    ],
  },
];

const technicalProjects = [
  {
    id: 'python-algorithms',
    title: {
      en: 'Python Algorithms Case Studies',
      ja: 'Pythonアルゴリズムのケーススタディ',
    },
    media: {
      type: 'image',
      src: '/images/project/technical/pythonalgos.png',
      alt: 'Python Algorithms Case Studies',
    },
    description: [
      {
        en: 'Explored algorithm design and analysis using Python, including sorting algorithms, graph traversals, and problem-solving strategies that balance performance with readability.',
        ja: 'ソートアルゴリズム、グラフ探索、パフォーマンスと可読性のバランスを取る問題解決戦略など、Pythonを使用したアルゴリズム設計と分析を探求しました。',
      },
      {
        en: 'Developed case studies that compared algorithm efficiency, focusing on Big-O notation and practical runtime considerations.',
        ja: 'ビッグオー記法と実際の実行時間を重視し、アルゴリズムの効率性を比較するケーススタディを開発しました。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Python-Algorithms',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'database-sql',
    title: {
      en: 'Database/SQL Case Studies',
      ja: 'データベース/SQLケーススタディ',
    },
    media: {
      type: 'image',
      src: '/images/project/technical/sql.png',
      alt: 'Database SQL Case Studies',
    },
    description: [
      {
        en: 'Project 1: Transforms a case study info into a comprehensive conceptual model for the initial database design. Further information refines it into a sound Oracle implementation.',
        ja: 'プロジェクト1：ケーススタディの情報を包括的な概念モデルに変換し、初期データベース設計を行います。さらに詳細な情報を元に、Oracle実装へと改良します。',
      },
      {
        en: 'Project 2: Implements SQL Database Creation/Modification using Oracle RDBMS. Creates a small database based on the logical model from the case study and inserts relevant data.',
        ja: 'プロジェクト2：Oracle RDBMSを使用してSQLデータベースの作成/変更を実施。ケーススタディの論理モデルに基づいて小規模なデータベースを作成し、関連データを挿入します。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Database-SQL',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'java-roguelike',
    title: {
      en: 'Java Rogue-Like Game',
      ja: 'Javaローグライクゲーム',
    },
    media: {
      type: 'image',
      src: '/images/project/technical/javaoop.png',
      alt: 'Java OOP Pokemon Game Screen',
    },
    description: [
      {
        en: "This is a Pokemon-themed 'rogue-like' game where players can control a character to catch and battle Pokemon. It was created collaboratively using a preexisting game engine as the foundation.",
        ja: 'これは、プレイヤーがキャラクターを操作してポケモンを捕まえたりバトルしたりできるポケモンをテーマにした「ローグライク」ゲームです。既存のゲームエンジンを基盤として共同で作成されました。',
      },
      {
        en: 'The project aimed to extend the base game\'s core functionality without altering its codebase, ensuring flexibility. Additionally, it followed the Single Responsibility Principle by assigning specific responsibilities to classes, improving code organization and maintainability.',
        ja: 'このプロジェクトは、コードベースを変更せずに基本ゲームの機能を拡張し、柔軟性を確保することを目的としていました。また、単一責任の原則に従い、クラスに特定の責任を割り当てることで、コードの整理と保守性を向上させました。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Java_OOP_Pokemon_Game',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
];

const dataScienceProjects = [
  {
    id: 'tableau-airline',
    title: {
      en: 'Tableau Data Visualization: Airline Satisfaction',
      ja: 'Tableauデータビジュアライゼーション: 航空会社の満足度',
    },
    media: {
      type: 'image',
      src: '/images/project/data/tableau.png',
      alt: 'Tableau Data Visualisation',
    },
    description: [
      {
        en: 'The Airline Industry had been experiencing a consistent rise in the annual number of flights worldwide since the early 2000s, reaching 38.9 million in 2019. However, the onset of the COVID-19 Pandemic, led to a significant drop in flights to 16.9 million in 2020 due to various factors such as flight restrictions, fear, and uncertainty.',
        ja: '航空業界は2000年代初頭から世界的に年間のフライト数が一貫して増加しており、2019年には3,890万回に達していました。しかし、COVID-19パンデミックの発生により、2020年にはフライト数が1,690万回に大幅に減少しました。これは、フライト制限や恐怖、不確実性などの要因によるものです。',
      },
      {
        en: 'This visualization intends to explore Airline Passenger Satisfaction as a potential point of analysis in order to tackle regaining loyal passengers. This approach could potentially be relevant to various sectors within the hospitality industry.',
        ja: 'このビジュアライゼーションは、忠実な乗客を取り戻すための分析の一環として航空会社の乗客満足度を探ることを目的としています。このアプローチは、ホスピタリティ業界のさまざまな分野にも関連する可能性があります。',
      },
    ],
    links: [
      {
        href: 'https://public.tableau.com/app/profile/rian.barrett/viz/PassengerSatisfaction_16936553671750/Dashboard1',
        label: { en: 'View Tableau', ja: 'Tableauを見る' },
      },
    ],
  },
  {
    id: 'vega-lite-life',
    title: {
      en: 'Vega Lite Data Visualisation: Japanese Life Expectancy',
      ja: 'Vega Lite データビジュアライゼーション: 日本の平均寿命',
    },
    media: {
      type: 'image',
      src: '/images/project/data/vegalite.png',
      alt: 'Vega Lite Data Visualisation',
      style: { maxWidth: '60%' },
    },
    description: [
      {
        en: 'In 2020, a Happiness Ranking survey was conducted across Japan, providing valuable insights into what might contribute to happiness in each prefecture. This visualization explores the relationship between life expectancy and happiness scores, revealing trends that can inform regional policy initiatives.',
        ja: '2020年、日本全国で幸福度ランキング調査が実施され、各都道府県で幸福に寄与する要素について貴重な洞察が得られました。このビジュアライゼーションは、平均寿命と幸福度の関係を探り、地域政策の取り組みに役立つ傾向を明らかにします。',
      },
      {
        en: 'The interactive charts allow users to drill down into prefecture-level data, comparing demographic factors and economic indicators. By combining multiple datasets, the dashboard helps highlight areas that may benefit from focused public health initiatives.',
        ja: 'インタラクティブなチャートを使用して、都道府県レベルのデータを掘り下げ、人口統計や経済指標を比較できます。複数のデータセットを組み合わせることで、公衆衛生活動の強化が必要な地域を明らかにします。',
      },
    ],
    links: [
      {
        href: 'https://rbarmon.github.io/FIT3179_Data_Visualisation_II/',
        label: { en: 'View Website', ja: 'ウェブサイトを見る' },
      },
      {
        href: 'https://github.com/rbarmon/FIT3179_Data_Visualisation_II',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'data-science-modelling',
    title: {
      en: 'Data Science Modelling Case Studies',
      ja: 'データサイエンスモデリングケーススタディ',
    },
    media: {
      type: 'image',
      src: '/images/project/Untitled document.png',
      alt: 'Data Science Modelling',
    },
    description: [
      {
        en: 'I expanded my knowledge of statistical methods and their applications in data analysis. I engaged in hypothesis testing, confidence interval estimation, and explored penalized regression models to improve model accuracy.',
        ja: '統計手法とそのデータ分析への応用に関する知識を深めました。仮説検定、信頼区間推定に取り組み、モデルの精度を向上させるためにペナルティ付き回帰モデルを探求しました。',
      },
      {
        en: 'Working on simulation-based statistical methods and unsupervised learning algorithms like clustering helped me understand how to make data-driven predictions and model complex systems. These hands-on experiences strengthened my ability to build and evaluate robust models.',
        ja: 'シミュレーションベースの統計手法やクラスタリングなどの教師なし学習アルゴリズムに取り組むことで、データ駆動型の予測を行い、複雑なシステムをモデル化する方法を理解しました。これらの実践的な経験は、堅牢なモデルを構築し評価する能力を強化しました。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Data-Science-Related',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'business-intelligence',
    title: {
      en: 'Business Intelligence Data Warehousing Case Studies',
      ja: 'ビジネスインテリジェンス データウェアハウジングケーススタディ',
    },
    media: {
      type: 'image',
      src: '/images/project/Untitled document.png',
      alt: 'Business Intelligence Data Warehousing',
    },
    description: [
      {
        en: 'I applied business intelligence concepts to real-world scenarios, learning to design and implement data warehousing solutions.',
        ja: 'ビジネスインテリジェンスの概念を実際のシナリオに適用し、データウェアハウスの設計と実装を学びました。',
      },
      {
        en: 'I worked with star schemas, temporal data, and multi-fact designs to create efficient, scalable data storage systems. I also gained practical experience in data cleaning and developed a deep understanding of OLAP for data analytics. This course taught me how to transform raw business data into structured insights that support decision-making processes.',
        ja: 'スタースキーマ、時系列データ、複数のファクト設計を使用して、効率的でスケーラブルなデータストレージシステムを作成しました。また、データクリーニングの実務経験を積み、データ分析のためのOLAPに関する深い理解を得ました。このコースでは、生のビジネスデータを構造化されたインサイトに変換し、意思決定プロセスを支援する方法を学びました。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Data-Science-Related',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'data-analytics',
    title: {
      en: 'Data Analytics',
      ja: 'データ分析',
    },
    media: {
      type: 'image',
      src: '/images/project/Untitled document.png',
      alt: 'Data Analytics',
    },
    description: [
      {
        en: 'Dived deeper into data visualization, regression modeling, and classification techniques. I worked on case studies that involved handling dirty and clean data, ensuring data quality before analysis.',
        ja: 'データの可視化、回帰モデリング、分類技術をさらに深く学びました。データの品質を確保するために、汚れたデータときれいなデータの処理を含むケーススタディに取り組みました。',
      },
      {
        en: 'Techniques like decision trees, Naïve Bayes classifiers, and ensemble methods were particularly interesting as I applied them to real-world datasets. Toward the end of the course, I explored advanced topics such as text and network analysis, providing a well-rounded understanding of modern data science methodologies.',
        ja: '意思決定木、ナイーブベイズ分類器、アンサンブル法などの技術が特に興味深く、それらを実際のデータセットに適用しました。コースの終盤には、テキスト分析やネットワーク分析などの高度なトピックにも取り組み、現代のデータサイエンス手法に対する幅広い理解を得ました。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Data-Science-Related',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
  {
    id: 'data-science-fundamentals',
    title: {
      en: 'Data Science Fundamentals',
      ja: 'データサイエンスの基本',
    },
    media: {
      type: 'image',
      src: '/images/project/Untitled document.png',
      alt: 'Data Science Fundamentals',
    },
    description: [
      {
        en: 'I gained hands-on experience with core data science concepts, focusing on Python and R for data wrangling and visualization. I explored diverse datasets, employing regression analysis, classification, and clustering techniques to uncover meaningful insights.',
        ja: 'PythonとRを使用してデータ操作や可視化に焦点を当て、データサイエンスの基本概念を実践的に学びました。さまざまなデータセットを探索し、回帰分析、分類、クラスタリング技術を使用して意味のあるインサイトを見つけました。',
      },
      {
        en: 'Additionally, I tackled big data processing and discussed challenges in managing large datasets. This foundation allowed me to understand the full lifecycle of data science projects—from sourcing and cleaning data to performing complex analyses.',
        ja: 'さらに、ビッグデータ処理に取り組み、大規模データセットの管理に関する課題について議論しました。この基盤により、データの取得やクリーニングから複雑な分析の実行まで、データサイエンスプロジェクトの全ライフサイクルを理解することができました。',
      },
    ],
    links: [
      {
        href: 'https://github.com/rbarmon/Data-Science-Related',
        label: { en: 'View GitHub', ja: 'GitHubを表示' },
      },
    ],
  },
];

const SectionHeading = ({ title }) => (
  <div className="section-title">
    <TranslatedText as="h2" en={title.en} ja={title.ja} />
  </div>
);

const ProjectCard = ({ project, isDarkMode }) => (
  <div className="industrial-panel" style={{ marginBottom: '2rem' }}>
    <div className="row">
      <div className="col-lg-6 col-12">
        <TranslatedText as="h4" style={{ marginBottom: '1.5rem' }} en={project.title.en} ja={project.title.ja} />
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-lg-6 col-12 mb-lg-0 mb-4">
            {project.media.type === 'iframe' ? (
              <iframe
                width="100%"
                height="315"
                src={project.media.src}
                title={project.media.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            ) : (
              <img
                src={project.media.src}
                className="img-fluid"
                alt={project.media.alt}
                style={{ ...project.media.style, borderRadius: '8px' }}
              />
            )}
          </div>
          <div className="col-lg-5 col-12 m-auto">
            {project.description?.map((paragraph, index) => (
              <TranslatedText
                key={index}
                as="p"
                en={paragraph.en}
                ja={paragraph.ja}
              />
            ))}
            {project.tech && (
              <p style={{ color: 'var(--primary-cyan)', fontFamily: 'var(--font-display)', fontWeight: '600' }}>
                Tech: {project.tech}
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  className="btn-secondary"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TranslatedText en={link.label.en} ja={link.label.ja} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TimelineItem = ({ item }) => (
  <div className="timeline-item">
    <div className="timeline-content">
      <div className="timeline-date">
        <TranslatedText en={item.date.en} ja={item.date.ja} />
      </div>
      <TranslatedText as="h3" style={{ marginBottom: '1rem' }} en={item.title.en} ja={item.title.ja} />
      {item.content.map((block, index) => {
        if (block.type === 'list') {
          return (
            <ul key={index} style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              {block.items.map((entry) => (
                <TranslatedText
                  key={entry.en}
                  as="li"
                  style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}
                  en={entry.en}
                  ja={entry.ja}
                />
              ))}
            </ul>
          );
        }
        return (
          <TranslatedText
            key={index}
            as="p"
            style={{ marginBottom: '1rem' }}
            en={block.en}
            ja={block.ja}
          />
        );
      })}
      {item.links?.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
          style={{ marginTop: '1rem', display: 'inline-block' }}
        >
          <TranslatedText en={link.label.en} ja={link.label.ja} />
        </a>
      ))}
    </div>
  </div>
);

const HackathonCard = ({ project }) => (
  <div className="industrial-panel" style={{ marginBottom: '2rem' }}>
    <div className="row">
      <div className="col-lg-6 col-12">
        <TranslatedText as="h4" style={{ marginBottom: '1.5rem' }} en={project.title.en} ja={project.title.ja} />
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-lg-6 col-12 mb-lg-0 mb-4">
            {project.media.type === 'iframe' ? (
              <iframe
                width="100%"
                height="315"
                src={project.media.src}
                title={project.media.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            ) : (
              <img
                src={project.media.src}
                className="img-fluid"
                alt={project.media.alt}
                style={{ borderRadius: '8px' }}
              />
            )}
          </div>
          <div className="col-lg-5 col-12 m-auto">
            <TranslatedText as="p" en={project.description.en} ja={project.description.ja} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  className="btn-secondary"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TranslatedText en={link.label.en} ja={link.label.ja} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TechIcons = () => (
  <div className="tech-grid">
    <i className="devicon-javascript-plain tech-icon" title="JavaScript"></i>
    <i className="devicon-react-original tech-icon" title="React.js"></i>
    <i className="devicon-python-plain tech-icon" title="Python"></i>
    <i className="devicon-java-plain tech-icon" title="Java"></i>
    <i className="devicon-html5-plain tech-icon" title="HTML5"></i>
    <i className="devicon-css3-plain tech-icon" title="CSS3"></i>
    <i className="devicon-typescript-plain tech-icon" title="TypeScript"></i>
    <i className="devicon-swift-plain tech-icon" title="Swift"></i>
    <i className="devicon-postgresql-plain tech-icon" title="SQL (PostgreSQL)"></i>
    <i className="devicon-firebase-plain tech-icon" title="Firebase"></i>
    <i className="devicon-docker-plain tech-icon" title="Docker"></i>
    <i className="devicon-figma-plain tech-icon" title="Figma"></i>
    <i className="devicon-tableau-plain tech-icon" title="Tableau"></i>
  </div>
);

function MainPage() {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProgressiveFP, setShowProgressiveFP] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleProgressiveComplete = () => {
    setShowProgressiveFP(false);
    setShowMainContent(true);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ja' : 'en'));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const logoSrc = isDarkMode
    ? '/images/logo/black_favicon_nonbg.png'
    : '/images/logo/white_favicon_nonbg.png';

  const aboutParagraphs = useMemo(
    () => [
      {
        en: "Welcome to my portfolio website!",
        ja: '私のポートフォリオウェブサイトへようこそ！',
      },
      {
        en: 'I am a Bachelor of Computer Science student at Monash University.',
        ja: 'モナッシュ大学でコンピュータサイエンスの学士号を取得しています。',
      },
      {
        en: "I'm a computer Science student passionate about the intersection of Software Development and Data Science, and how these fields can come together to create powerful and impactful projects. At university, I studied Computer Science, Data Science, and Software Development with the intention of using my experience to develop products and perform analysis.",
        ja: '私は学生時代にソフトウェア開発に力を入れてきました。大学でコンピュータサイエンス、データサイエンス、そしてソフトウェア開発を勉強し、これまでの経験を活かし製品を開発し、その分析を行うつもりで学んできました。',
      },
      {
        en: 'Currently, as a full-stack engineer, I utilize my experience in algorithms, Python, and React to communicate information clearly through data analysis and visualization, building engaging and user-friendly web experiences.',
        ja: '現在、フルスタックエンジニアとしての経験、アルゴリズム、Python、Reactのスキルを活かし、データ分析や可視化を通じて情報を分かりやすく伝え、魅力的でユーザーフレンドリーなウェブ体験を構築しています。',
      },
    ],
    []
  );

  return (
    <LanguageContext.Provider value={{ language }}>
      {/* Progressive FP Effect */}
      {showProgressiveFP && (
        <ProgressiveFP onComplete={handleProgressiveComplete} />
      )}

      {/* Navigation - shows after progressive effect */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        logoSrc={logoSrc}
        style={{
          opacity: showMainContent ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />

      {/* Spacer for progressive effect scroll */}
      <div style={{
        height: showProgressiveFP ? '100vh' : '0vh',
        transition: 'height 0.8s ease-in-out'
      }}></div>

      <main style={{
        opacity: showMainContent ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out 0.3s'
      }}>
        <section className="hero-section" id="about">
          <VideoBackground />
          <div className="hero-background" aria-hidden="true">
            <div className="animated-grid"></div>
            <div className="data-flow"></div>
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="row">
              <div className="col-lg-7 col-md-12 col-12 d-flex align-items-center">
                <div className="glass-panel hero-content-panel" style={{ padding: '3rem', width: '100%' }}>
                  <TranslatedText as="h1" className="hero-title" en="Hi, I'm Rian" ja="Hi, I'm Rian" />
                  {aboutParagraphs.map((paragraph) => (
                    <TranslatedText
                      key={paragraph.en}
                      as="p"
                      en={paragraph.en}
                      ja={paragraph.ja}
                    />
                  ))}
                  <TranslatedText as="p" en="Tech Stack:" ja="技術スタック:" />
                  <TechIcons />
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <a
                      href="/resume/resume.pdf"
                      className="btn-primary"
                      download="resume.pdf"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <i className="uil uil-file-alt"></i>
                      Download Resume
                    </a>
                    <a
                      className="btn-secondary"
                      href="https://github.com/rbarmon"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-12">
                <div className="glass-panel hero-image-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                  <img src="/images/profile/big/profile1.png" className="img-fluid" alt="Profile" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <SectionHeading title={{ en: 'Work Experience', ja: '職歴' }} />
            <div className="timeline">
              {timelineItems.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="oss-hackathon">
          <div className="container">
            <SectionHeading title={{ en: 'Open Source & Hackathon Projects', ja: 'オープンソース・ハッカソンプロジェクト' }} />
            {hackathonProjects.map((project) => (
              <HackathonCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="section" id="web">
          <div className="container">
            <SectionHeading title={{ en: 'Software Development Projects', ja: 'ソフトウェア開発プロジェクト' }} />
            {softwareProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

        <section className="section" id="prototype">
          <div className="container">
            <SectionHeading title={{ en: 'Prototype Design Projects', ja: 'プロトタイプデザインプロジェクト' }} />
            {prototypeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

        <section className="section" id="technical">
          <div className="container">
            <SectionHeading title={{ en: 'Technical Projects', ja: '技術プロジェクト' }} />
            {technicalProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

        <section className="section" id="datascience">
          <div className="container">
            <SectionHeading title={{ en: 'Data Science/Analytics Projects', ja: 'データサイエンス・アナリティクスプロジェクト' }} />
            {dataScienceProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>
      </main>

      <footer className="glass-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12 me-auto mb-4">
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Resume</h5>
              <a
                href="/resume/resume.pdf"
                className="btn-primary"
                download="resume.pdf"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}
              >
                <i className="uil uil-file-alt"></i>
                Download Resume
              </a>
            </div>

            <div className="col-lg-2 col-12 mx-auto my-lg-0 my-4">
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Sections</h5>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <TranslatedText en="About" ja="紹介" />
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#work" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <TranslatedText en="Work Exp." ja="職歴" />
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#web" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <TranslatedText en="Software Projects" ja="ソフトウェア" />
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#prototype" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <TranslatedText en="Prototype Design" ja="プロトタイプデザイン" />
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#technical" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <TranslatedText en="Technical Projects" ja="技術プロジェクト" />
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#datascience" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <TranslatedText en="Data Science" ja="データサイエンス" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-12">
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Contact Details</h5>
              <p>
                <a href="mailto:rbar0032@student.monash.edu" style={{ color: 'var(--primary-cyan)', textDecoration: 'none' }}>
                  Email: rbar0032@student.monash.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </LanguageContext.Provider>
  );
}

export default MainPage;
