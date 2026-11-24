'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Mail, Gift, ShieldAlert, CheckCircle, RefreshCw, EyeOff, Search } from 'lucide-react';
import { ContactMessage, GiftOrder } from '@/types';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'orders' | 'contacts'>('orders');
  const [orders, setOrders] = useState<GiftOrder[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.authorized) {
        throw new Error('Invalid Admin Password. Check ADMIN_PASSWORD in .env.local.');
      }

      setIsAuthenticated(true);
      fetchAdminData();
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    setRefreshing(true);
    try {
      const [ordersRes, contactsRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/contacts'),
      ]);

      const ordersData = await ordersRes.json();
      const contactsData = await contactsRes.json();

      if (ordersData.orders) setOrders(ordersData.orders);
      if (contactsData.contacts) setContacts(contactsData.contacts);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              M Muzamil Admin Portal
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Restricted management portal for orders and inquiries.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password (e.g. muzamil2026)"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary font-mono text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--text-contrast)',
              }}
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Unlock className="w-4 h-4" />}
              <span>Authenticate</span>
            </button>
          </form>

          <p className="text-[11px] text-zinc-400">
            Default password: <code className="font-mono text-zinc-600 dark:text-zinc-300">muzamil2026</code> (Configure in .env.local)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Store Management Console
          </span>
          <h1 className="font-serif text-3xl font-black text-zinc-900 dark:text-zinc-50">
            M Muzamil Admin Dashboard
          </h1>
          <p className="text-xs text-zinc-500">
            Muzaffargarh, Pakistan • Connected to Database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            disabled={refreshing}
            className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-primary text-primary'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Gift Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'contacts'
              ? 'border-primary text-primary'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Inquiries ({contacts.length})</span>
        </button>
      </div>

      {/* TAB 1: GIFT ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <EyeOff className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>Strict Privacy Policy Active:</strong> Gift messages are encrypted and hidden from the admin panel to honor customer confidentiality. Only recipient address, product, and code are visible for fulfillment.
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Gift Code</th>
                    <th className="py-3.5 px-4">Recipient & City</th>
                    <th className="py-3.5 px-4">Sender</th>
                    <th className="py-3.5 px-4">Garment & Size</th>
                    <th className="py-3.5 px-4">Address / Phone</th>
                    <th className="py-3.5 px-4">Security</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="py-3.5 px-4 font-mono font-bold text-primary">
                        {o.giftCode}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">
                          {o.receiverName}
                        </div>
                        <div className="text-[11px] text-zinc-500">{o.city}</div>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-700 dark:text-zinc-300">
                        {o.senderName}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[180px]">
                          {o.productName}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-bold">
                          Size: {o.size}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-zinc-800 dark:text-zinc-200 truncate max-w-[200px]">
                          {o.deliveryAddress}
                        </div>
                        <div className="text-zinc-500 font-mono text-[11px]">{o.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600">
                          {o.hasPin ? 'PIN-Locked' : 'Open'}
                        </span>
                        {o.burnAfterReading && (
                          <span className="ml-1 text-[10px] text-rose-500 font-bold">Burn</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTACT INQUIRIES */}
      {activeTab === 'contacts' && (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 font-bold">
                <tr>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Sender</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="py-3.5 px-4 text-zinc-500 whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-zinc-800 dark:text-zinc-200">{c.phone}</div>
                      <div className="text-zinc-500 text-[11px]">{c.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-primary">
                      {c.subject}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700 dark:text-zinc-300 max-w-sm">
                      <p className="line-clamp-2">{c.message}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(c.name)}!%20This%20is%20M%20Muzamil%20Clothing.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 inline-block"
                      >
                        Reply on WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
