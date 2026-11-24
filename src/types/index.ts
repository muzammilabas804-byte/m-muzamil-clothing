export interface Product {
  id: string;
  name: string;
  category: 't-shirts' | 'shirts' | 'kurta' | 'hoodies';
  price: number; // in PKR
  originalPrice?: number;
  description: string;
  fabric: string;
  fit: string;
  colors: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  image: string;
  badge?: 'Bestseller' | 'New Arrival' | 'Limited Edition' | 'Signature';
  featured?: boolean;
}

export interface GiftOrder {
  id: string;
  giftCode: string;
  senderName: string;
  receiverName: string;
  productId: string;
  productName: string;
  size: string;
  deliveryAddress: string;
  city: string;
  phone: string;
  encryptedMessage: string;
  pinHash?: string | null;
  hasPin: boolean;
  burnAfterReading: boolean;
  revealedAt?: string | null;
  revealCount: number;
  qrCodeUrl?: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface ColorTheme {
  id: string;
  name: string;
  garmentName: string; // e.g. "Emerald Polo", "Sapphire Oxford", "Terracotta Tee"
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  bgMain: string;
  bgSurface: string;
  bgCard: string;
  borderColor: string;
  textMain: string;
  textMuted: string;
  textContrast: string;
  isDark: boolean;
}
