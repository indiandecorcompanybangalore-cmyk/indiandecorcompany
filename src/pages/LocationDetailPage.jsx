import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Building, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { bangaloreLocations } from '../data/locationsData';
import { projectsData } from '../data/projectsData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const LocationDetailPage = () => {
  const { slug } = useParams();
  const { openConsultation } = useLead();

  const location = bangaloreLocations.find(l => l.slug === slug) || bangaloreLocations[0];
  const highlightProject = projectsData.find(p => p.slug === location.highlightProjectSlug) || projectsData[0];

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title={`Interior Designers in ${location.name} | Luxury Home & Villa Interiors | IDC`}
        description={location.description}
        canonical={`https://indiandecorcompany.in/locations/${location.slug}/`}
        ogImage={location.heroImage}
      />
      <SchemaJsonLd type="LocalBusiness" />
      <SchemaJsonLd type="FAQPage" data={{ faqs: location.faqs }} />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Locations", url: "https://indiandecorcompany.in/locations/" },
          { name: location.name, url: `https://indiandecorcompany.in/locations/${location.slug}/` }
        ]}
      />

      {/* =========================================================================
          SECTION 1: HERO BANNER (CINEMATIC LUXURY IMAGE BANNER)
          ========================================================================= */}
      <section style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img src={location.heroImage} alt={location.headline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F1013 0%, rgba(15,16,19,0.55) 60%, rgba(15,16,19,0.8) 100%)' }} />

        <div className="container-custom" style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <MapPin size={14} />
            <span>BANGALORE SUBMARKET SPECIALIZATION</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '14px', textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)' }}>
            {location.headline}
          </h1>
          <p style={{ fontSize: '1rem', color: '#D1D5DB', maxWidth: '680px', lineHeight: 1.6 }}>
            {location.description}
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CONTENT GRID (CRISP LUXURY LIGHT AESTHETIC)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '56px',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Local Expertise & Communities */}
            <div style={{ flex: '1 1 60%' }}>
              {/* Direct Local AEO Answer Box */}
              <div style={{ marginBottom: '44px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  LOCAL ARCHITECTURAL EXPERTISE
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111827', margin: '8px 0 16px 0', fontWeight: 600 }}>
                  Interior Design Considerations in {location.name}
                </h2>
                <div
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderLeft: '4px solid var(--color-gold)',
                    border: '1px solid #E5E7EB',
                    borderLeftWidth: '4px',
                    padding: '20px 24px',
                    borderRadius: '0 12px 12px 0',
                    fontSize: '0.96rem',
                    lineHeight: 1.75,
                    color: '#374151',
                    marginBottom: '20px'
                  }}
                >
                  {location.localExpertise}
                </div>
              </div>

              {/* Communities Served */}
              <div style={{ marginBottom: '48px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  PREMIUM ENCLAVES
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 18px 0', fontWeight: 600 }}>
                  Key Residential & Tech Communities Handled
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  {location.communitiesServed.map((comm, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F9FAFB', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                      <Building size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: '#1F2937', fontWeight: 500 }}>{comm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Project in this Location */}
              {highlightProject && (
                <div style={{ marginBottom: '48px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                    LOCAL EXECUTION PROOF
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 18px 0', fontWeight: 600 }}>
                    Featured Project in {location.name}
                  </h3>
                  <Link
                    to={`/projects/${highlightProject.slug}`}
                    style={{
                      display: 'block',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      textDecoration: 'none',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div style={{ height: '260px', overflow: 'hidden' }}>
                      <img src={highlightProject.image} alt={highlightProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#111827', marginBottom: '4px', fontWeight: 600 }}>
                          {highlightProject.title}
                        </h4>
                        <p style={{ fontSize: '0.84rem', color: '#6B7280' }}>{highlightProject.location} • {highlightProject.area}</p>
                      </div>
                      <div className="btn-circle-action">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Local FAQs */}
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  FREQUENT QUESTIONS
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 18px 0', fontWeight: 600 }}>
                  Frequently Asked Questions — {location.name}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {location.faqs.map((faq, idx) => (
                    <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '22px 24px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>{faq.question}</h4>
                      <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.65 }}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Card: Location Lead Consultation */}
            <div style={{ minWidth: '320px' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '34px 28px',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
                  position: 'sticky',
                  top: '110px'
                }}
              >
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  {location.name.toUpperCase()} INTERIORS
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: '#111827', margin: '8px 0 14px 0', fontWeight: 600 }}>
                  Schedule a Site Visit in {location.name.split(',')[0]}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6B7280', lineHeight: 1.55, marginBottom: '24px' }}>
                  Our Bangalore project managers conduct on-site laser measurements and property audits across all gated villa enclaves and apartments in {location.name.split(',')[0]}.
                </p>

                <button
                  onClick={() => openConsultation(`Site Consultation in ${location.name}`)}
                  className="btn-gold"
                  style={{ width: '100%', marginBottom: '12px', padding: '13px' }}
                >
                  Book Free Site Visit
                </button>

                <a
                  href={`https://wa.me/918050551406?text=Hi%20IDC%20Team%2C%20I%20have%20a%20property%20in%20${encodeURIComponent(location.name)}%20and%20would%20like%20to%20discuss%20interiors.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(37, 211, 102, 0.1)',
                    color: '#065F46',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={15} color="#25D366" />
                  <span>WhatsApp {location.name.split(',')[0]} Desk</span>
                </a>
              </div>
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
            START YOUR PROJECT IN {location.name.split(',')[0].toUpperCase()}
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.6vw, 2.7rem)', color: '#FFFFFF', marginBottom: '16px', fontWeight: 600 }}>
            Ready to Begin Your Interior Journey?
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '28px' }}>
            Book a dedicated consultation session with our design directors. We review your floorplans and provide tailored estimates for your property in {location.name.split(',')[0]}.
          </p>
          <button
            onClick={() => openConsultation(`CTA for ${location.name}`)}
            className="btn-gold"
            style={{ padding: '13px 26px', fontSize: '0.9rem' }}
          >
            <span>Book Studio Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
