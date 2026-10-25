import React from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useLead } from '../../context/LeadContext';

export const SuccessModal = () => {
  const { isSuccessModalOpen, setIsSuccessModalOpen, lastSubmission } = useLead();

  if (!isSuccessModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 105,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsSuccessModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#14161B',
          border: '1px solid rgba(197, 168, 128, 0.4)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
          padding: '36px 28px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-luxury)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSuccessModalOpen(false)}
          aria-label="Close success modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(197, 168, 128, 0.15)',
            border: '1px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            color: 'var(--color-gold)'
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '8px' }}>
          Consultation Confirmed
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '24px' }}>
          Thank you, <strong style={{ color: '#FFFFFF' }}>{lastSubmission?.name || 'Valued Client'}</strong>! Our senior interior architect will review your project parameters ({lastSubmission?.propertyType || 'Interior Project'} in {lastSubmission?.location || 'Bangalore'}) and contact you at <span style={{ color: 'var(--color-gold)' }}>{lastSubmission?.phone}</span> shortly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href={`https://wa.me/918050551406?text=Hi%20IDC%20Team%2C%20I%20just%20booked%20a%20consultation%20under%20the%20name%20${encodeURIComponent(lastSubmission?.name || '')}.%20Looking%20forward%20to%20discussing.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <MessageCircle size={16} />
            <span>Chat Directly on WhatsApp</span>
          </a>
          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="btn-secondary"
            style={{ width: '100%' }}
          >
            Close & Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
