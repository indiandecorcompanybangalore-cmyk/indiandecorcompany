import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const companyLinks = [
    { name: 'About us', path: '/about/' },
    { name: 'Services', path: '/services/' },
    { name: 'Bangalore Studios', path: '/locations/' },
    { name: 'Careers', path: '/contact/' },
    { name: 'Contact', path: '/contact/' }
  ];

  const productLinks = [
    { name: 'Luxury Living', path: '/shop/?cat=sofas-seating' },
    { name: 'Dining & Bar', path: '/shop/?cat=dining-furniture' },
    { name: 'Bedroom Suites', path: '/shop/?cat=beds-bedroom' },
    { name: 'Modular Storage', path: '/services/modular-furniture/' }
  ];

  const resourceLinks = [
    { name: 'Blog', path: '/blog/' },
    { name: 'Newsletter', path: '/contact/' },
    { name: 'Media & Portfolio', path: '/projects/' },
    { name: 'Materials Library', path: '/materials/' }
  ];

  const legalLinks = [
    { name: 'Privacy', path: '/legal/' },
    { name: 'Security', path: '/legal/' },
    { name: 'Terms of use', path: '/legal/' },
    { name: 'Acceptance policy', path: '/legal/' },
    { name: 'Cookies', path: '/legal/' }
  ];

  const contactItems = [
    { text: 'concierge@indiandecorcompany.in', href: 'mailto:concierge@indiandecorcompany.in' },
    { text: '+91 80505 51406', href: 'tel:+918050551406' },
    { text: '08000-IDC-LUXE', href: 'tel:0804325893' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/indiandecorcompany',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://x.com/indiandecorcompany',
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/indiandecorcompany',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/indiandecorcompany',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.458.156-1.785.495-.494.508-.494 1.348-.494 2.68v.785h4.516l-.608 3.667h-3.908v7.98H9.101Z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="footer-full-width" style={{ paddingTop: 0 }}>
      {/* BRAND IDENTITY BANNER WITH SLIGHTLY VISIBLE LUXURY ARCHITECTURAL IMAGE */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#0E1014',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '44px 0',
          marginBottom: '56px',
          overflow: 'hidden'
        }}
      >
        {/* Slightly visible luxury architectural interior background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 42%',
            opacity: 0.22,
            filter: 'contrast(1.1) brightness(0.95)'
          }}
        />
        {/* Dark luxury gradient overlays for depth and high contrast readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(14, 16, 20, 0.92) 0%, rgba(14, 16, 20, 0.6) 50%, rgba(14, 16, 20, 0.92) 100%)'
          }}
        />
        {/* Subtle decorative gold radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(197, 168, 128, 0.14) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/idc-logo-transparent.png"
                alt="Indian Decor Company"
                style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.84rem',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.7)'
              }}
            >
              Architectural Interiors &amp; Bespoke Luxury Atelier
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* TOP SECTION: 5 EQUAL COLUMNS MATCHING MOCKUP */}
        <div className="footer-nav-grid">
          {/* 1. Company */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.01em'
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.85rem',
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Products */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.01em'
              }}
            >
              Products
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.85rem',
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Resources */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.01em'
              }}
            >
              Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.85rem',
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Legal */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.01em'
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.85rem',
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.01em'
              }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.85rem',
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                      wordBreak: 'break-word'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* THIN HORIZONTAL DIVIDER LINE MATCHING MOCKUP */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            marginTop: '48px',
            marginBottom: '26px'
          }}
        />

        {/* MIDDLE ROW: ADDRESS + COPYRIGHT (LEFT) & CIRCULAR SOCIAL MEDIA ICONS (RIGHT) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Address & Copyright matching Mockup */}
          <div>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#D1D5DB',
                margin: '0 0 6px 0',
                lineHeight: 1.5,
                fontWeight: 400
              }}
            >
              Indian Decor Company Design Pavilion & Atelier, Bangalore, Karnataka, India.{' '}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Indian+Decor+Company+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  marginLeft: '4px'
                }}
              >
                (View on Google Maps ↗)
              </a>
            </p>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#8C9098',
                margin: 0,
                fontWeight: 400
              }}
            >
              © 2026 Indian Decor Company. All rights reserved.
            </p>
          </div>

          {/* Circular Social Media Icons matching Mockup */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                  e.currentTarget.style.color = '#0E0F12';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH GIANT WATERMARK BRAND TYPOGRAPHY */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          userSelect: 'none',
          pointerEvents: 'none',
          marginTop: '36px',
          marginBottom: '-24px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(5.5rem, 16vw, 17.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'rgba(255, 255, 255, 0.05)',
            lineHeight: 0.8,
            whiteSpace: 'nowrap'
          }}
        >
          IndianDecor
        </span>
      </div>
    </footer>
  );
};

