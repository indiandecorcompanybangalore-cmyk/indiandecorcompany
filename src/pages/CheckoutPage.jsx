import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MetaTags } from '../components/seo/MetaTags';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    pincode: '560038',
    address: '',
    city: 'Bangalore',
    state: 'Karnataka'
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setOrderComplete(true);
      clearCart();
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', color: '#111827', minHeight: '100vh', paddingTop: '80px', paddingBottom: '90px' }}>
      <MetaTags
        title="Checkout | Indian Decor Company"
        description="Complete your order for luxury handcrafted furniture with white-glove delivery in Bangalore."
        canonical="https://indiandecorcompany.in/checkout"
      />

      <div className="container-custom" style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => (currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate(-1))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            Checkout
          </h2>
          <div style={{ width: '24px' }} />
        </div>

        {/* Stepper Progress Bar matching Mockup */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          {[
            { num: 1, label: 'Address' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Review' }
          ].map((st, i) => (
            <div key={st.num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= st.num ? '#111827' : '#E5E7EB',
                  color: currentStep >= st.num ? '#FFFFFF' : '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}
              >
                {st.num}
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: currentStep >= st.num ? 600 : 400, color: currentStep >= st.num ? '#111827' : '#9CA3AF' }}>
                {st.label}
              </span>
              {i < 2 && <div style={{ width: '20px', height: '1px', backgroundColor: '#D1D5DB' }} />}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '28px 24px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
            border: '1px solid #E5E7EB'
          }}
        >
          {orderComplete ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', marginBottom: '8px' }}>
                Order Confirmed
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}>
                Thank you for your order, <strong>{formData.fullName || 'Valued Client'}</strong>! Our concierge desk will contact you at <strong>{formData.phoneNumber}</strong> to coordinate insured white-glove delivery in Bangalore.
              </p>
              <Link to="/shop" className="btn-primary" style={{ backgroundColor: '#111827', color: '#FFFFFF' }}>
                Continue Shopping
              </Link>
            </div>
          ) : currentStep === 1 ? (
            <form onSubmit={handleSubmitAddress} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                Shipping Address
              </h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+91 98765 00000"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  placeholder="name@domain.com"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="560038"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                  Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat/House No., Apartment or Society, Street"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem', outline: 'none' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '8px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>
                Payment Method
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#6B7280' }}>
                Select how you'd like to settle your order amount of <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '8px', border: '1px solid #111827', cursor: 'pointer', backgroundColor: '#F9FAFB' }}>
                  <input type="radio" name="payment" defaultChecked style={{ accentColor: '#111827' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827' }}>UPI / Net Banking / Credit Card</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Instant confirmation via Razorpay / Secure Gateway</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '8px', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
                  <input type="radio" name="payment" style={{ accentColor: '#111827' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827' }}>Direct Bank Transfer / NEFT</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Invoice dispatched to email for company procurement</div>
                  </div>
                </label>
              </div>

              <button
                onClick={handleSubmitAddress}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '8px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                <span>Authorize & Place Order</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
