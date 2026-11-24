'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Gift, Sparkles, Tag, Check } from 'lucide-react';
import { Product } from '@/types';
import { getProductWhatsAppUrl } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [copiedLink, setCopiedLink] = useState(false);

  const whatsappUrl = getProductWhatsAppUrl(product, selectedSize);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority={false}
        />

        {/* Badge (Bestseller, New Arrival, etc.) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md backdrop-blur-md"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--text-contrast)',
              }}
            >
              <Sparkles className="w-3 h-3" />
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount Tag */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 z-10 bg-zinc-950/80 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold font-mono">
            SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Quick Send-as-Gift Overlay Button */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/gift?productId=${product.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 text-xs font-bold shadow-lg backdrop-blur hover:bg-zinc-50 border border-zinc-200 dark:border-zinc-700"
          >
            <Gift className="w-4 h-4 text-primary" />
            <span>Send as Private Gift</span>
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        <div className="text-[11px] font-bold tracking-widest text-primary uppercase mb-1">
          {product.category.replace('-', ' ')}
        </div>

        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Fabric & Fit specs */}
        <div className="mt-3 py-2 border-y border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-400">Fabric:</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[170px]">
              {product.fabric}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-400">Fit:</span>
            <span className="text-zinc-700 dark:text-zinc-300">{product.fit}</span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-zinc-500">Size:</span>
            <span className="text-[11px] font-bold text-primary">{selectedSize}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                  selectedSize === size
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm scale-105'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Order on WhatsApp CTA */}
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              Rs. {product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-zinc-400 line-through font-mono">
                Rs. {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 text-center"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text-contrast)',
            }}
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
