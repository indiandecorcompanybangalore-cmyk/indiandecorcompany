import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={(e) => e.target === e.currentTarget && setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#121418',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-luxury)',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--color-gold)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
              Your Bag ({cartItems.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {checkoutComplete ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                ✓
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Order Enquiry Initiated
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                Our Bangalore concierge has reserved your selection and will confirm delivery schedules with you.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9CA3AF' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px auto', opacity: 0.3 }} />
              <p style={{ fontSize: '1rem', color: '#E5E7EB', marginBottom: '6px' }}>Your shopping bag is empty</p>
              <p style={{ fontSize: '0.82rem', marginBottom: '20px' }}>Explore handcrafted furniture and architectural decor.</p>
              <button onClick={() => setIsCartOpen(false)} className="btn-primary">
                Browse Shop Collections
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 style={{ fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '8px' }}>
                      {item.categoryName} • {item.finish || 'Custom'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#0F1014',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '2px 6px'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '2px' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.8rem', color: '#FFFFFF', minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '2px' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && !checkoutComplete && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#0E0F12'
            }}
          >
            {/* Apply Coupon Code matching Screen 7 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Apply Coupon Code
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#1C1F26',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => {
                    if (couponCode.trim()) setCouponApplied(true);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    color: '#111827',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              <span>Subtotal</span>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              <span>Shipping</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>Free</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#FFFFFF',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '12px'
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--color-gold)' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-gold"
              style={{ width: '100%', marginBottom: '10px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <a
              href={`https://wa.me/918050551406?text=Hi%20IDC%20Store%2C%20I%20would%20like%20to%20order%20the%20following%20furniture%20items%20totaling%20Rs.%20${totalAmount.toLocaleString('en-IN')}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: '100%', fontSize: '0.8rem', padding: '9px 18px', textDecoration: 'none' }}
            >
              Order via WhatsApp Concierge
            </a>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.72rem', color: '#6B7280' }}>
              <ShieldCheck size={14} color="var(--color-gold)" />
              <span>Bangalore direct white-glove unboxing & assembly included</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
