import type { Metadata } from 'next';
import Script from 'next/script'; // Import Script
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export const metadata: Metadata = {
  metadataBase: new URL('https://hrakib.me'),
  title: {
    default: `${portfolioData.personal.name} - ${portfolioData.personal.title}`,
    template: `%s | ${portfolioData.personal.name}`,
  },
  description: `Academic and professional portfolio of ${portfolioData.personal.name}`,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: `${portfolioData.personal.name}`,
    description: `Academic and professional portfolio of ${portfolioData.personal.name}`,
    url: 'https://hrakib.me',
    siteName: `${portfolioData.personal.name}`,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = 'G-CKM6SYBMXN'; // Replace with your actual ID

  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; img-src 'self' https://www.google-analytics.com data:;"
        />
      </head>
      <body>
        <Header />
        <main style={{ marginTop: '4rem', minHeight: 'calc(100vh - 8rem)' }}>
          {children}
        </main>
        <Footer />

        {/* Google Analytics Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
