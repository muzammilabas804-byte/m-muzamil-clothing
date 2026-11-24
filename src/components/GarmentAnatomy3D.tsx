'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Scissors, Eye, Rotate3d, Check } from 'lucide-react';

interface AnatomyStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  cloth: string;
  description: string;
  pieces: {
    collar: string;
    body: string;
    vest?: string;
    jacket?: string;
    tie?: string;
  };
}

const STAGES: AnatomyStage[] = [
  {
    id: 'foundation',
    stepNumber: 'I. THE FOUNDATION',
    title: 'A Shirt of Pure Cotton',
    subtitle: 'THE INTIMATE LAYER',
    cloth: 'EGYPTIAN TWO-PLY POPLIN (120s)',
    description:
      'Cut strictly to individual posture, shoulder slope, and neck circumference. Double-needle French seams with 22 stitches per inch ensure soft contact with the skin and a flawless foundation.',
    pieces: {
      collar: 'Floating Spread Collar',
      body: 'Slim Contoured Torso',
    },
  },
  {
    id: 'waistcoat',
    stepNumber: 'II. THE WAISTCOAT',
    title: 'Structure, Held Close',
    subtitle: 'THE ARCHITECTURAL CORE',
    cloth: 'WORSTED MERINO WOOL & RAW SILK',
    description:
      'The vest draws the lines of the body inward. Six horn buttons, satin back with adjustable cinch buckle, and a hand-tied silk tie that anchors the lapel roll.',
    pieces: {
      collar: 'Spread Collar',
      body: 'Cotton Foundation',
      vest: 'Six-Button Tailored Vest',
      tie: 'Seven-Fold Silk Tie',
    },
  },
  {
    id: 'canvas',
    stepNumber: 'III. THE CANVAS',
    title: 'Built on Full Canvas',
    subtitle: 'HAND-PADDED HORSEHAIR CANVAS',
    cloth: 'SUPER 150s AUSTRALIAN MERINO',
    description:
      'Never fused with synthetic glue. Free-floating horsehair and wool canvas breathes with body warmth, molding gracefully to your chest over years of wear.',
    pieces: {
      collar: 'Spread Collar',
      body: 'Shirt Body',
      vest: 'Waistcoat',
      jacket: 'Full Canvas Tailored Jacket',
      tie: 'Silk Tie',
    },
  },
  {
    id: 'silhouette',
    stepNumber: 'IV. THE SILHOUETTE',
    title: 'The Complete Silhouette',
    subtitle: 'MADE TO BE WORN',
    cloth: 'SUPER 150s & MOHAIR BLEND',
    description:
      'The finished sartorial triumph. High armholes, roped pagoda shoulders, surgeons cuffs with functioning buttonholes, and an unmistakable presence.',
    pieces: {
      collar: 'Spread Collar',
      body: 'Shirt',
      vest: 'Waistcoat',
      jacket: 'Finished Suit',
      tie: 'Silk Tie',
    },
  },
];

const COLOUR_PALETTES = [
  { id: 'obsidian', name: 'Obsidian Midnight', color: '#18181b', accent: '#d4af37' },
  { id: 'maroon', name: 'Imperial Maroon', color: '#6b1426', accent: '#f59e0b' },
  { id: 'sapphire', name: 'Midnight Navy', color: '#172554', accent: '#60a5fa' },
  { id: 'ivory', name: 'Ivory Pearl', color: '#e7e5e4', accent: '#b45309' },
  { id: 'emerald', name: 'Royal Emerald', color: '#064e3b', accent: '#34d399' },
];

export default function GarmentAnatomy3D() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [selectedColour, setSelectedColour] = useState(COLOUR_PALETTES[0]);
  const [isExploded, setIsExploded] = useState(true);

  // 3D Mouse Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const currentStage = STAGES[activeStageIndex];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-black text-white overflow-hidden py-16 sm:py-24 border-y border-zinc-800 select-none"
    >
      {/* Cinematic Golden Amber Floor Reflection Pool */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Top ambient spotlight */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-25 transition-colors duration-700"
          style={{ backgroundColor: selectedColour.accent }}
        />

        {/* Ambient bottom floor water reflection */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 opacity-35 blur-[70px] pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 90%, ${selectedColour.accent} 0%, transparent 75%)`,
          }}
        />

        {/* Shimmering horizontal ground horizon line */}
        <div className="absolute bottom-24 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3 h-3" />
            <span>M MUZAMIL • BESPOKE CRAFTSMANSHIP</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-black tracking-tight text-zinc-100">
            The Anatomy of a Suit
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.25em] font-medium">
            AN IMMERSIVE DECONSTRUCTION OF BESPOKE TAILORING
          </p>
        </div>

        {/* Stage Timeline Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md overflow-x-auto max-w-full">
            {STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-serif tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeStageIndex === idx
                    ? 'bg-zinc-800 text-amber-300 shadow-lg border border-amber-500/40 font-bold scale-105'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                <span>{stage.title.split(' — ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Stage Viewer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Detail Panel */}
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-6 order-2 lg:order-1"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase block">
                {currentStage.stepNumber}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {currentStage.title}
              </h3>
              <p className="text-[11px] tracking-widest text-zinc-400 uppercase">
                {currentStage.subtitle}
              </p>
            </div>

            {/* Fabric specification plaque */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-2">
              <div className="text-[10px] uppercase font-bold text-amber-400/90 tracking-widest flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>MATERIAL PROVENANCE</span>
              </div>
              <div className="font-serif text-sm font-bold text-zinc-100">
                {currentStage.cloth}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                {currentStage.description}
              </p>
            </div>

            {/* Exploded / Assembled Toggle */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsExploded(!isExploded)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400/50 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Rotate3d className="w-4 h-4 text-amber-400" />
                <span>{isExploded ? 'View Assembled' : 'Deconstruct in 3D'}</span>
              </button>
            </div>
          </motion.div>

          {/* Center 3D Floating Exploded Garment Canvas */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            
            {/* 3D Perspective Viewport */}
            <motion.div
              style={{
                perspective: 1200,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: mousePos.x,
                rotateX: mousePos.y,
              }}
              transition={{ type: 'spring', stiffness: 80, damping: 25 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center"
            >
              
              {/* STAGE 1: THE FOUNDATION (EXPLODED SHIRT) */}
              {activeStageIndex === 0 && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Floating Shirt Collar */}
                  <motion.div
                    animate={
                      isExploded
                        ? { y: -80, scale: 1.05, opacity: 1 }
                        : { y: -40, scale: 1, opacity: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    className="absolute top-16 z-30 drop-shadow-[0_15px_30px_rgba(217,119,6,0.3)]"
                  >
                    <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
                      <path
                        d="M20 70 L90 20 L160 70 L135 75 L90 40 L45 75 Z"
                        fill="url(#shirtGrad)"
                        stroke="#d4af37"
                        strokeWidth="1.5"
                      />
                      <circle cx="90" cy="55" r="4" fill="#ffffff" stroke="#d4af37" />
                    </svg>
                  </motion.div>

                  {/* Shirt Torso Body */}
                  <motion.div
                    animate={
                      isExploded
                        ? { y: 15, scale: 0.98, opacity: 1 }
                        : { y: 0, scale: 1, opacity: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    className="absolute z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  >
                    <svg width="240" height="280" viewBox="0 0 240 280" fill="none">
                      <path
                        d="M40 30 L200 30 L210 260 L30 260 Z"
                        fill="url(#shirtGrad)"
                        stroke="#d4af37"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                      />
                      {/* Button placket */}
                      <rect x="110" y="30" width="20" height="230" fill="rgba(255,255,255,0.05)" />
                      <circle cx="120" cy="60" r="3.5" fill="#f5f5f4" stroke="#d4af37" />
                      <circle cx="120" cy="110" r="3.5" fill="#f5f5f4" stroke="#d4af37" />
                      <circle cx="120" cy="160" r="3.5" fill="#f5f5f4" stroke="#d4af37" />
                      <circle cx="120" cy="210" r="3.5" fill="#f5f5f4" stroke="#d4af37" />
                    </svg>
                  </motion.div>

                  {/* Left Exploded Sleeve & Cuff */}
                  <motion.div
                    animate={
                      isExploded
                        ? { x: -85, y: -10, rotate: -8, opacity: 1 }
                        : { x: -45, y: 10, rotate: 0, opacity: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    className="absolute left-2 z-20"
                  >
                    <svg width="90" height="210" viewBox="0 0 90 210" fill="none">
                      <path
                        d="M80 20 L20 160 L60 170 L85 40 Z"
                        fill="url(#shirtGrad)"
                        stroke="#d4af37"
                        strokeWidth="1"
                      />
                      {/* Floating cuff */}
                      <rect
                        x="10"
                        y="170"
                        width="55"
                        height="26"
                        rx="4"
                        fill="#ffffff"
                        stroke="#d4af37"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>

                  {/* Right Exploded Sleeve & Cuff */}
                  <motion.div
                    animate={
                      isExploded
                        ? { x: 85, y: -10, rotate: 8, opacity: 1 }
                        : { x: 45, y: 10, rotate: 0, opacity: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    className="absolute right-2 z-20"
                  >
                    <svg width="90" height="210" viewBox="0 0 90 210" fill="none">
                      <path
                        d="M10 20 L70 160 L30 170 L5 40 Z"
                        fill="url(#shirtGrad)"
                        stroke="#d4af37"
                        strokeWidth="1"
                      />
                      <rect
                        x="25"
                        y="170"
                        width="55"
                        height="26"
                        rx="4"
                        fill="#ffffff"
                        stroke="#d4af37"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                </div>
              )}

              {/* STAGE 2: WAISTCOAT (STRUCTURE, HELD CLOSE) */}
              {activeStageIndex === 1 && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Floating Tie */}
                  <motion.div
                    animate={
                      isExploded
                        ? { y: -50, z: 40, opacity: 1 }
                        : { y: -20, z: 20, opacity: 1 }
                    }
                    className="absolute top-16 z-40"
                  >
                    <svg width="50" height="180" viewBox="0 0 50 180" fill="none">
                      <path d="M15 10 L35 10 L40 40 L25 55 L10 40 Z" fill="#18181b" stroke="#d4af37" />
                      <path d="M20 55 L30 55 L40 160 L25 180 L10 160 Z" fill={selectedColour.color} stroke="#d4af37" />
                    </svg>
                  </motion.div>

                  {/* Exploded Waistcoat */}
                  <motion.div
                    animate={
                      isExploded
                        ? { scale: 1.05, y: 0, opacity: 1 }
                        : { scale: 1, y: 10, opacity: 1 }
                    }
                    className="absolute z-30 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                  >
                    <svg width="260" height="290" viewBox="0 0 260 290" fill="none">
                      <path
                        d="M50 20 L80 120 L50 260 L90 270 L130 250 L170 270 L210 260 L180 120 L210 20 L160 20 L130 90 L100 20 Z"
                        fill={selectedColour.color}
                        stroke="#d4af37"
                        strokeWidth="1.5"
                      />
                      {/* Waistcoat buttons */}
                      <circle cx="130" cy="115" r="4" fill="#d4af37" />
                      <circle cx="130" cy="145" r="4" fill="#d4af37" />
                      <circle cx="130" cy="175" r="4" fill="#d4af37" />
                      <circle cx="130" cy="205" r="4" fill="#d4af37" />
                      <circle cx="130" cy="235" r="4" fill="#d4af37" />
                      {/* Welt Pockets */}
                      <rect x="70" y="190" width="35" height="4" fill="#d4af37" opacity="0.6" />
                      <rect x="155" y="190" width="35" height="4" fill="#d4af37" opacity="0.6" />
                    </svg>
                  </motion.div>
                </div>
              )}

              {/* STAGE 3: FULL CANVAS (THE JACKET DECONSTRUCTED) */}
              {activeStageIndex === 2 && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={
                      isExploded
                        ? { scale: 1.06, y: -10 }
                        : { scale: 1, y: 0 }
                    }
                    className="relative z-30 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                  >
                    <svg width="300" height="340" viewBox="0 0 300 340" fill="none">
                      {/* Left Canvas Lapel */}
                      <path
                        d="M40 30 L110 30 L130 180 L80 200 L30 320 L10 140 Z"
                        fill={selectedColour.color}
                        stroke="#d4af37"
                        strokeWidth="1.5"
                      />
                      {/* Right Canvas Lapel */}
                      <path
                        d="M260 30 L190 30 L170 180 L220 200 L270 320 L290 140 Z"
                        fill={selectedColour.color}
                        stroke="#d4af37"
                        strokeWidth="1.5"
                      />
                      {/* Chest Canvas Internal Horsehair Mesh */}
                      {isExploded && (
                        <g opacity="0.5" stroke="#d4af37" strokeDasharray="3 3">
                          <line x1="80" y1="60" x2="130" y2="150" />
                          <line x1="100" y1="50" x2="140" y2="130" />
                          <line x1="220" y1="60" x2="170" y2="150" />
                        </g>
                      )}
                      {/* Breast pocket & white pocket square */}
                      <rect x="65" y="110" width="40" height="5" fill="#d4af37" />
                      <polygon points="75,110 85,95 95,110" fill="#ffffff" />
                      {/* Horn Button closure */}
                      <circle cx="150" cy="205" r="5" fill="#09090b" stroke="#d4af37" strokeWidth="1.5" />
                      <circle cx="150" cy="245" r="5" fill="#09090b" stroke="#d4af37" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                </div>
              )}

              {/* STAGE 4: THE COMPLETE SILHOUETTE (MODEL LOOK) */}
              {activeStageIndex === 3 && (
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <Image
                    src="/images/hero-model.jpg"
                    alt="M Muzamil The Complete Silhouette"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-400">
                        INDIVIDUALLY MADE TO MEASURE
                      </div>
                      <div className="font-serif text-xs text-white">
                        Muzaffargarh Master Tailoring
                      </div>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              )}

              {/* Shared SVG Gradients */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="50%" stop-color="#f5f5f4" />
                    <stop offset="100%" stop-color="#e7e5e4" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Right Panel: A Language of Colour & Booking */}
          <div className="lg:col-span-3 space-y-6 order-3">
            
            {/* "A Language of Colour" Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest block">
                  THE PALETTES
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  A Language of Colour
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Select a bespoke shade to preview the garment in real time:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {COLOUR_PALETTES.map((palette) => {
                  const isSelected = selectedColour.id === palette.id;
                  return (
                    <button
                      key={palette.id}
                      onClick={() => setSelectedColour(palette)}
                      className={`flex items-center gap-3 p-2 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/60'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-white/30 shrink-0 shadow-sm"
                        style={{ backgroundColor: palette.color }}
                      />
                      <span className="text-xs font-serif text-zinc-200 truncate flex-1">
                        {palette.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-amber-500/30 space-y-3">
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
                TAILORING FOR THE FEW
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Every M Muzamil suit is cut to one man and one man only. Begin with a measurement session on WhatsApp.
              </p>
              <a
                href="https://wa.me/923055177531?text=Assalam-o-Alaikum%20M%20Muzamil!%20I%20am%20interested%20in%20a%20bespoke%20suit%20and%20private%20fitting."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-center"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-contrast)',
                }}
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>Book a Private Fitting</span>
              </a>
            </div>

          </div>

        </div>

        {/* 3. "THE DETAILS — THE LAST QUARTER-INCH" (Macro Specs) */}
        <div className="pt-10 border-t border-zinc-800/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-[0.25em]">
              THE FINISHING TOUCHES
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
              The Last Quarter-Inch
            </h3>
            <p className="text-xs text-zinc-400">
              Where true bespoke tailoring reveals itself under close inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-amber-400 font-mono text-xs font-bold">01 / CUFFS</div>
              <div className="font-serif text-base font-bold text-white">
                Working Surgeon's Cuffs
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Four functioning buttonholes hand-stitched with silk gimp thread, cut cleanly through the wool fabric.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-amber-400 font-mono text-xs font-bold">02 / BUTTONS</div>
              <div className="font-serif text-base font-bold text-white">
                Natural Buffalo Horn
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Turned from water-buffalo horn with subtle natural grain, heat-sealed on wrapped shanks to avoid breakage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-amber-400 font-mono text-xs font-bold">03 / STITCHING</div>
              <div className="font-serif text-base font-bold text-white">
                Hand Pick-Stitched Lapels
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Delicate 2mm AMF hand-pricking along the collar and lapel edge, preventing curling and creating roll.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-amber-400 font-mono text-xs font-bold">04 / LINING</div>
              <div className="font-serif text-base font-bold text-white">
                Cupro Bemberg Lining
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                100% natural cellulose Bemberg silk lining, anti-static and breathable for year-round climate comfort.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
