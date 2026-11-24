import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeDial from '@/components/ThemeDial';
import ScrollProgress from '@/components/ScrollProgress';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'M Muzamil | Luxury Men & Women Clothing | Muzaffargarh, Pakistan',
  description:
    'M Muzamil is a premier clothing brand based in Muzaffargarh, Pakistan. Explore our signature Pima cotton T-shirts, Egyptian Giza linen shirts, bespoke festive kurtas, and private encrypted gift deliveries nationwide.',
  keywords: [
    'M Muzamil',
    'Clothing Brand Muzaffargarh',
    'Pakistan Menswear',
    'Pima Cotton T-Shirts Pakistan',
    'Handloom Kurta Muzaffargarh',
    'Send Private Gift Pakistan',
    'Luxury Clothing Multan Muzaffargarh',
  ],
  authors: [{ name: 'M Muzamil', url: 'https://mmuzamil.vercel.app' }],
  openGraph: {
    title: 'M Muzamil | Haute Couture & Sartorial Wear',
    description: 'Crafted with passion in Muzaffargarh, Pakistan. Tailored fit, luxury fabrics, and private gift messages.',
    type: 'website',
    locale: 'en_PK',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col relative selection:bg-primary/20 selection:text-primary">
        {/* Top Sticky Navigation */}
        <Navbar />

        {/* Dynamic Color Theme Dial (Right edge on desktop, floating button on mobile) */}
        <ThemeDial />

        {/* Scroll Progress Vertical Tracker */}
        <ScrollProgress />

        {/* Main Content Viewport */}
        <main className="flex-1 pt-20 sm:pt-24">{children}</main>

        {/* Brand Footer */}
        <Footer />
      </body>
    </html>
  );
}
