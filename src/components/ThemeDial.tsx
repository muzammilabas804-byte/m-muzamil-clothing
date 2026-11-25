'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Sparkles, Shirt, Check } from 'lucide-react';
import { THEME_PRESETS, DEFAULT_THEME, generateThemeFromHex, applyThemeToDOM } from '@/lib/theme';
import { ColorTheme } from '@/types';

const STORAGE_KEY = 'm_muzamil_active_theme';

export default function ThemeDial() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(DEFAULT_THEME);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [customHex, setCustomHex] = useState(DEFAULT_THEME.primary);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  // Initialize theme from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme) as ColorTheme;
        setCurrentTheme(parsed);
        setCustomHex(parsed.primary);
        applyThemeToDOM(parsed);
      } else {
        applyThemeToDOM(DEFAULT_THEME);
      }
    } catch (e) {
      applyThemeToDOM(DEFAULT_THEME);
    }
  }, []);

  // Scroll listener: Hide completely as soon as user scrolls down past the hero (120px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    setCustomHex(theme.primary);
    applyThemeToDOM(theme);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch (e) {
      console.warn('Could not save theme:', e);
    }
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomHex(hex);
    const dynamicTheme = generateThemeFromHex(hex);
    setCurrentTheme(dynamicTheme);
    applyThemeToDOM(dynamicTheme);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dynamicTheme));
    } catch (e) {
      console.warn('Could not save custom theme:', e);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP COMPACT THEME PANEL (ONLY AT TOP OF PAGE, HIDES ON SCROLL) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {!isScrolledDown && (
          <motion.aside
            key="desktop-compact-dial"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex fixed right-4 top-28 z-40 flex-col items-center select-none"
            aria-label="Color Palette Selector"
          >
            {/* Sleek, Compact Vertical Glass Ribbon */}
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 p-2 flex flex-col items-center gap-2 transition-all">
              
              {/* Header Icon */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm mb-0.5"
                style={{ backgroundColor: currentTheme.primary }}
                title={`Active: ${currentTheme.name}`}
              >
                <Palette className="w-3.5 h-3.5" />
              </div>

              {/* Tiny Label */}
              <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                Color
              </span>

              {/* Compact Vertical Stack of Color Beads */}
              <div className="flex flex-col gap-1.5 py-0.5">
                {THEME_PRESETS.slice(0, 6).map((preset) => {
                  const isSelected = currentTheme.id === preset.id;
                  return (
                    <div key={preset.id} className="relative group/bead flex items-center">
                      <button
                        onClick={() => selectTheme(preset)}
                        onMouseEnter={() => setShowTooltip(preset.name)}
                        onMouseLeave={() => setShowTooltip(null)}
                        style={{ backgroundColor: preset.primary }}
                        className={`w-5 h-5 rounded-full transition-transform cursor-pointer shadow-sm ${
                          isSelected
                            ? 'scale-125 ring-2 ring-offset-2 ring-zinc-900 dark:ring-white ring-offset-white dark:ring-offset-zinc-900'
                            : 'hover:scale-125 opacity-85 hover:opacity-100'
                        }`}
                        title={preset.name}
                        aria-label={`Select ${preset.name} color theme`}
                      />

                      {/* Tooltip on hover */}
                      <div className="absolute right-full mr-2.5 px-2 py-1 rounded-md bg-zinc-900 text-white text-[10px] whitespace-nowrap shadow-lg border border-zinc-700 pointer-events-none opacity-0 group-hover/bead:opacity-100 transition-opacity z-50">
                        {preset.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-zinc-200 dark:border-zinc-800 my-0.5" />

              {/* Mini Custom Color Picker Input */}
              <div className="relative group/custom flex items-center justify-center">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-5 h-5 rounded-full cursor-pointer border-0 p-0 bg-transparent overflow-hidden"
                  title="Choose custom color"
                />
                <div className="absolute right-full mr-2.5 px-2 py-1 rounded-md bg-zinc-900 text-white text-[10px] whitespace-nowrap shadow-lg border border-zinc-700 pointer-events-none opacity-0 group-hover/custom:opacity-100 transition-opacity z-50">
                  Custom Color
                </div>
              </div>

            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MOBILE COMPACT FLOATING BUTTON (HIDES ON SCROLL DOWN)          */}
      {/* ============================================================== */}
      <AnimatePresence>
        {!isScrolledDown && (
          <motion.div
            key="mobile-compact-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="lg:hidden fixed bottom-6 right-4 z-40"
          >
            <button
              onClick={() => setIsOpenMobile(true)}
              style={{ backgroundColor: currentTheme.primary }}
              className="w-10 h-10 rounded-full text-white shadow-xl flex items-center justify-center ring-2 ring-white/80 dark:ring-zinc-900/80 active:scale-95 transition-transform"
              aria-label="Change Color Theme"
            >
              <Palette className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Modal Drawer */}
      <AnimatePresence>
        {isOpenMobile && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenMobile(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-sm bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl p-5 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Palette className="w-3 h-3" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Theme Color
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpenMobile(false)}
                  className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Swatches Grid */}
              <div className="py-4">
                <div className="grid grid-cols-2 gap-2">
                  {THEME_PRESETS.slice(0, 6).map((preset) => {
                    const isSelected = currentTheme.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          selectTheme(preset);
                          setIsOpenMobile(false);
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-primary ring-1 ring-primary bg-primary/5'
                            : 'border-zinc-200 dark:border-zinc-800'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Picker */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Custom Shade</span>
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
