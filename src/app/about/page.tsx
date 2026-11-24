import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Scissors, ShieldCheck, Heart, Award, Users, MapPin, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6 pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Atelier Heritage</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-zinc-900 dark:text-zinc-50 leading-tight">
          Born in Muzaffargarh. Designed for the World.
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          <strong className="text-zinc-900 dark:text-zinc-100">M Muzamil</strong> is an independent Pakistani clothing house dedicated to reviving sartorial standards. Founded on honest craftsmanship, generational pattern-cutting, and long-staple natural fibers.
        </p>
      </section>

      {/* 2. Brand Story & Founder Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
              <Image
                src="/images/about-founder.jpg"
                alt="M Muzamil Founder in Muzaffargarh Atelier"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-zinc-950/90 text-white backdrop-blur border border-zinc-800">
                <div className="text-[10px] text-amber-400 uppercase font-bold tracking-widest">
                  Atelier Philosophy
                </div>
                <div className="font-serif text-sm font-semibold mt-0.5">
                  “A true garment feels like a second skin, tailored with intent.”
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-primary">
              Our Journey
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              Honoring South Punjab's Rich Textile Legacy
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Muzaffargarh is flanked by the great rivers of Pakistan, where historically some of the finest long-staple cotton has been cultivated. For decades, fast-fashion compromises diluted the pride of local menswear.
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              At M Muzamil, we rejected flimsy polyester blends and mass-produced ill-fitting cuts. Instead, we committed to Peruvian Pima cotton, Egyptian Giza weaves, Normandy linen, and raw silk blends — stitched stitch-by-stitch with calibrated tension and reinforced stress points.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  5,000+
                </div>
                <div className="text-xs text-zinc-500">Parcels Dispatched Across Pakistan</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  100%
                </div>
                <div className="text-xs text-zinc-500">Pre-Shrunk & Color-Fast Guarantee</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Workshop & Craftsmanship Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">
            Behind the Seams
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Our Workshop in Muzaffargarh
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Take a look into our daily craft: pattern-making, precision cutting, hand-finishing, and quality inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800">
              <Image
                src="/images/workshop-cutting.jpg"
                alt="Precision Pattern Cutting"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              1. Individual Hand Cutting
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We cut fabrics individually along natural grain lines to avoid twisting, puckering, or shrinkage after home washing.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800">
              <Image
                src="/images/workshop-stitching.jpg"
                alt="Tailoring and Stitching Details"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              2. Reinforced German Thread
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Using high-tensile core-spun threads and high-density 18 stitches per inch for durable shoulder and collar lines.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800">
              <Image
                src="/images/workshop-fabrics.jpg"
                alt="Natural Fabric Sourcing"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              3. Certified Pure Fibers
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Strict material provenance: 100% long-staple cotton, French flax linen, and gentle organic garment washes.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-14 border border-zinc-800 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Our Core Commitments
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              What Sets M Muzamil Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                <Scissors className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold">Tailored Precision</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No generic sizing. We offer personalized sleeve, collar, and chest alterations over WhatsApp to ensure you look your sharpest.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold">Absolute Privacy</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our revolutionary Send a Gift system ensures intimate words shared between friends and loved ones remain encrypted and private.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold">Muzaffargarh Pride</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every order supports local artisan tailors, cutters, and embroiderers in Muzaffargarh, sustaining traditional craft livelihoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="text-center px-4 max-w-2xl mx-auto space-y-5">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Ready to Experience M Muzamil?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Browse our seasonal lookbook or order directly on WhatsApp.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/collection"
            className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text-contrast)',
            }}
          >
            <span>Browse Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200"
          >
            Contact Atelier
          </Link>
        </div>
      </section>

    </div>
  );
}
