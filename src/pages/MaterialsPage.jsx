import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { materialsData } from '../data/materialsData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const MaterialsPage = () => {
  const { openConsultation } = useLead();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Curated Architectural Materials & Finishes Library | IDC Bangalore"
        description="Explore IDC's tactile library of Italian marble, smoked oak veneers, anti-fingerprint laminates, brushed champagne brass, and Belgian bouclé fabrics."
        canonical="https://indiandecorcompany.in/materials"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Materials", url: "https://indiandecorcompany.in/materials" }
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
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Bangalore Architectural Material Library"
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

        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
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
            THE TACTILE PALETTE • ARCHITECTURAL LIBRARY
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
            Curated Architectural Materials & Finishes Library Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            Exceptional interior design begins with authentic materiality. Touch and explore our curated selection of natural stones, hand-stained timber veneers, jewelry-grade metals, and performance textiles.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MATERIALS GRID (CRISP LUXURY LIGHT AESTHETIC)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '36px',
              marginBottom: '72px'
            }}
          >
            {materialsData.map((material) => (
              <div
                key={material.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img
                    src={material.image}
                    alt={material.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
                      {material.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111827', margin: '6px 0 12px 0', fontWeight: 600 }}>
                      {material.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.65, marginBottom: '20px' }}>
                      {material.description}
                    </p>

                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ fontSize: '0.78rem', color: '#111827', fontWeight: 600, marginBottom: '8px' }}>
                        Prime Architectural Applications:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {material.applications.map((app, i) => (
                          <span key={i} style={{ fontSize: '0.75rem', backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', padding: '4px 10px', borderRadius: '6px', color: '#374151' }}>
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Key Performance Attributes:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {material.benefits.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#4B5563' }}>
                          <CheckCircle2 size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sample Swatch Box Callout */}
          <div
            style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '48px 36px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '28px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                DESIGNER EXPERIENCE
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111827', margin: '8px 0 10px 0', fontWeight: 600 }}>
                Touch & Feel Actual Swatches at Our Studio
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#6B7280', lineHeight: 1.6 }}>
                Images on a screen cannot convey the coolness of honed Italian marble or the dense weave of Belgian bouclé. Visit our Bangalore material bar during your design consultation.
              </p>
            </div>
            <button
              onClick={() => openConsultation('Material Swatch Box Experience')}
              className="btn-gold"
              style={{ padding: '13px 28px' }}
            >
              Request Swatch Box Session
            </button>
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
            CUSTOM MATERIAL PALETTES
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.6vw, 2.7rem)', color: '#FFFFFF', marginBottom: '16px', fontWeight: 600 }}>
            Curate Finishes for Your Residence
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '28px' }}>
            Book a dedicated consultation session with our design directors. We review your material options and build physical moodboards for your approval.
          </p>
          <button
            onClick={() => openConsultation('Materials Bottom CTA')}
            className="btn-gold"
            style={{ padding: '13px 26px', fontSize: '0.9rem' }}
          >
            <span>Book Material Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
