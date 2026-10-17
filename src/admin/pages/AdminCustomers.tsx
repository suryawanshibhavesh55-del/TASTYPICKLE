import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Phone,
  Calendar,
  IndianRupee,
  ShoppingBag,
  ShoppingCart,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

type TabType = 'All' | 'Visitor' | 'Cart Added' | 'Ordered' | 'Cart Abandoned';

export const AdminCustomers: React.FC = () => {
  const { token } = useAdminAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('All');

  // Customer Detail Drawer state
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [customerDetail, setCustomerDetail] = useState<any | null>(null);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      let url = '/api/admin/customers';
      const params = new URLSearchParams();
      if (activeTab !== 'All') {
        params.append('status', activeTab);
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCustomers(data.data);
      }
    } catch (err) {
      console.error('Fetch customers error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [token, activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers();
  };

  const openCustomerDrawer = async (cust: any) => {
    setSelectedCustomer(cust);
    setIsDetailLoading(true);
    setCustomerDetail(null);

    try {
      const identifier = cust._id || cust.phoneNumber;
      const res = await fetch(`/api/admin/customers/${encodeURIComponent(identifier)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCustomerDetail(data.data);
      }
    } catch (err) {
      console.error('Fetch customer detail error:', err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const getStatusBadge = (cust: any) => {
    if (cust.isCartAbandoned) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <AlertCircle className="w-3 h-3" />
          Cart Abandoned
        </span>
      );
    }

    switch (cust.status) {
      case 'Ordered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Ordered
          </span>
        );
      case 'Cart Added':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <ShoppingCart className="w-3 h-3" />
            Cart Added
          </span>
        );
      case 'Visitor':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3 h-3" />
            Visitor
          </span>
        );
    }
  };

  const tabs: { label: string; value: TabType }[] = [
    { label: 'All Customers', value: 'All' },
    { label: 'Cart Abandoned', value: 'Cart Abandoned' },
    { label: 'Cart Added', value: 'Cart Added' },
    { label: 'Ordered', value: 'Ordered' },
    { label: 'Visitors', value: 'Visitor' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-red-600" />
            <span>Customers</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Track visitors, live active carts, abandoned checkouts, and customer lifetime value.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-600 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs self-start sm:self-auto flex items-center gap-2">
          <span>Total Records:</span>
          <span className="text-sm font-black text-red-600">{customers.length}</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.value
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by 10-digit mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-slate-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-colors cursor-pointer"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTimeout(fetchCustomers, 0);
              }}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-16 text-center animate-pulse space-y-3">
            <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-semibold">Loading customer directory...</p>
          </div>
        ) : customers.length === 0 ? (
          <div className="p-16 text-center space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No customers found</p>
            <p className="text-xs text-slate-400">
              When shoppers click &quot;Add to Cart&quot; and enter their phone numbers, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="py-3.5 px-4">Mobile Number</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Cart Items</th>
                  <th className="py-3.5 px-4">Orders</th>
                  <th className="py-3.5 px-4">Total Spent</th>
                  <th className="py-3.5 px-4">First Visit</th>
                  <th className="py-3.5 px-4">Last Activity</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {customers.map((cust) => {
                  const firstVisit = new Date(cust.firstVisitAt || cust.createdAt).toLocaleDateString(
                    'en-IN',
                    { day: 'numeric', month: 'short', year: 'numeric' }
                  );
                  const lastActivity = new Date(cust.lastActivityAt || cust.updatedAt).toLocaleString(
                    'en-IN',
                    { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
                  );
                  const cartCount = (cust.cartItems || []).reduce(
                    (s: number, it: any) => s + (it.quantity || 1),
                    0
                  );

                  return (
                    <tr
                      key={cust.phoneNumber}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => openCustomerDrawer(cust)}
                    >
                      {/* Mobile */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                            🇮🇳
                          </span>
                          <div>
                            <span className="text-slate-900 font-black">
                              {cust.phoneNumber?.startsWith('+91') ? cust.phoneNumber : `+91 ${cust.phoneNumber}`}
                            </span>
                            {cust.marketingConsent && (
                              <span className="block text-[10px] text-emerald-600 font-semibold">
                                ✓ Marketing Opt-in
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">{getStatusBadge(cust)}</td>

                      {/* Cart Items */}
                      <td className="py-3.5 px-4">
                        {cartCount > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-extrabold text-[11px] border border-amber-200">
                              {cartCount} item{cartCount > 1 ? 's' : ''}
                            </span>
                            <span className="text-slate-400 font-bold text-[11px]">
                              (₹{cust.cartTotal})
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Empty</span>
                        )}
                      </td>

                      {/* Orders */}
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {cust.totalOrders || 0}
                      </td>

                      {/* Total Spent */}
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                      </td>

                      {/* First Visit */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {firstVisit}
                      </td>

                      {/* Last Activity */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {lastActivity}
                      </td>

                      {/* Actions */}
                      <td
                        className="py-3.5 px-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/91${cust.phoneNumber?.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(
                              `Hello from TastyPickle! How can we assist you with your pickle order today?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-[#25D366] hover:bg-emerald-100 transition-colors cursor-pointer"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => openCustomerDrawer(cust)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1 font-bold text-[11px] px-2.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                  🇮🇳
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedCustomer.phoneNumber?.startsWith('+91')
                      ? selectedCustomer.phoneNumber
                      : `+91 ${selectedCustomer.phoneNumber}`}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {getStatusBadge(customerDetail || selectedCustomer)}
                    <span className="text-[11px] text-slate-400">
                      Marketing: {selectedCustomer.marketingConsent ? 'Opted In' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/91${selectedCustomer.phoneNumber?.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(
                    `Hello from TastyPickle! We noticed you left some delicious pickles in your cart. Can we help you complete your order?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 text-[#25D366] hover:bg-emerald-100 transition-colors cursor-pointer"
                  title="WhatsApp Message"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {isDetailLoading ? (
                <div className="p-12 text-center animate-pulse space-y-2">
                  <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400">Loading details...</p>
                </div>
              ) : (
                <>
                  {/* Lifetime Value Metric Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Total Spent</p>
                      <p className="text-xl font-black text-slate-900 mt-1">
                        ₹{(customerDetail?.totalSpent || selectedCustomer.totalSpent || 0).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Orders Placed</p>
                      <p className="text-xl font-black text-slate-900 mt-1">
                        {customerDetail?.totalOrders || selectedCustomer.totalOrders || 0}
                      </p>
                    </div>
                  </div>

                  {/* Active / Abandoned Cart Items */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-red-600" />
                        <span>Current Cart Items</span>
                      </h4>
                      <span className="text-xs font-bold text-slate-500">
                        Total: ₹{customerDetail?.cartTotal || selectedCustomer.cartTotal || 0}
                      </span>
                    </div>

                    {(customerDetail?.cartItems || selectedCustomer.cartItems || []).length === 0 ? (
                      <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                        No active items in cart right now.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {(customerDetail?.cartItems || selectedCustomer.cartItems || []).map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                                  🍲
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-slate-900">{item.name}</p>
                                <p className="text-[11px] text-slate-400">
                                  Size: {item.size} • Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right font-black text-slate-900">
                              ₹{(Number(item.price) || 95) * (Number(item.quantity) || 1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Order History */}
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-red-600" />
                      <span>Order History</span>
                    </h4>

                    {(customerDetail?.orders || []).length === 0 ? (
                      <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                        No orders recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {customerDetail.orders.map((order: any) => (
                          <div
                            key={order.orderId}
                            className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between"
                          >
                            <div>
                              <Link
                                to={`/admin/orders/${order.orderId}`}
                                className="font-black text-xs text-red-600 hover:underline flex items-center gap-1"
                              >
                                <span>{order.orderId}</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </p>
                              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {order.orderStatus}
                              </span>
                            </div>

                            <div className="text-right">
                              <p className="font-black text-xs text-slate-900">
                                ₹{order.grandTotal}
                              </p>
                              <Link
                                to={`/admin/orders/${order.orderId}`}
                                className="text-[11px] text-red-600 hover:underline font-bold mt-1 inline-block"
                              >
                                View Order →
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
