import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rian Kawahara | Software Engineer',
  description: "Rian Kawahara's portfolio highlighting software engineering, design, and data science projects.",
  openGraph: {
    type: 'website',
    url: 'https://rbarmon.github.io/',
    title: 'Rian Kawahara | Software Engineer',
    description: 'Software engineer building AI-powered tools. Based in Tokyo.',
    images: [{ url: 'https://rbarmon.github.io/images/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rian Kawahara | Software Engineer',
    description: 'Software engineer building AI-powered tools. Based in Tokyo.',
    images: ['https://rbarmon.github.io/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTTXRNl2R+XHCA0nVddOZ1D6ttuPAHyBs+K6TfGsZ3jAC5vVsQt1zArQXdN6Vq776vj3P8v4Yg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/devicon@2.14.0/devicon.min.css"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
