'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, MessageCircle, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CATEGORIES = [
  { id: 'all', label: 'All Garments' },
  { id: 't-shirts', label: 'Premium T-Shirts' },
  { id: 'shirts', label: 'Oxford & Linen Shirts' },
  { id: 'kurta', label: 'Festive Kurta & Eastern' },
  { id: 'hoodies', label: 'Hoodies & Fleece' },
];

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>M Muzamil Collection</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50">
          The Full Wardrobe Lookbook
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Explore our range of breathable Pima cotton tees, crisp Egyptian Giza button-downs, handloom silk kurtas, and structured heavyweight French terry fleece. Order seamlessly via WhatsApp.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'shadow-md scale-105'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
              }`}
              style={
                selectedCategory === cat.id
                  ? {
                      backgroundColor: 'var(--primary)',
                      color: 'var(--text-contrast)',
                    }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search and Sort controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabric, style..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Product Results Counter */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>Showing {filteredProducts.length} clothing items</span>
        <span>All prices in Pakistani Rupee (PKR) • Cash on Delivery</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8">
          <p className="font-serif text-xl font-bold text-zinc-800 dark:text-zinc-200">
            No garments match your filter criteria
          </p>
          <p className="text-xs text-zinc-500 mt-2 mb-6">
            Try resetting your search query or choosing another clothing category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--text-contrast)',
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Floating Concierge Banner */}
      <div className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-zinc-100">
            Looking for Custom Sizing or Wedding Wardrobe?
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            We provide bespoke tailored cuts for corporate teams, wedding groomsmen, and individual customers. Send your chest, shoulder, and waist measurements directly on WhatsApp.
          </p>
        </div>
        <a
          href="https://wa.me/923055177531?text=Assalam-o-Alaikum%20M%20Muzamil!%20I%20want%20custom%20sizes%20for%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--text-contrast)',
          }}
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Chat with Master Tailor (0305 5177531)</span>
        </a>
      </div>

    </div>
  );
}
