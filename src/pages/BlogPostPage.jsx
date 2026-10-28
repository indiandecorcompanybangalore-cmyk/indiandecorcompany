import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Clock, Calendar, Briefcase, ShoppingBag } from 'lucide-react';
import { blogArticles } from '../data/blogData';
import { servicesData } from '../data/servicesData';
import { productsData } from '../data/productsData';
import { MetaTags } from '../components/seo/MetaTags';
import { SchemaJsonLd } from '../components/seo/SchemaJsonLd';
import { parseArticleContent } from '../utils/articleContent';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug) || blogArticles[0];

  const relatedService = servicesData.find(s => s.slug === article.relatedServiceSlug);
  const relatedProducts = productsData.filter(prd => (article.relatedProductIds || []).includes(prd.id));

  return (
    <div style={{ backgroundColor: '#F8F9FA', color: '#111827', minHeight: '100vh', paddingTop: '100px', paddingBottom: '90px' }}>
      <MetaTags
        title={`${article.title} | IDC Insights Bangalore`}
        description={article.subtitle}
        canonical={`https://indiandecorcompany.in/blog/${article.slug}`}
        ogType="article"
        ogImage={article.image}
      />
      <SchemaJsonLd type="Article" data={article} />
      <SchemaJsonLd type="FAQPage" data={{ faqs: article.faqs }} />
      <SchemaJsonLd
        type="BreadcrumbList"
        data={[
          { name: "Home", url: "https://indiandecorcompany.in/" },
          { name: "Blog", url: "https://indiandecorcompany.in/blog/" },
          { name: article.title, url: `https://indiandecorcompany.in/blog/${article.slug}/` }
        ]}
      />

      {/* Header Container */}
      <div className="container-custom" style={{ maxWidth: '880px', margin: '0 auto', paddingTop: '20px' }}>
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.84rem',
            marginBottom: '20px',
            color: '#6B7280'
          }}
        >
          <Link
            to="/"
            style={{
              color: '#6B7280',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
          >
            Home
          </Link>
          <ChevronRight size={13} style={{ color: '#9CA3AF' }} />
          <Link
            to="/blog"
            style={{
              color: '#6B7280',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
          >
            Blog
          </Link>
          <ChevronRight size={13} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              color: '#111827',
              fontWeight: 600,
              maxWidth: '380px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            title={article.title}
          >
            {article.title}
          </span>
        </nav>

        <div>
          <span
            style={{
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              color: 'var(--color-gold)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '5px 14px',
              borderRadius: '9999px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '16px',
              border: '1px solid rgba(197, 168, 128, 0.3)'
            }}
          >
            {article.category}
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: '#111827',
            marginBottom: '18px'
          }}
        >
          {article.title}
        </h1>

        <p style={{ fontSize: '1.08rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '28px' }}>
          {article.subtitle}
        </p>

        {/* Author & Meta Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            borderTop: '1px solid #E5E7EB',
            borderBottom: '1px solid #E5E7EB',
            padding: '16px 0',
            marginBottom: '36px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={article.author.avatar}
              alt={article.author.name}
              style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E5E7EB' }}
            />
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827' }}>{article.author.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{article.author.role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.82rem', color: '#6B7280' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="var(--color-gold)" />
              <span>{article.publishDate}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="var(--color-gold)" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            height: '440px',
            marginBottom: '40px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5E7EB'
          }}
        >
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Article Body in Elegant Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '44px 40px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
            fontSize: '1.02rem',
            lineHeight: 1.9,
            color: '#374151',
            whiteSpace: 'pre-line',
            marginBottom: '52px'
          }}
        >
          {parseArticleContent(article.content).map((block, index) => {
            const renderInline = (text) => text.split(/(\*\*.+?\*\*)/g).map((part, partIndex) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
                : part
            );
            if (block.type === 'heading') {
              const Heading = `h${block.level}`;
              return <Heading key={index} style={{ margin: '1.5em 0 0.5em', color: '#111827', lineHeight: 1.3 }}>{renderInline(block.text)}</Heading>;
            }
            if (block.type === 'list') return <ul key={index} style={{ paddingLeft: '1.4em', margin: '0.5em 0 1em' }}>{block.items.map((item, itemIndex) => <li key={itemIndex} style={{ marginBottom: '0.45em' }}>{renderInline(item)}</li>)}</ul>;
            return <p key={index} style={{ margin: '0 0 1em' }}>{renderInline(block.text)}</p>;
          })}
        </div>

        {/* Connected Service Hub Box */}
        {relatedService && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderLeft: '4px solid var(--color-gold)',
              borderRadius: '14px',
              padding: '28px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
              marginBottom: '48px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                <Briefcase size={14} />
                <span>EXPLORE RELATED SERVICE</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#111827', fontWeight: 600 }}>
                {relatedService.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B7280', maxWidth: '500px', lineHeight: 1.5, marginTop: '4px' }}>
                {relatedService.shortDesc}
              </p>
            </div>
            <Link
              to={`/services/${relatedService.slug}`}
              style={{
                backgroundColor: '#111827',
                color: '#FFFFFF',
                padding: '11px 22px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>View Service Details</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Connected Furniture Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <ShoppingBag size={14} />
              <span>PRODUCTS MENTIONED</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#111827', marginBottom: '22px', fontWeight: 600 }}>
              Curated Furniture For This Aesthetic
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {relatedProducts.map((prd) => (
                <Link
                  key={prd.id}
                  to={`/shop/${prd.category}/${prd.slug}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img src={prd.image} alt={prd.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                      {prd.name}
                    </h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-gold)', fontWeight: 700 }}>
                      ₹{prd.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '40px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#111827', marginBottom: '22px', fontWeight: 600 }}>
              Article Q&A
            </h3>
            {article.faqs.map((f, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '22px 24px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
                  marginBottom: '14px'
                }}
              >
                <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>{f.question}</h4>
                <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.65 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
