import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types/product';
import { CustomerPhoneModal } from '../components/common/CustomerPhoneModal';
import { PrivacyPolicyModal } from '../components/common/PrivacyPolicyModal';

interface CartContextType {
  cart: CartItem[];
  customerPhone: string | null;
  addToCart: (product: Product, selectedSize: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppCartUrl: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CART_STORAGE_KEY = 'tastypickle_cart_v1';
export const CUSTOMER_PHONE_STORAGE_KEY = 'tastypickle_customer_phone';
export const TASTYPICKLE_WHATSAPP_NUMBER = '919121382438';
export const DELIVERY_FEE = 80;

interface PendingCartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerPhone, setCustomerPhone] = useState<string | null>(() => {
    try {
      return localStorage.getItem(CUSTOMER_PHONE_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<PendingCartItem | null>(null);

  const syncCartToBackend = useCallback(async (phone: string, currentCart: CartItem[]) => {
    try {
      await fetch('/api/customer/sync-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phone,
          cartItems: currentCart,
        }),
      });
    } catch (e) {
      console.warn('Could not sync cart to backend:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const executeAddToCart = (product: Product, selectedSize: string, quantity: number = 1) => {
    let updatedCart: CartItem[] = [];

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        updatedCart = [...prev];
        updatedCart[existingIndex].quantity += quantity;
      } else {
        updatedCart = [...prev, { product, selectedSize, quantity }];
      }
      return updatedCart;
    });

    setIsCartOpen(true);

    const savedPhone = customerPhone || localStorage.getItem(CUSTOMER_PHONE_STORAGE_KEY);
    if (savedPhone) {
      setTimeout(() => {
        syncCartToBackend(savedPhone, updatedCart);
      }, 0);
    }
  };

  const addToCart = (product: Product, selectedSize: string, quantity: number = 1) => {
    const existingPhone = customerPhone || localStorage.getItem(CUSTOMER_PHONE_STORAGE_KEY);

    if (!existingPhone) {
      setPendingItem({ product, selectedSize, quantity });
      setIsPhoneModalOpen(true);
      return;
    }

    executeAddToCart(product, selectedSize, quantity);
  };

  const handlePhoneSubmit = async (phone: string, marketingConsent: boolean): Promise<boolean> => {
    try {
      const initialCartItem = pendingItem
        ? {
            productId: pendingItem.product.id,
            slug: pendingItem.product.slug,
            name: pendingItem.product.name,
            size: pendingItem.selectedSize,
            price: pendingItem.product.price || 95,
            quantity: pendingItem.quantity,
            image: pendingItem.product.images?.[0],
          }
        : undefined;

      // Call relative serverless API endpoint: POST /api/customers
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phone,
          marketingConsent,
          initialCartItem,
        }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // Fallback if server returned text or HTML error page
      }

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || (res.status === 500 ? 'Server temporarily unavailable. Please verify environment settings.' : 'Unable to save your number. Please try again.'));
      }

      const normalizedPhone = data.data?.phoneNumber || (phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '').slice(-10)}`);

      // 1. Save normalized phone to localStorage
      localStorage.setItem(CUSTOMER_PHONE_STORAGE_KEY, normalizedPhone);
      setCustomerPhone(normalizedPhone);
      setIsPhoneModalOpen(false);

      // 2. Automatically resume original Add to Basket action without requiring the customer to click again
      if (pendingItem) {
        executeAddToCart(pendingItem.product, pendingItem.selectedSize, pendingItem.quantity);
        setPendingItem(null);
      }

      return true;
    } catch (err: any) {
      console.error('Failed to capture customer phone:', err);
      throw err;
    }
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart(prev => {
      const nextCart = prev.filter(
        item => !(item.product.id === productId && item.selectedSize === selectedSize)
      );
      const savedPhone = customerPhone || localStorage.getItem(CUSTOMER_PHONE_STORAGE_KEY);
      if (savedPhone) {
        syncCartToBackend(savedPhone, nextCart);
      }
      return nextCart;
    });
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart(prev => {
      const nextCart = prev.map(item => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      });
      const savedPhone = customerPhone || localStorage.getItem(CUSTOMER_PHONE_STORAGE_KEY);
      if (savedPhone) {
        syncCartToBackend(savedPhone, nextCart);
      }
      return nextCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    const savedPhone = customerPhone || localStorage.getItem(CUSTOMER_PHONE_STORAGE_KEY);
    if (savedPhone) {
      syncCartToBackend(savedPhone, []);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppCartUrl = () => {
    if (cart.length === 0) {
      const msg = "Hello TastyPickle, I'm browsing your pickles catalogue and have a question about availability.";
      return `https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }

    const itemsText = cart
      .map(item => `• ${item.quantity} × ${item.product.name} (${item.selectedSize}) - ₹${(item.product.price || 95) * item.quantity}`)
      .join('\n');

    const subtotal = cart.reduce((sum, item) => sum + (item.product.price || 95) * item.quantity, 0);
    const finalAmount = subtotal + DELIVERY_FEE;

    const message = `Hello TastyPickle,\n\nI would like to order:\n${itemsText}\n\n*Items Subtotal:* ₹${subtotal}\n*Delivery Charges:* ₹${DELIVERY_FEE}\n*Final Amount:* ₹${finalAmount} (Online Payment)\n\nPlease share delivery confirmation and payment link.`;
    return `https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        customerPhone,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppCartUrl,
      }}
    >
      {children}

      {/* Customer Mobile Number Modal */}
      <CustomerPhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => {
          setIsPhoneModalOpen(false);
          setPendingItem(null);
        }}
        onSubmit={handlePhoneSubmit}
        onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
