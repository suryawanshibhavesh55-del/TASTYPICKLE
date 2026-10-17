import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Home,
  Truck,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import { Product } from '../../types/product';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

export interface OrderItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onOrderSuccess?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(() => {
    try {
      const saved = localStorage.getItem('tastypickle_customer_phone');
      if (saved) {
        return saved.replace(/\D/g, '').slice(-10);
      }
    } catch {
      // ignore
    }
    return '';
  });
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Andhra Pradesh');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price || 95) * item.quantity, 0);
  const deliveryCharge = 80; // Flat ₹80 delivery fee
  const grandTotal = subtotal + deliveryCharge;

  // Dynamically load Razorpay standard checkout script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = 'Please enter your detailed house/flat no and street address';
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your city';
    }

    const cleanPin = pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setPaymentError('');
    setIsSubmitting(true);

    try {
      // 1. Ensure Razorpay checkout script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Could not connect to Razorpay secure checkout. Please check your internet connection and try again.');
      }

      // 2. Request backend to create Razorpay Order with verified server pricing
      const createRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: fullName.trim(),
            phone: phone.trim(),
            altPhone: altPhone.trim() || undefined,
            email: email.trim() || undefined,
            address: address.trim(),
            landmark: landmark.trim() || undefined,
            city: city.trim(),
            state: stateName,
            pincode: pincode.trim(),
            notes: notes.trim() || undefined,
          },
          items: items.map(item => ({
            productId: item.product.id,
            slug: item.product.slug,
            name: item.product.name,
            size: item.selectedSize,
            price: item.product.price || 95,
            quantity: item.quantity,
            image: item.product.images?.[0],
          })),
          notes: notes.trim() || undefined,
        }),
      });

      const orderData = await createRes.json();
      if (!orderData.success || !orderData.orderId) {
        throw new Error(orderData.message || 'Failed to initialize payment gateway.');
      }

      const internalId = orderData.internalOrderId;

      // 3. Configure and open Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // strictly in paise
        currency: orderData.currency || 'INR',
        name: 'TastyPickle',
        description: `Order #${internalId} • Authentic Andhra Pickles`,
        image: '/assets/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: fullName.trim(),
          contact: phone.trim(),
          email: email.trim(),
        },
        theme: {
          color: '#991b1b', // TastyPickle brand red
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setPaymentError('Payment window was closed. Your delivery address has been kept safe so you can retry whenever ready.');
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          setIsSubmitting(true);
          try {
            // 4. Server-side HMAC SHA-256 signature verification
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: internalId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setOrderId(internalId);
              setPaymentId(response.razorpay_payment_id);

              // Save order locally for instant client-side retrieval
              try {
                const existing = JSON.parse(localStorage.getItem('tastypickle_recent_orders') || '[]');
                existing.unshift({
                  orderId: internalId,
                  paymentId: response.razorpay_payment_id,
                  customer: { fullName, phone, address, city, state: stateName, pincode },
                  items,
                  subtotal,
                  deliveryCharge,
                  grandTotal,
                  date: new Date().toISOString(),
                });
                localStorage.setItem('tastypickle_recent_orders', JSON.stringify(existing.slice(0, 20)));
              } catch (err) {
                console.error('Failed to save order to localStorage', err);
              }

              setIsPlaced(true);
              if (onOrderSuccess) onOrderSuccess();
            } else {
              setPaymentError(verifyData.message || 'Payment signature verification failed. Please contact TastyPickle support.');
            }
          } catch (vErr: any) {
            console.error('Payment verification request failed:', vErr);
            setPaymentError('Network connection issue while verifying payment. If your account was debited, your order will be automatically confirmed shortly.');
          } finally {
            setIsSubmitting(false);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (failResp: any) => {
        setIsSubmitting(false);
        const desc = failResp.error?.description || failResp.error?.reason || 'Payment was declined by bank or UPI app.';
        setPaymentError(`Payment failed: ${desc}`);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Order checkout error:', err);
      setIsSubmitting(false);
      setPaymentError(err.message || 'Something went wrong while connecting to payment.');
    }
  };

  const generateWhatsAppMessage = () => {
    const itemsFormatted = items
      .map(item => `• ${item.quantity} × ${item.product.name} (${item.selectedSize}) - ₹${(item.product.price || 95) * item.quantity}`)
      .join('\n');

    const msg = `*NEW VERIFIED ORDER: #${orderId}*\n\n` +
      `*Payment Status:* Paid via Razorpay (ID: ${paymentId || 'Verified'})\n` +
      `*Customer Details:*\n` +
      `Name: ${fullName.trim()}\n` +
      `Phone: ${phone.trim()}${altPhone ? ` / ${altPhone.trim()}` : ''}\n` +
      `Address: ${address.trim()}\n` +
      `${landmark ? `Landmark: ${landmark.trim()}\n` : ''}` +
      `City: ${city.trim()}, State: ${stateName} - ${pincode.trim()}\n` +
      `${notes ? `Delivery Note: ${notes.trim()}\n` : ''}\n` +
      `*Ordered Pickles (${totalQuantity} items):*\n` +
      `${itemsFormatted}\n\n` +
      `*Items Subtotal:* ₹${subtotal}\n` +
      `*Delivery Charges:* ₹${deliveryCharge}\n` +
      `*Final Total Paid:* ₹${grandTotal} (Online Payment / Razorpay)\n\n` +
      `Please confirm receipt and share courier tracking when dispatched.`;

    return `https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleClose = () => {
    setIsPlaced(false);
    setPaymentError('');
    setPaymentId('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-stone-950/65 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E7E2DA] overflow-hidden my-8 z-10"
        >
          <div className="px-6 py-4 bg-white border-b border-[#E7E2DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-spicered/10 text-spicered">
                <Truck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                  {isPlaced ? 'Order Confirmation' : 'Order Now — Delivery Details'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {isPlaced ? 'Your order is recorded!' : '100% Online Payment (UPI / QR / Net Banking)'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {!isPlaced ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                {/* Payment Error Alert Banner */}
                {paymentError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start justify-between gap-2 shadow-xs">
                    <span>{paymentError}</span>
                    <button
                      type="button"
                      onClick={() => setPaymentError('')}
                      className="text-rose-400 hover:text-rose-700 p-0.5 rounded transition-colors"
                      aria-label="Dismiss error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Order Item(s) Preview Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E7E2DA] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span className="uppercase tracking-wider font-bold text-[10px] text-stone-400">
                      Your Order Summary
                    </span>
                    <span>{totalQuantity} {totalQuantity === 1 ? 'bottle' : 'bottles'}</span>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {items.map((item, idx) => (
                      <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-contain bg-[#F8F5EE] border border-stone-200 p-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                            {item.product.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-stone-500">
                            <span className="font-semibold text-pickle-800 bg-cream-200/80 px-1.5 py-0.5 rounded">
                              {item.selectedSize}
                            </span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-stone-900 font-serif">
                            ₹{(item.product.price || 95) * item.quantity}
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            ₹{item.product.price || 95} each
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal and Shipping Breakdown */}
                  <div className="pt-2.5 border-t border-stone-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal ({totalQuantity} {totalQuantity === 1 ? 'bottle' : 'bottles'})</span>
                      <span className="font-semibold text-stone-900">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery Charges</span>
                      <span className="font-bold text-stone-900">₹{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-100">
                      <span>Final Amount to Pay</span>
                      <span className="font-serif text-base sm:text-lg text-pickle-900">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name <span className="text-spicered">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all ${
                          errors.fullName ? 'border-red-500' : 'border-[#D6CFC4]'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Mobile Number <span className="text-spicered">*</span>
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-2.5 bg-stone-100 border border-r-0 border-[#D6CFC4] rounded-l-xl text-xs font-semibold text-stone-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit number"
                        className={`w-full px-3 py-2.5 bg-white border rounded-r-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all ${
                          errors.phone ? 'border-red-500' : 'border-[#D6CFC4]'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email Address for Order Confirmation & Receipt */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Email Address <span className="text-stone-400 font-normal">(For instant order receipt)</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Auto-Receipt via Email
                    </span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all placeholder:text-stone-400"
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1">
                    We will send your order invoice and tracking confirmation to this email right after payment.
                  </p>
                </div>

                {/* Detailed Street Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Delivery Address (House / Flat No, Street, Area) <span className="text-spicered">*</span>
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Flat 302, Sri Nilayam, Plot 45, Street No 4, Madhapur"
                      className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all ${
                        errors.address ? 'border-red-500' : 'border-[#D6CFC4]'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Landmark & PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Landmark <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Water Tank"
                      className="w-full px-3 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      PIN Code <span className="text-spicered">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="6-digit PIN"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all ${
                          errors.pincode ? 'border-red-500' : 'border-[#D6CFC4]'
                        }`}
                      />
                    </div>
                    {errors.pincode && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      City <span className="text-spicered">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Hyderabad / Vijayawada"
                      className={`w-full px-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all ${
                        errors.city ? 'border-red-500' : 'border-[#D6CFC4]'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      State
                    </label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all"
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Other State">Other Indian State</option>
                    </select>
                  </div>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Delivery Note / Request <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra spicy / Call before delivery"
                    className="w-full px-3 py-2 bg-white border border-[#D6CFC4] rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-pickle-700 transition-all"
                  />
                </div>

                {/* Payment terms callout */}
                <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200/70 flex items-start gap-2.5 text-xs text-red-900">
                  <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Online Payment Only:</strong> No Cash on Delivery (COD). We accept secure online payments via UPI (Google Pay, PhonePe, Paytm, BHIM) and Net Banking. Payment details will be confirmed with your order!
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-spicered hover:bg-red-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connecting to Razorpay...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Pay Online ₹{grandTotal} (UPI / Cards / Net Banking)</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success / Placed Confirmation Screen */
              <div className="py-4 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Payment Verified via Razorpay</span>
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">
                    Thank You, {fullName.split(' ')[0]}!
                  </h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Your order reference is <span className="font-bold text-stone-900 font-mono text-sm">{orderId}</span>. Your payment has been received and our kitchen team is preparing your fresh pickles.
                  </p>
                  {paymentId && (
                    <p className="text-[11px] text-stone-500 font-mono pt-1">
                      Payment ID: <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">{paymentId}</span>
                    </p>
                  )}
                  {email.trim() && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Confirmation receipt dispatched to <strong>{email.trim()}</strong></span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Order Summary & Delivery Details Card */}
                <div className="p-4 rounded-2xl bg-white border border-[#E7E2DA] text-left text-xs space-y-3 shadow-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Delivery Address
                    </span>
                    <p className="font-bold text-stone-900">{fullName} ({phone})</p>
                    <p className="text-stone-600 leading-relaxed">
                      {address}, {landmark ? `${landmark}, ` : ''}{city}, {stateName} - {pincode}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Items Ordered ({totalQuantity} {totalQuantity === 1 ? 'bottle' : 'bottles'})
                    </span>
                    <ul className="space-y-1.5 text-stone-800">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs">
                          <span>{item.quantity} × {item.product.name} ({item.selectedSize})</span>
                          <span className="font-semibold text-stone-900 font-serif">
                            ₹{(item.product.price || 95) * item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-stone-100 space-y-1 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery Charges</span>
                      <span>₹{deliveryCharge}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm">
                    <span>Final Total (Online Payment)</span>
                    <span className="font-serif text-lg text-pickle-900">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Share button for owner & customer receipt */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send Order Copy to WhatsApp Dispatch</span>
                  </a>

                  <Link
                    to={`/track-order?id=${orderId}`}
                    onClick={handleClose}
                    className="w-full py-3 px-6 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Track Order Live Status</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-2.5 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
