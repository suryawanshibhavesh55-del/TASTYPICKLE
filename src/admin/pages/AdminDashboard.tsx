import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Clock,
  RefreshCw,
  Truck,
  CheckCircle2,
  XCircle,
  Users,
  IndianRupee,
  ArrowRight,
  Eye,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface DashboardData {
  totalProducts: number;
  totalOrders: number;
  statusCounts: {
    Pending: number;
    Confirmed: number;
    Processing: number;
    Shipped: number;
    'Out for Delivery': number;
    Delivered: number;
    Cancelled: number;
  };
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: any[];
}

export const AdminDashboard: React.FC = () => {
  const { token } = useAdminAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();
      if (resData.success) {
        setData(resData.data);
      } else {
        setError(resData.message || 'Failed to load dashboard data');
      }
    } catch (err: any) {
      console.error('Dashboard load error:', err);
      setError('Unable to reach server. Please ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-200 rounded-2xl p-5" />
          ))}
        </div>
        <div className="h-64 bg-white border border-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-semibold">{error || 'Failed to load dashboard'}</p>
        </div>
        <button
          onClick={fetchDashboard}
          className="px-4 py-2 bg-red-700 text-white rounded-xl text-xs font-bold hover:bg-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  const statusBadges: Record<string, string> = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    Processing: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    'Out for Delivery': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const metricCards = [
    {
      title: 'Total Revenue',
      value: `₹${data.totalRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'bg-emerald-500 text-white',
      border: 'border-emerald-100',
      sub: 'Excludes cancelled orders',
    },
    {
      title: 'Total Products',
      value: data.totalProducts,
      icon: Package,
      color: 'bg-blue-500 text-white',
      border: 'border-blue-100',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: data.totalOrders,
      icon: ShoppingCart,
      color: 'bg-indigo-500 text-white',
      border: 'border-indigo-100',
      link: '/admin/orders',
    },
    {
      title: 'Pending Orders',
      value: data.statusCounts.Pending || 0,
      icon: Clock,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-100',
      link: '/admin/orders?status=Pending',
    },
    {
      title: 'Processing Orders',
      value: (data.statusCounts.Processing || 0) + (data.statusCounts.Confirmed || 0),
      icon: RefreshCw,
      color: 'bg-purple-500 text-white',
      border: 'border-purple-100',
      link: '/admin/orders?status=Processing',
    },
    {
      title: 'Shipped Orders',
      value: (data.statusCounts.Shipped || 0) + (data.statusCounts['Out for Delivery'] || 0),
      icon: Truck,
      color: 'bg-cyan-500 text-white',
      border: 'border-cyan-100',
      link: '/admin/orders?status=Shipped',
    },
    {
      title: 'Delivered Orders',
      value: data.statusCounts.Delivered || 0,
      icon: CheckCircle2,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-100',
      link: '/admin/orders?status=Delivered',
    },
    {
      title: 'Cancelled Orders',
      value: data.statusCounts.Cancelled || 0,
      icon: XCircle,
      color: 'bg-rose-500 text-white',
      border: 'border-rose-100',
      link: '/admin/orders?status=Cancelled',
    },
    {
      title: 'Total Customers',
      value: data.totalCustomers,
      icon: Users,
      color: 'bg-slate-700 text-white',
      border: 'border-slate-100',
      link: '/admin/customers',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time business performance, store orders, and stock monitoring
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchDashboard}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
        </div>
      </div>

      {/* 9 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          const CardWrapper = card.link ? Link : 'div';
          return (
            <CardWrapper
              key={i}
              to={card.link || '#'}
              className={`bg-white rounded-2xl p-5 border ${card.border} shadow-xs hover:shadow-md transition-all flex items-start justify-between group ${
                card.link ? 'cursor-pointer' : ''
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  {card.value}
                </p>
                {card.sub && (
                  <p className="text-[11px] text-slate-400 font-medium mt-1">{card.sub}</p>
                )}
                {card.link && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View all</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div className={`p-3 rounded-2xl ${card.color} shadow-xs`}>
                <Icon className="w-5 h-5" />
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Recent Customer Orders</h2>
            <p className="text-xs text-slate-500">Live incoming customer orders from TastyPickle</p>
          </div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {data.recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No orders received yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Customer orders placed on the store will show up here instantly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Payment</th>
                  <th className="py-3.5 px-6">Order Status</th>
                  <th className="py-3.5 px-6">Tracking</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {data.recentOrders.map((order) => {
                  const statusClass =
                    statusBadges[order.orderStatus] || 'bg-slate-100 text-slate-700 border-slate-200';
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
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
                          {order.customer?.fullName || 'Customer'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {order.customer?.phone} • {order.customer?.city}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 text-xs whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                        ₹{order.grandTotal}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {order.paymentMethod || 'Online'}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusClass}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                        {order.tracking?.trackingId ? (
                          <span className="inline-flex items-center gap-1 text-purple-700 font-semibold">
                            <Truck className="w-3.5 h-3.5" />
                            <span>{order.tracking.courierName || 'Shipped'}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Not assigned</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <Link
                          to={`/admin/orders/${order.orderId}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-semibold text-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
