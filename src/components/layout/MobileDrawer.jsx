import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Search,
  Home,
  Info,
  Briefcase,
  Layers,
  ShoppingBag,
  Factory,
  BookOpen,
  Phone,
  User,
  Heart,
  ShoppingCart,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLead } from '../../context/LeadContext';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { totalItemsCount, wishlist } = useCart();
  const { openConsultation } = useLead();

  if (!isOpen) return null;

  const navItems = [
    { name: 'Home', path: '/', icon: Home, hasSubmenu: false },
    { name: 'About', path: '/about/', icon: Info, hasSubmenu: false },
    { name: 'Services', path: '/services/', icon: Briefcase, hasSubmenu: true },
    { name: 'Projects', path: '/projects/', icon: Layers, hasSubmenu: false },
    { name: 'Shop', path: '/shop/', icon: ShoppingBag, hasSubmenu: true },
    { name: 'Manufacturing', path: '/furniture-manufacturer/', icon: Factory, hasSubmenu: false },
    { name: 'Blog', path: '/blog/', icon: BookOpen, hasSubmenu: false },
    { name: 'Contact', path: '/contact/', icon: Phone, hasSubmenu: false }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-start'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '85%',
          maxWidth: '340px',
          height: '100%',
          backgroundColor: '#121418',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-luxury)',
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease-out',
          padding: '24px 20px 32px 20px'
        }}
      >
        {/* Top Header: Logo + Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Link to="/" onClick={onClose} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/images/idc-circle-logo.png"
              alt="Indian Decor Company"
              style={{
                height: '42px',
                width: '42px',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '50%',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
              }}
            />
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '6px' }}
          >
            <X size={22} />
          </button>
        </div>


        {/* Main Nav Items with Icons */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 12px',
                  borderRadius: '8px',
                  color: '#D1D5DB',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} color="var(--color-gold)" />
                  <span>{item.name}</span>
                </div>
                {item.hasSubmenu && <ChevronRight size={16} color="#6B7280" />}
              </Link>
            );
          })}
        </nav>

        {/* Account, Wishlist & Cart Section matching Mockup */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' }}>
          <button
            onClick={() => {
              onClose();
              openConsultation('VIP Concierge Account');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 12px',
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <User size={17} color="#9CA3AF" />
            <span>My Account</span>
          </button>

          <button
            onClick={() => {
              onClose();
              navigate('/shop');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 12px',
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Heart size={17} color="#9CA3AF" fill={wishlist.length > 0 ? "var(--color-gold)" : "none"} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => {
              onClose();
              navigate('/shop');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingCart size={17} color="#9CA3AF" />
              <span>Cart</span>
            </div>
            <span
              style={{
                backgroundColor: 'var(--color-gold)',
                color: '#0E0F12',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {totalItemsCount || 3}
            </span>
          </button>
        </div>

        {/* Bottom Full-Width CTA: "Get a Free Consultation ->" matching Mockup */}
        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={() => {
              onClose();
              openConsultation('Mobile Drawer CTA');
            }}
            className="btn-gold"
            style={{ width: '100%', padding: '12px 16px', fontSize: '0.84rem' }}
          >
            <span>Get a Free Consultation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
