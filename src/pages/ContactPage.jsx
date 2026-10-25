import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Calendar,
  Layers,
  Car,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';
import { GoogleMapEmbed } from '../components/ui/GoogleMapEmbed';

export const ContactPage = () => {
  const { submitLead, openConsultation } = useLead();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Interior Design',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyType: formData.projectType,
      notes: formData.message,
      location: 'Bangalore'
    });
    setSubmitted(true);
  };

  const servicedAreas = [
    'Whitefield',
    'Indiranagar',
    'HSR Layout',
    'Koramangala',
    'Hebbal',
    'Sadashivanagar',
    'JP Nagar',
    'Sarjapur Road'
  ];

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#F8F9FA' }}>
      <MetaTags
        title="Contact Indian Decor Company (IDC) Bangalore | Design Studio & Factory"
        description="Get in touch with IDC's interior architects and furniture designers in Bangalore. Schedule a free design consultation or visit our local workshop."
        canonical="https://indiandecorcompany.in/contact"
      />
      <SchemaJsonLd type="LocalBusiness" />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Contact", url: "https://indiandecorcompany.in/contact" }
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
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
          alt="IDC Bangalore Design Studio and Concierge"
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
            CONNECT WITH IDC • BANGALORE STUDIO
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
            Contact Indian Decor Company Bangalore
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#D1D5DB', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            Whether planning a bespoke residence, corporate office fitout, or custom furniture order, our Bangalore design team is ready to guide your journey.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MAIN CONTACT & CONSULTATION GRID (REFINED LIGHT LUXURY UI)
          ========================================================================= */}
      <section style={{ padding: '80px 0 95px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Location, Studio Details & Channels */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '36px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ marginBottom: '32px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'var(--color-gold)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  FLAGSHIP STUDIO & ATELIER
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#111827', marginBottom: '12px', fontWeight: 600 }}>
                  IDC Design Pavilion & Workshop
                </h2>
                <p style={{ fontSize: '0.92rem', color: '#6B7280', lineHeight: 1.65 }}>
                  Meet our senior interior architects, touch 200+ Italian marble and veneer samples, inspect German modular joinery, and review interactive 3D floorplans at our Bangalore studio.
                </p>
              </div>

              {/* Info Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 168, 128, 0.12)',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      flexShrink: 0
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                      Studio Location
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '6px' }}>
                      Bangalore, Karnataka, India<br />
                      Dedicated design center & modern manufacturing atelier.
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Indian+Decor+Company+Bangalore"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8rem',
                        color: 'var(--color-gold)',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                    >
                      <span>View on Google Maps</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 168, 128, 0.12)',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      flexShrink: 0
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                      Direct Phone
                    </h4>
                    <a href="tel:+918050551406" style={{ fontSize: '0.86rem', color: '#111827', fontWeight: 600, textDecoration: 'none' }}>
                      +91 80505 51406
                    </a>
                    <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>Direct studio consultation desk</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 168, 128, 0.12)',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      flexShrink: 0
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                      Email Inquiries
                    </h4>
                    <a href="mailto:info@indiandecorcompany.in" style={{ fontSize: '0.86rem', color: '#111827', fontWeight: 500, textDecoration: 'none' }}>
                      info@indiandecorcompany.in
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 168, 128, 0.12)',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      flexShrink: 0
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                      Working Hours
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: '#4B5563' }}>
                      Monday – Saturday: 9:00 AM – 7:30 PM
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
                      Sunday: By appointment only
                    </p>
                  </div>
                </div>
              </div>

              {/* Serviced Neighborhoods Badges */}
              <div style={{ paddingTop: '20px', borderTop: '1px solid #F3F4F6', marginBottom: '28px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                  Key Service Areas in Bangalore:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {servicedAreas.map((area, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.76rem',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        border: '1px solid #E5E7EB'
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div
                style={{
                  backgroundColor: 'rgba(37, 211, 102, 0.08)',
                  border: '1px solid rgba(37, 211, 102, 0.25)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#065F46', marginBottom: '2px' }}>
                    Instant WhatsApp Support
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#047857' }}>
                    Connect directly with a principal designer on WhatsApp.
                  </p>
                </div>
                <a
                  href="https://wa.me/918050551406?text=Hi%20IDC%20Team%2C%20I%20would%20like%20to%20discuss%20an%20interior%20project%20in%20Bangalore."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Chat Now</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Luxury Consultation Form Card */}
            <div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '36px 32px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  color: '#14161A'
                }}
              >
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '48px 16px' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        color: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 18px auto'
                      }}
                    >
                      <CheckCircle2 size={34} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111827', marginBottom: '10px' }}>
                      Message Received
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '28px' }}>
                      Thank you, <strong style={{ color: '#111827' }}>{formData.name}</strong>. Our principal designer will review your architectural parameters and reach out within 4 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary"
                      style={{ backgroundColor: '#111827', color: '#FFFFFF', padding: '12px 24px', borderRadius: '8px' }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          color: 'var(--color-gold)',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '6px'
                        }}
                      >
                        CONSULTATION REQUEST
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>
                        Send Us a Message
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: '#6B7280' }}>
                        Fill in your details below and an IDC architect will prepare preliminary spatial concepts for your review.
                      </p>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Sharma"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.9rem',
                          color: '#111827',
                          outline: 'none',
                          backgroundColor: '#F9FAFB'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '0.9rem',
                            color: '#111827',
                            outline: 'none',
                            backgroundColor: '#F9FAFB'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 00000"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #D1D5DB',
                            fontSize: '0.9rem',
                            color: '#111827',
                            outline: 'none',
                            backgroundColor: '#F9FAFB'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                        Project Scope / Category *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.9rem',
                          color: '#111827',
                          outline: 'none',
                          backgroundColor: '#F9FAFB'
                        }}
                      >
                        <option value="Residential Interior Design">Residential Villa / Penthouse Design</option>
                        <option value="Commercial / Office Interiors">Commercial / Corporate Office Interiors</option>
                        <option value="Retail & Hospitality">Retail Boutique & Hospitality</option>
                        <option value="Modular Kitchens & Wardrobes">German Modular Kitchens & Wardrobes</option>
                        <option value="Custom Furniture Order">Bespoke Custom Furniture Order</option>
                        <option value="Wholesale Furniture / B2B">B2B Commercial Furniture Supply</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                        Project Details & Timeline
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your property location (e.g. Whitefield), tentative handover date, and aesthetic preferences..."
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.9rem',
                          color: '#111827',
                          outline: 'none',
                          resize: 'none',
                          backgroundColor: '#F9FAFB'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#111827',
                        color: '#FFFFFF',
                        width: '100%',
                        padding: '14px 20px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s ease',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                      }}
                    >
                      <span>Submit Consultation Request</span>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHAT TO EXPECT AT THE IDC DESIGN ATELIER (LUXURY CARDS)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '85px 0', borderTop: '1px solid #E5E7EB' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              IN-PERSON EXPERIENCE
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '14px'
              }}
            >
              Visiting Our Bangalore Pavilion
            </h2>
            <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.65 }}>
              We invite you to experience tangible craftsmanship first-hand. Our studio is built to give clients full transparency into our design process and manufacturing quality.
            </p>
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
                icon: Layers,
                title: 'Tactile Material Library',
                desc: 'Over 200 physical samples of imported Italian marble, certified European veneers, acoustic fabrics, and brass inlays.'
              },
              {
                icon: Compass,
                title: '3D Spatial Walkthroughs',
                desc: 'Review photorealistic 3D renders and interactive floorplan mockups with our senior architectural spatial planners.'
              },
              {
                icon: ShieldCheck,
                title: 'Factory Joinery Inspection',
                desc: 'See our proprietary German Homag edge-banding and precision CNC joinery before fabrication begins.'
              },
              {
                icon: Car,
                title: 'Private Reserved Parking',
                desc: 'Enjoy effortless arrival with dedicated client valet parking and curated private meeting suites.'
              }
            ].map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '12px',
                    padding: '28px 24px',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(197, 168, 128, 0.15)',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                      marginBottom: '18px'
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                    {feature.title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: '#6B7280', lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: INTERACTIVE GOOGLE MAP (OFFICIAL IDC BANGALORE LOCATION)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8F9FA', padding: '80px 0', borderTop: '1px solid #E5E7EB' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '32px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                STUDIO LOCATION & LIVE NAVIGATION
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '8px'
                }}
              >
                Find Our Bangalore Atelier
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#6B7280', maxWidth: '640px', lineHeight: 1.6 }}>
                Directly explore Indian Decor Company's flagship design center and workshop in Bangalore on the interactive map below.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Indian+Decor+Company+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Navigation size={15} />
                <span>Get Driving Directions</span>
              </a>
              <a
                href="tel:+918050551406"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid #D1D5DB'
                }}
              >
                <Phone size={15} />
                <span>Call Studio Desk</span>
              </a>
            </div>
          </div>

          {/* Embedded Official IDC Google Map */}
          <GoogleMapEmbed height="480px" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CALL TO ACTION BANNER (CONSISTENT WITH OTHER PAGES)
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
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            START YOUR JOURNEY TODAY
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.6vw, 2.7rem)',
              color: '#FFFFFF',
              marginBottom: '16px',
              fontWeight: 600
            }}
          >
            Ready to Transform Your Living Space?
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '28px' }}>
            Book a dedicated consultation session with our design directors. We review your architectural blueprints and develop custom estimates tailored to your vision.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openConsultation('Contact Page Bottom CTA')}
              className="btn-gold"
              style={{ padding: '13px 26px', fontSize: '0.9rem' }}
            >
              <span>Book Studio Consultation</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="tel:+918050551406"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 24px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <Phone size={16} />
              <span>+91 80505 51406</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
