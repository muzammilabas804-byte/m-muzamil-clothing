import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Gift, ShieldCheck, Truck, Scissors, MessageCircle, Star, Heart } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Decorative Mesh Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-700"
            style={{ backgroundColor: 'var(--primary)' }}
          />
          <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8 sm:pt-12">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Crafted in Muzaffargarh, Pakistan</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-zinc-50 leading-[1.08] tracking-tight">
              Sartorial Elegance.{' '}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-600"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--primary), var(--accent))`,
                }}
              >
                Tailored for Perfection.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Welcome to <span className="font-semibold text-zinc-900 dark:text-zinc-100">M Muzamil</span> — where rich South Punjab craftsmanship converges with contemporary silhouettes. From ultra-soft Pima cotton tees to festive handloom kurtas, dressed for distinction.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="/collection"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-contrast)',
                }}
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/gift"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 text-sm font-bold shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
              >
                <Gift className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                <span>Send a Private Gift</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  100%
                </div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
                  Pure Cotton & Silk
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  AES-256
                </div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
                  Encrypted Gifting
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  0305 5177531
                </div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
                  Direct WhatsApp
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Editorial Placeholder Frame) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
              <Image
                src="/images/hero-model.jpg"
                alt="M Muzamil Haute Couture Lookbook"
                fill
                priority
                className="object-cover object-center"
              />
              
              {/* Floating Luxury Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    M Muzamil Signature
                  </div>
                  <div className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Handcrafted in Muzaffargarh
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Scissors className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BRAND PILLARS                                              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 font-bold">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Master Craftsmanship
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every seam, placket, and collar is calibrated by seasoned pattern-cutters in Muzaffargarh, ensuring an impeccable drape and durable wear.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              All Pakistan Delivery
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Express door-to-door delivery across Lahore, Karachi, Islamabad, Multan, and every corner of Pakistan with secure Cash on Delivery option.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 font-bold">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Private Encrypted Gifting
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our signature feature: Send clothing with a confidential AES-encrypted note accessible only via a secret QR code card inside the package.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FEATURED CLOTHING COLLECTION                                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
              Featured Garments
            </h2>
          </div>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <span>View Full Catalogue ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SIGNATURE FEATURE SHOWCASE: PRIVATE GIFTING                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white border border-zinc-800 p-8 sm:p-14 shadow-2xl">
          
          {/* Subtle Ambient Backlight */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: 'var(--primary)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wider uppercase">
                <Gift className="w-3.5 h-3.5" />
                <span>Exclusive Signature Feature</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-black leading-tight text-zinc-50">
                Send a Gift with a Secret Message Only They Can Read.
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Surprise your friend, spouse, or partner with premium M Muzamil wear. Write a deeply personal message that is AES-256 encrypted on our servers. A bespoke QR code card is printed and tucked inside their gift parcel. When they scan it and enter their PIN, your secret message reveals itself in an animated card.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div className="text-xs text-zinc-300">
                    <span className="font-bold block text-white">Encrypted at Checkout</span>
                    Never readable by couriers or store staff.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="text-xs text-zinc-300">
                    <span className="font-bold block text-white">Optional Self-Destruct</span>
                    Message erases forever after first reveal.
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/gift"
                  className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-contrast)',
                  }}
                >
                  <Gift className="w-4 h-4" />
                  <span>Send a Private Gift Now</span>
                </Link>
                <Link
                  href="/gift#reveal"
                  className="px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  I Received a Gift (Reveal Message)
                </Link>
              </div>
            </div>

            {/* Graphic Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto aspect-square max-w-sm rounded-3xl overflow-hidden border-2 border-zinc-700 shadow-2xl bg-zinc-900 p-2">
                <Image
                  src="/images/gift-box.jpg"
                  alt="M Muzamil Private Gift Box with QR code"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. BRAND STORY TEASER                                         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-zinc-200 dark:border-zinc-800">
              <Image
                src="/images/workshop-stitching.jpg"
                alt="M Muzamil Workshop in Muzaffargarh"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-primary">
              The Atelier Story
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              Rooted in the Soil of Muzaffargarh.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Muzaffargarh, situated between the Chenab and Indus rivers, has long been a cradle of cotton cultivation and bespoke tailoring. M Muzamil was founded with one clear ambition: to bring uncompromising fabric quality, modern fits, and personalized attention back to menswear.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We inspect every yard of cotton, stitch with German thread, and tailor each garment with pride.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                <span>Read Our Full Story & Workshop Process</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. WHATSAPP CONCIERGE BANNER                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-primary/30 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--primary-light)',
          }}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-md">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900">
              Need a Custom Size or Personal Styling Advice?
            </h3>

            <p className="text-sm text-zinc-700 leading-relaxed">
              Chat directly with our Muzaffargarh master tailors on WhatsApp at{' '}
              <strong className="text-zinc-900 font-mono">0305 5177531</strong>. We assist with custom sleeve lengths, bulk festive orders, and express courier inquiries.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/923055177531?text=Assalam-o-Alaikum%20M%20Muzamil!%20I%20would%20like%20to%20consult%20regarding%20clothing%20sizes%20and%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-contrast)',
                }}
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Now (0305 5177531)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
