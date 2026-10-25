import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Calendar, Phone, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { openConsultation } = useLead();

  const service = servicesData.find(s => s.slug === slug) || servicesData[0];

  const relatedProjects = projectsData.filter(p =>
    p.category.toLowerCase().includes(service.title.toLowerCase().split(' ')[0].toLowerCase()) ||
    service.title.toLowerCase().includes(p.category.toLowerCase())
  ).slice(0, 2);

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title={`${service.title} Bangalore | Cost & Turnkey Execution | IDC`}
        description={service.overview}
        canonical={`https://indiandecorcompany.in/services/${service.slug}`}
        ogImage={service.heroImage}
      />
      <SchemaJsonLd type="Service" data={service} />
      <SchemaJsonLd type="FAQPage" data={{ faqs: service.faqs }} />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Services", url: "https://indiandecorcompany.in/services" },
          { name: service.title, url: `https://indiandecorcompany.in/services/${service.slug}` }
        ]}
      />

      {/* =========================================================================
          SECTION 1: HERO BANNER (CINEMATIC LUXURY IMAGE BANNER)
          ========================================================================= */}
      <section style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        <img
          src={service.heroImage}
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0F1013 0%, rgba(15, 16, 19, 0.5) 60%, rgba(15, 16, 19, 0.8) 100%)'
          }}
        />

        <div className="container-custom" style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, zIndex: 2 }}>
          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              marginBottom: '14px',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={14} /> Back to All Services
          </Link>
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>
            IDC BANGALORE SERVICE SPECIALIZATION
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '12px',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)'
            }}
          >
            {service.title} in Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', maxWidth: '680px', lineHeight: 1.6 }}>
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CONTENT BODY (CRISP LUXURY LIGHT AESTHETIC)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '56px',
              alignItems: 'flex-start'
            }}
          >
            {/* Main Column */}
            <div style={{ flex: '1 1 60%' }}>
              {/* Overview & Answer Engine Block (AEO direct answer) */}
              <div style={{ marginBottom: '44px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  DIRECT OVERVIEW
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111827', margin: '8px 0 16px 0', fontWeight: 600 }}>
                  What does IDC's {service.title} include in Bangalore?
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
                    marginBottom: '24px'
                  }}
                >
                  IDC delivers comprehensive {service.title.toLowerCase()} across Bangalore with in-house architectural space planning, 3D photorealistic visualization, off-site factory manufacturing in our Bangalore workshop, and guaranteed turnkey handover within 45 to 60 working days.
                </div>
                <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.75 }}>
                  {service.overview}
                </p>
              </div>

              {/* Scope of Work */}
              <div style={{ marginBottom: '48px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  COMPLETE DELIVERABLES
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 18px 0', fontWeight: 600 }}>
                  Service Deliverables & Scope
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {service.scope.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', backgroundColor: '#F9FAFB', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(197, 168, 128, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-gold)',
                          marginTop: '2px',
                          flexShrink: 0
                        }}
                      >
                        <CheckCircle2 size={16} />
                      </div>
                      <span style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Execution Process */}
              <div style={{ marginBottom: '52px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  EXECUTION BLUEPRINT
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 20px 0', fontWeight: 600 }}>
                  How We Deliver {service.title} in Bangalore
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  {service.process.map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                        {p.step}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', margin: '8px 0 6px 0' }}>
                        {p.title}
                      </h4>
                      <p style={{ fontSize: '0.86rem', color: '#6B7280', lineHeight: 1.55 }}>
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs with FAQ Schema Accordion */}
              <div style={{ marginBottom: '48px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  CLEAR ANSWERS
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 20px 0', fontWeight: 600 }}>
                  Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {service.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '22px 24px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                        {faq.question}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.65 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects Portfolio Links with Descriptive Alt */}
              {relatedProjects.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    PORTFOLIO BENCHMARK
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', margin: '6px 0 20px 0', fontWeight: 600 }}>
                    Featured {service.title} Projects in Bangalore
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                    {relatedProjects.map(project => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.slug}`}
                        style={{
                          textDecoration: 'none',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                          display: 'block'
                        }}
                      >
                        <div style={{ height: '170px', overflow: 'hidden' }}>
                          <img
                            src={project.image}
                            alt={`${project.title} - ${project.location} by Indian Decor Company`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ padding: '16px 18px' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                            {project.title}
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '10px' }}>
                            {project.location}
                          </p>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                            View Case Study <ArrowRight size={13} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Services Internal Links */}
              <div style={{ marginBottom: '32px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                  Explore Related Interior Services in Bangalore:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {servicesData.filter(s => s.id !== service.id).slice(0, 5).map(s => (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        border: '1px solid #E5E7EB',
                        fontWeight: 500
                      }}
                    >
                      {s.title}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(197, 168, 128, 0.12)',
                      color: 'var(--color-gold)',
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      fontWeight: 600
                    }}
                  >
                    Contact Bangalore Studio →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Sticky Card: Pricing & Lead Quote */}
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
                  BANGALORE RATE ESTIMATION
                </span>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#111827', fontWeight: 600, margin: '8px 0 16px 0' }}>
                  {service.pricingEstimate}
                </div>
                <p style={{ fontSize: '0.84rem', color: '#6B7280', lineHeight: 1.55, marginBottom: '24px' }}>
                  Final quotations depend on chosen material specifications (marine ply, acrylic, veneer, stone) and verified floorplan sq.ft area.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px', fontSize: '0.85rem', color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color="var(--color-gold)" />
                    <span style={{ fontWeight: 500 }}>Up to 10-Year Hardware Warranty</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={18} color="var(--color-gold)" />
                    <span style={{ fontWeight: 500 }}>Guaranteed 45-Day Handover</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={18} color="var(--color-gold)" />
                    <span style={{ fontWeight: 500 }}>Off-Site Factory Precision Joinery</span>
                  </div>
                </div>

                <button
                  onClick={() => openConsultation(`Inquiry for ${service.title}`)}
                  className="btn-gold"
                  style={{ width: '100%', marginBottom: '12px', padding: '13px' }}
                >
                  Schedule Free Consultation
                </button>

                <a
                  href={`https://wa.me/918050551406?text=Hi%20IDC%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}%20in%20Bangalore.`}
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
                  <span>WhatsApp Quick Quote</span>
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
            START YOUR PROJECT
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.6vw, 2.7rem)', color: '#FFFFFF', marginBottom: '16px', fontWeight: 600 }}>
            Ready to Begin Your {service.title}?
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '28px' }}>
            Book a complimentary design consultation at our Bangalore studio. Our architects will prepare custom estimates and spatial blueprints.
          </p>
          <button
            onClick={() => openConsultation(`CTA for ${service.title}`)}
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
