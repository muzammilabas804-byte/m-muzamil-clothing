'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles, AlertTriangle, Flame, Heart, RefreshCw, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftRevealResult {
  senderName: string;
  receiverName: string;
  productName: string;
  message: string;
  createdAt: string;
  burnAfterReading: boolean;
  burned: boolean;
  remainingViews?: number;
}

interface GiftCardRevealProps {
  initialCode?: string;
}

export default function GiftCardReveal({ initialCode = '' }: GiftCardRevealProps) {
  const [giftCode, setGiftCode] = useState(initialCode);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealData, setRevealData] = useState<GiftRevealResult | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleReveal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCode.trim()) {
      setError('Please enter your unique Gift Code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gift/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftCode: giftCode.trim(), pin: pin.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reveal message. Please check the code and PIN.');
      }

      setRevealData(data);
      setIsOpened(true);

      // Trigger luxury golden confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#047857', '#e11d48', '#d97706', '#10b981'],
        });
      } catch (confettiErr) {
        // ignore if canvas not supported
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* ============================================================== */
          /* CODE & PIN INPUT FORM                                          */
          /* ============================================================== */
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Reveal Your Private Gift Message
                </h3>
                <p className="text-xs text-zinc-500">
                  End-to-End Encrypted (AES-256) • Visible only to the receiver
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleReveal} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  Secret Gift Code *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MM-GIFT-A89K2"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-mono text-base font-bold tracking-widest placeholder:tracking-normal focus:ring-2 focus:ring-primary focus:border-transparent uppercase transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-medium">
                    From Card / QR
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  Security PIN <span className="font-normal text-zinc-400">(If sender protected it)</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Leave empty if no PIN was set"
                    maxLength={8}
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-mono text-base tracking-widest focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-sm font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-contrast)',
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Decrypting Private Card...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    <span>Unlock & Read Secret Message</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Encrypted on M Muzamil Servers</span>
              </span>
              <span>Never visible in Admin or Source</span>
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* ANIMATED LUXURY ENVELOPE / CARD REVEAL                         */
          /* ============================================================== */
          <motion.div
            key="revealed-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border-2 border-amber-300/60 dark:border-amber-600/30 p-8 sm:p-12 shadow-2xl overflow-hidden"
          >
            {/* Burned Warning Banner */}
            {revealData?.burnAfterReading && (
              <div className="mb-6 px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 animate-bounce" />
                <span>
                  Self-Destruct Notice: This message has now been permanently erased from our database. It can never be viewed again.
                </span>
              </div>
            )}

            {/* Vintage Ornamental Header */}
            <div className="text-center pb-6 border-b border-amber-200/80 dark:border-zinc-800">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-zinc-800 text-amber-700 dark:text-amber-400 mb-3 shadow-inner">
                <Heart className="w-6 h-6 fill-current text-rose-500" />
              </div>
              <div className="text-xs font-serif uppercase tracking-[0.3em] text-amber-800 dark:text-amber-400">
                A Personal Message From
              </div>
              <h2 className="font-serif text-3xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
                {revealData?.senderName}
              </h2>
              <div className="text-xs text-zinc-500 mt-1">
                For: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{revealData?.receiverName}</span> • Accompanied with{' '}
                <span className="font-semibold text-primary">{revealData?.productName}</span>
              </div>
            </div>

            {/* Decrypted Secret Message Body */}
            <div className="py-8 px-2 sm:px-6">
              <div className="relative">
                {/* Quotation Marks */}
                <span className="absolute -top-4 -left-4 font-serif text-5xl text-amber-300 dark:text-zinc-700 select-none">
                  “
                </span>
                <p className="font-serif text-lg sm:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap italic text-center px-4">
                  {revealData?.message}
                </p>
                <span className="absolute -bottom-6 -right-2 font-serif text-5xl text-amber-300 dark:text-zinc-700 select-none">
                  ”
                </span>
              </div>
            </div>

            {/* Card Footer Signature */}
            <div className="pt-6 border-t border-amber-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 font-serif text-amber-900 dark:text-amber-300">
                <span>M MUZAMIL ATELIER</span>
                <span>•</span>
                <span>MUZAFFARGARH</span>
              </div>
              <div>
                Delivered on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>

            {/* Read Again / Reset Button */}
            {!revealData?.burnAfterReading && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsOpened(false)}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 underline"
                >
                  Enter another code
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
