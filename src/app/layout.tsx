import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} - ${portfolioData.personal.title}`,
  description: `Academic and professional portfolio of ${portfolioData.personal.name}`,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ marginTop: '4rem', minHeight: 'calc(100vh - 8rem)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
