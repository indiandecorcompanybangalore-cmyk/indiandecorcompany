import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { LeadProvider } from './context/LeadContext';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

// Modals & Floating
import { ConsultationModal } from './components/ui/ConsultationModal';
import { SuccessModal } from './components/ui/SuccessModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { WhatsAppFloating } from './components/ui/WhatsAppFloating';

// Eagerly loaded for instant first paint
import { HomePage } from './pages/HomePage';

// Lazy-loaded routes for lightning-fast initial load and minimal bundle size
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const MaterialsPage = React.lazy(() => import('./pages/MaterialsPage').then(m => ({ default: m.MaterialsPage })));
const ShopPage = React.lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const WholesalePage = React.lazy(() => import('./pages/WholesalePage').then(m => ({ default: m.WholesalePage })));
const ManufacturingPage = React.lazy(() => import('./pages/ManufacturingPage').then(m => ({ default: m.ManufacturingPage })));
const BlogPage = React.lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LocationsPage = React.lazy(() => import('./pages/LocationsPage').then(m => ({ default: m.LocationsPage })));
const LocationDetailPage = React.lazy(() => import('./pages/LocationDetailPage').then(m => ({ default: m.LocationDetailPage })));
const LegalPage = React.lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0F1013] text-[#FFFFFF]">
      <ScrollToTop />
      <Header />

      <main className="flex-grow">
        <React.Suspense fallback={<div style={{ minHeight: '80vh', backgroundColor: '#0F1013' }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/shop/:category/:productSlug" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/furniture-wholesale" element={<WholesalePage />} />
            <Route path="/furniture-manufacturer" element={<ManufacturingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/" element={<LocationsPage />} />
            <Route path="/locations/:slug" element={<LocationDetailPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms-of-service" element={<LegalPage />} />
            <Route path="/shipping-policy" element={<LegalPage />} />
            <Route path="/refund-policy" element={<LegalPage />} />
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', padding: '160px 24px 100px 24px' }}>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: '#FFFFFF', marginBottom: '16px' }}>
                    404 — Page Not Found
                  </h1>
                  <p style={{ color: '#9CA3AF', marginBottom: '28px' }}>
                    The space you are seeking does not exist or has been relocated.
                  </p>
                  <a href="/" className="btn-primary">
                    Return to IDC Home
                  </a>
                </div>
              }
            />
          </Routes>
        </React.Suspense>
      </main>

      <Footer />

      {/* Global Overlays & Utilities */}
      <ConsultationModal />
      <SuccessModal />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <WhatsAppFloating />

      {/* Mobile Persistent Bottom Navigation matching Mockup */}
      <MobileBottomNav />
    </div>

  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <LeadProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </LeadProvider>
      </Router>
    </HelmetProvider>
  );
}
