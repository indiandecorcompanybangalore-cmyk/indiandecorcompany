import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Award, CheckCircle2, ShoppingBag } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { productsData } from '../data/productsData';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openConsultation } = useLead();

  const project = projectsData.find(p => p.slug === slug) || projectsData[0];
  const otherProjects = projectsData.filter(p => p.id !== project.id).slice(0, 3);
  const usedProducts = productsData.filter(prd => (project.productsUsedIds || []).includes(prd.id));

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title={`${project.title} — ${project.location} | Indian Decor Company Case Study`}
        description={project.overview}
        canonical={`https://indiandecorcompany.in/projects/${project.slug}`}
        ogImage={project.image}
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Projects", url: "https://indiandecorcompany.in/projects" },
          { name: project.title, url: `https://indiandecorcompany.in/projects/${project.slug}` }
        ]}
      />

      {/* =========================================================================
          SECTION 1: HERO BANNER (DARK LUXURY AMBIANCE)
          ========================================================================= */}
      <section style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0F1013 0%, rgba(15, 16, 19, 0.45) 60%, rgba(15, 16, 19, 0.7) 100%)'
          }}
        />

        <div className="container-custom" style={{ position: 'absolute', bottom: '48px', left: 0, right: 0, zIndex: 2 }}>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={14} /> Back to All Projects
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.15
            }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CASE STUDY DETAILS (CRISP WHITE BACKGROUND MATCHING MOCKUP)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '80px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'start' }}>
            {/* Left Column: Narrative & Transformation */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  PROJECT BRIEF & VISION
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111827', marginBottom: '16px' }}>
                  Architectural Concept & Spatial Flow
                </h2>
                <p style={{ fontSize: '0.98rem', color: '#374151', lineHeight: 1.8, marginBottom: '24px' }}>
                  {project.overview}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#111827', marginBottom: '10px' }}>
                    The Architectural Challenge
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.65, margin: 0 }}>
                    {project.challenge}
                  </p>
                </div>

                <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#111827', marginBottom: '10px' }}>
                    The IDC Design Approach
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.65, margin: 0 }}>
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* Materials Used in This Project */}
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#111827', marginBottom: '16px' }}>
                  Curated Materials & Finishes
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(project.materialsUsed || []).map((mat, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        fontSize: '0.82rem',
                        color: '#1F2937',
                        fontWeight: 500
                      }}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Before & After Interactive Slider */}
              <div style={{ marginBottom: '56px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#111827', marginBottom: '12px' }}>
                  Site Transformation (Before & After)
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#4B5563', marginBottom: '18px' }}>
                  Drag the center slider to inspect the bare construction shell versus our delivered turnkey interior.
                </p>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                />
              </div>
            </div>

            {/* Right Column: Project Details Card matching Mockup */}
            <div style={{ minWidth: '300px' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                  position: 'sticky',
                  top: '110px'
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#111827',
                    borderBottom: '1px solid #F3F4F6',
                    paddingBottom: '14px',
                    marginBottom: '20px'
                  }}
                >
                  Project Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Client</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.client}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Location</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Area</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.area}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Project Type</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Design Style</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.style}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Execution Time</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.timeline}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Year</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{project.year}</span>
                  </div>
                </div>

                <div style={{ marginTop: '28px', borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
                  <button
                    onClick={() => openConsultation(`Project Inquiry: ${project.title}`)}
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Request Similar Design</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* View More Projects matching Mockup */}
          <div style={{ marginTop: '90px', borderTop: '1px solid #F3F4F6', paddingTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                  EXPLORE FURTHER
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111827' }}>
                  View More Projects
                </h2>
              </div>
              <Link to="/projects" style={{ color: '#111827', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                All Projects →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {otherProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  style={{
                    height: '320px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,16,19,0.92) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '4px' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#D1D5DB' }}>{p.location}</p>
                  </div>
                </div>
              ))}
            </div>
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
            Inspired by This Project?
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', maxWidth: '580px', margin: '0 auto 30px auto', lineHeight: 1.6 }}>
            Our lead architects can adapt these custom modular finishes and floor plans for your Bangalore home.
          </p>
          <button onClick={() => openConsultation(`Case Study Consult: ${project.title}`)} className="btn-gold">
            <span>Book Architectural Consultation</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
};
