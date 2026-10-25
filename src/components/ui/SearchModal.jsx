import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FolderKanban, Briefcase, ShoppingBag, BookOpen } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { servicesData } from '../../data/servicesData';
import { productsData } from '../../data/productsData';
import { blogArticles } from '../../data/blogData';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], services: [], products: [], blog: [] };
    const q = query.toLowerCase();

    return {
      projects: projectsData.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ),
      services: servicesData.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q)
      ),
      products: productsData.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      ),
      blog: blogArticles.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      )
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  const totalResults = results.projects.length + results.services.length + results.products.length + results.blog.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 102,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px 20px'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#14161C',
          border: '1px solid rgba(197, 168, 128, 0.3)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-luxury)',
          color: '#FFFFFF'
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#0F1014'
          }}
        >
          <Search size={20} color="var(--color-gold)" style={{ marginRight: '12px' }} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, services, furniture, materials, articles..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', marginRight: '8px' }}
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div style={{ maxHeight: '480px', overflowY: 'auto', padding: '20px' }}>
          {!query.trim() ? (
            <div style={{ padding: '16px 8px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 600 }}>
                Popular Searches
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {['Whitefield Villa', 'Modular Kitchen Bangalore', 'Curved Sofa', 'Office Interior Manyata', 'False Ceiling Cost', 'Wholesale Furniture'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#E5E7EB',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#9CA3AF' }}>
              No matches found for "{query}". Try checking "Interior Design", "Sofa", "Kitchen", or "Whitefield".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Projects */}
              {results.projects.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '8px' }}>
                    <FolderKanban size={14} />
                    <span>Projects ({results.projects.length})</span>
                  </div>
                  {results.projects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelect(`/projects/${p.slug}`)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
                    >
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{p.location} • {p.category}</div>
                      </div>
                      <ArrowRight size={15} color="var(--color-gold)" />
                    </div>
                  ))}
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '8px' }}>
                    <ShoppingBag size={14} />
                    <span>Furniture & Décor ({results.products.length})</span>
                  </div>
                  {results.products.map((prd) => (
                    <div
                      key={prd.id}
                      onClick={() => handleSelect(`/shop/${prd.category}/${prd.slug}`)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={prd.image} alt={prd.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>{prd.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>₹{prd.price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      <ArrowRight size={15} color="var(--color-gold)" />
                    </div>
                  ))}
                </div>
              )}

              {/* Services */}
              {results.services.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '8px' }}>
                    <Briefcase size={14} />
                    <span>Services ({results.services.length})</span>
                  </div>
                  {results.services.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSelect(`/services/${s.slug}`)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
                    >
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>{s.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{s.shortDesc}</div>
                      </div>
                      <ArrowRight size={15} color="var(--color-gold)" />
                    </div>
                  ))}
                </div>
              )}

              {/* Blog */}
              {results.blog.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '8px' }}>
                    <BookOpen size={14} />
                    <span>Articles & Insights ({results.blog.length})</span>
                  </div>
                  {results.blog.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleSelect(`/blog/${b.slug}`)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
                    >
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>{b.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{b.category} • {b.readTime}</div>
                      </div>
                      <ArrowRight size={15} color="var(--color-gold)" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
