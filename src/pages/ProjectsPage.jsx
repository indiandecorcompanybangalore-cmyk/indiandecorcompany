import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Filter, MapPin } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const { openConsultation } = useLead();

  const categories = ['All', 'Residential', 'Commercial', 'Office', 'Retail', 'Hospitality'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Our Projects | Luxury Interior & Turnkey Portfolio Bangalore | IDC"
        description="Explore Indian Decor Company's portfolio of luxury villas, penthouses, tech offices, and retail showrooms across Whitefield, Indiranagar, and Bangalore."
        canonical="https://indiandecorcompany.in/projects"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Projects", url: "https://indiandecorcompany.in/projects" }
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
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Architectural Turnkey Projects Portfolio"
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
            PORTFOLIO OF EXCELLENCE
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
            Luxury Interior Design Projects & Portfolio in Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            A curated showcase of bespoke residences, corporate headquarters, and experiential commercial spaces delivered with precision across Bangalore.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PORTFOLIO GRID (CRISP WHITE BACKGROUND MATCHING MOCKUP)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '70px 0 95px 0' }}>
        <div className="container-custom">
          {/* Filter Pills matching Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '44px' }}>
            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: '8px',
                backgroundColor: '#F3F4F6',
                padding: '6px',
                borderRadius: '9999px',
                border: '1px solid #E5E7EB'
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: activeCategory === cat ? 600 : 500,
                    backgroundColor: activeCategory === cat ? '#111827' : 'transparent',
                    color: activeCategory === cat ? '#FFFFFF' : '#4B5563',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6-Grid Projects Layout matching Mockup */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '28px'
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.slug}`)}
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
                }}
                className="group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 16, 19, 0.95) 0%, rgba(15, 16, 19, 0.25) 50%, transparent 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Top Category Tag */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(15, 16, 19, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: 'var(--color-gold)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: '9999px'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Bottom Card Info with Action Circle */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    zIndex: 2
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.45rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}
                    >
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#D1D5DB', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="var(--color-gold)" />
                      <span>{project.location}</span>
                    </p>
                  </div>

                  <div className="btn-circle-action">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PRE-FOOTER CTA (DARK LUXURY BANNER)
          ========================================================================= */}
      <section
        style={{
          padding: '85px 0',
          backgroundColor: '#0F1013',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.6vw, 2.8rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '14px'
            }}
          >
            Have a Project in Mind?
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', maxWidth: '580px', margin: '0 auto 30px auto', lineHeight: 1.6 }}>
            Our architectural team transforms residential and commercial blueprints into award-winning reality.
          </p>
          <button onClick={() => openConsultation('Projects Page CTA')} className="btn-gold">
            <span>Book Consultation</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
};
