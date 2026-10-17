import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, Zap } from 'lucide-react';
import { useCart, DELIVERY_FEE } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { OrderModal } from '../checkout/OrderModal';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    generateWhatsAppCartUrl,
  } = useCart();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="absolute inset-y-0 right-0 max-w-[420px] w-full bg-cream-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E2DA] bg-cream-100">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-pickle-800" />
                <span className="font-serif text-xl font-bold text-stone-900">Your Basket</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pickle-800 text-white">
                  {totalItems}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-cream-200 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream-200/80 mx-auto flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-800">Your basket is empty</h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                      Explore our handcrafted Indian pickles and add your favorite veg or non-veg varieties.
                    </p>
                  </div>
                  <Link
                    to="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-pickle-800 text-white text-xs font-semibold hover:bg-pickle-700 transition-colors"
                  >
                    Browse Pickles <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-stone-500 pb-2 border-b border-stone-200">
                    <span>Selected Pickles</span>
                    <button
                      onClick={clearCart}
                      className="text-stone-400 hover:text-spicered transition-colors text-[11px] underline"
                    >
                      Clear all
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4 p-3 rounded-2xl bg-white border border-[#E7E2DA] shadow-sm hover:border-pickle-700/40 transition-colors"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-18 h-18 w-20 h-20 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-stone-800 truncate pr-2">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className="text-stone-400 hover:text-spicered p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-cream-200 text-stone-600">
                              {item.selectedSize}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-pickle-800">
                              {item.product.category === 'veg' ? 'Veg' : 'Non-Veg'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-cream-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-stone-800 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs sm:text-sm font-bold text-stone-900 font-serif">
                              ₹{(item.product.price || 95) * item.quantity}
                            </span>
                            <span className="text-[10px] text-stone-400 block">
                              ₹{item.product.price || 95} each
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Order Now and WhatsApp Order Buttons */}
            {cart.length > 0 && (() => {
              const subtotal = cart.reduce((sum, item) => sum + (item.product.price || 95) * item.quantity, 0);
              const finalAmount = subtotal + DELIVERY_FEE;
              return (
                <div className="p-6 border-t border-[#E7E2DA] bg-cream-100 space-y-3.5">
                  <div className="space-y-1.5 border-b border-stone-200 pb-3 text-xs">
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Items Subtotal ({totalItems} {totalItems === 1 ? 'jar' : 'jars'})</span>
                      <span className="font-semibold text-stone-900">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Delivery Charges</span>
                      <span className="font-semibold text-stone-900">₹{DELIVERY_FEE}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-0.5">
                    <div>
                      <span className="font-bold text-sm text-stone-900 block">Final Amount</span>
                      <span className="text-[10px] text-stone-500">Original Price + ₹{DELIVERY_FEE} Delivery</span>
                    </div>
                    <span className="font-serif font-bold text-2xl text-stone-900">
                      ₹{finalAmount}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsOrderModalOpen(true)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-spicered text-white text-sm font-bold shadow-lg hover:bg-red-700 transition-all active:scale-[0.99]"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Order Now • ₹{finalAmount}</span>
                    </button>

                    <a
                      href={generateWhatsAppCartUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white border border-[#25D366] text-[#1EBE5D] text-xs font-semibold hover:bg-emerald-50 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#1EBE5D]" />
                      <span>Or Enquire via WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-stone-500">
                    Flat ₹{DELIVERY_FEE} delivery across India • Online Payment (UPI / QR / Net Banking)
                  </p>
                </div>
              );
            })()}
          </motion.div>

          {/* Cart Order Modal */}
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            items={cart}
            onOrderSuccess={() => {
              clearCart();
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
