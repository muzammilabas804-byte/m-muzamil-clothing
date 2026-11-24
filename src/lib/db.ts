import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { ContactMessage, GiftOrder } from '@/types';

// Supabase initialization (active when env vars are present)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseKey.includes('your-supabase')
);

const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// Local persistent JSON fallback directory & file
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'local-db.json');

interface LocalDatabase {
  contacts: ContactMessage[];
  giftOrders: GiftOrder[];
}

function initLocalDb(): LocalDatabase {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialData: LocalDatabase = {
        contacts: [
          {
            id: 'c-demo-1',
            name: 'Ali Raza',
            email: 'aliraza.textiles@gmail.com',
            phone: '03001234567',
            subject: 'Bulk Kurta Inquiry for Wedding',
            message: 'Looking for 15 Imperial Emerald Kurtas for groomsmen tailored in Muzaffargarh. Please share size charts.',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            status: 'read',
          },
          {
            id: 'c-demo-2',
            name: 'Fatima Noor',
            email: 'fatima.design@gmail.com',
            phone: '03219876543',
            subject: 'Custom Tailored Linen Shirt',
            message: 'Loved the French linen resort collection. Do you offer custom chest measurements?',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: 'unread',
          },
        ],
        giftOrders: [
          {
            id: 'g-demo-1',
            giftCode: 'MM-GIFT-ROYAL',
            senderName: 'Usman Tariq',
            receiverName: 'Hamza Khan',
            productId: 'mm-kurta-01',
            productName: 'Imperial Emerald Handloom Festive Kurta',
            size: 'L',
            deliveryAddress: 'House 42, Officers Colony, Multan Road',
            city: 'Muzaffargarh',
            phone: '03055177531',
            encryptedMessage: 'U2FsdGVkX1+vG0qQ239p8G+9J1wN+DemoMessageEncrypted=', // demo ciphertext
            hasPin: false,
            burnAfterReading: false,
            revealCount: 0,
            status: 'processing',
            createdAt: new Date().toISOString(),
          },
        ],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading local db:', err);
    return { contacts: [], giftOrders: [] };
  }
}

function writeLocalDb(data: LocalDatabase): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db:', err);
  }
}

// -------------------------------------------------------------
// Database Operations (Supabase with seamless Local Fallback)
// -------------------------------------------------------------

export async function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...msg,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('contacts').insert([{
        id: newMsg.id,
        name: newMsg.name,
        email: newMsg.email,
        phone: newMsg.phone,
        subject: newMsg.subject,
        message: newMsg.message,
        status: newMsg.status,
        created_at: newMsg.createdAt,
      }]).select().single();

      if (!error && data) return newMsg;
      console.warn('Supabase insert contact error, falling back to local DB:', error);
    } catch (e) {
      console.warn('Supabase network error, using local fallback:', e);
    }
  }

  // Fallback to local file store
  const db = initLocalDb();
  db.contacts.unshift(newMsg);
  writeLocalDb(db);
  return newMsg;
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          phone: d.phone,
          subject: d.subject,
          message: d.message,
          createdAt: d.created_at || d.createdAt,
          status: d.status || 'unread',
        }));
      }
    } catch (e) {
      console.warn('Supabase contacts fetch error:', e);
    }
  }

  const db = initLocalDb();
  return db.contacts;
}

export async function saveGiftOrder(order: Omit<GiftOrder, 'id' | 'createdAt' | 'revealCount' | 'status'>): Promise<GiftOrder> {
  const newOrder: GiftOrder = {
    id: `gift_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...order,
    revealCount: 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('gift_orders').insert([{
        id: newOrder.id,
        gift_code: newOrder.giftCode,
        sender_name: newOrder.senderName,
        receiver_name: newOrder.receiverName,
        product_id: newOrder.productId,
        product_name: newOrder.productName,
        size: newOrder.size,
        delivery_address: newOrder.deliveryAddress,
        city: newOrder.city,
        phone: newOrder.phone,
        encrypted_message: newOrder.encryptedMessage,
        pin_hash: newOrder.pinHash || null,
        has_pin: newOrder.hasPin,
        burn_after_reading: newOrder.burnAfterReading,
        status: newOrder.status,
        reveal_count: 0,
        created_at: newOrder.createdAt,
      }]).select().single();

      if (!error && data) return newOrder;
      console.warn('Supabase insert gift error, using local fallback:', error);
    } catch (e) {
      console.warn('Supabase gift save exception:', e);
    }
  }

  const db = initLocalDb();
  db.giftOrders.unshift(newOrder);
  writeLocalDb(db);
  return newOrder;
}

export async function findGiftOrderByCode(giftCode: string): Promise<GiftOrder | null> {
  const normalizedCode = giftCode.trim().toUpperCase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('gift_orders')
        .select('*')
        .eq('gift_code', normalizedCode)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          giftCode: data.gift_code,
          senderName: data.sender_name,
          receiverName: data.receiver_name,
          productId: data.product_id,
          productName: data.product_name,
          size: data.size,
          deliveryAddress: data.delivery_address,
          city: data.city,
          phone: data.phone,
          encryptedMessage: data.encrypted_message,
          pinHash: data.pin_hash,
          hasPin: data.has_pin,
          burnAfterReading: data.burn_after_reading,
          revealedAt: data.revealed_at,
          revealCount: data.reveal_count || 0,
          createdAt: data.created_at,
          status: data.status,
        };
      }
    } catch (e) {
      console.warn('Supabase search gift error:', e);
    }
  }

  const db = initLocalDb();
  const found = db.giftOrders.find(
    (g) => g.giftCode.trim().toUpperCase() === normalizedCode
  );
  return found || null;
}

export async function updateGiftOrderReveal(giftCode: string, burned: boolean): Promise<void> {
  const normalizedCode = giftCode.trim().toUpperCase();

  if (supabase) {
    try {
      if (burned) {
        await supabase
          .from('gift_orders')
          .update({
            encrypted_message: 'BURNED',
            revealed_at: new Date().toISOString(),
            reveal_count: 1,
          })
          .eq('gift_code', normalizedCode);
      } else {
        const order = await findGiftOrderByCode(normalizedCode);
        if (order) {
          await supabase
            .from('gift_orders')
            .update({
              revealed_at: new Date().toISOString(),
              reveal_count: (order.revealCount || 0) + 1,
            })
            .eq('gift_code', normalizedCode);
        }
      }
      return;
    } catch (e) {
      console.warn('Supabase gift reveal update error:', e);
    }
  }

  const db = initLocalDb();
  const index = db.giftOrders.findIndex((g) => g.giftCode.toUpperCase() === normalizedCode);
  if (index !== -1) {
    db.giftOrders[index].revealCount = (db.giftOrders[index].revealCount || 0) + 1;
    db.giftOrders[index].revealedAt = new Date().toISOString();
    if (burned) {
      db.giftOrders[index].encryptedMessage = 'BURNED';
    }
    writeLocalDb(db);
  }
}

export async function getAllGiftOrdersAdmin(): Promise<Omit<GiftOrder, 'encryptedMessage'>[]> {
  let orders: GiftOrder[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase.from('gift_orders').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        orders = data.map((d: any) => ({
          id: d.id,
          giftCode: d.gift_code,
          senderName: d.sender_name,
          receiverName: d.receiver_name,
          productId: d.product_id,
          productName: d.product_name,
          size: d.size,
          deliveryAddress: d.delivery_address,
          city: d.city,
          phone: d.phone,
          encryptedMessage: '[ENCRYPTED_PRIVATE_SECRET]',
          hasPin: d.has_pin,
          burnAfterReading: d.burn_after_reading,
          revealedAt: d.revealed_at,
          revealCount: d.reveal_count || 0,
          createdAt: d.created_at,
          status: d.status,
        }));
      }
    } catch (e) {
      console.warn('Supabase admin gift fetch error:', e);
    }
  }

  if (orders.length === 0) {
    const db = initLocalDb();
    orders = db.giftOrders;
  }

  // STRICT PRIVACY: Mask encryptedMessage in admin response
  return orders.map((o) => ({
    ...o,
    encryptedMessage: '*** PRIVATE TO RECEIVER (ENCRYPTED) ***',
  }));
}
