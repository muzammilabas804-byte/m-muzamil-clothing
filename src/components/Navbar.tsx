'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gift, MessageCircle, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/gift', label: 'Send a Gift', badge: 'Private & Secure' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm border-b border-zinc-200/70 dark:border-zinc-800 py-3'
          : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/80 dark:to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Origin Tag */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-amber-400 flex items-center justify-center font-serif text-2xl font-bold shadow-md border border-amber-500/30 group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-wider text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">
                M MUZAMIL
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                Muzaffargarh, Pakistan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.href === '/gift' && <Gift className="w-3.5 h-3.5 text-primary" />}
                    {link.label}
                  </span>

                  {link.badge && (
                    <span className="absolute -top-1 right-1 text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {link.badge}
                    </span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--primary)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp Call to Action */}
            <a
              href="https://wa.me/923055177531?text=Assalam-o-Alaikum%20M%20Muzamil!%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20clothing%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--text-contrast)',
              }}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Order</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.href === '/gift' ? <Gift className="w-4 h-4 text-primary" /> : null}
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                <a
                  href="https://wa.me/923055177531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold shadow"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-contrast)',
                  }}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (0305 5177531)</span>
                </a>
                <div className="text-center text-[11px] text-zinc-500">
                  Muzaffargarh, Punjab, Pakistan
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
