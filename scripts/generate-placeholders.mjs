import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const images = [
  {
    filename: 'hero-model.jpg',
    title: 'M MUZAMIL',
    subtitle: 'HERO EDITORIAL LOOKBOOK (REPLACE WITH YOUR PHOTO)',
    category: 'Haute Couture Muzaffargarh',
    bgColor: '#18181b',
    accentColor: '#d4af37',
    icon: 'hero',
  },
  {
    filename: 'hero-lifestyle.jpg',
    title: 'CRAFTED ELEGANCE',
    subtitle: 'LIFESTYLE & HERITAGE (REPLACE WITH YOUR PHOTO)',
    category: 'M Muzamil Autumn / Winter',
    bgColor: '#0f172a',
    accentColor: '#38bdf8',
    icon: 'hero',
  },
  {
    filename: 'product-tshirt-black.jpg',
    title: 'SIGNATURE PIMA TEE',
    subtitle: 'ONYX BLACK 220 GSM (REPLACE WITH YOUR PHOTO)',
    category: 'T-Shirts Collection',
    bgColor: '#171717',
    accentColor: '#52525b',
    icon: 'tshirt',
  },
  {
    filename: 'product-oversized-tee-sage.jpg',
    title: 'HEAVYWEIGHT STREET TEE',
    subtitle: 'SAGE MIST BOXY FIT (REPLACE WITH YOUR PHOTO)',
    category: 'T-Shirts Collection',
    bgColor: '#2a3b32',
    accentColor: '#86efac',
    icon: 'tshirt',
  },
  {
    filename: 'product-oxford-shirt-blue.jpg',
    title: 'EXECUTIVE GIZA OXFORD',
    subtitle: 'SKYLINE BLUE SLIM FIT (REPLACE WITH YOUR PHOTO)',
    category: 'Formal Shirts',
    bgColor: '#1e293b',
    accentColor: '#60a5fa',
    icon: 'shirt',
  },
  {
    filename: 'product-linen-shirt-beige.jpg',
    title: 'FRENCH LINEN RESORT',
    subtitle: 'DESERT SAND NORMANDY (REPLACE WITH YOUR PHOTO)',
    category: 'Linen Shirts',
    bgColor: '#292524',
    accentColor: '#f5d0fe',
    icon: 'shirt',
  },
  {
    filename: 'product-casual-check-shirt.jpg',
    title: 'ARTISAN MICRO-CHECK',
    subtitle: 'NAVY & WINE TWILL (REPLACE WITH YOUR PHOTO)',
    category: 'Casual Shirts',
    bgColor: '#1e1b4b',
    accentColor: '#f43f5e',
    icon: 'shirt',
  },
  {
    filename: 'product-kurta-emerald.jpg',
    title: 'IMPERIAL EMERALD KURTA',
    subtitle: 'RAW SILK & COTTON (REPLACE WITH YOUR PHOTO)',
    category: 'Festive Eastern Wear',
    bgColor: '#064e3b',
    accentColor: '#34d399',
    icon: 'kurta',
  },
  {
    filename: 'product-kurta-ivory.jpg',
    title: 'IVORY JACQUARD KURTA',
    subtitle: 'SELF TEXTURED WEAVE (REPLACE WITH YOUR PHOTO)',
    category: 'Festive Eastern Wear',
    bgColor: '#33271e',
    accentColor: '#fde047',
    icon: 'kurta',
  },
  {
    filename: 'product-hoodie-charcoal.jpg',
    title: 'OBSIDIAN HEAVY HOODIE',
    subtitle: '450 GSM FRENCH TERRY (REPLACE WITH YOUR PHOTO)',
    category: 'Winter Streetwear',
    bgColor: '#09090b',
    accentColor: '#a1a1aa',
    icon: 'hoodie',
  },
  {
    filename: 'product-hoodie-dune.jpg',
    title: 'DESERT DUNE PULLOVER',
    subtitle: '380 GSM BRUSHED FLEECE (REPLACE WITH YOUR PHOTO)',
    category: 'Winter Streetwear',
    bgColor: '#451a03',
    accentColor: '#fbbf24',
    icon: 'hoodie',
  },
  {
    filename: 'workshop-cutting.jpg',
    title: 'PRECISION PATTERN CUTTING',
    subtitle: 'MUZAFFARGARH ATELIER (REPLACE WITH YOUR PHOTO)',
    category: 'The Craftsmanship',
    bgColor: '#1e293b',
    accentColor: '#f59e0b',
    icon: 'workshop',
  },
  {
    filename: 'workshop-stitching.jpg',
    title: 'ARTISAN TAILORING & FINISHING',
    subtitle: 'HAND-STITCHED DETAILS (REPLACE WITH YOUR PHOTO)',
    category: 'The Craftsmanship',
    bgColor: '#172554',
    accentColor: '#38bdf8',
    icon: 'workshop',
  },
  {
    filename: 'workshop-fabrics.jpg',
    title: 'PURE NATURAL FABRICS',
    subtitle: 'COMBED COTTON & PURE LINEN (REPLACE WITH YOUR PHOTO)',
    category: 'Material Sourcing',
    bgColor: '#0f172a',
    accentColor: '#10b981',
    icon: 'workshop',
  },
  {
    filename: 'about-founder.jpg',
    title: 'M MUZAMIL ATELIER',
    subtitle: 'ROOTS IN MUZAFFARGARH (REPLACE WITH YOUR PHOTO)',
    category: 'Heritage & Vision',
    bgColor: '#18181b',
    accentColor: '#eab308',
    icon: 'about',
  },
  {
    filename: 'gift-box.jpg',
    title: 'SIGNATURE PRIVATE GIFT BOX',
    subtitle: 'LUXURY PACKAGING WITH SECRET QR (REPLACE WITH YOUR PHOTO)',
    category: 'Exclusive Gifting',
    bgColor: '#271038',
    accentColor: '#c084fc',
    icon: 'gift',
  },
];

function getIconSvg(type, color) {
  switch (type) {
    case 'tshirt':
      return `<path d="M160 140 L260 210 L230 250 L190 230 L190 420 L90 420 L90 230 L50 250 L20 210 L120 140 C130 160 150 160 160 140 Z" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/>`;
    case 'shirt':
      return `<path d="M160 135 L260 200 L230 245 L190 225 L190 430 L90 430 L90 225 L50 245 L20 200 L120 135 C130 155 150 155 160 135 Z" fill="none" stroke="${color}" stroke-width="8"/><line x1="140" y1="160" x2="140" y2="430" stroke="${color}" stroke-width="4" stroke-dasharray="8 8"/><circle cx="140" cy="200" r="5" fill="${color}"/><circle cx="140" cy="260" r="5" fill="${color}"/><circle cx="140" cy="320" r="5" fill="${color}"/>`;
    case 'kurta':
      return `<path d="M150 120 L240 180 L215 225 L180 205 L180 440 L100 440 L100 205 L65 225 L40 180 L130 120" fill="none" stroke="${color}" stroke-width="8"/><rect x="132" y="120" width="16" height="150" fill="none" stroke="${color}" stroke-width="4"/><circle cx="140" cy="160" r="4" fill="${color}"/><circle cx="140" cy="200" r="4" fill="${color}"/><circle cx="140" cy="240" r="4" fill="${color}"/>`;
    case 'hoodie':
      return `<path d="M140 130 C120 100 160 100 140 130 M150 140 L250 200 L220 250 L190 230 L190 420 L90 420 L90 230 L60 250 L30 200 L130 140" fill="none" stroke="${color}" stroke-width="8"/><path d="M110 320 L170 320 L180 370 L100 370 Z" fill="none" stroke="${color}" stroke-width="4"/>`;
    case 'gift':
      return `<rect x="70" y="200" width="140" height="140" rx="8" fill="none" stroke="${color}" stroke-width="8"/><line x1="140" y1="200" x2="140" y2="340" stroke="${color}" stroke-width="8"/><line x1="70" y1="270" x2="210" y2="270" stroke="${color}" stroke-width="8"/><path d="M140 200 C110 150 70 170 100 200 C140 200 140 160 140 200 C140 160 140 200 180 200 C210 170 170 150 140 200" fill="none" stroke="${color}" stroke-width="6"/>`;
    default:
      return `<rect x="70" y="150" width="140" height="180" rx="12" fill="none" stroke="${color}" stroke-width="8"/><line x1="90" y1="200" x2="190" y2="200" stroke="${color}" stroke-width="4"/><line x1="90" y1="240" x2="190" y2="240" stroke="${color}" stroke-width="4"/><line x1="90" y1="280" x2="150" y2="280" stroke="${color}" stroke-width="4"/>`;
  }
}

function generateSvgContent(img) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="grad-${img.filename.replace(/[^a-z0-9]/gi, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${img.bgColor}"/>
      <stop offset="100%" stop-color="#050507"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="1000" fill="url(#grad-${img.filename.replace(/[^a-z0-9]/gi, '')})"/>
  <rect width="800" height="1000" fill="url(#grid)"/>

  <!-- Luxury Borders -->
  <rect x="30" y="30" width="740" height="940" fill="none" stroke="${img.accentColor}" stroke-opacity="0.3" stroke-width="1.5"/>
  <rect x="42" y="42" width="716" height="916" fill="none" stroke="${img.accentColor}" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Corner Ornaments -->
  <path d="M 30 60 L 60 30 M 740 30 L 770 60 M 30 940 L 60 970 M 770 940 L 740 970" stroke="${img.accentColor}" stroke-width="2"/>

  <!-- Header Category -->
  <text x="400" y="110" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="18" letter-spacing="8" fill="${img.accentColor}" font-weight="600">
    ${img.category.toUpperCase()}
  </text>
  <line x1="280" y1="130" x2="520" y2="130" stroke="${img.accentColor}" stroke-opacity="0.5" stroke-width="1"/>

  <!-- Center Icon Graphic -->
  <g transform="translate(260, 240) scale(1.0)">
    <circle cx="140" cy="270" r="160" fill="${img.accentColor}" fill-opacity="0.05" stroke="${img.accentColor}" stroke-opacity="0.15" stroke-width="2"/>
    <circle cx="140" cy="270" r="120" fill="none" stroke="${img.accentColor}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="6 6"/>
    ${getIconSvg(img.icon, img.accentColor)}
  </g>

  <!-- Product Title & Info -->
  <text x="400" y="720" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="32" letter-spacing="3" fill="#ffffff" font-weight="700">
    ${img.title}
  </text>

  <text x="400" y="765" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" letter-spacing="4" fill="${img.accentColor}" font-weight="500">
    ${img.subtitle}
  </text>

  <!-- Replace Hint Badge -->
  <rect x="180" y="820" width="440" height="46" rx="6" fill="rgba(255,255,255,0.06)" stroke="${img.accentColor}" stroke-width="1"/>
  <text x="400" y="850" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" letter-spacing="2" fill="#e2e8f0" font-weight="500">
    UPLOAD REPLACEMENT TO /public/images/${img.filename}
  </text>

  <!-- Brand Signature Footer -->
  <text x="400" y="920" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="15" letter-spacing="5" fill="rgba(255,255,255,0.4)">
    M MUZAMIL • MUZAFFARGARH, PAKISTAN
  </text>
</svg>`;
}

for (const img of images) {
  const filePath = path.join(IMAGES_DIR, img.filename);
  const svgContent = generateSvgContent(img);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
}

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <defs>
    <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect x="6" y="10" width="60" height="60" rx="8" fill="#18181b" stroke="url(#logo-gold)" stroke-width="2"/>
  <text x="36" y="52" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="32" font-weight="900" fill="url(#logo-gold)">M</text>
  <text x="50" y="62" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="800" fill="#ffffff">M</text>
  <text x="82" y="42" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="800" letter-spacing="3" fill="#ffffff">M MUZAMIL</text>
  <text x="84" y="62" font-family="'Inter', sans-serif" font-size="10" font-weight="600" letter-spacing="6" fill="#fbbf24">MUZAFFARGARH</text>
</svg>`;

fs.writeFileSync(path.join(IMAGES_DIR, 'logo.svg'), logoSvg, 'utf-8');
console.log('Successfully generated all placeholder images and logo!');
