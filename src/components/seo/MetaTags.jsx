import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export const MetaTags = ({
  title = "Indian Decor Company (IDC) | Luxury Interiors & Custom Furniture Bangalore",
  description = "Indian Decor Company (IDC) creates bespoke luxury residences, corporate offices, turnkey fitouts, and manufactures custom & modular furniture in Bangalore, India.",
  canonical = "https://indiandecorcompany.in/",
  ogType = "website",
  ogImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
}) => {
  const formattedCanonical = canonical && !canonical.endsWith('/') && !canonical.includes('?') && !canonical.includes('#')
    ? `${canonical}/`
    : canonical;

  useEffect(() => {
    // Direct DOM fallback to guarantee client synchronization
    document.title = title;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', formattedCanonical, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:site_name', 'Indian Decor Company (IDC)', true);
    setMeta('og:locale', 'en_IN', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@indiandecorco');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', formattedCanonical);
  }, [title, description, formattedCanonical, ogType, ogImage]);

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={formattedCanonical} />
      <meta name="description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={formattedCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Indian Decor Company (IDC)" />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@indiandecorco" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
