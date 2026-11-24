'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Lock,
  Unlock,
  KeyRound,
  QrCode,
  Flame,
  CheckCircle,
  Copy,
  MessageCircle,
  Send,
  Sparkles,
  ShieldCheck,
  Download,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import GiftCardReveal from '@/components/GiftCardReveal';
import { getGiftOrderWhatsAppUrl } from '@/data/products';

function GiftPageContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const initialProductId = searchParams.get('productId') || PRODUCTS[0]?.id || '';

  const [activeTab, setActiveTab] = useState<'send' | 'reveal'>(initialCode ? 'reveal' : 'send');

  // Sender Form State
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [size, setSize] = useState('M');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Muzaffargarh');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [pin, setPin] = useState('');
  const [burnAfterReading, setBurnAfterReading] = useState(false);

  // Submission State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setActiveTab('reveal');
    }
  }, [initialCode]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleSendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gift/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName,
          receiverName,
          productId: selectedProductId,
          size,
          deliveryAddress,
          city,
          phone,
          message,
          pin,
          burnAfterReading,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create gift order.');
      }

      setCreatedOrder(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <Gift className="w-3.5 h-3.5" />
          <span>Encrypted Private Gifting</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50">
          A Gift They Will Remember Forever
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Surprise someone special with handcrafted clothing from M Muzamil. Write an intimate, personal note that is encrypted with military-grade AES-256 and printed on a physical QR card inside their gift box.
        </p>
      </div>

      {/* Navigation Switcher: Send vs Reveal */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-inner">
          <button
            onClick={() => setActiveTab('send')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'send'
                ? 'shadow-md scale-105'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
            style={
              activeTab === 'send'
                ? {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-contrast)',
                  }
                : {}
            }
          >
            <Send className="w-4 h-4" />
            <span>Send a Private Gift</span>
          </button>

          <button
            id="reveal"
            onClick={() => setActiveTab('reveal')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'reveal'
                ? 'shadow-md scale-105'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
            style={
              activeTab === 'reveal'
                ? {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-contrast)',
                  }
                : {}
            }
          >
            <Lock className="w-4 h-4" />
            <span>Reveal Your Message</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SENDER FLOW */}
      {activeTab === 'send' && (
        <div className="max-w-4xl mx-auto">
          {!createdOrder ? (
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-10 shadow-xl">
              
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Step 1: Choose Garment & Write Secret Message
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Your message is encrypted immediately and stored securely.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AES-256 Bit Encryption</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSendSubmit} className="space-y-6">
                
                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Your Name (Sender) *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Usman Tariq"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="e.g. Hamza Khan"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Clothing Item Selection & Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Select Clothing Gift *
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — Rs. {p.price.toLocaleString()} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Size *
                    </label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary cursor-pointer font-bold"
                    >
                      {selectedProduct.sizes.map((s) => (
                        <option key={s} value={s}>
                          Size {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Delivery Address & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      Delivery Address in Pakistan *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House / Street / Colony / Landmark"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Muzaffargarh, Multan, Lahore"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Contact Phone Number (For Courier Coordination) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>

                {/* Private Message (Encrypted) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Secret Personal Message (Encrypted AES-256) *
                    </label>
                    <span className="text-[11px] text-zinc-400">
                      {message.length} characters (Confidential)
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write what you feel. Only the recipient with the QR code or gift code will ever be able to decrypt this. It is never printed in plain text."
                    className="w-full px-4 py-3.5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary placeholder:text-zinc-400 font-serif"
                  />
                </div>

                {/* Optional PIN & Burn After Reading Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700">
                  
                  {/* Optional PIN */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-primary" />
                      <span>Optional 4-Digit Security PIN</span>
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="e.g. 7860 (Optional)"
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono tracking-widest focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">
                      If set, the receiver must enter this PIN to decrypt.
                    </p>
                  </div>

                  {/* Burn After Reading */}
                  <div className="flex flex-col justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      <span>Self-Destruct After 1st Read</span>
                    </label>
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="burnToggle"
                        checked={burnAfterReading}
                        onChange={(e) => setBurnAfterReading(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary border-zinc-300 cursor-pointer"
                      />
                      <label htmlFor="burnToggle" className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                        Erase permanently from server after first reveal
                      </label>
                    </div>
                  </div>

                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-sm font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-contrast)',
                  }}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Encrypting Message & Generating QR Code...</span>
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5" />
                      <span>Create Encrypted Gift Order (Rs. {selectedProduct.price.toLocaleString()})</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          ) : (
            /* ============================================================== */
            /* ORDER CREATED & PRINTABLE CARD PREVIEW                         */
            /* ============================================================== */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-white dark:bg-zinc-900 border-2 border-emerald-500/40 p-6 sm:p-10 shadow-2xl space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  Gift Package Created Successfully!
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto">
                  Your message has been encrypted. Below is the unique Gift Card with QR code that will be placed inside the parcel.
                </p>
              </div>

              {/* The Physical Card Mockup */}
              <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white border-2 border-amber-400/40 shadow-2xl space-y-6 text-center relative overflow-hidden">
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400">
                  M MUZAMIL • EXCLUSIVE GIFT CARD
                </div>

                {/* QR Code Graphic */}
                <div className="bg-white p-3 rounded-2xl inline-block shadow-lg mx-auto">
                  {createdOrder.qrCodeUrl ? (
                    <img
                      src={createdOrder.qrCodeUrl}
                      alt="Gift Card QR code"
                      className="w-44 h-44 mx-auto rounded-lg"
                    />
                  ) : null}
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-zinc-400">Unique Reveal Code</div>
                  <div className="font-mono text-2xl font-bold tracking-widest text-amber-300">
                    {createdOrder.giftCode}
                  </div>
                </div>

                <div className="text-xs text-zinc-300 border-t border-zinc-800 pt-4 space-y-1">
                  <div>
                    To: <strong className="text-white">{createdOrder.receiverName}</strong> • From:{' '}
                    <strong className="text-white">{createdOrder.senderName}</strong>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Scan QR or visit <span className="text-amber-400 font-mono">/gift</span> to read your private message.
                  </div>
                  {createdOrder.hasPin && (
                    <div className="text-[10px] text-amber-300 font-semibold">
                      🔒 Protected by sender PIN
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: WhatsApp Order Link to M Muzamil */}
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(createdOrder.giftCode)}
                    className="flex-1 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-100"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Gift Code'}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(createdOrder.revealUrl)}
                    className="flex-1 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-100"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Copy Reveal Link</span>
                  </button>
                </div>

                {/* Direct WhatsApp Order Link */}
                <a
                  href={getGiftOrderWhatsAppUrl(
                    createdOrder.giftCode,
                    createdOrder.receiverName,
                    createdOrder.productName
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl text-sm font-bold shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-contrast)',
                  }}
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Order to M Muzamil on WhatsApp (+92 305 5177531)</span>
                </a>

                <p className="text-[11px] text-center text-zinc-400">
                  Note: The shop owner will see your parcel address and item choice, but your personal message remains 100% encrypted and hidden.
                </p>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setCreatedOrder(null);
                      setMessage('');
                    }}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Create Another Gift Package
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 2: RECEIVER FLOW */}
      {activeTab === 'reveal' && (
        <div className="max-w-3xl mx-auto py-6">
          <GiftCardReveal initialCode={initialCode} />
        </div>
      )}

    </div>
  );
}

export default function GiftPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-zinc-500">
          Loading private gift terminal...
        </div>
      }
    >
      <GiftPageContent />
    </Suspense>
  );
}
