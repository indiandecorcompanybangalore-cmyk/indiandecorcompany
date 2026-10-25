import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight, User, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLead } from '../../context/LeadContext';
import { MobileDrawer } from './MobileDrawer';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const { openConsultation } = useLead();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDropdownEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const servicesSubmenu = [
    { title: 'Residential Interiors', desc: 'Luxury villas, penthouses & residences', path: '/services/residential-interiors/' },
    { title: 'Commercial & Retail', desc: 'High-end workspaces & flagship showrooms', path: '/services/commercial-interiors/' },
    { title: 'Modular Kitchens & Furniture', desc: 'German hardware & bespoke finishes', path: '/services/modular-furniture/' },
    { title: 'Custom Furniture & Joinery', desc: 'Precision engineered luxury woodwork', path: '/services/custom-furniture/' },
    { title: 'Turnkey Fitout Execution', desc: 'Design, MEP, civil & turnkey handover', path: '/services/turnkey-interior-solutions/' }
  ];

  const shopSubmenu = [
    { title: 'Sofas & Seating', desc: 'Feather-topped modular lounges', path: '/shop/?cat=sofas-seating' },
    { title: 'Dining Furniture', desc: 'Italian marble & solid wood tables', path: '/shop/?cat=dining-furniture' },
    { title: 'Beds & Bedroom', desc: 'Upholstered platform beds & nightstands', path: '/shop/?cat=beds-bedroom' },
    { title: 'Architectural Lighting', desc: 'Solid brass pendants & chandeliers', path: '/shop/?cat=lighting' },
    { title: 'Wall Décor & Panels', desc: 'Textured fluted acoustic panels', path: '/shop/?cat=wall-decor' },
    { title: 'Explore Full Catalog →', desc: 'Browse all 250+ curated furniture pieces', path: '/shop/', highlight: true }
  ];

  return (
    <>
      <header className="modern-navbar-wrapper">
        <div
          className="modern-navbar-container"
          style={{
            backgroundColor: isScrolled ? 'rgba(15, 17, 23, 0.96)' : 'rgba(18, 20, 26, 0.88)',
            boxShadow: isScrolled
              ? '0 12px 36px -6px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(197, 168, 128, 0.22)'
              : '0 8px 28px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* 1. Brand Logo matching Real Brand Identity */}
          <Link to="/" className="modern-nav-brand" aria-label="Indian Decor Company">
            <img
              src="/images/idc-circle-logo.png"
              alt="Indian Decor Company"
              style={{
                height: '40px',
                width: '40px',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '50%',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
              }}
            />
          </Link>

          {/* 2. Modern Center Navigation (Capsule Pills & Dropdowns matching 03/07/08/10) */}
          <nav className="header-desktop-nav">
            {/* Home */}
            <Link
              to="/"
              className={`modern-nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/about/"
              className={`modern-nav-item ${location.pathname.startsWith('/about') ? 'active' : ''}`}
            >
              About
            </Link>

            {/* Services (with dropdown) */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/services/"
                className={`modern-nav-item ${location.pathname.startsWith('/services') ? 'active' : ''}`}
              >
                <span>Services</span>
                <ChevronDown
                  size={13}
                  style={{
                    transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    opacity: 0.8
                  }}
                />
              </Link>

              {activeDropdown === 'services' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '8px',
                    zIndex: 60
                  }}
                  onMouseEnter={() => handleDropdownEnter('services')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div
                    style={{
                      width: '280px',
                      backgroundColor: 'rgba(18, 20, 26, 0.96)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '8px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                      animation: 'fadeIn 0.18s ease-out'
                    }}
                  >
                    {servicesSubmenu.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => {
                          if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                          setActiveDropdown(null);
                        }}
                        style={{
                          display: 'block',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '2px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <Link
              to="/projects/"
              className={`modern-nav-item ${location.pathname.startsWith('/projects') ? 'active' : ''}`}
            >
              Projects
            </Link>

            {/* Shop (with dropdown) */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropdownEnter('shop')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/shop/"
                className={`modern-nav-item ${location.pathname.startsWith('/shop') ? 'active' : ''}`}
              >
                <span>Shop</span>
                <ChevronDown
                  size={13}
                  style={{
                    transform: activeDropdown === 'shop' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    opacity: 0.8
                  }}
                />
              </Link>

              {activeDropdown === 'shop' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '8px',
                    zIndex: 60
                  }}
                  onMouseEnter={() => handleDropdownEnter('shop')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div
                    style={{
                      width: '290px',
                      backgroundColor: 'rgba(18, 20, 26, 0.96)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '8px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                      animation: 'fadeIn 0.18s ease-out'
                    }}
                  >
                    {shopSubmenu.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        onClick={() => {
                          if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                          setActiveDropdown(null);
                        }}
                        style={{
                          display: 'block',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          backgroundColor: item.highlight ? 'rgba(197, 168, 128, 0.12)' : 'transparent',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = item.highlight ? 'rgba(197, 168, 128, 0.2)' : 'rgba(255, 255, 255, 0.06)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.highlight ? 'rgba(197, 168, 128, 0.12)' : 'transparent')}
                      >
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: item.highlight ? 'var(--color-gold)' : '#FFFFFF', marginBottom: '2px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              to="/blog/"
              className={`modern-nav-item ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
            >
              Blog
            </Link>

            {/* Contact */}
            <Link
              to="/contact/"
              className={`modern-nav-item ${location.pathname.startsWith('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* 3. Right Action Utilities matching 07 Shopino & 08 Bluestack */}
          <div className="modern-nav-actions">
            {/* Account Icon (Frosted circular badge) */}
            <button
              onClick={() => openConsultation('Client Account / VIP Concierge')}
              className="modern-icon-btn modern-desktop-only"
              aria-label="Account"
              title="Client Account"
            >
              <User size={15} />
            </button>

            {/* Wishlist Heart Icon (Frosted circular badge with counter) */}
            <button
              onClick={() => navigate('/shop')}
              className="modern-icon-btn modern-desktop-only"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart size={15} fill={wishlist.length > 0 ? "var(--color-gold)" : "none"} color={wishlist.length > 0 ? "var(--color-gold)" : "#E5E7EB"} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: 'var(--color-gold)',
                    color: '#0E0F12',
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon (matching 07 Shopino badge) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="modern-icon-btn"
              aria-label="View Shopping Cart"
              title="Shopping Bag"
            >
              <ShoppingBag size={15} />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#D4AF37',
                  color: '#0E0F12',
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.35)'
                }}
              >
                {totalItemsCount || 3}
              </span>
            </button>

            {/* Consultation CTA Pill Button matching 08 Bluestack & 09 Greenova */}
            <button
              onClick={() => openConsultation('Header CTA')}
              className="modern-cta-btn modern-desktop-only"
            >
              <span>Consultation</span>
              <ArrowRight size={13} />
            </button>

            {/* Mobile Hamburger Toggle (matching 04 Stackly & 10 Spherix) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="modern-icon-btn modern-mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};


