import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { encryptGiftMessage, hashPin, generateGiftCode } from '@/lib/crypto';
import { saveGiftOrder } from '@/lib/db';
import { PRODUCTS } from '@/data/products';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      senderName,
      receiverName,
      productId,
      size,
      deliveryAddress,
      city,
      phone,
      message,
      pin,
      burnAfterReading,
    } = body;

    // Validation
    if (!senderName || !receiverName || !productId || !deliveryAddress || !city || !phone || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields including personal message, address, and recipient name.' },
        { status: 400 }
      );
    }

    const selectedProduct = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    const giftCode = generateGiftCode();
    
    // Encrypt the private message using AES-256
    const encryptedMessage = encryptGiftMessage(message);
    const pinHash = pin && pin.trim().length > 0 ? hashPin(pin.trim()) : null;

    // Generate QR Code data URL pointing to the reveal URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mmuzamil.vercel.app';
    const revealUrl = `${appUrl}/gift?code=${giftCode}`;
    const qrCodeUrl = await QRCode.toDataURL(revealUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });

    // Save gift order to database (Supabase or local JSON fallback)
    const savedOrder = await saveGiftOrder({
      giftCode,
      senderName: senderName.trim().slice(0, 100),
      receiverName: receiverName.trim().slice(0, 100),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      size: size || 'M',
      deliveryAddress: deliveryAddress.trim().slice(0, 250),
      city: city.trim().slice(0, 50),
      phone: phone.trim().slice(0, 30),
      encryptedMessage,
      pinHash,
      hasPin: Boolean(pinHash),
      burnAfterReading: Boolean(burnAfterReading),
      qrCodeUrl,
    });

    return NextResponse.json({
      success: true,
      giftCode: savedOrder.giftCode,
      qrCodeUrl,
      revealUrl,
      productName: selectedProduct.name,
      receiverName: savedOrder.receiverName,
      senderName: savedOrder.senderName,
      burnAfterReading: savedOrder.burnAfterReading,
      hasPin: savedOrder.hasPin,
    });
  } catch (err: any) {
    console.error('Gift create API error:', err);
    return NextResponse.json(
      { error: 'Failed to create gift order. Please try again.' },
      { status: 500 }
    );
  }
}
