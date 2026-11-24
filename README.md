# M Muzamil — Premium Clothing Brand (Muzaffargarh, Pakistan)

A luxury, fully responsive 5-page e-commerce & bespoke sartorial website built for **M Muzamil**, based in Muzaffargarh, Pakistan. Built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and a flexible backend database adapter supporting **Supabase** with local persistence fallback.

---

## 🌟 Key Highlights & Signature Features

1. **Circular Color Theme Dial (Signature Feature)**:
   - Fixed on the right edge of the screen on desktop.
   - Around the circle, mini garment items (kurtas, oxford shirts, tees, hoodies) in signature colorways rotate and transform the entire website's palette (backgrounds, buttons, accents, borders, gradients).
   - Dynamic custom color picker generating harmonious palettes and auto-adjusting contrast (WCAG accessible).
   - Saved to `localStorage` so user preference persists across sessions.
   - On mobile screens, collapses into a sleek floating button that opens a tailored bottom drawer.

2. **Adaptive Scroll Progress Indicator**:
   - Custom pointer moves along the right edge as the user scrolls.
   - Automatically adapts color to match the active brand theme and maintains visibility on dark and light sections.

3. **Private Gift Message Feature (Page 3)**:
   - Send clothing to friends, family, or partners with a confidential encrypted personal note.
   - **AES-256 Military Grade Encryption**: Encrypted on the backend before database storage.
   - Generates a unique **Gift Code** (e.g., `MM-GIFT-A89K2`) and a scannable **QR Code** printed on a physical gift card inside the parcel.
   - **Secret Receiver Reveal Tab**: Recipient scans QR or enters code (plus optional 4-digit PIN), unlocking a romantic animated envelope reveal with celebratory confetti.
   - **Optional Self-Destruct**: Message burns permanently after the first reading.
   - Strictly protected: Private messages are hidden from the admin panel and public source code.
   - One-click WhatsApp dispatch to M Muzamil (`+92 305 5177531`).

4. **The 5 Responsive Pages**:
   - **Page 1: Home (`/`)**: Luxury editorial hero, brand pillars, featured clothing showcase, signature gift teaser, Muzaffargarh atelier story, WhatsApp consultation banner.
   - **Page 2: Collection (`/collection`)**: Filterable product catalogue (T-Shirts, Oxford & Linen Shirts, Festive Kurta, Hoodies), search, price sorting, and direct "Order on WhatsApp" button on every product with pre-filled message.
   - **Page 3: Send a Gift (`/gift`)**: Dual-mode interactive terminal (Send a Gift with AES encryption + Reveal Your Message).
   - **Page 4: About (`/about`)**: Brand heritage, South Punjab textile legacy, Muzaffargarh workshop gallery, artisan tailoring values.
   - **Page 5: Contact (`/contact`)**: Direct phone (`0305 5177531`), email (`muzammilabas804@gmail.com`), city (`Muzaffargarh`), working database contact form, direct WhatsApp button, and interactive map embed.
   - **Bonus: Admin Dashboard (`/admin`)**: Password-protected management dashboard to view orders and contact inquiries (encrypted messages stay masked for customer privacy).

---

## 📁 Project Folder Structure

```
c:/Users/DELL/Downloads/wear/
├── public/
│   └── images/                       # Real placeholder photos (easily replaceable)
│       ├── hero-model.jpg
│       ├── hero-lifestyle.jpg
│       ├── product-tshirt-black.jpg
│       ├── product-oversized-tee-sage.jpg
│       ├── product-oxford-shirt-blue.jpg
│       ├── product-linen-shirt-beige.jpg
│       ├── product-casual-check-shirt.jpg
│       ├── product-kurta-emerald.jpg
│       ├── product-kurta-ivory.jpg
│       ├── product-hoodie-charcoal.jpg
│       ├── product-hoodie-dune.jpg
│       ├── workshop-cutting.jpg
│       ├── workshop-stitching.jpg
│       ├── workshop-fabrics.jpg
│       ├── about-founder.jpg
│       ├── gift-box.jpg
│       └── logo.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts      # Working contact form submission API
│   │   │   ├── gift/
│   │   │   │   ├── create/route.ts   # AES encrypt + QR code + DB save
│   │   │   │   └── reveal/route.ts   # Rate limited AES decrypt + self-destruct
│   │   │   ├── products/route.ts     # Products catalogue API
│   │   │   └── admin/
│   │   │       ├── login/route.ts    # Admin auth
│   │   │       ├── orders/route.ts   # Admin gift orders list (masked secrets)
│   │   │       └── contacts/route.ts # Admin contact messages list
│   │   ├── collection/page.tsx       # Page 2: Product grid & WhatsApp order
│   │   ├── gift/page.tsx             # Page 3: Private Gift Message terminal
│   │   ├── about/page.tsx            # Page 4: Atelier story & workshop
│   │   ├── contact/page.tsx          # Page 5: Contact, form, WhatsApp, map
│   │   ├── admin/page.tsx            # Admin management console
│   │   ├── globals.css               # Dynamic CSS variables & Tailwind directives
│   │   ├── layout.tsx                # Root layout with Navbar, Footer, ThemeDial, ScrollProgress
│   │   └── page.tsx                  # Page 1: Home Lookbook
│   ├── components/
│   │   ├── Navbar.tsx                # Glassmorphic header with mobile drawer
│   │   ├── Footer.tsx                # Muzaffargarh brand hallmarks & contact links
│   │   ├── ThemeDial.tsx             # Signature circular clothing color wheel
│   │   ├── ScrollProgress.tsx        # Dynamic scroll arrow indicator
│   │   ├── ProductCard.tsx           # Product card with size pills & WhatsApp order
│   │   └── GiftCardReveal.tsx        # Animated envelope & secret card decryption
│   ├── data/
│   │   └── products.ts               # Catalogue dataset & WhatsApp URL generators
│   ├── lib/
│   │   ├── theme.ts                  # Theme presets, contrast math, DOM CSS variables
│   │   ├── crypto.ts                 # AES-256 encryption, decryption, PIN hashing
│   │   └── db.ts                     # Dual-engine DB (Supabase + local fallback)
│   └── types/
│       └── index.ts                  # TypeScript types
├── supabase-schema.sql               # Ready-to-run Supabase database migration
├── .env.example                      # Template environment variables
├── .env.local                        # Local development variables
├── tailwind.config.ts                # Tailwind config mapped to CSS variables
├── next.config.mjs                   # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm** or **pnpm**

### 2. Installation
Clone or navigate to the repository folder:
```bash
cd c:\Users\DELL\Downloads\wear
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Review `.env.local` to customize keys if desired:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
GIFT_SECRET_KEY=m_muzamil_luxury_secret_gift_key_2026_super_secure!
ADMIN_PASSWORD=muzamil2026
NEXT_PUBLIC_WHATSAPP_NUMBER=923055177531
NEXT_PUBLIC_CONTACT_EMAIL=muzammilabas804@gmail.com
NEXT_PUBLIC_LOCATION_CITY=Muzaffargarh, Pakistan

# Supabase (Optional for local test; auto-falls back to local JSON store if empty)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup (1-Click SQL)

The project includes an automatic dual-engine database adapter (`src/lib/db.ts`):
- When Supabase credentials are provided, it persists directly to Supabase Postgres.
- When Supabase credentials are absent, it operates seamlessly with local storage (`data/local-db.json`) so the website never crashes.

### To connect your Supabase project:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase-schema.sql` from this repository, paste the contents into the SQL Editor, and click **Run**.
4. Retrieve your **Project URL** and **API Keys** from **Project Settings → API**.
5. Add them to your `.env.local` or Vercel Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## ☁️ Step-by-Step Vercel Deployment Guide

### Option 1: Deploy with Vercel CLI
1. Log in to Vercel:
   ```bash
   npx vercel login
   ```
2. Deploy to preview:
   ```bash
   npx vercel
   ```
3. Deploy to production:
   ```bash
   npx vercel --prod
   ```

### Option 2: Deploy via GitHub / GitLab / Bitbucket
1. Initialize git and push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: M Muzamil Clothing Brand website"
   git branch -M main
   git remote add origin https://github.com/your-username/m-muzamil-clothing.git
   git push -u origin main
   ```
2. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `m-muzamil-clothing` repository.
4. Under **Environment Variables**, add the variables from `.env.example`:
   - `GIFT_SECRET_KEY`: Any long secret string for AES-256 encryption.
   - `ADMIN_PASSWORD`: Your chosen admin portal password.
   - `NEXT_PUBLIC_APP_URL`: Your Vercel production URL (e.g. `https://m-muzamil.vercel.app`).
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `923055177531`
   - `NEXT_PUBLIC_CONTACT_EMAIL`: `muzammilabas804@gmail.com`
   - `NEXT_PUBLIC_LOCATION_CITY`: `Muzaffargarh, Pakistan`
   - *(Optional)* `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
5. Click **"Deploy"**. Your site will be live worldwide in less than 2 minutes!

---

## 📸 Replacing Placeholder Images with Your Own Photos

All images are stored in `/public/images/` with clear filenames. Simply drop your own `.jpg` files with the same filenames to replace them instantly:

| File Name | Purpose | Recommended Dimensions |
| :--- | :--- | :--- |
| `hero-model.jpg` | Homepage Main Editorial Model Photo | 800 x 1000 px |
| `hero-lifestyle.jpg` | Homepage Secondary Lifestyle Banner | 1200 x 800 px |
| `product-tshirt-black.jpg` | Signature Pima Cotton T-Shirt | 800 x 1000 px |
| `product-oversized-tee-sage.jpg`| Heavyweight Boxy Street T-Shirt | 800 x 1000 px |
| `product-oxford-shirt-blue.jpg` | Executive Giza Cotton Oxford Shirt | 800 x 1000 px |
| `product-linen-shirt-beige.jpg` | French Linen Resort Shirt | 800 x 1000 px |
| `product-casual-check-shirt.jpg`| Artisan Casual Check Shirt | 800 x 1000 px |
| `product-kurta-emerald.jpg` | Imperial Emerald Festive Kurta | 800 x 1000 px |
| `product-kurta-ivory.jpg` | Ivory Jacquard Kurta | 800 x 1000 px |
| `product-hoodie-charcoal.jpg` | Obsidian Heavyweight Fleece Hoodie | 800 x 1000 px |
| `product-hoodie-dune.jpg` | Desert Dune Minimalist Pullover | 800 x 1000 px |
| `workshop-cutting.jpg` | Workshop Pattern Cutting Photo | 800 x 600 px |
| `workshop-stitching.jpg` | Tailoring & Machine Stitching Photo | 800 x 600 px |
| `workshop-fabrics.jpg` | Fabric Rolls & Sourcing Photo | 800 x 600 px |
| `about-founder.jpg` | Founder / Atelier Master Tailor Photo | 800 x 1000 px |
| `gift-box.jpg` | Signature Private Gift Packaging Photo | 800 x 800 px |
| `logo.svg` | Brand Logo Vector Graphic | Vector SVG |

---

## 🔒 Security & Privacy Notice

- **Gift Message Privacy**: Gift messages are encrypted on the backend with AES-256 before being saved. They are never rendered in page HTML, never returned by public APIs, and never displayed in the admin portal unless the recipient enters the exact Gift Code and PIN.
- **Rate Limiting**: The gift code reveal endpoint is rate-limited to prevent brute-force guessing.
- **Admin Portal**: Accessible at `/admin` using your configured `ADMIN_PASSWORD`.

---

## 📞 Brand Contacts

- **Brand**: M Muzamil
- **Headquarters**: Muzaffargarh, Punjab, Pakistan
- **Phone / WhatsApp**: 0305 5177531 (`+92 305 5177531`)
- **Email**: muzammilabas804@gmail.com
