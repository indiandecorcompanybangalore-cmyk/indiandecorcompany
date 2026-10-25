import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useLead } from '../../context/LeadContext';

export const ConsultationModal = () => {
  const { isConsultationOpen, closeConsultation, initialRequirement, submitLead } = useLead();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Whitefield',
    propertyType: '3 BHK Apartment',
    projectScope: 'Full Turnkey Interior',
    budgetRange: '₹15L - ₹25L',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialRequirement) {
      setFormData(prev => ({ ...prev, notes: `Inquiring regarding: ${initialRequirement}` }));
    }
  }, [initialRequirement]);

  if (!isConsultationOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitLead(formData);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => e.target === e.currentTarget && closeConsultation()}
    >
      <div
        style={{
          backgroundColor: '#14161B',
          border: '1px solid rgba(197, 168, 128, 0.3)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-luxury)',
          padding: '32px 28px',
          position: 'relative',
          color: '#FFFFFF'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeConsultation}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer',
            padding: '4px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Sparkles size={14} />
            <span>Complimentary Design Session</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>
            Book Your Design Consultation
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#9CA3AF', lineHeight: 1.5 }}>
            Meet our senior architects in Bangalore or schedule a virtual 3D consultation to estimate your turnkey timeline and material budget.
          </p>
        </div>

        {/* Lead Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vikramaditya Rao"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#0F1014',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 00000"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#0F1014',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vikram@example.com"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#0F1014',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Bangalore Submarket / Area
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#0F1014',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="Whitefield">Whitefield</option>
                <option value="Indiranagar">Indiranagar</option>
                <option value="HSR Layout">HSR Layout</option>
                <option value="Koramangala">Koramangala</option>
                <option value="Hebbal & North BLR">Hebbal / Manyata Tech Park</option>
                <option value="Sarjapur Road">Sarjapur Road / Bellandur</option>
                <option value="JP Nagar / Jayanagar">JP Nagar / Jayanagar</option>
                <option value="Other Karnataka Location">Other Bangalore/Karnataka Location</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#0F1014',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="2 BHK Apartment">2 BHK Apartment</option>
                <option value="3 BHK Apartment">3 BHK Apartment</option>
                <option value="4 BHK / Penthouse">4 BHK / Penthouse</option>
                <option value="Independent Luxury Villa">Independent Luxury Villa</option>
                <option value="Commercial / Office">Corporate Office Space</option>
                <option value="Retail Showroom / Cafe">Retail Showroom / Cafe</option>
                <option value="Furniture Wholesale / B2B">Furniture Wholesale / Bulk Order</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
                Estimated Budget Range
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#0F1014',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="₹5L - ₹10L">₹5 Lakh - ₹10 Lakh (Essential Modular)</option>
                <option value="₹10L - ₹20L">₹10 Lakh - ₹20 Lakh (Premium Turnkey)</option>
                <option value="₹20L - ₹35L">₹20 Lakh - ₹35 Lakh (Luxury Contemporary)</option>
                <option value="₹35L+">₹35 Lakh+ (Bespoke Architectural Villa)</option>
                <option value="Commercial / Bulk">Commercial / Wholesale Quote</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 500 }}>
              Specific Design Requirements or Floorplan Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Handover scheduled for next month. Need modular kitchen in acrylic, Italian marble TV wall, and custom curved sofa."
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                backgroundColor: '#0F1014',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#9CA3AF' }}>
            <ShieldCheck size={16} color="var(--color-gold)" />
            <span>100% Privacy Protected. No spam. A senior IDC designer will connect within 4 business hours.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold"
            style={{ width: '100%', marginTop: '8px', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? (
              <span>Scheduling Consultation...</span>
            ) : (
              <>
                <span>Confirm Free Consultation</span>
                <Send size={15} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
