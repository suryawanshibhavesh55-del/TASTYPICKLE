import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
} from 'lucide-react';

interface TrackingData {
  orderId: string;
  customerName: string;
  city: string;
  state: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  grandTotal: number;
  itemsCount: number;
  items: Array<{
    name: string;
    size: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  tracking: {
    courierName?: string;
    trackingId?: string;
    trackingUrl?: string;
  };
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
}

export const TrackOrder: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderId = searchParams.get('id') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<TrackingData | null>(null);
  const [error, setError] = useState('');
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  // Load local recent orders
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tastypickle_recent_orders') || '[]');
      if (Array.isArray(saved)) {
        setRecentOrders(saved);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const fetchTracking = async (idToFetch: string) => {
    const cleanId = idToFetch.trim();
    if (!cleanId) return;

    setIsLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}/track`);
      const data = await res.json();

      if (data.success && data.data) {
        setOrderData(data.data);
      } else {
        setError(data.message || `No order found with ID "${cleanId}". Please check and retry.`);
      }
    } catch (err) {
      console.error('Tracking fetch error:', err);
      setError('Unable to load order status. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      setOrderIdInput(initialOrderId);
      fetchTracking(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setSearchParams({ id: orderIdInput.trim() });
      fetchTracking(orderIdInput.trim());
    }
  };

  // 6 Standard Milestone Stages
  const stages = [
    { key: 'Placed', label: 'Order Placed', match: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'] },
    { key: 'Confirmed', label: 'Order Confirmed', match: ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'] },
    { key: 'Processing', label: 'Processing & Packed', match: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'] },
    { key: 'Shipped', label: 'Shipped via Courier', match: ['Shipped', 'Out for Delivery', 'Delivered'] },
    { key: 'Out for Delivery', label: 'Out for Delivery', match: ['Out for Delivery', 'Delivered'] },
    { key: 'Delivered', label: 'Delivered', match: ['Delivered'] },
  ];

  const isCancelled = orderData?.orderStatus === 'Cancelled';

  // Get index of current stage
  const getCurrentStageIndex = (status: string) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Out for Delivery':
        return 4;
      case 'Delivered':
        return 5;
      default:
        return 0;
    }
  };

  const currentIdx = orderData ? getCurrentStageIndex(orderData.orderStatus) : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800">
            <Truck className="w-3.5 h-3.5" />
            Live Shipment Tracker
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            Enter your TastyPickle Order ID (e.g. <span className="font-mono font-bold">TP-10245</span>) to check the real-time preparation and courier delivery progress.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#E7E2DA]">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Enter Order ID (e.g. TP-10245)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-200 text-sm font-semibold tracking-wide text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-stone-50/50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="py-3.5 px-7 rounded-2xl bg-[#A30813] hover:bg-[#8B0000] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Track Order</span>
              )}
            </button>
          </form>

          {/* Quick Recent Orders Chips from LocalStorage */}
          {recentOrders.length > 0 && !orderData && (
            <div className="mt-4 pt-4 border-t border-stone-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                Your Recent Orders On This Device:
              </p>
              <div className="flex flex-wrap gap-2">
                {recentOrders.slice(0, 4).map((ro) => (
                  <button
                    key={ro.orderId}
                    type="button"
                    onClick={() => {
                      setOrderIdInput(ro.orderId);
                      setSearchParams({ id: ro.orderId });
                      fetchTracking(ro.orderId);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 text-xs font-mono font-bold transition-colors"
                  >
                    <span>{ro.orderId}</span>
                    <span className="text-[10px] text-stone-400 font-sans">
                      ({ro.items?.length || 0} items)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-bold">Order Not Found</p>
              <p className="mt-0.5 text-rose-600 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Tracking Details View */}
        {orderData && (
          <div className="bg-white rounded-3xl border border-[#E7E2DA] shadow-sm overflow-hidden space-y-6 p-6 sm:p-8 animate-fadeIn">
            {/* Order Header Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-serif text-2xl font-black text-stone-900 tracking-tight">
                    Order {orderData.orderId}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isCancelled
                        ? 'bg-rose-100 text-rose-800'
                        : orderData.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {orderData.orderStatus}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Placed on {new Date(orderData.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>Delivering to {orderData.city}, {orderData.state}</span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
                  Total Amount
                </p>
                <p className="text-2xl font-black text-stone-900">₹{orderData.grandTotal}</p>
                <p className="text-[11px] text-stone-400">Payment: {orderData.paymentMethod} ({orderData.paymentStatus})</p>
              </div>
            </div>

            {/* Cancelled Notice */}
            {isCancelled && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                This order has been marked as <strong>Cancelled</strong>. If you have questions, please reach out to our WhatsApp helpline.
              </div>
            )}

            {/* Milestone Progress Timeline */}
            {!isCancelled && (
              <div className="space-y-4 py-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Shipment Progress Timeline
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
                  {stages.map((stage, idx) => {
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={stage.key} className="relative flex items-start gap-4">
                        <div
                          className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white transition-all ${
                            isCurrent
                              ? 'bg-red-700 ring-4 ring-red-100 shadow-md'
                              : isPassed
                              ? 'bg-emerald-600'
                              : 'bg-stone-200 text-stone-400'
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-stone-400" />
                          )}
                        </div>

                        <div>
                          <p
                            className={`text-sm font-bold ${
                              isCurrent
                                ? 'text-red-700'
                                : isPassed
                                ? 'text-stone-900'
                                : 'text-stone-400'
                            }`}
                          >
                            {stage.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-stone-500 mt-0.5 font-medium">
                              Current status: {orderData.orderStatus}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Courier Tracking Section */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5 space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Truck className="w-4 h-4 text-red-700" />
                <span>Courier Service & Dispatch Details</span>
              </div>

              {orderData.tracking?.trackingId ? (
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Courier Partner</p>
                      <p className="font-bold text-stone-800 mt-0.5">
                        {orderData.tracking.courierName || 'Standard Express'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Tracking / AWB Number</p>
                      <p className="font-mono font-bold text-stone-900 mt-0.5">
                        {orderData.tracking.trackingId}
                      </p>
                    </div>
                  </div>

                  {orderData.tracking.trackingUrl ? (
                    <a
                      href={orderData.tracking.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <span>TRACK SHIPMENT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <p className="text-[11px] text-stone-500 italic">
                      Tracking ID: {orderData.tracking.trackingId}. Check updates on courier partner website.
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-500 leading-relaxed">
                  Tracking information will be available once your order has been shipped.
                </div>
              )}
            </div>

            {/* Items Ordered List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Items In This Order ({orderData.items.length})
              </h3>
              <div className="divide-y divide-stone-100">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden border border-stone-200 shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <Package className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-stone-800">{item.name}</p>
                        <p className="text-[11px] text-stone-400">
                          {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Footer */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Authentic Homemade Pickles from TastyPickle</span>
              </div>
              <Link to="/products" className="font-bold text-red-700 hover:underline">
                Explore More Pickles →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
