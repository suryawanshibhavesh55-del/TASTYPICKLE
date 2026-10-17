import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Truck,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminOrders: React.FC = () => {
  const { token } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get('status') || 'All'
  );

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      let url = '/api/admin/orders';
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'All') {
        params.append('status', statusFilter);
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
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, token]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const statusBadges: Record<string, string> = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    Processing: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    'Out for Delivery': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const paymentBadges: Record<string, string> = {
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Failed: 'bg-rose-50 text-rose-700 border-rose-200',
    Refunded: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const filterTabs = [
    'All',
    'Pending',
    'Confirmed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track customer orders, update statuses, and assign courier AWB tracking numbers
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setStatusFilter(tab);
              if (tab === 'All') {
                searchParams.delete('status');
              } else {
                searchParams.set('status', tab);
              }
              setSearchParams(searchParams);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              statusFilter === tab
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between"
      >
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID (#TP-...), Customer, Phone, or AWB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTimeout(fetchOrders, 50);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center animate-pulse space-y-3">
            <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-semibold">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No matching orders found</p>
            <p className="text-xs text-slate-400 mt-1">
              Try switching status filters or clear search query.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Order ID</th>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Items</th>
                    <th className="py-3.5 px-6">Total Amount</th>
                    <th className="py-3.5 px-6">Payment</th>
                    <th className="py-3.5 px-6">Order Status</th>
                    <th className="py-3.5 px-6">Courier Tracking</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {orders.map((order) => {
                    const statusClass =
                      statusBadges[order.orderStatus] ||
                      'bg-slate-100 text-slate-700 border-slate-200';
                    const paymentClass =
                      paymentBadges[order.paymentStatus] ||
                      'bg-slate-100 text-slate-700 border-slate-200';
                    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });

                    return (
                      <tr key={order.orderId} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900">
                          <Link
                            to={`/admin/orders/${order.orderId}`}
                            className="text-red-700 hover:underline"
                          >
                            {order.orderId}
                          </Link>
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-800">
                            {order.customer?.fullName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {order.customer?.phone}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {order.customer?.city}, {order.customer?.state}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="font-semibold text-slate-800">
                            {order.items?.length || 0} pickle jar(s)
                          </span>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">
                            {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                          </p>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="font-extrabold text-slate-900">₹{order.grandTotal}</div>
                          <div className="text-[10px] text-slate-400">
                            (incl. ₹{order.deliveryCharge || 80} delivery)
                          </div>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${paymentClass}`}
                          >
                            {order.paymentStatus || 'Pending'}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {order.paymentProvider || 'Razorpay'}
                          </div>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusClass}`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap text-xs">
                          {order.tracking?.trackingId ? (
                            <div className="space-y-0.5">
                              <div className="font-bold text-purple-700 flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5" />
                                <span>{order.tracking.courierName || 'Courier'}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                AWB: {order.tracking.trackingId}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">No tracking set</span>
                          )}
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap text-slate-500 text-xs">
                          {formattedDate}
                        </td>

                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <Link
                            to={`/admin/orders/${order.orderId}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-bold text-xs transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Manage</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-100">
              {orders.map((order) => {
                const statusClass =
                  statusBadges[order.orderStatus] ||
                  'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <div key={order.orderId} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          to={`/admin/orders/${order.orderId}`}
                          className="font-extrabold text-sm text-red-700"
                        >
                          {order.orderId}
                        </Link>
                        <p className="text-xs font-semibold text-slate-800 mt-0.5">
                          {order.customer?.fullName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {order.customer?.phone} • {order.customer?.city}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 text-base">
                          ₹{order.grandTotal}
                        </span>
                        <span
                          className={`block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusClass}`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    {order.tracking?.trackingId && (
                      <div className="p-2 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 text-xs flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{order.tracking.courierName}</span>
                        </span>
                        <span className="font-mono text-[11px]">{order.tracking.trackingId}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        {order.items?.length || 0} item(s) •{' '}
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>

                      <Link
                        to={`/admin/orders/${order.orderId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage Order</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
