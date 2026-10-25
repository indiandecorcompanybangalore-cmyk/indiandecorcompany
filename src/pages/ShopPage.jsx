import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Grid,
  LayoutGrid,
  Check,
  Shield,
  Truck,
  RotateCcw,
  Lock,
  Wrench,
  Diamond,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X
} from 'lucide-react';
import { productCategories, shopProductsData, featuredCollectionsData } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useLead } from '../context/LeadContext';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';
import { MobileFilterModal } from '../components/ui/MobileFilterModal';

export const ShopPage = () => {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams();
  const [searchParams] = useSearchParams();
  const initialCategory = routeCategory || searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { openConsultation } = useLead();

  // Search input state (exclusive to Shop Page)
  const [searchInputVal, setSearchInputVal] = useState(searchQuery);
  const categoryTrackRef = useRef(null);

  useEffect(() => {
    setSearchInputVal(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = searchInputVal.trim();
    if (trimmed) {
      navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/shop');
    }
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchInputVal('');
    navigate('/shop');
  };

  const scrollCategoryTrack = (direction) => {
    if (categoryTrackRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      categoryTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mobile Filter & Sort Modal State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory !== 'all' ? [initialCategory] : []
  );

  const [priceMax, setPriceMax] = useState(500000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewGridColumns, setViewGridColumns] = useState(4); // 4 or 2 columns

  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: true,
    material: true,
    color: true,
    availability: true
  });

  const toggleSection = (sec) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Hero Slide State
  const [currentSlide, setCurrentSlide] = useState(1);
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  // Available Filter Options matching Mockup
  const brandsList = [
    { name: 'IDC Signature', count: 45 },
    { name: 'Häfele', count: 32 },
    { name: 'Furnitech', count: 28 },
    { name: 'Livoxo', count: 20 },
    { name: 'Philips', count: 18 }
  ];

  const materialsList = ['Wood', 'Metal', 'Fabric', 'Glass', 'Marble', 'Leather'];

  const colorSwatches = [
    { name: 'Beige', hex: '#EBE5D8' },
    { name: 'Grey', hex: '#8C9098' },
    { name: 'Black', hex: '#1E1E1E' },
    { name: 'Brown', hex: '#6E4733' },
    { name: 'Tan', hex: '#A87954' },
    { name: 'Sage', hex: '#7A8B7B' },
    { name: 'Olive', hex: '#59604C' }
  ];

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceMax(500000);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedColor(null);
    setSelectedAvailability([]);
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return shopProductsData
      .filter((item) => {
        // Search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matches =
            item.name.toLowerCase().includes(q) ||
            item.brand.toLowerCase().includes(q) ||
            item.categoryName.toLowerCase().includes(q) ||
            item.material.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
          return false;
        }

        // Price filter
        if (item.price > priceMax) {
          return false;
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
          return false;
        }

        // Material filter
        if (selectedMaterials.length > 0 && !selectedMaterials.includes(item.material)) {
          return false;
        }

        // Color filter
        if (selectedColor && item.color !== selectedColor) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [searchQuery, selectedCategories, priceMax, selectedBrands, selectedMaterials, selectedColor, sortBy]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemNotice(product.id);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const currentCategoryObj = useMemo(() => {
    return routeCategory ? productCategories.find(c => c.slug === routeCategory || c.id === routeCategory) : null;
  }, [routeCategory]);

  const pageTitle = currentCategoryObj 
    ? `${currentCategoryObj.name} Collection | Luxury Furniture & Décor Bangalore | IDC`
    : "Premium Home Décor & Furniture Collection | IDC Interiors Store";

  const pageDescription = currentCategoryObj
    ? `Shop handcrafted luxury ${currentCategoryObj.name.toLowerCase()} in Bangalore by Indian Decor Company. Factory-direct pricing, custom artisan finishes, and white-glove delivery.`
    : "Shop curated luxury furniture, architectural lighting, rugs, and home decor accessories crafted by Indian Decor Company in Bangalore.";

  const canonicalUrl = routeCategory
    ? `https://indiandecorcompany.in/shop/${routeCategory}`
    : "https://indiandecorcompany.in/shop";

  const breadcrumbsData = useMemo(() => {
    const list = [
      { name: "Home", url: "https://indiandecorcompany.in/" },
      { name: "Shop", url: "https://indiandecorcompany.in/shop" }
    ];
    if (currentCategoryObj && routeCategory) {
      list.push({
        name: currentCategoryObj.name,
        url: `https://indiandecorcompany.in/shop/${routeCategory}`
      });
    }
    return list;
  }, [currentCategoryObj, routeCategory]);

  return (
    <div style={{ backgroundColor: '#0F1013', color: '#FFFFFF', minHeight: '100vh', paddingTop: '74px' }}>
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
      />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={breadcrumbsData}
      />

      {/* =========================================================================
          SECTION 1: SHOP HERO BANNER MATCHING MOCKUP
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: '60px 0 40px 0',
          backgroundColor: '#121418',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Photographic Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.28
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0F1013 0%, rgba(15,16,19,0.85) 45%, rgba(15,16,19,0.3) 100%)'
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            {/* Left Hero Content */}
            <div style={{ maxWidth: '620px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                IDC INTERIORS STORE
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: '16px'
                }}
              >
                {currentCategoryObj ? (
                  <>
                    {currentCategoryObj.name} <br />
                    <span style={{ fontSize: '0.62em', color: 'var(--color-gold)', fontWeight: 500 }}>
                      Luxury Collection Bangalore
                    </span>
                  </>
                ) : (
                  <>
                    Premium Home Décor & <br />
                    Furniture Collection Bangalore
                  </>
                )}
              </h1>
              <p style={{ fontSize: '0.94rem', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '28px', maxWidth: '480px' }}>
                {currentCategoryObj 
                  ? `Discover bespoke ${currentCategoryObj.name.toLowerCase()} manufactured in Bangalore with factory-direct pricing and precision craftsmanship.`
                  : "Curated furniture, lighting, décor and accessories to bring timeless elegance to your space."}
              </p>

              {/* Button & Stats Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '28px' }}>
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.85rem' }}
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={15} />
                </button>

                {/* 3 Metric Counters in Row with dividers */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>5000+</div>
                    <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: '3px' }}>Premium Products</div>
                  </div>
                  <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>50+</div>
                    <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: '3px' }}>Top Brands</div>
                  </div>
                  <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>100%</div>
                    <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: '3px' }}>Authentic & High Quality</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Feature Card: Elevate Every Corner */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '340px' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    display: 'block',
                    textAlign: 'right',
                    marginBottom: '10px'
                  }}
                >
                  ELEVATE EVERY CORNER
                </span>

                {/* Modern Accent Chair Showcase Card */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: '240px',
                    boxShadow: 'var(--shadow-luxury)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=85"
                    alt="Modern Accent Chair"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 16, 19, 0.95) 0%, rgba(15, 16, 19, 0.2) 60%, transparent 100%)'
                    }}
                  />

                  {/* Floating Content Box */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '2px' }}>
                        Modern Accent Chair
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
                        Starting at <strong style={{ color: 'var(--color-gold)' }}>₹ 24,999</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('/shop/sofas-seating/accent-lounge-chair')}
                      className="btn-circle-action"
                      style={{ width: '38px', height: '38px', backgroundColor: '#FFFFFF', color: '#0E0F12' }}
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Slide indicator controls underneath */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '12px',
                    marginTop: '16px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.78rem', color: '#9CA3AF' }}>
                    <span style={{ color: currentSlide === 1 ? '#FFFFFF' : '#6B7280', fontWeight: currentSlide === 1 ? 700 : 400 }}>01</span>
                    <span style={{ color: currentSlide === 2 ? '#FFFFFF' : '#6B7280', fontWeight: currentSlide === 2 ? 700 : 400 }}>02</span>
                    <span style={{ color: currentSlide === 3 ? '#FFFFFF' : '#6B7280', fontWeight: currentSlide === 3 ? 700 : 400 }}>03</span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === 1 ? 3 : prev - 1))}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === 3 ? 1 : prev + 1))}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: LUXURY SEARCH BAR (EXCLUSIVE TO SHOP PAGE) + HORIZONTAL CATEGORY CAROUSEL STRIP
          ========================================================================= */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          color: '#14161A',
          padding: '30px 0 24px 0',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <div className="container-custom">
          {/* 1. EXCLUSIVE SHOP PAGE SEARCH BAR */}
          <div style={{ maxWidth: '720px', margin: '0 auto 28px auto' }}>
            <form
              onSubmit={handleSearchSubmit}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#F3F4F6',
                borderRadius: '12px',
                border: '1.5px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                padding: '4px 6px 4px 16px',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <Search size={19} color="#9CA3AF" style={{ flexShrink: 0, marginRight: '12px' }} />
              <input
                type="text"
                value={searchInputVal}
                onChange={(e) => setSearchInputVal(e.target.value)}
                placeholder="Search 250+ luxury furniture pieces, lighting, decor..."
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  color: '#111827',
                  padding: '10px 0'
                }}
              />
              {searchInputVal && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '4px'
                  }}
                  title="Clear search"
                >
                  <X size={17} />
                </button>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 22px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0
                }}
              >
                <span>Search</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {/* Active search filter badge */}
            {searchQuery && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', padding: '0 4px' }}>
                <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                  Showing <strong style={{ color: '#111827' }}>{filteredProducts.length}</strong> products matching &ldquo;<strong style={{ color: 'var(--color-gold-dark)' }}>{searchQuery}</strong>&rdquo;
                </span>
                <button
                  onClick={handleClearSearch}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-gold-dark)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* 2. HORIZONTAL CATEGORIES CAROUSEL STRIP (ALWAYS HORIZONTAL) */}
          <div style={{ width: '100%', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Explore by Category
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: '2px 0 0 0' }}>
                  Curated architectural furnishings crafted in our Bengaluru atelier
                </p>
              </div>

              {/* Navigation controls & Reset */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-gold-dark)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginRight: '6px'
                    }}
                  >
                    View All ({shopProductsData.length})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => scrollCategoryTrack('left')}
                  aria-label="Scroll left"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.06)'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCategoryTrack('right')}
                  aria-label="Scroll right"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.06)'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Horizontal Track (Enforced flex-row with flex-shrink: 0 children) */}
            <div
              ref={categoryTrackRef}
              className="shop-categories-track"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'flex-start',
                gap: '14px',
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                width: '100%',
                padding: '4px 2px 14px 2px'
              }}
            >
              {/* All Products Tile */}
              <div
                onClick={() => {
                  setSelectedCategories([]);
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="shop-category-item"
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '96px',
                  maxWidth: '110px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '84px',
                    height: '68px',
                    borderRadius: '10px',
                    backgroundColor: selectedCategories.length === 0 ? '#111827' : '#F3F4F6',
                    border: selectedCategories.length === 0 ? '2.5px solid var(--color-gold)' : '1px solid #E5E7EB',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: selectedCategories.length === 0 ? '0 4px 12px rgba(197, 168, 128, 0.35)' : '0 2px 6px rgba(0,0,0,0.04)',
                    marginBottom: '8px',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <LayoutGrid size={22} color={selectedCategories.length === 0 ? 'var(--color-gold)' : '#6B7280'} />
                  {selectedCategories.length === 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={11} color="#0E0F12" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: selectedCategories.length === 0 ? 700 : 500,
                    color: selectedCategories.length === 0 ? '#111827' : '#4B5563',
                    lineHeight: 1.25
                  }}
                >
                  All Products
                </span>
                <span style={{ fontSize: '0.65rem', color: '#9CA3AF', marginTop: '2px' }}>
                  {shopProductsData.length} items
                </span>
              </div>

              {/* Categories Cards */}
              {productCategories.slice(1).map((cat) => {
                const isSelected = selectedCategories.includes(cat.slug);

                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategories(selectedCategories.filter(s => s !== cat.slug));
                      } else {
                        setSelectedCategories([cat.slug]);
                      }
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="shop-category-item"
                    style={{
                      flex: '0 0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '96px',
                      maxWidth: '110px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '84px',
                        height: '68px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: isSelected ? '2.5px solid var(--color-gold)' : '1px solid #E5E7EB',
                        boxShadow: isSelected ? '0 4px 14px rgba(197, 168, 128, 0.35)' : '0 2px 6px rgba(0,0,0,0.04)',
                        marginBottom: '8px',
                        position: 'relative',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-gold)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={11} color="#0E0F12" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#111827' : '#4B5563',
                        lineHeight: 1.25
                      }}
                    >
                      {cat.name}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF', marginTop: '2px' }}>
                      {cat.count ? `${cat.count} items` : 'Explore'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. FEATURED COLLECTIONS HIGHLIGHT CARDS (RESPONSIVE GRID) */}
          <div style={{ marginTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                Featured Collections
              </h3>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#111827',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <span>View Full Catalog</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px'
              }}
            >
              {/* Banner 1: Sofa Collection */}
              <div
                style={{
                  position: 'relative',
                  height: '160px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                  alt="Sofa Collection"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(245, 239, 230, 0.95) 0%, rgba(245, 239, 230, 0.75) 55%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Living Sanctuary
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
                    Sofa & Seating Collection
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: '#6B7280', marginBottom: '10px' }}>
                    Kiln-dried hardwood frames with feather-blend toppers
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories(['sofas-seating']);
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                      color: '#111827',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <span>Shop Sofas</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Banner 2: Lighting Collection */}
              <div
                style={{
                  position: 'relative',
                  height: '160px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
                  alt="Lighting Collection"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(245, 239, 230, 0.95) 0%, rgba(245, 239, 230, 0.75) 55%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Ambient Illumination
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
                    Architectural Lighting
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: '#6B7280', marginBottom: '10px' }}>
                    Solid brass pendants, sculptural sconces & chandeliers
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories(['lighting']);
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                      color: '#111827',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <span>Shop Lighting</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: MAIN COMMERCE 3-COLUMN LAYOUT MATCHING MOCKUP
          ========================================================================= */}
      <section id="catalog-grid" style={{ backgroundColor: '#F9FAFB', color: '#14161A', padding: '40px 0 60px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px minmax(0, 1fr) 260px',
              gap: '24px',
              alignItems: 'start'
            }}
            className="shop-main-layout"
          >
            {/* -------------------------------------------------------------------
                LEFT COLUMN: FACETED FILTERS SIDEBAR (DESKTOP ONLY)
                ------------------------------------------------------------------- */}
            <aside
              className="shop-desktop-sidebar"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '24px 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                border: '1px solid #E5E7EB'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #F3F4F6' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 500 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
                >
                  Clear All
                </button>
              </div>

              {/* 1. Category Accordion */}
              <div style={{ marginBottom: '22px' }}>
                <div
                  onClick={() => toggleSection('category')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>Category</span>
                  {openSections.category ? <ChevronUp size={15} color="#6B7280" /> : <ChevronDown size={15} color="#6B7280" />}
                </div>

                {openSections.category && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {productCategories.slice(1).map((cat) => {
                      const isChecked = selectedCategories.includes(cat.slug);
                      return (
                        <label
                          key={cat.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem',
                            color: '#4B5563',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedCategories(selectedCategories.filter(s => s !== cat.slug));
                                } else {
                                  setSelectedCategories([...selectedCategories, cat.slug]);
                                }
                              }}
                              style={{ accentColor: '#121316', cursor: 'pointer' }}
                            />
                            <span>{cat.name}</span>
                          </div>
                          <span style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>({cat.count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Price Range Accordion */}
              <div style={{ marginBottom: '22px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                <div
                  onClick={() => toggleSection('price')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>Price Range</span>
                  {openSections.price ? <ChevronUp size={15} color="#6B7280" /> : <ChevronDown size={15} color="#6B7280" />}
                </div>

                {openSections.price && (
                  <div>
                    <input
                      type="range"
                      min={0}
                      max={500000}
                      step={5000}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#121316', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6B7280', marginTop: '6px' }}>
                      <span>₹0</span>
                      <span>₹{priceMax.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Brand Accordion */}
              <div style={{ marginBottom: '22px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                <div
                  onClick={() => toggleSection('brand')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>Brand</span>
                  {openSections.brand ? <ChevronUp size={15} color="#6B7280" /> : <ChevronDown size={15} color="#6B7280" />}
                </div>

                {openSections.brand && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {brandsList.map((b) => {
                      const isChecked = selectedBrands.includes(b.name);
                      return (
                        <label
                          key={b.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem',
                            color: '#4B5563',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedBrands(selectedBrands.filter(s => s !== b.name));
                                } else {
                                  setSelectedBrands([...selectedBrands, b.name]);
                                }
                              }}
                              style={{ accentColor: '#121316', cursor: 'pointer' }}
                            />
                            <span>{b.name}</span>
                          </div>
                          <span style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>({b.count})</span>
                        </label>
                      );
                    })}
                    <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.75rem', textAlign: 'left', cursor: 'pointer', marginTop: '4px' }}>
                      + View More
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Material Accordion */}
              <div style={{ marginBottom: '22px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                <div
                  onClick={() => toggleSection('material')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>Material</span>
                  {openSections.material ? <ChevronUp size={15} color="#6B7280" /> : <ChevronDown size={15} color="#6B7280" />}
                </div>

                {openSections.material && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {materialsList.map((mat) => {
                      const isChecked = selectedMaterials.includes(mat);
                      return (
                        <label
                          key={mat}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#4B5563', cursor: 'pointer' }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedMaterials(selectedMaterials.filter(s => s !== mat));
                              } else {
                                setSelectedMaterials([...selectedMaterials, mat]);
                              }
                            }}
                            style={{ accentColor: '#121316', cursor: 'pointer' }}
                          />
                          <span>{mat}</span>
                        </label>
                      );
                    })}
                    <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.75rem', textAlign: 'left', cursor: 'pointer', marginTop: '4px' }}>
                      + View More
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Color Palette */}
              <div style={{ marginBottom: '22px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                <div
                  onClick={() => toggleSection('color')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>Color</span>
                  {openSections.color ? <ChevronUp size={15} color="#6B7280" /> : <ChevronDown size={15} color="#6B7280" />}
                </div>

                {openSections.color && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {colorSwatches.map((swatch) => (
                      <button
                        key={swatch.name}
                        onClick={() => setSelectedColor(selectedColor === swatch.name ? null : swatch.name)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          backgroundColor: swatch.hex,
                          border: selectedColor === swatch.name ? '2px solid #111827' : '1px solid #D1D5DB',
                          cursor: 'pointer',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        title={swatch.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Availability */}
              <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                <div
                  onClick={() => toggleSection('availability')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827' }}>Availability</span>
                  {openSections.availability ? <ChevronUp size={15} color="#6B7280" /> : <ChevronDown size={15} color="#6B7280" />}
                </div>

                {openSections.availability && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#4B5563', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#121316' }} />
                      <span>In Stock (320)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#4B5563', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#121316' }} />
                      <span>Pre Order (68)</span>
                    </label>
                  </div>
                )}
              </div>
            </aside>

            {/* -------------------------------------------------------------------
                CENTER COLUMN: PRODUCT CATALOG GRID (4-COLUMNS IN MOCKUP)
                ------------------------------------------------------------------- */}
            <div>
              {/* Mobile Header & Action Bar: Flipkart Style */}
              <div className="shop-mobile-action-bar" style={{ flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {/* Header Title & Items count */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={() => setSelectedCategories([])}
                        style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                        aria-label="Back to all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}
                    <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                      {selectedCategories.length > 0
                        ? productCategories.find(c => c.slug === selectedCategories[0])?.name || 'Products'
                        : 'All Collections'}{' '}
                      <span style={{ fontWeight: 400, color: '#6B7280', fontSize: '0.82rem' }}>
                        ({filteredProducts.length})
                      </span>
                    </h2>
                  </div>

                  {/* Clear Active Filters Button */}
                  {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceMax < 500000 || (selectedMaterials && selectedMaterials.length > 0) || selectedColor) && (
                    <button
                      onClick={clearAllFilters}
                      style={{ background: 'none', border: 'none', color: '#B45309', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Flipkart 50/50 Sort & Filter Floating Toolbar */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* SORT BUTTON */}
                  <button
                    onClick={() => setIsSortOpen(true)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      padding: '11px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      color: '#111827',
                      fontSize: '0.84rem',
                      fontWeight: 600
                    }}
                  >
                    <ArrowUpDown size={15} color="#111827" />
                    <span>
                      Sort:{' '}
                      {sortBy === 'price-low'
                        ? 'Low to High'
                        : sortBy === 'price-high'
                        ? 'High to Low'
                        : sortBy === 'rating'
                        ? 'Top Rated'
                        : 'Featured'}
                    </span>
                  </button>

                  {/* FILTER BUTTON */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      padding: '11px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      color: '#111827',
                      fontSize: '0.84rem',
                      fontWeight: 700
                    }}
                  >
                    <SlidersHorizontal size={15} color="#111827" />
                    <span>Filters</span>
                    {(selectedCategories.length + selectedBrands.length + (priceMax < 500000 ? 1 : 0) + (selectedMaterials?.length || 0) + (selectedColor ? 1 : 0)) > 0 && (
                      <span
                        style={{
                          backgroundColor: 'var(--color-gold)',
                          color: '#000000',
                          fontSize: '0.66rem',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontWeight: 800
                        }}
                      >
                        {selectedCategories.length + selectedBrands.length + (priceMax < 500000 ? 1 : 0) + (selectedMaterials?.length || 0) + (selectedColor ? 1 : 0)}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Desktop Top Controls Bar */}
              <div
                className="hidden lg:flex"
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  backgroundColor: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>
                  All Products <span style={{ fontWeight: 400, color: '#6B7280' }}>({filteredProducts.length})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Grid Toggle Buttons */}
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: '#F3F4F6', padding: '3px', borderRadius: '6px' }}>
                    <button
                      onClick={() => setViewGridColumns(4)}
                      style={{
                        padding: '4px 6px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: viewGridColumns === 4 ? '#FFFFFF' : 'transparent',
                        color: viewGridColumns === 4 ? '#111827' : '#6B7280',
                        cursor: 'pointer'
                      }}
                      title="4-Column Grid"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      onClick={() => setViewGridColumns(2)}
                      style={{
                        padding: '4px 6px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: viewGridColumns === 2 ? '#FFFFFF' : 'transparent',
                        color: viewGridColumns === 2 ? '#111827' : '#6B7280',
                        cursor: 'pointer'
                      }}
                      title="2-Column Grid"
                    >
                      <Grid size={15} />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#4B5563' }}>
                    <span>Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.8rem',
                        color: '#111827',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4-Grid / 2-Grid Product Cards */}
              <div
                className="shop-products-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: viewGridColumns === 4 ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'repeat(2, 1fr)',
                  gap: '16px'
                }}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const isAdded = addedItemNotice === product.id;

                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/shop/${product.category}/${product.slug}`)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                      }}
                    >
                      {/* Image Frame */}
                      <div style={{ position: 'relative', height: '180px', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />

                        {/* Top Left Badge (Bestseller, New, 20% Off) */}
                        {product.badge && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '10px',
                              left: '10px',
                              backgroundColor:
                                product.badgeType === 'dark' ? '#111827' :
                                product.badgeType === 'brown' ? '#92400E' :
                                '#DC2626',
                              color: '#FFFFFF',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              letterSpacing: '0.04em'
                            }}
                          >
                            {product.badge}
                          </span>
                        )}

                        {/* Top Right Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          aria-label="Wishlist"
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isWishlisted ? '#EF4444' : '#6B7280'
                          }}
                        >
                          <Heart size={14} fill={isWishlisted ? '#EF4444' : 'none'} />
                        </button>
                      </div>

                      {/* Card Content matching Mockup */}
                      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#6B7280', marginBottom: '2px', fontWeight: 500 }}>
                            {product.brand}
                          </div>
                          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', fontWeight: 600, color: '#111827', lineHeight: 1.3, marginBottom: '6px' }}>
                            {product.name}
                          </h4>

                          {/* Price Row */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#111827' }}>
                              ₹ {product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice > product.price && (
                              <span style={{ fontSize: '0.72rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Rating & Cart Button Row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #F3F4F6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#F59E0B' }}>
                            <Star size={11} fill="#F59E0B" />
                            <span style={{ fontWeight: 600, color: '#111827' }}>{product.rating}</span>
                            <span style={{ color: '#9CA3AF' }}>({product.reviewsCount})</span>
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: isAdded ? '#10B981' : '#F3F4F6',
                              color: isAdded ? '#FFFFFF' : '#111827',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'var(--transition-fast)'
                            }}
                            title="Add to Cart"
                          >
                            {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* -------------------------------------------------------------------
                RIGHT COLUMN: 4 EDITORIAL PROMO BANNERS (DESKTOP ONLY)
                ------------------------------------------------------------------- */}
            <div className="shop-desktop-banners">
              {/* Banner 1: Modern Lighting */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#16181E',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=85"
                  alt="Modern Lighting Collection"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,16,19,0.95) 0%, rgba(15,16,19,0.4) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    New Arrivals
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFFFFF', margin: '2px 0 10px 0' }}>
                    Modern Lighting Collection
                  </h4>
                  <button
                    onClick={() => setSelectedCategories(['lighting'])}
                    className="btn-primary"
                    style={{ padding: '6px 16px', fontSize: '0.74rem' }}
                  >
                    <span>Explore Now</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Banner 2: Furniture For Every Space */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#16181E',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=85"
                  alt="Furniture For Every Space"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,16,19,0.95) 0%, rgba(15,16,19,0.4) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '2px' }}>
                    Furniture For Every Space
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#D1D5DB', marginBottom: '10px' }}>
                    Living • Bedroom • Dining
                  </p>
                  <button
                    onClick={() => setSelectedCategories(['sofas-seating', 'dining-furniture'])}
                    className="btn-primary"
                    style={{ padding: '6px 16px', fontSize: '0.74rem' }}
                  >
                    <span>Shop Furniture</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Banner 3: Home Décor Accessories */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#16181E',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85"
                  alt="Home Decor Accessories"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,16,19,0.95) 0%, rgba(15,16,19,0.4) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '2px' }}>
                    Home Décor Accessories
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#D1D5DB', marginBottom: '10px' }}>
                    Small Details Big Impact
                  </p>
                  <button
                    onClick={() => setSelectedCategories(['home-accessories', 'wall-decor'])}
                    className="btn-primary"
                    style={{ padding: '6px 16px', fontSize: '0.74rem' }}
                  >
                    <span>Shop Accessories</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Banner 4: Outdoor Collection */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#16181E',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=85"
                  alt="Outdoor Collection"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,16,19,0.95) 0%, rgba(15,16,19,0.4) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '2px' }}>
                    Outdoor Collection
                  </h4>
                  <p style={{ fontSize: '0.72rem', color: '#D1D5DB', marginBottom: '10px' }}>
                    Stylish & Durable
                  </p>
                  <button
                    onClick={() => setSelectedCategories(['outdoor-collection'])}
                    className="btn-primary"
                    style={{ padding: '6px 16px', fontSize: '0.74rem' }}
                  >
                    <span>Explore Now</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "END TO END INTERIOR SOLUTIONS" BANNER MATCHING MOCKUP
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
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            {/* Left Brand Illustration & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Gold architectural colonnade icon */}
              <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="stripGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5DFB5" />
                    <stop offset="50%" stopColor="#C5A880" />
                    <stop offset="100%" stopColor="#967742" />
                  </linearGradient>
                </defs>
                <rect x="6" y="20" width="3.5" height="18" rx="1.75" fill="url(#stripGold)" />
                <rect x="13.5" y="14" width="3.5" height="24" rx="1.75" fill="url(#stripGold)" />
                <rect x="21" y="9" width="3.5" height="29" rx="1.75" fill="url(#stripGold)" />
                <path d="M28.5 11C28.5 9.89543 29.3954 9 30.5 9H34.5C38.0899 9 41 11.9101 41 15.5C41 19.0899 38.0899 22 34.5 22H30.5C29.3954 22 28.5 21.1046 28.5 20V11Z" fill="url(#stripGold)" />
              </svg>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: '#FFFFFF' }}>
                End to End Interior Solutions
              </h3>
            </div>

            {/* 4 Trust Icons on Right matching Mockup */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Diamond size={18} color="var(--color-gold)" />
                <span style={{ fontSize: '0.82rem', color: '#E5E7EB', fontWeight: 600 }}>Premium Quality</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="var(--color-gold)" />
                <span style={{ fontSize: '0.82rem', color: '#E5E7EB', fontWeight: 600 }}>Pan India Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Wrench size={18} color="var(--color-gold)" />
                <span style={{ fontSize: '0.82rem', color: '#E5E7EB', fontWeight: 600 }}>Professional Installation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={18} color="var(--color-gold)" />
                <span style={{ fontSize: '0.82rem', color: '#E5E7EB', fontWeight: 600 }}>2 Years Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 3-ITEM VALUE PROPOSITION BAR MATCHING MOCKUP
          ========================================================================= */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          color: '#14161A',
          padding: '24px 0',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
              <Truck size={24} color="#111827" />
              <div>
                <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: '#111827' }}>Free Shipping</h4>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>On all orders above ₹50,000</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
              <RotateCcw size={24} color="#111827" />
              <div>
                <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: '#111827' }}>Easy Returns</h4>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>7 days hassle free returns</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
              <Lock size={24} color="#111827" />
              <div>
                <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: '#111827' }}>Secure Payment</h4>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FEATURED COLLECTIONS 4-CARD SHOWCASE MATCHING MOCKUP
          ========================================================================= */}
      <section style={{ backgroundColor: '#F9FAFB', color: '#14161A', padding: '60px 0 80px 0' }}>
        <div className="container-custom">
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 600, color: '#111827' }}>
              Featured Collections
            </h2>

            <button
              onClick={() => {
                setSelectedCategories([]);
                const el = document.getElementById('catalog-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#111827',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>View All Collections</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4 Large Editorial Collection Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px'
            }}
          >
            {featuredCollectionsData.map((col, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  cursor: 'pointer'
                }}
                className="group"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,16,19,0.9) 0%, rgba(15,16,19,0.3) 60%, transparent 100%)' }} />

                <div style={{ position: 'absolute', bottom: '18px', left: '18px', right: '18px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '2px' }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '12px' }}>
                    {col.subtitle}
                  </p>
                  <button
                    onClick={() => {
                      if (col.title.includes('Sofa')) setSelectedCategories(['sofas-seating']);
                      if (col.title.includes('Lighting')) setSelectedCategories(['lighting']);
                      if (col.title.includes('Dining')) setSelectedCategories(['dining-furniture']);
                      if (col.title.includes('Rugs')) setSelectedCategories(['rugs-carpets']);
                      const el = document.getElementById('catalog-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary"
                    style={{ padding: '6px 16px', fontSize: '0.75rem', backgroundColor: '#FFFFFF', color: '#111827' }}
                  >
                    <span>Shop Now</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer Modal: Flipkart Style */}
      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedMaterials={selectedMaterials}
        setSelectedMaterials={setSelectedMaterials}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        totalMatchingCount={filteredProducts.length}
        onApply={() => setIsMobileFilterOpen(false)}
        onClearAll={clearAllFilters}
      />

      {/* Mobile Flipkart-Style Sort Bottom Sheet */}
      {isSortOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={(e) => e.target === e.currentTarget && setIsSortOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '20px 20px 28px 20px',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.25)',
              animation: 'slideUp 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'var(--font-sans)' }}>
                Sort By
              </h3>
              <button
                onClick={() => setIsSortOpen(false)}
                aria-label="Close sort sheet"
                style={{ background: '#F3F4F6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4B5563' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { id: 'featured', label: 'Featured / Recommended' },
                { id: 'price-low', label: 'Price: Low to High' },
                { id: 'price-high', label: 'Price: High to Low' },
                { id: 'rating', label: 'Customer Rating' }
              ].map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortBy(opt.id);
                      setIsSortOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isSelected ? '#FFFDF8' : '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#111827' : '#4B5563' }}>
                      {opt.label}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? '5px solid #111827' : '1.5px solid #D1D5DB',
                        backgroundColor: '#FFFFFF',
                        transition: 'all 0.15s ease'
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
