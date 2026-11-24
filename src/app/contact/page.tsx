'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Could not send message. Please contact us on WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Muzaffargarh Atelier & Support</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50">
          Connect with M Muzamil
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Whether you want sizing advice, custom bulk orders for weddings, or gift coordination, we are at your service in Muzaffargarh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl space-y-6">
            
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Direct Contact Details
            </h2>

            <div className="space-y-4 text-sm">
              
              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-zinc-400">Phone & WhatsApp</div>
                  <a
                    href="tel:03055177531"
                    className="font-bold text-base text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors block font-mono"
                  >
                    0305 5177531
                  </a>
                  <span className="text-[11px] text-zinc-500">
                    Instant response for orders & queries
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-zinc-400">Email Address</div>
                  <a
                    href="mailto:muzammilabas804@gmail.com"
                    className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors block break-all font-mono"
                  >
                    muzammilabas804@gmail.com
                  </a>
                  <span className="text-[11px] text-zinc-500">
                    Business inquiries & order receipts
                  </span>
                </div>
              </div>

              {/* City / Location */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-zinc-400">City & Region</div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Muzaffargarh, Punjab, Pakistan
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    South Punjab Textile Hub
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-zinc-400">Atelier Hours</div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Mon - Sat: 10:00 AM - 10:00 PM
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    Friday prayer break: 1:00 PM - 3:00 PM
                  </span>
                </div>
              </div>

            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/923055177531?text=Assalam-o-Alaikum%20M%20Muzamil!%20I%20have%20an%20inquiry%20from%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl text-sm font-bold shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-contrast)',
                }}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat Directly on WhatsApp (0305 5177531)</span>
              </a>
            </div>

          </div>
        </div>

        {/* Working Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl space-y-6">
            
            <div>
              <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Send a Message to the Atelier
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Fill out the form below. Inquiries are saved securely to our database and our team will get back to you promptly.
              </p>
            </div>

            {success && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Message Sent Successfully!</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Thank you. We have saved your message and will contact you via WhatsApp / Phone shortly.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ali@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Phone / WhatsApp *
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="General Inquiry">General Clothing Inquiry</option>
                    <option value="Custom Sizing / Fit">Custom Sizing / Fit Consultation</option>
                    <option value="Bulk Wedding Order">Bulk Wedding / Festive Order</option>
                    <option value="Gift Order Assistance">Send a Gift Assistance</option>
                    <option value="Courier Tracking">Delivery / Tracking Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can M Muzamil assist your wardrobe today?"
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary"
                />
              </div>

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
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message to M Muzamil</span>
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE MAP SECTION: MUZAFFARGARH, PAKISTAN             */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Location: Muzaffargarh, Punjab, Pakistan</span>
            </h3>
            <p className="text-xs text-zinc-500">
              Coordinates: 30.0703° N, 71.1933° E • Serving nationwide courier delivery from South Punjab
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Muzaffargarh+Punjab+Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Embedded Responsive Google Map for Muzaffargarh */}
        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner relative">
          <iframe
            title="M Muzamil Clothing Brand Location Map - Muzaffargarh"
            src="https://maps.google.com/maps?q=Muzaffargarh,%20Punjab,%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

      </div>

    </div>
  );
}
