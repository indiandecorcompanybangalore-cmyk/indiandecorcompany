import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Home,
  Building2,
  Briefcase,
  Store,
  Armchair,
  Lightbulb,
  PanelsTopLeft,
  Sofa,
  Sparkles
} from 'lucide-react';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { OpeningScreen } from '../components/ui/OpeningScreen';
import { projectsData } from '../data/projectsData';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

// In-memory flag tracking if the opening screen has run during this browser session.
// - Resets to false whenever the user refreshes/reloads the page.
// - Preserved across client-side router navigations (clicking Logo or Home won't replay it).
// - Initialized to true if user landed directly on an inner page like /shop or /about.
let hasShownOpeningScreen = typeof window !== 'undefined'
  ? (window.location.pathname !== '/' && window.location.pathname !== '')
  : false;

export const HomePage = () => {
  const { openConsultation } = useLead();
  const navigate = useNavigate();

  // Hero Carousel State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      titleLine1: "Spaces",
      titleLine2: "That Inspire",
      titleLine3: "Better Living",
      subtitle: "Indian Decor Company (IDC) creates timeless and functional spaces for homes, offices, commercial and hospitality projects across India.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
    },
    {
      titleLine1: "Architectural",
      titleLine2: "Elegance &",
      titleLine3: "Craftsmanship",
      subtitle: "Bespoke custom furniture and turnkey interior architecture engineered for discerning Bangalore homeowners.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90"
    },
    {
      titleLine1: "Designed",
      titleLine2: "For Modern",
      titleLine3: "Workplaces",
      subtitle: "High-performance tech workspaces, corporate offices, and luxury retail flagships delivered on time.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=90"
    }
  ];

  // Section 2: 8-Category Ribbon Mobile Horizontal Scroll State (4 and next 4)
  const categoryRibbonRef = useRef(null);
  const [categoryPage, setCategoryPage] = useState(0);

  const handleCategoryScroll = () => {
    if (categoryRibbonRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryRibbonRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const page = maxScroll > 0 && scrollLeft > maxScroll * 0.4 ? 1 : 0;
      setCategoryPage(page);
    }
  };

  const scrollToCategoryPage = (pageIdx) => {
    if (categoryRibbonRef.current) {
      const { scrollWidth, clientWidth } = categoryRibbonRef.current;
      const targetLeft = pageIdx === 0 ? 0 : (scrollWidth - clientWidth);
      categoryRibbonRef.current.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
      setCategoryPage(pageIdx);
    }
  };

  // Section 3: Featured Projects ("Our Latest Work") Filtering & Horizontal Track
  const latestWorkTrackRef = useRef(null);
  const [projectFilter, setProjectFilter] = useState('All');
  const filteredProjects = projectFilter === 'All'
    ? projectsData
    : projectsData.filter(p =>
        p.category.toLowerCase() === projectFilter.toLowerCase() ||
        (projectFilter.toLowerCase() === 'commercial' && (p.category.toLowerCase() === 'commercial' || p.subCategory?.toLowerCase().includes('commercial')))
      );

  const scrollLatestWork = (direction) => {
    if (latestWorkTrackRef.current) {
      const scrollAmount = latestWorkTrackRef.current.clientWidth * 0.82;
      latestWorkTrackRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Testimonials Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    {
      quote: "IDC transformed our home into a beautiful, functional space. Their attention to detail and professionalism is exceptional.",
      author: "Priya Sharma",
      role: "Homeowner, Bangalore",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80"
    },
    {
      quote: "Excellent team, great design ideas and timely execution. Highly recommend IDC for office interiors.",
      author: "Rahul Mehta",
      role: "Business Owner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    {
      quote: "From design to execution, everything was seamless. Our retail space looks amazing and customer dwell time has doubled!",
      author: "Sneha Iyer",
      role: "Retail Store Owner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80"
    }
  ];

  // Video Modal simulation
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Cinematic Opening Screen Portal matching Mockup
  const [showOpeningScreen, setShowOpeningScreen] = useState(!hasShownOpeningScreen);

  useEffect(() => {
    // If the user navigates away from Home, ensure opening screen is marked as shown
    return () => {
      hasShownOpeningScreen = true;
    };
  }, []);

  const handleOpeningScreenComplete = () => {
    hasShownOpeningScreen = true;
    setShowOpeningScreen(false);
  };

  return (
    <div style={{ backgroundColor: '#0F1013', color: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      {showOpeningScreen && (
        <OpeningScreen onComplete={handleOpeningScreenComplete} />
      )}

      <MetaTags
        title="Indian Decor Company (IDC) | Luxury Interiors & Custom Furniture Bangalore"
        description="IDC is a premier Bangalore interior design and execution company specializing in luxury residential villas, commercial offices, modular kitchens, and custom handcrafted furniture."
        canonical="https://indiandecorcompany.in/"
      />
      <SchemaJsonLd type="Organization" />
      <SchemaJsonLd type="LocalBusiness" />

      {/* =========================================================================
          SECTION 1: HERO SECTION MATCHING MOCKUP
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '110px',
          paddingBottom: '80px',
          overflow: 'hidden'
        }}
      >
        {/* Cinematic Background Image with Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroSlides[currentHeroSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.8s ease-in-out',
            zIndex: 1
          }}
        >
          {/* Subtle multi-layer gradient to ensure contrast without muddying photography */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(15, 16, 19, 0.92) 0%, rgba(15, 16, 19, 0.65) 50%, rgba(15, 16, 19, 0.35) 100%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #0F1013 0%, transparent 35%)'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: '680px' }}>
            {/* Subtitle / Overline */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>INTERIOR DESIGN</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
              <span>MODULAR SOLUTIONS</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
              <span>TURNKEY PROJECTS</span>
            </div>

            {/* Huge Serif Display Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)',
                lineHeight: 1.05,
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '24px'
              }}
            >
              {heroSlides[currentHeroSlide].titleLine1} <br />
              {heroSlides[currentHeroSlide].titleLine2} <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-light)' }}>
                {heroSlides[currentHeroSlide].titleLine3}
              </span>
            </h1>

            {/* Paragraph Text */}
            <p
              style={{
                fontSize: '1rem',
                color: '#D1D5DB',
                lineHeight: 1.65,
                marginBottom: '36px',
                maxWidth: '540px'
              }}
            >
              {heroSlides[currentHeroSlide].subtitle}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <Link to="/projects" className="btn-primary" style={{ padding: '12px 28px' }}>
                <span>Explore Our Work</span>
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={() => setShowVideoModal(true)}
                className="btn-secondary"
                style={{ padding: '11px 24px' }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '2px'
                  }}
                >
                  <Play size={10} fill="#FFFFFF" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: Scroll Indicator (Left) & Slide Counter / Navigation (Right) */}
          <div
            style={{
              marginTop: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Scroll Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: '#9CA3AF',
                textTransform: 'uppercase'
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem'
                }}
              >
                +
              </span>
              <span>SCROLL</span>
            </div>

            {/* Slide Navigation Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>0{currentHeroSlide + 1}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>/</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>0{heroSlides.length}</span>
              </div>

              {/* Progress Line */}
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${((currentHeroSlide + 1) / heroSlides.length) * 100}%`,
                    backgroundColor: 'var(--color-gold)',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>

              {/* Arrows */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                  aria-label="Previous Hero Slide"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                  aria-label="Next Hero Slide"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 8 CATEGORY QUICK-NAV RIBBON MATCHING MOCKUP
          ========================================================================= */}
      <section
        style={{
          backgroundColor: '#121418',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 0'
        }}
      >
        <div className="container-custom">
          <div
            ref={categoryRibbonRef}
            onScroll={handleCategoryScroll}
            className="category-nav-ribbon"
          >
            {[
              { title: 'Residential Interiors', icon: Home, link: '/services/residential-interiors' },
              { title: 'Commercial Spaces', icon: Building2, link: '/services/commercial-interiors' },
              { title: 'Office Interiors', icon: Briefcase, link: '/services/office-interiors' },
              { title: 'Retail & Hospitality', icon: Store, link: '/services/retail-interiors' },
              { title: 'Modular Furniture', icon: Armchair, link: '/services/modular-furniture' },
              { title: 'False Ceiling & Lighting', icon: Lightbulb, link: '/services/false-ceiling' },
              { title: 'Wall Décor & Panels', icon: PanelsTopLeft, link: '/services/wall-decor-panels' },
              { title: 'Custom Furniture Solutions', icon: Sofa, link: '/services/custom-furniture' }
            ].map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.link}
                  className="category-nav-item group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    className="cat-icon-box"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                  <span
                    className="cat-title-text"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#E5E7EB',
                      lineHeight: 1.3
                    }}
                  >
                    {cat.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Pagination Indicator Dots (First 4 / Next 4) */}
          <div className="category-nav-dots" aria-label="Category pages">
            <button
              onClick={() => scrollToCategoryPage(0)}
              className={`category-nav-dot ${categoryPage === 0 ? 'active' : ''}`}
              aria-label="View first 4 categories"
            />
            <button
              onClick={() => scrollToCategoryPage(1)}
              className={`category-nav-dot ${categoryPage === 1 ? 'active' : ''}`}
              aria-label="View next 4 categories"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED PROJECTS ("OUR LATEST WORK") MATCHING MOCKUP
          ========================================================================= */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF', color: '#111827', overflow: 'hidden' }}>
        <div className="container-custom">
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '32px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                FEATURED PROJECTS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                  fontWeight: 600,
                  color: '#111827'
                }}
              >
                Our Latest Work
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="latest-work-filters">
              {['All', 'Residential', 'Commercial', 'Office', 'Retail', 'Hospitality'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setProjectFilter(tab)}
                  className={`filter-pill ${projectFilter === tab ? 'active' : ''}`}
                  style={{
                    backgroundColor: projectFilter === tab ? '#111827' : 'transparent',
                    color: projectFilter === tab ? '#FFFFFF' : '#4B5563',
                    border: 'none',
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: projectFilter === tab ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* View All Projects Link & Nav Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link
                to="/projects"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#111827',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>View All Projects</span>
                <ArrowRight size={14} color="var(--color-gold)" />
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => scrollLatestWork('prev')}
                  aria-label="Previous Projects"
                  className="btn-circle-nav"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollLatestWork('next')}
                  aria-label="Next Projects"
                  className="btn-circle-nav"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Single-Row Horizontally Scrollable Projects Track */}
          <div
            ref={latestWorkTrackRef}
            className="latest-work-track"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="latest-work-card group"
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
                    background: 'linear-gradient(to top, rgba(15, 16, 19, 0.95) 0%, rgba(15, 16, 19, 0.3) 50%, transparent 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Bottom Card Content with Arrow button matching mockup */}
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
                    <p style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>{project.location}</p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="btn-circle-action">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ABOUT INDIAN DECOR COMPANY MATCHING MOCKUP
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#FBFBFA', color: '#14161A' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '56px',
              alignItems: 'center'
            }}
          >
            {/* Left Image with Floating Experience Badge */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  height: '460px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-medium)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="IDC Luxury Interior Design Atelier Bangalore"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Dark Badge: 15+ Years of Experience */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  right: '-15px',
                  backgroundColor: '#121418',
                  color: '#FFFFFF',
                  padding: '20px 24px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border-gold)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                  maxWidth: '200px'
                }}
              >
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)' }}>
                  Since 2011
                </span>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
                  15+
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '2px' }}>
                  Years of Experience
                </div>
              </div>
            </div>

            {/* Right Text Column */}
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-gold-dark)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                ABOUT INDIAN DECOR COMPANY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
                  fontWeight: 600,
                  color: '#14161A',
                  lineHeight: 1.2,
                  marginBottom: '20px'
                }}
              >
                Designing Spaces <br />
                For A Better Tomorrow
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '32px' }}>
                Indian Decor Company (IDC) is a full-service interior design and execution company delivering innovative, stylish and functional spaces for residential, commercial and hospitality projects. Based in Bangalore, we merge architectural planning with bespoke in-house furniture manufacturing.
              </p>

              {/* 4 Feature Points in 2x2 Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                  marginBottom: '36px'
                }}
              >
                {[
                  'End-to-End Project Execution',
                  'Premium Quality Materials',
                  'Customized Design Solutions',
                  'On-Time Delivery'
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(197, 168, 128, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-gold-dark)',
                        flexShrink: 0
                      }}
                    >
                      <CheckCircle2 size={16} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1F2937' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="btn-primary"
                style={{
                  backgroundColor: '#121418',
                  color: '#FFFFFF',
                  padding: '11px 26px'
                }}
              >
                <span>More About Us</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: OUR PROCESS ("FROM VISION TO REALITY") MATCHING MOCKUP
          ========================================================================= */}
      <section style={{ backgroundColor: '#0F1013' }}>
        <div className="container-custom" style={{ padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Left Block (Dark Charcoal) */}
            <div
              style={{
                backgroundColor: '#14161C',
                padding: '56px 44px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                OUR PROCESS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: '16px'
                }}
              >
                From Vision <br />
                to Reality
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '28px' }}>
                A simple and transparent process to bring your dream space to life.
              </p>
              <Link
                to="/services"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>How We Work</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right Block (White Background with Timeline Steps) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#14161A',
                padding: '56px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}
              >
                {[
                  { step: '01', title: 'Consultation', desc: 'Understand your requirements' },
                  { step: '02', title: 'Design & Planning', desc: 'Detailed space planning' },
                  { step: '03', title: 'Material Selection', desc: 'Curate the best options' },
                  { step: '04', title: 'Execution', desc: 'Skilled team at work' },
                  { step: '05', title: 'Handover', desc: 'Your dream space ready' }
                ].map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    {/* Circle Step Number */}
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px auto',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#111827'
                      }}
                    >
                      {item.step}
                    </div>
                    <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: '#6B7280', lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BEFORE & AFTER ("TRANSFORMING SPACES") MATCHING MOCKUP
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF', color: '#111827' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left Narrative */}
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
                BEFORE & AFTER
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1.2,
                  marginBottom: '16px'
                }}
              >
                Transforming Spaces
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.65, marginBottom: '28px' }}>
                See how we convert ordinary spaces into extraordinary experiences. Explore the dramatic transformation from bare concrete shells into fully curated, turnkey architectural sanctuaries.
              </p>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: '1px solid #111827',
                  color: '#111827',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#111827';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#111827';
                }}
              >
                <span>View More Transformations</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right Interactive Slider */}
            <div>
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
                afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TESTIMONIALS ("WHAT OUR CLIENTS SAY") MATCHING MOCKUP
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#F8F9FA', color: '#111827' }}>
        <div className="container-custom">
          {/* Header Row with Navigation Arrows */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '40px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                TESTIMONIALS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
                  fontWeight: 600,
                  color: '#111827'
                }}
              >
                What Our Clients Say
              </h2>
            </div>

            {/* Next / Prev Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                aria-label="Previous Testimonial"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                aria-label="Next Testimonial"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* 3 Review Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#14161A',
                  padding: '32px 28px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-medium)'
                }}
              >
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.65, marginBottom: '24px', fontStyle: 'normal' }}>
                  "{t.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={t.avatar}
                      alt={t.author}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                        {t.author}
                      </h4>
                      <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>{t.role}</span>
                    </div>
                  </div>

                  {/* 5 Gold Stars */}
                  <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: PRE-FOOTER CTA BANNER MATCHING MOCKUP
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: '70px 0',
          backgroundColor: '#16181D',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18
          }}
        />
        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '28px'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}
              >
                Let's Create Your Dream Space Together
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#D1D5DB' }}>
                Get a free consultation and expert advice for your next project.
              </p>
            </div>

            <button
              onClick={() => openConsultation('Home Consultation Banner')}
              className="btn-primary"
              style={{ padding: '13px 30px', fontSize: '0.88rem' }}
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            style={{
              maxWidth: '800px',
              width: '100%',
              backgroundColor: '#14161C',
              borderRadius: '16px',
              overflow: 'hidden',
              padding: '28px',
              textAlign: 'center',
              border: '1px solid rgba(197, 168, 128, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '16px' }}>
              IDC Turnkey Interior & Craftsmanship Showcase
            </h3>
            <div
              style={{
                position: 'relative',
                paddingTop: '56.25%',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                marginBottom: '20px'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="IDC Video Reel Preview"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold)',
                    color: '#0E0F12',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Play size={24} fill="#0E0F12" />
                </div>
              </div>
            </div>
            <button onClick={() => setShowVideoModal(false)} className="btn-secondary">
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
