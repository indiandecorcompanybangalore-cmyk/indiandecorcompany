import React, { useState } from 'react';
import { Download, Send, CheckCircle2, Factory, Hotel, Building2, UtensilsCrossed, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const WholesalePage = () => {
  const { submitLead, openConsultation } = useLead();
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'Hotels & Hospitality',
    quantity: '25 - 50 Units',
    deliveryLocation: 'Bangalore, Karnataka',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLead({
      name: `${formData.contactName} (${formData.company})`,
      phone: formData.phone,
      email: formData.email,
      propertyType: `B2B Wholesale: ${formData.businessType} [${formData.quantity}]`,
      notes: formData.message,
      location: formData.deliveryLocation
    });
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Furniture Wholesale & B2B Manufacturer Bangalore | IDC"
        description="Indian Decor Company manufactures and supplies wholesale commercial furniture for hotels, tech offices, restaurants, and real estate developers across India."
        canonical="https://indiandecorcompany.in/furniture-wholesale"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Furniture Wholesale", url: "https://indiandecorcompany.in/furniture-wholesale" }
        ]}
      />

      {/* =========================================================================
          SECTION 1: HERO HEADER (CINEMATIC HERO IMAGE BANNER)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '140px',
          paddingBottom: '85px',
          overflow: 'hidden',
          color: '#FFFFFF'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Commercial B2B Furniture Supply"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 16, 19, 0.78) 0%, rgba(15, 16, 19, 0.88) 65%, #0F1013 100%)'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '14px',
              padding: '4px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(197, 168, 128, 0.1)',
              border: '1px solid rgba(197, 168, 128, 0.25)'
            }}
          >
            B2B CONTRACT SUPPLY & VOLUME MANUFACTURING
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '18px',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)'
            }}
          >
            Wholesale Commercial Furniture Manufacturing Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            Direct-from-manufacturer volume contract furniture tailored for boutique hotels, fine-dining restaurants, tech campus offices, and developer model residences.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SECTORS & WHOLESALE PARAMETERS (CRISP LUXURY LIGHT AESTHETIC)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          {/* Sectors Served Grid */}
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              INDUSTRIES & CONTRACT CLIENTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', color: '#111827', fontWeight: 600 }}>
              Sectors We Outfit Across India
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '72px' }}>
            {[
              {
                icon: Hotel,
                title: "Hotels & Resorts",
                desc: "Luggage benches, upholstered headboards, bedside nightstands, and guestroom lounge armchairs engineered to strict hospitality rub tests."
              },
              {
                icon: UtensilsCrossed,
                title: "Restaurants & Cafes",
                desc: "High-traffic banquet booths, anti-scratch sintered stone dining tables, and Martindale 50,000+ stain-resistant dining seating."
              },
              {
                icon: Building2,
                title: "Tech Park Offices",
                desc: "Modular linear workstations, acoustic telephone pods, executive boardroom conference suites, and breakout lounge furniture."
              },
              {
                icon: Factory,
                title: "Builders & Developers",
                desc: "Complete turnkey furniture packages for luxury model sample flats and clubhouse amenities across Bangalore and South India."
              }
            ].map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '32px 24px',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(197, 168, 128, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', marginBottom: '18px' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#111827', marginBottom: '8px', fontWeight: 600 }}>
                    {sec.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6 }}>
                    {sec.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Wholesale Parameters & Form Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '56px',
              alignItems: 'start'
            }}
          >
            {/* Left: Wholesale Specs & Benefits */}
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                CONTRACT MANUFACTURING STANDARDS
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: '#111827', margin: '8px 0 16px 0', fontWeight: 600 }}>
                Why Source Directly From IDC Bangalore?
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.75, marginBottom: '26px' }}>
                Eliminate importer margins and dealer markups. By producing in our Bangalore manufacturing facility, we provide architect-grade bespoke specifications with competitive bulk tiered pricing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {[
                  { label: "Minimum Order Quantity (MOQ)", val: "Low MOQs starting from 10 units for custom furniture; 1 flat for model apartments." },
                  { label: "Production Turnaround", val: "Standard bulk batches completed in 21 to 35 working days." },
                  { label: "Material Customization", val: "Choose from 200+ commercial leatherettes, Crypton performance fabrics, and wood stains." },
                  { label: "Logistics & White-Glove Staging", val: "Direct crated freight delivery, on-site unboxing, and assembly across Karnataka." }
                ].map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F9FAFB', padding: '18px 22px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#374151' }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Spec Sheet */}
              <a
                href="mailto:wholesale@indiandecorcompany.in?subject=Request%20IDC%20Wholesale%20Catalogue%202026"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <Download size={15} />
                <span>Download 2026 B2B Lookbook (PDF)</span>
              </a>
            </div>

            {/* Right: B2B Quote Submission Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '36px 32px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)'
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: '#111827', marginBottom: '8px', fontWeight: 600 }}>
                    Wholesale Request Received
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
                    Our corporate contract division will prepare a tailored BOQ rate card for <strong style={{ color: '#111827' }}>{formData.company}</strong> and contact you within 4 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ backgroundColor: '#111827', color: '#FFFFFF' }}>
                    Submit Another RFQ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      DIRECT INQUIRY
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: '#111827', marginBottom: '4px', fontWeight: 600 }}>
                      Request Wholesale Quotation
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                      Get bulk factory pricing, fabric swatches, and CAD spec sheets.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Company / Firm Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Oberoi Realty / Marriott"
                        style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Contact Person *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. S. Ramamurthy"
                        style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Official Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Industry / Sector</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', outline: 'none' }}
                      >
                        <option value="Hotels & Hospitality">Hotels & Hospitality</option>
                        <option value="Restaurants & Cafes">Restaurants & Cafes</option>
                        <option value="Corporate Office & IT">Corporate Office & IT</option>
                        <option value="Real Estate Developer">Real Estate Developer</option>
                        <option value="Interior Designer / Architect Supply">Interior Designer / Architect Firm</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Estimated Volume</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', outline: 'none' }}
                      >
                        <option value="10 - 25 Units">10 - 25 Units</option>
                        <option value="25 - 50 Units">25 - 50 Units</option>
                        <option value="50 - 150 Units">50 - 150 Units</option>
                        <option value="150+ Units / Turnkey Campus">150+ Units / Campus Fitout</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Product Requirements & Notes</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="List specific models, dimensions, target handover date, and delivery destination..."
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#111827', fontSize: '0.88rem', resize: 'none', outline: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#111827',
                      color: '#FFFFFF',
                      width: '100%',
                      padding: '13px 20px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '6px'
                    }}
                  >
                    <span>Request Wholesale BOQ Pricing</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BOTTOM CTA
          ========================================================================= */}
      <section
        style={{
          backgroundColor: '#0F1013',
          color: '#FFFFFF',
          padding: '75px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--color-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            ENTERPRISE COMMERCIAL PARTNERSHIPS
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.6vw, 2.7rem)', color: '#FFFFFF', marginBottom: '16px', fontWeight: 600 }}>
            Equip Your Commercial Properties
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '28px' }}>
            Book a dedicated session with our commercial procurement directors. We provide CAD library blocks, finishes schedules, and volume estimates.
          </p>
          <button
            onClick={() => openConsultation('Wholesale Bottom CTA')}
            className="btn-gold"
            style={{ padding: '13px 26px', fontSize: '0.9rem' }}
          >
            <span>Book Corporate Procurement Session</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
