import React from 'react';

export const SchemaJsonLd = ({ type, data }) => {
  let schemaContent = null;

  if (type === 'Organization') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Indian Decor Company",
      "alternateName": "IDC",
      "url": "https://indiandecorcompany.in",
      "logo": "https://indiandecorcompany.in/favicon.svg",
      "description": "Premium interior design, turnkey execution, and custom furniture manufacturing company based in Bangalore, Karnataka, India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "111, Nagavara",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560024",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-80505-51406",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Kannada"]
      },
      "sameAs": [
        "https://www.instagram.com/indiandecorcompany",
        "https://www.facebook.com/indiandecorcompany",
        "https://www.linkedin.com/company/indiandecorcompany"
      ]
    };
  } else if (type === 'LocalBusiness') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "Indian Decor Company (IDC) Bangalore",
      "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "telephone": "+91-80505-51406",
      "email": "info@indiandecorcompany.in",
      "url": "https://indiandecorcompany.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "111, Nagavara",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560024",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "priceRange": "₹₹₹₹",
      "areaServed": ["Bangalore", "Whitefield", "Indiranagar", "HSR Layout", "Koramangala", "Karnataka"]
    };
  } else if (type === 'Service') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${data.title} in Bangalore`,
      "serviceType": `${data.title} & Execution`,
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "Indian Decor Company (IDC) Bangalore",
        "telephone": "+91-80505-51406",
        "url": "https://indiandecorcompany.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "111, Nagavara",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560024",
          "addressCountry": "IN"
        }
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Bangalore"
        },
        {
          "@type": "State",
          "name": "Karnataka"
        }
      ],
      "description": data.overview || data.shortDesc,
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "description": data.pricingEstimate || "Custom project quote based on architectural floorplan"
        }
      }
    };
  } else if (type === 'Product') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name,
      "image": data.gallery || [data.image],
      "description": data.description || data.shortDesc,
      "sku": data.sku,
      "brand": {
        "@type": "Brand",
        "name": "Indian Decor Company"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://indiandecorcompany.in/shop/${data.category}/${data.slug}`,
        "priceCurrency": "INR",
        "price": data.price,
        "priceValidUntil": "2026-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Indian Decor Company",
          "url": "https://indiandecorcompany.in"
        }
      }
    };
  } else if (type === 'Article') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "image": data.image,
      "datePublished": data.publishDate,
      "author": {
        "@type": "Person",
        "name": data.author?.name || "IDC Editorial Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Indian Decor Company",
        "logo": {
          "@type": "ImageObject",
          "url": "https://indiandecorcompany.in/favicon.svg"
        }
      },
      "description": data.subtitle
    };
  } else if (type === 'FAQPage') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (data.faqs || []).map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === 'BreadcrumbList') {
    schemaContent = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": (data || []).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  if (!schemaContent) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContent) }}
    />
  );
};
