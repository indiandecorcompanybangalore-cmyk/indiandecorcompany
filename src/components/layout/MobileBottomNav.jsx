import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, FolderKanban, Briefcase, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop/', icon: ShoppingBag },
    { name: 'Projects', path: '/projects/', icon: FolderKanban },
    { name: 'Services', path: '/services/', icon: Briefcase }
  ];

  return (
    <nav
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '62px',
        backgroundColor: '#121418',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        zIndex: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.path === '/' 
          ? location.pathname === '/' 
          : location.pathname.startsWith(item.path.replace(/\/$/, ''));

        return (
          <NavLink
            key={item.name}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              gap: '4px',
              flex: 1,
              height: '100%',
              color: isActive ? 'var(--color-gold)' : '#9CA3AF'
            }}
          >
            <Icon size={19} />
            <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 600 : 500 }}>
              {item.name}
            </span>
          </NavLink>
        );
      })}

      {/* Cart trigger with Gold Counter Badge */}

      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          gap: '4px',
          flex: 1,
          height: '100%',
          color: '#9CA3AF',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingCart size={19} />
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-6px',
              backgroundColor: 'var(--color-gold)',
              color: '#0E0F12',
              fontSize: '0.58rem',
              fontWeight: 800,
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {totalItemsCount || 3}
          </span>
        </div>
        <span style={{ fontSize: '0.68rem', fontWeight: 500 }}>Cart</span>
      </button>
    </nav>
  );
};
