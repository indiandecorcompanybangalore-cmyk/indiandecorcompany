import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { blogArticles } from '../data/blogData';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const BlogPage = () => {
  const navigate = useNavigate();
  const featuredArticle = blogArticles.find(a => a.featured) || blogArticles[0];
  const gridArticles = blogArticles.filter(a => a.id !== featuredArticle.id);

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <MetaTags
        title="Interior Design Insights & Guides Bangalore | IDC Journal"
        description="Expert insights on interior design trends, modular kitchen ergonomics, false ceiling costs, and custom furniture manufacturing in Bangalore."
        canonical="https://indiandecorcompany.in/blog"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Blog", url: "https://indiandecorcompany.in/blog" }
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
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Editorial Architecture Journal and Design Insights Bangalore"
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
            EDITORIAL & ARCHITECTURAL RESEARCH
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
            Interior Design Insights & Guides — Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            In-depth perspectives from our architects and master craftspeople on transforming modern spaces in Bangalore.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ARTICLES (CRISP WHITE BACKGROUND MATCHING MOCKUP)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '75px 0 95px 0' }}>
        <div className="container-custom">
          {/* Featured Large Article matching Mockup */}
          <div
            onClick={() => navigate(`/blog/${featuredArticle.slug}`)}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              marginBottom: '56px',
              height: '460px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)'
            }}
            className="group"
          >
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 16, 19, 0.95) 0%, rgba(15, 16, 19, 0.35) 50%, transparent 100%)'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '40px',
                maxWidth: '800px',
                zIndex: 2
              }}
            >
              <span
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: '#0E0F12',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}
              >
                Featured Insight • {featuredArticle.category}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: '12px'
                }}
              >
                {featuredArticle.title}
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '20px' }}>
                {featuredArticle.subtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.82rem' }}>
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#D1D5DB' }}>
                  <Clock size={14} />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Grid Articles Layout matching Mockup */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {gridArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/blog/${article.slug}`)}
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
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    <span
                      style={{
                        backgroundColor: '#111827',
                        color: 'var(--color-gold)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: '#111827', lineHeight: 1.35, marginBottom: '10px' }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
                      {article.subtitle}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#6B7280' }}>
                      <Clock size={13} />
                      <span>{article.readTime}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>
                      <span>Read Insight</span>
                      <ArrowRight size={14} color="var(--color-gold)" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PRE-FOOTER NEWSLETTER (DARK LUXURY ACCENT)
          ========================================================================= */}
      <section
        style={{
          padding: '85px 0',
          backgroundColor: '#0F1013',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '12px'
            }}
          >
            Join Our Architecture & Design Circle
          </h2>
          <p style={{ fontSize: '0.94rem', color: '#9CA3AF', marginBottom: '28px', lineHeight: 1.6 }}>
            Receive our quarterly monographs on luxury material finishes, Bangalore real estate layouts, and interior innovation.
          </p>
          <div style={{ display: 'flex', gap: '8px', maxWidth: '440px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button className="btn-gold" style={{ padding: '12px 24px', flexShrink: 0 }}>
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
