import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock,
  User,
  Phone,
  MapPin,
  Package,
  Calendar,
  AlertCircle,
  ExternalLink,
  Save,
  MessageCircle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

export const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAdminAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Status Form
  const [selectedStatus, setSelectedStatus] = useState<string>('Pending');
  const [statusNote, setStatusNote] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState('');

  // Tracking Form
  const [courierName, setCourierName] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [isUpdatingTracking, setIsUpdatingTracking] = useState(false);
  const [trackingSuccess, setTrackingSuccess] = useState('');

  const fetchOrder = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrder(data.data);
        setSelectedStatus(data.data.orderStatus || 'Pending');
        setCourierName(data.data.tracking?.courierName || '');
        setTrackingId(data.data.tracking?.trackingId || '');
        setTrackingUrl(data.data.tracking?.trackingUrl || '');
      } else {
        setError(data.message || 'Order not found');
      }
    } catch (err: any) {
      console.error('Fetch order error:', err);
      setError('Failed to fetch order details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id, token]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingStatus(true);
    setStatusSuccess('');
    setError('');

    try {
      const res = await fetch(`/api/admin/orders/${order.orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedStatus,
          note: statusNote.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
        setStatusSuccess(`Status updated to "${selectedStatus}"`);
        setStatusNote('');
        setTimeout(() => setStatusSuccess(''), 4000);
      } else {
        setError(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update status error:', err);
      setError('Network error while updating status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleUpdateTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingTracking(true);
    setTrackingSuccess('');
    setError('');

    try {
      const res = await fetch(`/api/admin/orders/${order.orderId}/tracking`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courierName: courierName.trim(),
          trackingId: trackingId.trim(),
          trackingUrl: trackingUrl.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
        setTrackingSuccess('Courier tracking details saved successfully!');
        setTimeout(() => setTrackingSuccess(''), 4000);
      } else {
        setError(data.message || 'Failed to update tracking');
      }
    } catch (err) {
      console.error('Update tracking error:', err);
      setError('Network error while updating tracking');
    } finally {
      setIsUpdatingTracking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center animate-pulse space-y-3">
        <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-semibold">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-4">
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
          <p className="text-sm font-bold">{error || 'Order not found'}</p>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-800 border-amber-300',
    Confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
    Processing: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    Shipped: 'bg-purple-100 text-purple-800 border-purple-300',
    'Out for Delivery': 'bg-cyan-100 text-cyan-800 border-cyan-300',
    Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Cancelled: 'bg-rose-100 text-rose-800 border-rose-300',
  };

  const paymentColors: Record<string, string> = {
    Paid: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Pending: 'bg-amber-100 text-amber-800 border-amber-300',
    Failed: 'bg-rose-100 text-rose-800 border-rose-300',
    Refunded: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Back to Orders List"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Order {order.orderId}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  statusColors[order.orderStatus] || 'bg-slate-100 text-slate-700'
                }`}
              >
                {order.orderStatus}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
                  paymentColors[order.paymentStatus] || 'bg-slate-100 text-slate-700'
                }`}
              >
                <CreditCard className="w-3 h-3" />
                <span>Payment: {order.paymentStatus || 'Pending'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Placed on {formattedDate}</p>
          </div>
        </div>

        {/* Customer WhatsApp Action */}
        <a
          href={`https://wa.me/91${order.customer?.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(
            `Hello ${order.customer?.fullName}, greetings from TastyPickle! Regarding your order ${order.orderId}...`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Customer</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Products, Order Breakdown, and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ordered Products Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                <span>Ordered Items ({order.items.length})</span>
              </h2>
            </div>

            <div className="p-6 divide-y divide-slate-100">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">{item.name}</h3>
                      <p className="text-[11px] text-slate-400">
                        Bottle: {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                      ₹{item.price * item.quantity}
                    </p>
                    <p className="text-[10px] text-slate-400">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown Footer */}
            <div className="bg-slate-50/70 p-6 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Delivery Charges</span>
                <span className="font-semibold text-slate-800">₹{order.deliveryCharge || 80}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-sm sm:text-base pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span>₹{order.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Razorpay Payment Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Payment & Transaction Details</span>
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  paymentColors[order.paymentStatus] || 'bg-slate-100 text-slate-700'
                }`}
              >
                {order.paymentStatus || 'Pending'}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Payment Method & Gateway
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {order.paymentMethod || 'Online Payment'} ({order.paymentProvider || 'Razorpay'})
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Signature Verification
                </p>
                <p className="text-sm font-semibold mt-0.5 flex items-center gap-1.5">
                  {order.razorpaySignatureVerified ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified (HMAC SHA-256)
                    </span>
                  ) : (
                    <span className="text-amber-700 font-semibold">
                      {order.paymentStatus === 'Paid' ? 'Verified' : 'Pending Verification'}
                    </span>
                  )}
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Razorpay Order ID
                </p>
                <p className="text-xs font-mono text-slate-700 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-200 truncate">
                  {order.razorpayOrderId || 'Not generated yet'}
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Razorpay Payment ID
                </p>
                <p className="text-xs font-mono text-slate-700 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-200 truncate">
                  {order.razorpayPaymentId || 'Awaiting customer capture'}
                </p>
              </div>

              {order.paidAt && (
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Payment Received At
                  </p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {new Date(order.paidAt).toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Owner Resend Notification Email
                </p>
                <p className="text-xs mt-0.5">
                  {order.ownerNotificationSent ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Dispatched to Owner ({order.ownerNotificationSentAt ? new Date(order.ownerNotificationSentAt).toLocaleTimeString('en-IN') : 'Confirmed'})
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      {order.paymentStatus === 'Paid' ? 'Pending dispatch' : 'Will dispatch automatically after payment'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-slate-500" />
              <span>Customer & Delivery Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Customer Name
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{order.customer?.fullName}</p>
              </div>

              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Phone Numbers
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {order.customer?.phone}
                  {order.customer?.altPhone && ` / ${order.customer.altPhone}`}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Shipping Address
                </p>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {order.customer?.address}
                  {order.customer?.landmark && <>, Landmark: {order.customer.landmark}</>}
                  <br />
                  <span className="font-semibold">
                    {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                  </span>
                </p>
              </div>

              {order.customer?.notes && (
                <div className="sm:col-span-2">
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Customer Order Note
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 italic">"{order.customer.notes}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Status History Audit */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Status Change Audit Log</span>
              </h2>

              <div className="space-y-2.5 pt-2">
                {order.statusHistory.map((h: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">{h.status}</span>
                      <span className="text-slate-400 ml-2">
                        {new Date(h.timestamp).toLocaleString('en-IN')}
                      </span>
                      {h.note && <p className="text-slate-500 text-[11px] mt-0.5">{h.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Admin Controls (Status & Courier Tracking) */}
        <div className="space-y-6">
          {/* Status Updater Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-700" />
              <span>Update Order Status</span>
            </h2>

            {statusSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                {statusSuccess}
              </div>
            )}

            <form onSubmit={handleUpdateStatus} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internal Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Packed in box #3 with bubble wrap"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingStatus}
                className="w-full py-2.5 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUpdatingStatus ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Order Status</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Courier Tracking System Card */}
          <div className="bg-white rounded-2xl border border-purple-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Courier & AWB Tracking</h2>
                <p className="text-[11px] text-slate-500">Live courier tracking info for customer</p>
              </div>
            </div>

            {trackingSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                {trackingSuccess}
              </div>
            )}

            <form onSubmit={handleUpdateTracking} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Courier Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhivery, Blue Dart, DTDC, India Post"
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tracking ID / AWB Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1234567890"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tracking URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://delhivery.com/track/package/..."
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingTracking}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUpdatingTracking ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving Tracking...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Courier Tracking</span>
                  </>
                )}
              </button>
            </form>

            {/* Test Customer View Button */}
            <div className="pt-3 border-t border-slate-100">
              <Link
                to={`/track-order?id=${order.orderId}`}
                target="_blank"
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Customer Tracking Page</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
