import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Award, Users, Compass, Sparkles, Hammer, Ruler } from 'lucide-react';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const AboutPage = () => {
  const { openConsultation } = useLead();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="About Indian Decor Company (IDC) | Luxury Interiors & Custom Furniture Bangalore"
        description="Learn about IDC's journey, our Bangalore design pavilion, advanced furniture manufacturing facility, and architectural philosophy of crafting timeless spaces."
        canonical="https://indiandecorcompany.in/about"
      />
      <SchemaJsonLd type="Organization" />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "About Us", url: "https://indiandecorcompany.in/about" }
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
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Indian Decor Company Architecture Studio"
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
            THE IDC STORY • ABOUT US
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '20px',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)'
            }}
          >
            Designing Luxury Spaces & Bespoke Furniture in Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            Indian Decor Company (IDC) was founded with a singular conviction: that true luxury lies in the harmony between architectural space planning, authentic tactile materials, and meticulous craftsmanship.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CORE PHILOSOPHY & STORY (CRISP WHITE BACKGROUND)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '95px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              alignItems: 'center'
            }}
          >
            {/* Left Image with Floating Experience Badge */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '490px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                  alt="IDC Interior Studio and Bangalore Atelier"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Dark Badge matching Mockup */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '-16px',
                  backgroundColor: '#14161C',
                  border: '1px solid var(--color-border-gold)',
                  padding: '20px 26px',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1 }}>
                  15+ Years
                </div>
                <div style={{ fontSize: '0.78rem', color: '#D1D5DB', marginTop: '6px' }}>
                  Of Design & Manufacturing Excellence
                </div>
              </div>
            </div>

            {/* Right Narrative */}
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                OUR PHILOSOPHY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1.25,
                  marginBottom: '18px'
                }}
              >
                A Unified Ecosystem: Architecture + Manufacturing
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#374151', lineHeight: 1.8, marginBottom: '18px' }}>
                Most interior designers in India are reliant on third-party contractors and fragmented retail stores, resulting in mismatched finishes, compromised dimensions, and delays.
              </p>
              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.8, marginBottom: '32px' }}>
                IDC operates differently. We unify an award-winning architectural design practice with our own state-of-the-art Bangalore furniture manufacturing factory. From the initial 3D sketch to the kiln-dried hardwood frame, CNC-cut joinery, and final velvet upholstery stitch, every detail is engineered under one accountable roof.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '36px' }}>
                {[
                  'In-house Bangalore Factory',
                  'German CNC Precision Joinery',
                  'Imported Italian Stone & Veneers',
                  'Single Point Turnkey Handover'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: '#1F2937', fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openConsultation('About Us Page')}
                className="btn-gold"
              >
                <span>Book Design Consultation</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: MANUFACTURING INFRASTRUCTURE (DARK LUXURY ACCENT)
          ========================================================================= */}
      <section style={{ backgroundColor: '#121418', color: '#FFFFFF', padding: '95px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              IN-HOUSE PRODUCTION
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '14px'
              }}
            >
              25,000 Sq. Ft. Manufacturing Facility in Bangalore
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#9CA3AF', lineHeight: 1.7 }}>
              Precision German machinery, computerized panel saws, climate-controlled veneer presses, and skilled master woodworkers turn raw timber into heirloom pieces.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { stat: '25,000+', unit: 'Sq. Ft.', title: 'Factory Floor', desc: 'CNC milling & dust-free PU lacquer booths' },
              { stat: '450+', unit: 'Artisans', title: 'Skilled Workforce', desc: 'Carpenters, metalworkers, and polishers' },
              { stat: '500+', unit: 'Projects', title: 'Turnkey Handovers', desc: 'Luxury villas, penthouses, and flagships' },
              { stat: '10', unit: 'Years', title: 'Warranty Guarantee', desc: 'Comprehensive hardware and plywood assurance' }
            ].map((metric, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#181A22',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '36px 28px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1, marginBottom: '6px' }}>
                  {metric.stat}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {metric.title}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.5, margin: 0 }}>
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FOUNDATIONAL PILLARS (WARM OFF-WHITE BACKGROUND)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8F9FA', color: '#111827', padding: '95px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'block',
                marginBottom: '10px'
              }}
            >
              FOUNDATIONAL PILLARS
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
                fontWeight: 600,
                color: '#111827'
              }}
            >
              Why Discerning Clients Trust IDC
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                icon: Compass,
                title: "Architectural Rigor",
                desc: "Every layout is calibrated for human circulation, natural daylight harvesting, and acoustic balance."
              },
              {
                icon: Factory,
                title: "In-House Manufacturing",
                desc: "Custom furniture and modular casework are built in our Bangalore workshop with sub-millimeter tolerances."
              },
              {
                icon: ShieldCheck,
                title: "Certified Materials",
                desc: "We exclusively utilize IS:710 Marine Grade BWP ply, Saint-Gobain gypsum, and genuine Blum/Hettich German hardware."
              },
              {
                icon: Award,
                title: "Guaranteed Timeline",
                desc: "Off-site prefabrication ensures dust-free installations and guaranteed handovers within 45 to 60 days."
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '36px 28px',
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 168, 128, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      marginBottom: '18px'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: '10px'
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.65, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PRE-FOOTER CTA (DARK LUXURY BANNER)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: '90px 0',
          backgroundImage: 'linear-gradient(rgba(14, 15, 18, 0.92), rgba(14, 15, 18, 0.95)), url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '14px'
            }}
          >
            Start Your Architectural Journey With IDC
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#D1D5DB', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: 1.65 }}>
            Schedule a private consultation at our Bangalore studio or invite our architects for an on-site property evaluation.
          </p>
          <div style={{ display: 'inline-flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => openConsultation('About Us Pre-Footer CTA')} className="btn-gold">
              <span>Book a Free Consultation</span>
              <ArrowRight size={15} />
            </button>
            <Link to="/projects" className="btn-secondary" style={{ padding: '12px 28px' }}>
              <span>Explore Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
