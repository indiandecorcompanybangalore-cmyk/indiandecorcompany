import React, { useState } from 'react';
import { X, Search, Check, RotateCcw } from 'lucide-react';
import { productCategories } from '../../data/productsData';

export const MobileFilterModal = ({
  isOpen,
  onClose,
  selectedCategories = [],
  setSelectedCategories,
  priceMax = 500000,
  setPriceMax,
  selectedBrands = [],
  setSelectedBrands,
  selectedMaterials = [],
  setSelectedMaterials,
  selectedColor = null,
  setSelectedColor,
  totalMatchingCount = 0,
  onApply,
  onClearAll
}) => {
  const [activeTab, setActiveTab] = useState('category');
  const [categorySearch, setCategorySearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');

  if (!isOpen) return null;

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

  const quickPriceRanges = [
    { label: 'Under ₹25,000', max: 25000 },
    { label: 'Under ₹50,000', max: 50000 },
    { label: 'Under ₹1,00,000', max: 100000 },
    { label: 'Under ₹2,50,000', max: 250000 },
    { label: 'All Prices (₹5L)', max: 500000 }
  ];

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      if (setSelectedCategories) setSelectedCategories([]);
      if (setPriceMax) setPriceMax(500000);
      if (setSelectedBrands) setSelectedBrands([]);
      if (setSelectedMaterials) setSelectedMaterials([]);
      if (setSelectedColor) setSelectedColor(null);
    }
  };

  // Calculate active filter counts for each category tab
  const categoryCount = selectedCategories.length;
  const priceCount = priceMax < 500000 ? 1 : 0;
  const brandCount = selectedBrands.length;
  const materialCount = selectedMaterials ? selectedMaterials.length : 0;
  const colorCount = selectedColor ? 1 : 0;
  const totalActiveFilters = categoryCount + priceCount + brandCount + materialCount + colorCount;

  // Filter tabs list matching Flipkart layout
  const filterTabs = [
    { id: 'category', label: 'Category', count: categoryCount },
    { id: 'price', label: 'Price Range', count: priceCount },
    { id: 'brand', label: 'Brand', count: brandCount },
    { id: 'material', label: 'Material', count: materialCount },
    { id: 'color', label: 'Color', count: colorCount }
  ];

  const filteredCategories = productCategories.slice(1).filter(c =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBrands = brandsList.filter(b =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          height: '92vh',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          color: '#111827',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* ===================================================================
            HEADER: FLIPKART STYLE (FILTERS TITLE + CLEAR ALL + CLOSE)
            =================================================================== */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#111827' }}>
              Filters
            </h3>
            {totalActiveFilters > 0 && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--color-gold)',
                  color: '#000000',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}
              >
                {totalActiveFilters} applied
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {totalActiveFilters > 0 && (
              <button
                onClick={handleClearAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B45309',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 6px'
                }}
              >
                <RotateCcw size={13} />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close filters"
              style={{
                background: '#F3F4F6',
                border: 'none',
                color: '#374151',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s ease'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ===================================================================
            MAIN 2-COLUMN BODY: FLIPKART ARCHITECTURE
            - Left: Filter Categories Navigation (36% width)
            - Right: Filter Options Display (64% width)
            =================================================================== */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
          {/* LEFT COLUMN: TABS */}
          <div
            style={{
              width: '36%',
              maxWidth: '145px',
              minWidth: '115px',
              backgroundColor: '#F7F8FA',
              borderRight: '1px solid #E5E7EB',
              overflowY: 'auto',
              flexShrink: 0
            }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px 12px 16px 14px',
                    border: 'none',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    borderLeft: isActive ? '4px solid var(--color-gold)' : '4px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#111827' : '#4B5563',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {tab.label}
                    </span>
                    {tab.count > 0 && (
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? '#111827' : 'var(--color-gold)',
                          color: isActive ? '#FFFFFF' : '#000000',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: OPTIONS */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* 1. CATEGORY TAB */}
            {activeTab === 'category' && (
              <div>
                {/* Search Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#F3F4F6',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '14px'
                  }}
                >
                  <Search size={15} color="#9CA3AF" />
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search category..."
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      width: '100%',
                      outline: 'none',
                      fontSize: '0.82rem',
                      color: '#111827'
                    }}
                  />
                  {categorySearch && (
                    <button
                      onClick={() => setCategorySearch('')}
                      style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Categories Checkbox List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {filteredCategories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.slug);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedCategories(selectedCategories.filter(s => s !== cat.slug));
                          } else {
                            setSelectedCategories([...selectedCategories, cat.slug]);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isChecked ? '#FFFDF8' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              border: isChecked ? '2px solid #111827' : '1.5px solid #D1D5DB',
                              backgroundColor: isChecked ? '#111827' : '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isChecked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          </div>
                          <span
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: isChecked ? 600 : 400,
                              color: isChecked ? '#111827' : '#374151'
                            }}
                          >
                            {cat.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                          ({cat.count})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. PRICE RANGE TAB */}
            {activeTab === 'price' && (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    Maximum Price
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginTop: '4px'
                    }}
                  >
                    ₹ {priceMax.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                    Showing products up to this amount
                  </div>
                </div>

                {/* Range Slider */}
                <div style={{ padding: '8px 4px 18px 4px' }}>
                  <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={5000}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#111827',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280', marginTop: '6px' }}>
                    <span>₹5,000</span>
                    <span>₹5,00,000</span>
                  </div>
                </div>

                {/* Quick Price Range Buttons matching Flipkart */}
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                    Quick Select
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {quickPriceRanges.map((range, idx) => {
                      const isSelected = priceMax === range.max;
                      return (
                        <button
                          key={idx}
                          onClick={() => setPriceMax(range.max)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: isSelected ? '1.5px solid #111827' : '1px solid #E5E7EB',
                            backgroundColor: isSelected ? '#111827' : '#F9FAFB',
                            color: isSelected ? '#FFFFFF' : '#374151',
                            fontSize: '0.82rem',
                            fontWeight: isSelected ? 600 : 500,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span>{range.label}</span>
                          {isSelected && <Check size={14} color="#FFFFFF" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. BRAND TAB */}
            {activeTab === 'brand' && (
              <div>
                {/* Search Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#F3F4F6',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '14px'
                  }}
                >
                  <Search size={15} color="#9CA3AF" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search brand..."
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      width: '100%',
                      outline: 'none',
                      fontSize: '0.82rem',
                      color: '#111827'
                    }}
                  />
                  {brandSearch && (
                    <button
                      onClick={() => setBrandSearch('')}
                      style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Brands List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {filteredBrands.map((b) => {
                    const isChecked = selectedBrands.includes(b.name);
                    return (
                      <div
                        key={b.name}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedBrands(selectedBrands.filter(s => s !== b.name));
                          } else {
                            setSelectedBrands([...selectedBrands, b.name]);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isChecked ? '#FFFDF8' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              border: isChecked ? '2px solid #111827' : '1.5px solid #D1D5DB',
                              backgroundColor: isChecked ? '#111827' : '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isChecked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          </div>
                          <span
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: isChecked ? 600 : 400,
                              color: isChecked ? '#111827' : '#374151'
                            }}
                          >
                            {b.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                          ({b.count})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. MATERIAL TAB */}
            {activeTab === 'material' && (
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                  Primary Materials
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {materialsList.map((mat) => {
                    const isChecked = selectedMaterials && selectedMaterials.includes(mat);
                    return (
                      <div
                        key={mat}
                        onClick={() => {
                          if (!setSelectedMaterials) return;
                          if (isChecked) {
                            setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
                          } else {
                            setSelectedMaterials([...(selectedMaterials || []), mat]);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isChecked ? '#FFFDF8' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              border: isChecked ? '2px solid #111827' : '1.5px solid #D1D5DB',
                              backgroundColor: isChecked ? '#111827' : '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isChecked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          </div>
                          <span
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: isChecked ? 600 : 400,
                              color: isChecked ? '#111827' : '#374151'
                            }}
                          >
                            {mat}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. COLOR TAB */}
            {activeTab === 'color' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827' }}>
                    Select Shade
                  </span>
                  {selectedColor && (
                    <button
                      onClick={() => setSelectedColor && setSelectedColor(null)}
                      style={{ background: 'none', border: 'none', color: '#B45309', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Reset Color
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {colorSwatches.map((swatch) => {
                    const isSelected = selectedColor === swatch.name;
                    return (
                      <button
                        key={swatch.name}
                        onClick={() => {
                          if (!setSelectedColor) return;
                          setSelectedColor(isSelected ? null : swatch.name);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #111827' : '1px solid #E5E7EB',
                          backgroundColor: isSelected ? '#F9FAFB' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: swatch.hex,
                            border: '1px solid rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {isSelected && <Check size={11} color={swatch.hex === '#1E1E1E' ? '#FFFFFF' : '#111827'} />}
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 700 : 500, color: '#111827' }}>
                          {swatch.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            STICKY FOOTER: FLIPKART STYLE ACTION BAR
            =================================================================== */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Matching
            </span>
            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#111827' }}>
              {totalMatchingCount} Products
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                padding: '12px 18px',
                borderRadius: '8px',
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onApply) onApply();
                onClose();
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                backgroundColor: '#111827',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(17,24,39,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Apply Filters</span>
              {totalActiveFilters > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: '#000000',
                    fontSize: '0.68rem',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 800
                  }}
                >
                  {totalActiveFilters}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
