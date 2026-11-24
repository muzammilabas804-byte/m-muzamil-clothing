import CryptoJS from 'crypto-js';

const FALLBACK_SECRET = 'm_muzamil_clothing_muzaffargarh_secure_aes_secret_key_2026';

function getSecretKey(): string {
  return process.env.GIFT_SECRET_KEY || FALLBACK_SECRET;
}

/**
 * Encrypts a private message using AES-256
 */
export function encryptGiftMessage(message: string): string {
  const secret = getSecretKey();
  return CryptoJS.AES.encrypt(message.trim(), secret).toString();
}

/**
 * Decrypts an AES-256 encrypted private message
 */
export function decryptGiftMessage(cipherText: string): string | null {
  try {
    const secret = getSecretKey();
    const bytes = CryptoJS.AES.decrypt(cipherText, secret);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (!originalText) return null;
    return originalText;
  } catch (err) {
    console.error('Failed to decrypt message:', err);
    return null;
  }
}

/**
 * Hash PIN for comparison without storing plaintext
 */
export function hashPin(pin: string): string {
  return CryptoJS.SHA256(pin.trim()).toString();
}

/**
 * Generates an elegant alphanumeric Gift Code e.g. MM-GIFT-A89K2
 */
export function generateGiftCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // readable without 0/O/1/I
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MM-GIFT-${code}`;
}
