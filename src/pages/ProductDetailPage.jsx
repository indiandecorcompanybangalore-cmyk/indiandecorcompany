import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  Sliders, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Check, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { projectsData } from '../data/projectsData';
import { useCart } from '../context/CartContext';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';

export const ProductDetailPage = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist = [], totalItemsCount, setIsCartOpen } = useCart();
  const { openConsultation } = useLead();

  const product = useMemo(() => {
    return productsData.find(p => p.slug === slug) || productsData[0];
  }, [slug]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [slug, product]);

  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const relatedProjects = useMemo(() => {
    return projectsData.filter(p =>
      p.category.toLowerCase().includes(product.category.toLowerCase()) ||
      product.category.toLowerCase().includes(p.category.toLowerCase())
    ).slice(0, 2);
  }, [product]);

  const colorOptions = [
    { name: 'Beige', hex: '#E6D7C3' },
    { name: 'Slate Gray', hex: '#64748B' },
    { name: 'Cognac Leather', hex: '#8C5338' },
    { name: 'Olive Velvet', hex: '#4A5B46' },
    { name: 'Midnight Charcoal', hex: '#23272F' }
  ];

  const handleAdd = () => {
    addToCart({ ...product, selectedColor }, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, selectedColor }, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Indian Decor Company`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div style={{ backgroundColor: '#F8F9FA', color: '#111827', minHeight: '100vh', paddingTop: '100px', paddingBottom: '90px' }}>
      <MetaTags
        title={`${product.name} | Luxury Handcrafted Furniture Bangalore | IDC`}
        description={product.shortDesc}
        canonical={`https://indiandecorcompany.in/shop/${product.category}/${product.slug}`}
        ogImage={product.image}
      />
      <SchemaJsonLd type="Product" data={product} />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Shop", url: "https://indiandecorcompany.in/shop" },
          { name: product.categoryName, url: `https://indiandecorcompany.in/shop/${product.category}` },
          { name: product.name, url: `https://indiandecorcompany.in/shop/${product.category}/${product.slug}` }
        ]}
      />

      <div className="container-custom">
        {/* Mobile Top Navigation Bar matching Screen 4 of Mockup */}
        <div className="md:hidden flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>

          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-gold)' }}>
            IDC Collections
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleShare}
              style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', padding: '6px' }}
              aria-label="Share"
              title="Share Product"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              style={{ background: 'none', border: 'none', color: isWishlisted ? '#EF4444' : '#111827', cursor: 'pointer', padding: '6px' }}
              aria-label="Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', padding: '6px', position: 'relative' }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  backgroundColor: 'var(--color-gold)',
                  color: '#FFFFFF',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {totalItemsCount || 0}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Breadcrumb */}
        <div className="hidden md:flex items-center gap-2" style={{ marginBottom: '28px', fontSize: '0.84rem' }}>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#6B7280',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={14} /> Back to Shop Collections
          </Link>
          <span style={{ color: '#D1D5DB' }}>/</span>
          <span style={{ color: '#9CA3AF' }}>{product.categoryName || 'Collection'}</span>
          <span style={{ color: '#D1D5DB' }}>/</span>
          <span style={{ color: '#111827', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* 2-Column Product Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '44px',
            alignItems: 'start',
            marginBottom: '60px'
          }}
        >
          {/* Left Column: Gallery */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                height: '460px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                marginBottom: '16px',
                position: 'relative'
              }}
            >
              <img
                src={product.gallery[selectedImage] || product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Desktop Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle Wishlist"
                className="hidden md:flex"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #E5E7EB',
                  color: isWishlisted ? '#EF4444' : '#111827',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
              </button>
            </div>

            {/* Dots Indicator for Mobile */}
            <div className="flex md:hidden justify-center items-center gap-2 mb-4">
              {product.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: selectedImage === idx ? '22px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    backgroundColor: selectedImage === idx ? 'var(--color-gold)' : '#D1D5DB',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  aria-label={`Go to image slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Thumbnail Strip (Desktop) */}
            <div className="hidden md:flex" style={{ gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedImage === idx ? '2px solid var(--color-gold)' : '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    padding: 0,
                    cursor: 'pointer',
                    flexShrink: 0,
                    boxShadow: selectedImage === idx ? '0 4px 12px rgba(197, 168, 128, 0.25)' : 'none',
                    transition: 'border 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing, Specs & Order Actions Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 32px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {product.brand || 'IDC SIGNATURE ATELIER'}
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', fontWeight: 600, color: '#111827', lineHeight: 1.2, marginBottom: '10px' }}>
              {product.name}
            </h1>

            {/* Star Rating Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#F59E0B', marginBottom: '18px' }}>
              <Star size={16} fill="#F59E0B" />
              <span style={{ fontWeight: 700, color: '#111827' }}>{product.rating || 4.8}</span>
              <span style={{ color: '#6B7280' }}>({product.reviewsCount || 53} reviews)</span>
              <span style={{ color: '#D1D5DB', margin: '0 4px' }}>•</span>
              <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.8rem' }}>In Stock • Bangalore Atelier</span>
            </div>

            {/* Price Row with 25% OFF Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
                ₹ {product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ fontSize: '1.15rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  ₹ {product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FECACA',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '4px'
                }}
              >
                25% OFF
              </span>
            </div>

            {/* Color Swatches */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                Color: <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {colorOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: selectedColor === c.name ? '2px solid #FFFFFF' : '1px solid #D1D5DB',
                      boxShadow: selectedColor === c.name ? '0 0 0 2px var(--color-gold)' : 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease'
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '26px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                Quantity
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '4px 10px'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', padding: '4px 10px', fontSize: '1.1rem', fontWeight: 600 }}
                >
                  -
                </button>
                <span style={{ padding: '0 14px', fontSize: '0.92rem', fontWeight: 600, color: '#111827' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', padding: '4px 10px', fontSize: '1.1rem', fontWeight: 600 }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Dual Main Buttons: [ Add to Cart ] + [ Buy Now ] */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={handleAdd}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                }}
              >
                {addedNotice ? <Check size={18} color="#10B981" /> : <ShoppingBag size={18} />}
                <span>{addedNotice ? 'Added to Bag!' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-gold"
                style={{ flex: 1, padding: '14px 20px', fontSize: '0.9rem', fontWeight: 700 }}
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Secondary Actions: [ Request Customization ] + [ WhatsApp ] */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={() => {
                  window.location.href = `https://wa.me/918050551406?text=Hi%20IDC%2C%20I%20would%20like%20to%20request%20customization%20for%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku}).`;
                }}
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#374151',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <Sliders size={15} color="var(--color-gold)" />
                <span>Request Customization</span>
              </button>

              <a
                href={`https://wa.me/918050551406?text=Hi%20IDC%20Team%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku}).`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  color: '#065F46',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <MessageCircle size={16} color="#25D366" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                borderTop: '1px solid #F3F4F6',
                paddingTop: '20px',
                fontSize: '0.72rem',
                color: '#6B7280',
                textAlign: 'center'
              }}
            >
              <div>
                <Award size={18} color="var(--color-gold)" style={{ margin: '0 auto 6px auto' }} />
                <span>Premium Quality</span>
              </div>
              <div>
                <Truck size={18} color="var(--color-gold)" style={{ margin: '0 auto 6px auto' }} />
                <span>Free Bangalore Delivery</span>
              </div>
              <div>
                <RotateCcw size={18} color="var(--color-gold)" style={{ margin: '0 auto 6px auto' }} />
                <span>10-Year Warranty</span>
              </div>
              <div>
                <ShieldCheck size={18} color="var(--color-gold)" style={{ margin: '0 auto 6px auto' }} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Care Section (Light Luxury Card) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '40px 36px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            marginBottom: '64px'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {/* Technical Specifications */}
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                DIMENSIONS & JOINERY
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', marginBottom: '18px', fontWeight: 600 }}>
                Technical Specifications
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <tbody>
                  {(product.specifications || []).map((spec, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '12px 0', color: '#6B7280', width: '38%', fontWeight: 500 }}>{spec.key}</td>
                      <td style={{ padding: '12px 0', color: '#111827', fontWeight: 600 }}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Care & Maintenance */}
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                UPHOLSTERY & FINISH LONGEVITY
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', marginBottom: '18px', fontWeight: 600 }}>
                Material Care & Maintenance
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.75, marginBottom: '24px' }}>
                {product.careInstructions || 'Dust regularly with a soft, lint-free cloth. For fabric upholstery, spot clean immediately with specialized upholstery cleaner. Keep away from prolonged direct harsh sunlight to preserve dye fidelity.'}
              </p>
              <div
                style={{
                  backgroundColor: 'rgba(197, 168, 128, 0.08)',
                  border: '1px solid rgba(197, 168, 128, 0.25)',
                  borderRadius: '12px',
                  padding: '20px',
                  fontSize: '0.85rem',
                  color: '#374151',
                  lineHeight: 1.6
                }}
              >
                <strong style={{ color: '#111827', display: 'block', marginBottom: '4px' }}>
                  IDC Craftsmanship Guarantee:
                </strong>
                Every piece is individually handcrafted in our Bangalore manufacturing facility, using kiln-dried hardwood frames, certified non-sag springs, and German precision joinery.
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Sell: "Featured in IDC Interior Projects" */}
        {relatedProjects.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
              DESIGN IN CONTEXT
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111827', margin: '6px 0 24px 0', fontWeight: 600 }}>
              See This Piece in an IDC Interior Project
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  style={{
                    height: '290px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
                  }}
                  className="group"
                >
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 16, 19, 0.92) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '22px', left: '22px', right: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '4px' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>{p.location}</p>
                    </div>
                    <div className="btn-circle-action">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
