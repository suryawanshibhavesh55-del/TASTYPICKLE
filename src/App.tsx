import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { CartDrawer } from './components/cart/CartDrawer';
import { WhatsAppFloatingButton } from './components/layout/WhatsAppFloatingButton';
import { Footer } from './components/layout/Footer';

// Customer Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { VegPickles } from './pages/VegPickles';
import { NonVegPickles } from './pages/NonVegPickles';
import { ComboPacks } from './pages/ComboPacks';
import { ProductDetails } from './pages/ProductDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { TrackOrder } from './pages/TrackOrder';

// Admin System
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminProducts } from './admin/pages/AdminProducts';
import { AdminOrders } from './admin/pages/AdminOrders';
import { AdminOrderDetail } from './admin/pages/AdminOrderDetail';
import { AdminCustomers } from './admin/pages/AdminCustomers';
import { AdminSettings } from './admin/pages/AdminSettings';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Customer Storefront Layout Wrapper
const StorefrontLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] relative">
      <ScrollToTop />
      
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Desktop Horizontal Navigation */}
      <Navbar />

      {/* Mobile Animated Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Customer Page Outlet */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
            {/* Customer Storefront Routes */}
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/veg-pickle" element={<VegPickles />} />
              <Route path="/non-veg-pickle" element={<NonVegPickles />} />
              <Route path="/combo-packs" element={<ComboPacks />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/track-order" element={<TrackOrder />} />
            </Route>

            {/* Standalone Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Console Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </ProductProvider>
    </AdminAuthProvider>
  </BrowserRouter>
  );
};

export default App;
