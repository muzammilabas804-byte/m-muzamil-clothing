-- ========================================================
-- M MUZAMIL CLOTHING BRAND - SUPABASE SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor to set up tables
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CONTACT MESSAGES TABLE
create table if not exists public.contacts (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for searching contacts
create index if not exists idx_contacts_created on public.contacts (created_at desc);

-- 2. GIFT ORDERS TABLE
create table if not exists public.gift_orders (
  id text primary key,
  gift_code text unique not null,
  sender_name text not null,
  receiver_name text not null,
  product_id text not null,
  product_name text not null,
  size text not null,
  delivery_address text not null,
  city text not null,
  phone text not null,
  encrypted_message text not null,
  pin_hash text,
  has_pin boolean default false,
  burn_after_reading boolean default false,
  revealed_at timestamp with time zone,
  reveal_count integer default 0,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast gift code lookup
create index if not exists idx_gift_orders_code on public.gift_orders (gift_code);

-- Enable Row Level Security (RLS)
alter table public.contacts enable row level security;
alter table public.gift_orders enable row level security;

-- Policies: Allow anonymous inserts for website customers, restricted reads
create policy "Allow customer contact submission"
  on public.contacts for insert
  with check (true);

create policy "Allow customer gift order submission"
  on public.gift_orders for insert
  with check (true);

-- Allow service role full access (handled by server API routes)
