import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Building, CheckCircle2, Phone } from 'lucide-react';
import { bangaloreLocations } from '../data/locationsData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const LocationsPage = () => {
  const navigate = useNavigate();
  const { openConsultation } = useLead();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Interior Design Studios & Locations Bangalore | Indian Decor Company"
        description="Explore Indian Decor Company's Bangalore submarket design studios and turnkey coverage across Nagavara, Manyata Tech Park, Hebbal, Whitefield, Indiranagar, and Koramangala."
        canonical="https://indiandecorcompany.in/locations/"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Locations", url: "https://indiandecorcompany.in/locations/" }
        ]}
      />

      {/* Hero Header */}
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
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Bangalore Submarket Interior Design Studios"
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

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--color-gold)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '18px'
            }}
          >
            <MapPin size={14} />
            <span>Bangalore Submarket Coverage</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '18px'
            }}
          >
            Bangalore Interior Design Studios & Prime Neighborhoods
          </h1>

          <p
            style={{
              fontSize: '1.08rem',
              color: '#D1D5DB',
              lineHeight: 1.68,
              maxWidth: '680px',
              margin: '0 auto 28px'
            }}
          >
            From our headquarters in Nagavara near Manyata Tech Park to luxury villas in Whitefield and Indiranagar, explore our localized architectural and turnkey interior solutions tailored to Bangalore's premier communities.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openConsultation('Bangalore Locations Hub')}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Book Design Consultation</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="tel:+918050551406"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Phone size={16} />
              <span>+91-80505-51406</span>
            </a>
          </div>
        </div>
      </section>

      {/* Submarket Cards Grid */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '90px 0 100px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: 'var(--color-gold-dark, #B8860B)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              Hyper-Local Architectural Expertise
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                color: '#111827',
                lineHeight: 1.2
              }}
            >
              Tailored Interior Solutions Across Bangalore
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px'
            }}
          >
            {bangaloreLocations.map((loc) => (
              <div
                key={loc.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={loc.heroImage}
                    alt={loc.headline}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(15, 16, 19, 0.85)',
                      color: 'var(--color-gold)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <MapPin size={12} />
                    <span>{loc.name}</span>
                  </div>
                </div>

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      color: '#111827',
                      lineHeight: 1.3,
                      marginBottom: '12px'
                    }}
                  >
                    {loc.headline}
                  </h3>

                  <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {loc.description}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Key Communities Served:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                      {(loc.communitiesServed || []).slice(0, 3).map((comm, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#374151', marginBottom: '4px' }}>
                          <CheckCircle2 size={13} color="var(--color-gold-dark, #B8860B)" />
                          <span>{comm}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/locations/${loc.slug}/`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '12px 18px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                        color: '#111827',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        border: '1px solid #E5E7EB',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <span>Explore {loc.name.split(',')[0]} Studio</span>
                      <ArrowRight size={16} color="var(--color-gold-dark, #B8860B)" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
