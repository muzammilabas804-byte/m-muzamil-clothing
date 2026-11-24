import { NextRequest, NextResponse } from 'next/server';
import { findGiftOrderByCode, updateGiftOrderReveal } from '@/lib/db';
import { decryptGiftMessage, hashPin } from '@/lib/crypto';

// In-memory brute force rate limiter for gift code attempts
interface RateLimitRecord {
  attempts: number;
  lastAttempt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record) {
    rateLimitMap.set(key, { attempts: 1, lastAttempt: now });
    return false;
  }
  // Reset window after 15 minutes
  if (now - record.lastAttempt > 15 * 60 * 1000) {
    rateLimitMap.set(key, { attempts: 1, lastAttempt: now });
    return false;
  }
  record.attempts += 1;
  record.lastAttempt = now;
  return record.attempts > 6; // Max 6 attempts per 15 minutes
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { giftCode, pin } = body;

    if (!giftCode || typeof giftCode !== 'string') {
      return NextResponse.json({ error: 'Valid gift code is required.' }, { status: 400 });
    }

    const normalizedCode = giftCode.trim().toUpperCase();

    // Check rate limit on code
    if (isRateLimited(normalizedCode)) {
      return NextResponse.json(
        { error: 'Too many incorrect attempts for this gift code. Please try again after 15 minutes.' },
        { status: 429 }
      );
    }

    // Lookup order in database
    const order = await findGiftOrderByCode(normalizedCode);
    if (!order) {
      return NextResponse.json(
        { error: 'No gift package found with this code. Please check your gift card and retry.' },
        { status: 404 }
      );
    }

    // Check if the message has already burned
    if (order.encryptedMessage === 'BURNED' || (order.burnAfterReading && (order.revealCount || 0) >= 1)) {
      return NextResponse.json(
        {
          error: 'This private message was set to self-destruct after the first reading and has been securely erased.',
        },
        { status: 410 }
      );
    }

    // Verify PIN if required
    if (order.hasPin && order.pinHash) {
      if (!pin) {
        return NextResponse.json(
          { error: 'This gift message is protected by a PIN. Please enter the security PIN.' },
          { status: 401 }
        );
      }
      const incomingHash = hashPin(pin);
      if (incomingHash !== order.pinHash) {
        return NextResponse.json(
          { error: 'Incorrect PIN. Please re-enter the 4-digit PIN set by the sender.' },
          { status: 401 }
        );
      }
    }

    // Decrypt the AES-256 message
    const decrypted = decryptGiftMessage(order.encryptedMessage);
    if (!decrypted) {
      return NextResponse.json(
        { error: 'Unable to decrypt this message. Please contact M Muzamil customer support.' },
        { status: 500 }
      );
    }

    // Handle self-destruct / burn-after-reading or increment reveal count
    const shouldBurn = Boolean(order.burnAfterReading);
    await updateGiftOrderReveal(normalizedCode, shouldBurn);

    return NextResponse.json({
      success: true,
      senderName: order.senderName,
      receiverName: order.receiverName,
      productName: order.productName,
      message: decrypted,
      createdAt: order.createdAt,
      burnAfterReading: order.burnAfterReading,
      burned: shouldBurn,
    });
  } catch (err: any) {
    console.error('Gift reveal API error:', err);
    return NextResponse.json(
      { error: 'Failed to reveal message. Please check the code and try again.' },
      { status: 500 }
    );
  }
}
