import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div style={{ backgroundColor: '#F8F9FA', color: '#111827', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <MetaTags
        title="Policies & Terms | Indian Decor Company (IDC)"
        description="Review IDC's Privacy Policy, Terms of Service, Furniture White-Glove Shipping Policy, and 10-Year Craftsmanship Warranty."
        canonical="https://indiandecorcompany.in/legal"
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Legal & Policies", url: "https://indiandecorcompany.in/legal" }
        ]}
      />

      <div className="container-custom" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            TRUST & GOVERNANCE
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, color: '#111827' }}>
            Policies, Terms & Warranties
          </h1>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {[
            { id: 'privacy', name: 'Privacy Policy' },
            { id: 'terms', name: 'Terms & Conditions' },
            { id: 'shipping', name: 'Shipping & Delivery' },
            { id: 'refund', name: 'Warranty & Returns' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                backgroundColor: activeTab === tab.id ? '#111827' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#4B5563',
                border: activeTab === tab.id ? '1px solid #111827' : '1px solid #D1D5DB',
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0, 0, 0, 0.12)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content in Luxury Light Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '44px 38px',
            lineHeight: 1.85,
            fontSize: '0.94rem',
            color: '#374151',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
          }}
        >
          {activeTab === 'privacy' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111827', marginBottom: '18px', fontWeight: 600 }}>Privacy Policy</h2>
              <p style={{ marginBottom: '16px' }}>
                Indian Decor Company ("IDC", "we", "us") values your privacy. We collect client contact details (name, email, phone number, floorplans) solely for delivering architectural interior estimates, consulting sessions, and order fulfilment.
              </p>
              <p style={{ marginBottom: '16px' }}>
                We never sell, rent, or lease your personal data to third parties. All financial transactions are processed through encrypted, bank-grade payment gateways compliant with Indian RBI regulations.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111827', marginBottom: '18px', fontWeight: 600 }}>Terms & Conditions</h2>
              <p style={{ marginBottom: '16px' }}>
                All turnkey interior execution contracts are governed by bilateral itemized Bill of Quantities (BOQ) agreements signed between Indian Decor Company and the client.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Deliveries are subject to site handover conditions. IDC guarantees a 45 to 60 working-day timeline from final design approval, barring external apartment association work-hour restrictions or force majeure.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111827', marginBottom: '18px', fontWeight: 600 }}>Shipping & White-Glove Staging</h2>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#111827' }}>Bangalore Metropolitan Area:</strong> All bespoke furniture and interior products include complimentary insured white-glove transport, uncrating, room-of-choice placement, and professional assembly by IDC technicians.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#111827' }}>Pan-India Shipments:</strong> High-value furniture pieces are crated in custom reinforced wooden pallets with moisture barrier seals and tracked via premium domestic freight carriers.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111827', marginBottom: '18px', fontWeight: 600 }}>10-Year Craftsmanship Warranty & Return Policy</h2>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#111827' }}>10-Year Structural Frame Warranty:</strong> All custom-manufactured hardwood sofa frames, dining tables, and modular cabinetry substrates are protected against structural collapse, frame warpage, and termite infestation.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#111827' }}>Bespoke Custom Furniture:</strong> Because custom pieces are handcrafted to individual client floorplan specifications and fabric selections, returns are accepted in cases of transit damage or verified manufacturing defects reported within 48 hours of delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
