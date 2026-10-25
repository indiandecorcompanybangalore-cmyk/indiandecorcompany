import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Cog, ShieldCheck, Ruler, ArrowRight, CheckCircle2, Sparkles, Hammer } from 'lucide-react';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const ManufacturingPage = () => {
  const { openConsultation } = useLead();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Custom Furniture Manufacturer Bangalore | In-House Factory & Workshop | IDC"
        description="IDC operates an advanced custom furniture manufacturing facility in Bangalore specializing in kiln-dried hardwood framing, CNC modular cutting, and master upholstery."
        canonical="https://indiandecorcompany.in/furniture-manufacturer"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Furniture Manufacturing", url: "https://indiandecorcompany.in/furniture-manufacturer" }
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
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Bangalore Furniture Manufacturing Facility"
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
            ATELIER CRAFTSMANSHIP & PRECISION ENGINEERING
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
            Custom Furniture Manufacturing in Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            From individual statement armchairs to large-scale luxury residential fitouts, IDC designs, engineers, and handcrafts furniture directly in our Bangalore workshop.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MANUFACTURING PROCESS & QUALITY (CRISP LUXURY LIGHT AESTHETIC)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          {/* Manufacturing Process Grid */}
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              FOUR-STAGE PRECISION JOINERY
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', color: '#111827', fontWeight: 600 }}>
              How We Engineer Luxury Furniture
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '72px' }}>
            {[
              {
                step: "01",
                title: "Hardwood Seasoning & Framing",
                desc: "Kiln-dried Malaysian Sal, CP Teak, and European Beechwood with moisture content below 10% to prevent seasonal warping in Indian humidity."
              },
              {
                step: "02",
                title: "German CNC Pre-Cutting",
                desc: "Sub-millimeter beam saws and computer-controlled routers ensure flawless joinery, mortise-and-tenon locks, and corner blocks."
              },
              {
                step: "03",
                title: "Ergonomic Cushion Moulding",
                desc: "Multi-layered high-resilience (HR) foams contoured to exact lumbar postures, wrapped in thermal dacron and hypoallergenic down feathers."
              },
              {
                step: "04",
                title: "Artisanal Tailoring & Upholstery",
                desc: "Hand-aligned pattern matching on Belgian bouclé, velvet, and full-grain Italian leathers with saddle double-stitching."
              }
            ].map((item, idx) => (
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
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '12px' }}>
                  {item.step}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#111827', marginBottom: '8px', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Factory Capabilities & Quality Assurance */}
          <div
            style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '56px 44px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                BANGALORE FACILITY METRICS
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#111827', margin: '8px 0 16px 0', fontWeight: 600 }}>
                Rigorous Quality Control at Every Stage
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.75, marginBottom: '24px' }}>
                Every single piece leaving our Bangalore factory undergoes a 24-point QC audit inspecting structural joint integrity, seam tension, drawer slide alignment, and flawless lacquer finish.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  "10-Year Structural Frame Warranty on all custom sofas and beds",
                  "IS:710 Marine-grade termite-resistant boiling waterproof plywood",
                  "Non-toxic, zero-VOC low-odor Italian polyurethane (PU) sealants",
                  "Genuine Blum & Hettich soft-close hydraulic mechanisms"
                ].map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', backgroundColor: '#FFFFFF', padding: '40px 32px', borderRadius: '14px', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)' }}>
              <Hammer size={42} color="var(--color-gold)" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111827', marginBottom: '8px', fontWeight: 600 }}>
                Visit Our Bangalore Factory
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}>
                We welcome architects, interior designers, and homeowners to inspect wood seasoning, touch leather hides, and see master craftspeople in action.
              </p>
              <button
                onClick={() => openConsultation('Factory Visit Booking')}
                className="btn-gold"
                style={{ width: '100%', padding: '13px' }}
              >
                Schedule a Factory Walkthrough
              </button>
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
            CUSTOM FURNITURE COMMISSIONS
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.6vw, 2.7rem)', color: '#FFFFFF', marginBottom: '16px', fontWeight: 600 }}>
            Have a Bespoke Design in Mind?
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '28px' }}>
            Share your reference drawings, dimensions, or 3D models with our production engineers for custom prototyping and factory-direct pricing.
          </p>
          <button
            onClick={() => openConsultation('Manufacturing CTA')}
            className="btn-gold"
            style={{ padding: '13px 26px', fontSize: '0.9rem' }}
          >
            <span>Commission Custom Furniture</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
