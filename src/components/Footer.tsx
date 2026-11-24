import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Heart, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-400 flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                M
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-wider text-white">
                  M MUZAMIL
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400">
                  Muzaffargarh, Pakistan
                </span>
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              Crafted elegance born in the historic heart of Muzaffargarh. Combining heritage Pakistani textile precision with contemporary silhouettes. Tailored to perfection.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Fabrics & Tailoring</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home Lookbook
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:text-amber-400 transition-colors">
                  Full Clothing Collection
                </Link>
              </li>
              <li>
                <Link href="/gift" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Send a Private Gift</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/30 text-amber-300 font-mono">
                    AES-256
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Our Story & Atelier
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Store Location
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-600 hover:text-zinc-400 transition-colors text-xs">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Muzaffargarh */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <span>Muzaffargarh, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:03055177531" className="hover:text-white transition-colors">
                  0305 5177531
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:muzammilabas804@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  muzammilabas804@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/923055177531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery & Assurance */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">
              Nationwide Delivery
            </h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              We ship across all cities in Pakistan: Lahore, Karachi, Islamabad, Multan, Rawalpindi, Faisalabad, and directly from Muzaffargarh. Cash on Delivery and Bank Transfer available.
            </p>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <div className="font-semibold text-zinc-200 mb-1">Customer Support</div>
              <div>Mon - Sat: 10:00 AM - 10:00 PM (PKT)</div>
              <div>Dedicated WhatsApp support for custom sizes & bespoke gifting.</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} M Muzamil Clothing. All rights reserved. Crafted in Muzaffargarh.</p>
          <div className="flex items-center gap-1">
            <span>Designed for excellence with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>in Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
