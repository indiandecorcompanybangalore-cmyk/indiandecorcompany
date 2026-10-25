import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Wrench, Sparkles, Building, Layers } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const ServicesPage = () => {
  const navigate = useNavigate();
  const { openConsultation } = useLead();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Interior Design & Turnkey Services Bangalore | Indian Decor Company"
        description="Explore IDC's full spectrum of interior design services: residential homes, luxury villas, commercial spaces, tech offices, modular kitchens, and custom furniture in Bangalore."
        canonical="https://indiandecorcompany.in/services"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Services", url: "https://indiandecorcompany.in/services" }
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
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Bespoke Turnkey Interior Design and Architectural Joinery"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* Cinematic dark luxury gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 16, 19, 0.78) 0%, rgba(15, 16, 19, 0.88) 65%, #0F1013 100%)'
          }}
        />
        {/* Subtle decorative gold radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '560px',
            height: '260px',
            background: 'radial-gradient(ellipse, rgba(197, 168, 128, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
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
            END-TO-END ARCHITECTURAL CAPABILITIES
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '16px',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)'
            }}
          >
            Luxury Interior Design & Execution Services in Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            From conceptual architectural design to precision off-site factory fabrication and final turnkey handover, IDC orchestrates complete spatial excellence.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 8 SERVICE CARDS (CRISP WHITE BACKGROUND MATCHING MOCKUP)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px'
            }}
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(`/services/${service.slug}`)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-gold)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Service Card Image */}
                <div style={{ height: '230px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                </div>

                {/* Service Card Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
                      {service.shortDesc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                      {service.pricingEstimate}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#111827'
                      }}
                    >
                      <span>Explore Service</span>
                      <ArrowRight size={14} color="var(--color-gold)" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Turnkey Assurance Banner */}
          <div
            style={{
              marginTop: '80px',
              backgroundColor: '#14161C',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              borderRadius: '16px',
              padding: '48px 40px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                SINGLE POINT RESPONSIBILITY
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#FFFFFF', marginBottom: '10px' }}>
                Need a Turnkey Interior Package in Bangalore?
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                Skip juggling civil contractors, electricians, and carpenters. IDC takes 100% legal, structural, and timeline accountability under a single guaranteed contract.
              </p>
            </div>
            <button
              onClick={() => openConsultation('Turnkey Services Inquiry')}
              className="btn-gold"
              style={{ padding: '13px 30px' }}
            >
              Get a Turnkey Estimation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
