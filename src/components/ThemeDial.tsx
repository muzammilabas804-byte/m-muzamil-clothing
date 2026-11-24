'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, RotateCw, Check, Sparkles, Shirt } from 'lucide-react';
import { THEME_PRESETS, DEFAULT_THEME, generateThemeFromHex, applyThemeToDOM } from '@/lib/theme';
import { ColorTheme } from '@/types';

const STORAGE_KEY = 'm_muzamil_active_theme';

export default function ThemeDial() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(DEFAULT_THEME);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [customHex, setCustomHex] = useState(DEFAULT_THEME.primary);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

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
        return;
      }
    } catch (e) {
      console.warn('Could not read saved theme:', e);
    }
    applyThemeToDOM(DEFAULT_THEME);
  }, []);

  const selectTheme = (theme: ColorTheme, index?: number) => {
    setCurrentTheme(theme);
    setCustomHex(theme.primary);
    applyThemeToDOM(theme);
    if (typeof index === 'number') {
      // Rotate the dial to bring selected item to the center-left
      setRotationAngle(-index * (360 / THEME_PRESETS.length));
    }
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

  // Garment SVG icons for around the dial
  const garments = [
    { label: 'Silk Kurta', type: 'kurta' },
    { label: 'Oxford Shirt', type: 'shirt' },
    { label: 'Linen Tee', type: 'tee' },
    { label: 'Velvet Wear', type: 'kurti' },
    { label: 'Fleece Hoodie', type: 'hoodie' },
    { label: 'Obsidian Suit', type: 'suit' },
    { label: 'Crimson Kurta', type: 'kurta' },
    { label: 'Olive Utility', type: 'shirt' },
  ];

  const dialRadius = 88; // radius in px for desktop circular wheel

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP FLOATING COLOR THEME DIAL (FIXED ON RIGHT SIDE)        */}
      {/* ============================================================== */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center select-none">
        <div className="relative group">
          {/* Main Dial Container with Subtle Glass Effect */}
          <div className="relative w-56 h-56 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-2xl border border-zinc-200/80 dark:border-zinc-800 p-2 flex items-center justify-center transition-all duration-300 hover:shadow-glow">
            
            {/* Outer Subtle Orbit Ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 pointer-events-none" />

            {/* Rotating Wheel of Clothing Items */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: rotationAngle }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              {THEME_PRESETS.map((preset, index) => {
                const angle = (index * (360 / THEME_PRESETS.length) * Math.PI) / 180;
                const x = Math.round(dialRadius * Math.cos(angle));
                const y = Math.round(dialRadius * Math.sin(angle));
                const isSelected = currentTheme.id === preset.id;

                return (
                  <motion.button
                    key={preset.id}
                    onClick={() => selectTheme(preset, index)}
                    onMouseEnter={() => setShowTooltip(preset.name)}
                    onMouseLeave={() => setShowTooltip(null)}
                    style={{
                      left: `calc(50% + ${x}px - 16px)`,
                      top: `calc(50% + ${y}px - 16px)`,
                      backgroundColor: preset.primary,
                    }}
                    whileHover={{ scale: 1.35 }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-shadow cursor-pointer ${
                      isSelected ? 'ring-4 ring-white dark:ring-zinc-900 shadow-lg scale-110' : 'opacity-85 hover:opacity-100'
                    }`}
                    title={`${preset.name} (${preset.garmentName})`}
                  >
                    <Shirt className="w-4 h-4 drop-shadow-sm" />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-zinc-900" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Center Hub Indicator */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-900 dark:bg-zinc-950 text-white flex flex-col items-center justify-center p-2 text-center shadow-inner border border-zinc-700/50">
              <Sparkles className="w-4 h-4 text-amber-400 mb-0.5 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-300">
                Theme Dial
              </span>
              <span className="text-[9px] font-medium text-amber-400 truncate max-w-[80px]">
                {currentTheme.name}
              </span>
              <div
                className="w-4 h-1.5 rounded-full mt-1 border border-white/20"
                style={{ backgroundColor: currentTheme.primary }}
              />
            </div>
          </div>

          {/* Tooltip on Hover */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs whitespace-nowrap shadow-xl border border-zinc-700 pointer-events-none"
              >
                <span className="font-semibold">{showTooltip}</span>
                <span className="block text-[10px] text-zinc-400">Click garment to apply</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Swatches & Custom Color Picker */}
        <div className="mt-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 p-2.5 flex flex-col items-center gap-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <Palette className="w-3 h-3 text-primary" />
            <span>Palette Swatches</span>
          </div>

          {/* Quick Swatches Row */}
          <div className="flex items-center gap-1.5">
            {THEME_PRESETS.slice(0, 5).map((preset) => (
              <button
                key={preset.id}
                onClick={() => selectTheme(preset)}
                style={{ backgroundColor: preset.primary }}
                className={`w-5 h-5 rounded-full transition-transform hover:scale-125 ${
                  currentTheme.id === preset.id ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                }`}
                title={preset.name}
              />
            ))}
          </div>

          {/* Custom Color Input with Auto-Harmonious Generator */}
          <div className="w-full pt-1.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
            <label className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium cursor-pointer">
              Custom:
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={customHex}
                onChange={(e) => handleCustomColorChange(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                title="Choose custom brand color"
              />
              <span className="text-[9px] font-mono text-zinc-500 uppercase">
                {customHex.slice(0, 7)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE COLLAPSED BUTTON & SLIDE-OUT DRAWER (< 1024px)          */}
      {/* ============================================================== */}
      <div className="lg:hidden fixed bottom-6 right-4 z-50">
        <motion.button
          onClick={() => setIsOpenMobile(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{ backgroundColor: currentTheme.primary }}
          className="w-13 h-13 p-3.5 rounded-full text-white shadow-2xl flex items-center justify-center ring-4 ring-white/60 dark:ring-zinc-900/60"
          aria-label="Change Color Theme"
        >
          <Palette className="w-6 h-6 animate-pulse-subtle" />
          <span className="sr-only">Color Theme Dial</span>
        </motion.button>
      </div>

      {/* Mobile Drawer Modal */}
      <AnimatePresence>
        {isOpenMobile && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenMobile(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 border-t sm:border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      M Muzamil Theme Dial
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Choose a clothing color to transform the website
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpenMobile(false)}
                  className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Garment Presets Grid */}
              <div className="py-5">
                <label className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3 block">
                  Signature Fabric Palettes
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = currentTheme.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          selectTheme(preset);
                          setIsOpenMobile(false);
                        }}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: preset.primary }}
                        >
                          <Shirt className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {preset.name}
                          </p>
                          <p className="text-[10px] text-zinc-500 truncate">
                            {preset.garmentName}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-primary ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                    Custom Bespoke Color
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Creates dynamic contrast & palette
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-700 bg-transparent p-1"
                  />
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300 uppercase">
                    {customHex}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
