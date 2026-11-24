import { encryptGiftMessage, decryptGiftMessage, hashPin, generateGiftCode } from '../src/lib/crypto.js';
import { saveContactMessage, getAllContactMessages, saveGiftOrder, findGiftOrderByCode, updateGiftOrderReveal } from '../src/lib/db.js';

async function runTests() {
  console.log('--- 1. Testing Crypto & Gift Code ---');
  const code = generateGiftCode();
  console.log('Generated Gift Code:', code);
  if (!code.startsWith('MM-GIFT-')) throw new Error('Invalid code format');

  const secretNote = 'Happy Birthday Hamza! Wear this M Muzamil kurta with pride!';
  const cipher = encryptGiftMessage(secretNote);
  console.log('Encrypted Ciphertext:', cipher.substring(0, 30) + '...');
  
  const decrypted = decryptGiftMessage(cipher);
  console.log('Decrypted Plaintext:', decrypted);
  if (decrypted !== secretNote) throw new Error('Decryption mismatch!');
  console.log('Crypto tests passed!');

  console.log('\n--- 2. Testing Database Fallback & Persistence ---');
  const contact = await saveContactMessage({
    name: 'Tariq Mehmood',
    email: 'tariq.m@gmail.com',
    phone: '03055177531',
    subject: 'Bridal Groomsmen Kurtas',
    message: 'We need 10 custom size kurtas delivered in Muzaffargarh by next week.',
  });
  console.log('Saved contact message:', contact.id, contact.name);

  const allContacts = await getAllContactMessages();
  console.log('Total contacts in DB:', allContacts.length);

  const gift = await saveGiftOrder({
    giftCode: code,
    senderName: 'Usman Tariq',
    receiverName: 'Hamza Khan',
    productId: 'mm-kurta-01',
    productName: 'Imperial Emerald Handloom Festive Kurta',
    size: 'L',
    deliveryAddress: 'House 14, Al-Madina Colony, Multan Road',
    city: 'Muzaffargarh',
    phone: '03055177531',
    encryptedMessage: cipher,
    pinHash: hashPin('1234'),
    hasPin: true,
    burnAfterReading: true,
  });
  console.log('Saved gift order:', gift.id, gift.giftCode);

  const foundGift = await findGiftOrderByCode(code);
  if (!foundGift) throw new Error('Gift order not found!');
  console.log('Found gift order by code:', foundGift.giftCode, foundGift.receiverName);

  await updateGiftOrderReveal(code, true);
  const burnedGift = await findGiftOrderByCode(code);
  console.log('Burned status message:', burnedGift?.encryptedMessage);
  if (burnedGift?.encryptedMessage !== 'BURNED') throw new Error('Burn failed!');

  console.log('\n ALL BACKEND LOGIC VERIFIED AND WORKING 100%!');
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
