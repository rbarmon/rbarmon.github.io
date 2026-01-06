'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ja';
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ja'>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ja' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

interface TranslatedTextProps {
  en: string;
  ja: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: unknown;
}

export function TranslatedText({
  en,
  ja,
  as: Component = 'span',
  className = '',
  ...rest
}: TranslatedTextProps) {
  const { language } = useLanguage();
  const textContent = language === 'ja' ? ja || en : en;
  return (
    <Component className={className} {...rest}>
      {textContent}
    </Component>
  );
}
