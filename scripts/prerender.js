import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

import { servicesData } from '../src/data/servicesData.js';
import { projectsData } from '../src/data/projectsData.js';
import { bangaloreLocations } from '../src/data/locationsData.js';
import { productCategories, shopProductsData } from '../src/data/productsData.js';
import { blogArticles } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const makeCoreBreadcrumb = (name, urlPath) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
    { "@type": "ListItem", "position": 2, "name": name, "item": `https://indiandecorcompany.in/${urlPath}/` }
  ]
});

const routes = [];

// 1. Core Pages
routes.push({
  path: '/',
  canonical: 'https://indiandecorcompany.in/',
  title: 'Indian Decor Company (IDC) | Luxury Interiors & Custom Furniture Bangalore',
  description: 'IDC is a premier Bangalore interior design and execution company specializing in luxury residential villas, commercial offices, modular kitchens, and custom handcrafted furniture.',
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  h1: 'Luxury Interior Designers & Custom Furniture in Bangalore',
  html: `
    <header>
      <h1>Luxury Interior Designers & Custom Furniture in Bangalore</h1>
      <p>Indian Decor Company (IDC) creates timeless and functional spaces for residences, commercial campuses, modular kitchens, and bespoke furniture manufacturing across Bangalore, Karnataka.</p>
    </header>
    <main>
      <section>
        <h2>Our Core Interior Specializations</h2>
        <ul>
          <li><a href="/services/residential-interiors/">Residential Interior Design & Turnkey Fitouts</a></li>
          <li><a href="/services/commercial-interiors/">Commercial & Hospitality Interiors</a></li>
          <li><a href="/services/office-interiors/">Corporate Office & Tech Campus Fitouts</a></li>
          <li><a href="/services/modular-furniture/">Modular Kitchens & Wardrobe Systems</a></li>
          <li><a href="/services/custom-furniture/">Custom Furniture Manufacturing</a></li>
        </ul>
      </section>
      <section>
        <h2>Bangalore Prime Submarket Studios</h2>
        <ul>
          <li><a href="/locations/nagavara/">Turnkey Interior Designers in Nagavara & Manyata</a></li>
          <li><a href="/locations/whitefield/">Luxury Villa Interiors in Whitefield</a></li>
          <li><a href="/locations/indiranagar/">Boutique & Heritage Residences in Indiranagar</a></li>
          <li><a href="/locations/hsr-layout/">Contemporary Apartments & Showrooms in HSR Layout</a></li>
          <li><a href="/locations/koramangala/">Hospitality & Penthouse Interiors in Koramangala</a></li>
        </ul>
      </section>
    </main>
  `
});

routes.push({
  path: '/about',
  canonical: 'https://indiandecorcompany.in/about/',
  title: 'About Indian Decor Company (IDC) | Luxury Interiors & Custom Furniture Bangalore',
  description: "Learn about IDC's journey, our Bangalore design pavilion, advanced furniture manufacturing facility, and architectural philosophy of crafting timeless spaces.",
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  h1: 'Designing Luxury Spaces & Bespoke Furniture in Bangalore',
  schemas: [makeCoreBreadcrumb('About Us', 'about')],
  html: `
    <header>
      <h1>Designing Luxury Spaces & Bespoke Furniture in Bangalore</h1>
      <p>Indian Decor Company (IDC) pairs architectural space planning with master craftsmanship and in-house manufacturing in Bangalore.</p>
    </header>
    <main>
      <section>
        <h2>Our Manufacturing Atelier</h2>
        <p>Advanced German CNC machinery, kiln-dried hardwoods, and artisanal upholstery based in Bangalore.</p>
        <p><a href="/furniture-manufacturer/">Explore our manufacturing workshop &rarr;</a></p>
      </section>
    </main>
  `
});

routes.push({
  path: '/services',
  canonical: 'https://indiandecorcompany.in/services/',
  title: 'Interior Design & Turnkey Fitout Services in Bangalore | IDC',
  description: "Explore IDC's full spectrum of interior design services in Bangalore: luxury residential interiors, turnkey corporate offices, modular kitchens, and custom furniture manufacturing.",
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  h1: 'Luxury Interior Design & Execution Services in Bangalore',
  schemas: [makeCoreBreadcrumb('Services', 'services')],
  html: `
    <header>
      <h1>Luxury Interior Design & Execution Services in Bangalore</h1>
      <p>Complete turnkey architecture, interior design, and bespoke furniture manufacturing for residential, corporate, and commercial clients in Bangalore.</p>
    </header>
    <main>
      <h2>Comprehensive Interior Design Offerings</h2>
      <ul>
        ${servicesData.map(s => `<li><a href="/services/${s.slug}/"><h3>${s.title} in Bangalore</h3></a><p>${s.shortDescription}</p></li>`).join('')}
      </ul>
    </main>
  `
});

routes.push({
  path: '/projects',
  canonical: 'https://indiandecorcompany.in/projects/',
  title: 'Our Projects | Luxury Interior & Turnkey Portfolio Bangalore | IDC',
  description: "Explore Indian Decor Company's portfolio of luxury villas, penthouses, tech offices, and retail showrooms across Whitefield, Indiranagar, and Bangalore.",
  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  h1: 'Luxury Interior Design Projects & Portfolio in Bangalore',
  schemas: [makeCoreBreadcrumb('Projects', 'projects')],
  html: `
    <header>
      <h1>Luxury Interior Design Projects & Portfolio in Bangalore</h1>
      <p>A curated showcase of bespoke residences, corporate headquarters, and experiential commercial spaces delivered with precision across Bangalore.</p>
    </header>
    <main>
      <h2>Featured Turnkey Projects</h2>
      <ul>
        ${projectsData.map(p => `<li><a href="/projects/${p.slug}/"><h3>${p.title} (${p.location})</h3></a><p>${p.overview}</p></li>`).join('')}
      </ul>
    </main>
  `
});

routes.push({
  path: '/shop',
  canonical: 'https://indiandecorcompany.in/shop/',
  title: 'Premium Home Décor & Furniture Collection | IDC Interiors Store',
  description: 'Shop curated luxury furniture, architectural lighting, rugs, and home decor accessories crafted by Indian Decor Company in Bangalore.',
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  h1: 'Premium Home Décor & Furniture Collection Bangalore',
  schemas: [makeCoreBreadcrumb('Shop', 'shop')],
  html: `
    <header>
      <h1>Premium Home Décor & Furniture Collection Bangalore</h1>
      <p>Curated furniture, architectural lighting, designer rugs, and luxury home accessories manufactured in Bangalore.</p>
    </header>
    <main>
      <h2>Furniture & Décor Categories</h2>
      <ul>
        ${productCategories.filter(c => c.slug !== 'all').map(c => `<li><a href="/shop/${c.slug}/"><h3>${c.name} Collection</h3></a></li>`).join('')}
      </ul>
    </main>
  `
});

routes.push({
  path: '/materials',
  canonical: 'https://indiandecorcompany.in/materials/',
  title: 'Curated Architectural Materials & Finishes Library | IDC Bangalore',
  description: "Explore IDC's tactile library of Italian marble, smoked oak veneers, anti-fingerprint laminates, brushed champagne brass, and Belgian bouclé fabrics.",
  image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
  h1: 'Curated Architectural Materials & Finishes Library Bangalore',
  schemas: [makeCoreBreadcrumb('Materials', 'materials')],
  html: `
    <header>
      <h1>Curated Architectural Materials & Finishes Library Bangalore</h1>
      <p>Touch and explore our curated library of Italian Statuario marble, European oak veneers, brushed brass, and acoustic fluted panels.</p>
    </header>
  `
});

routes.push({
  path: '/furniture-wholesale',
  canonical: 'https://indiandecorcompany.in/furniture-wholesale/',
  title: 'Furniture Wholesale & B2B Manufacturer Bangalore | IDC',
  description: 'Indian Decor Company manufactures and supplies wholesale commercial furniture for hotels, tech offices, restaurants, and real estate developers across India.',
  image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
  h1: 'Wholesale Commercial Furniture Manufacturing Bangalore',
  schemas: [makeCoreBreadcrumb('Wholesale Furniture', 'furniture-wholesale')],
  html: `
    <header>
      <h1>Wholesale Commercial Furniture Manufacturing Bangalore</h1>
      <p>Direct-from-manufacturer volume contract furniture tailored for hotels, restaurants, corporate offices, and developers.</p>
    </header>
  `
});

routes.push({
  path: '/furniture-manufacturer',
  canonical: 'https://indiandecorcompany.in/furniture-manufacturer/',
  title: 'Custom Furniture Manufacturer Bangalore | In-House Factory & Workshop | IDC',
  description: 'IDC operates an advanced custom furniture manufacturing facility in Bangalore specializing in kiln-dried hardwood framing, CNC modular cutting, and master upholstery.',
  image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
  h1: 'Custom Furniture Manufacturing in Bangalore',
  schemas: [makeCoreBreadcrumb('Furniture Manufacturing', 'furniture-manufacturer')],
  html: `
    <header>
      <h1>Custom Furniture Manufacturing in Bangalore</h1>
      <p>In-house factory precision, artisan joinery, and direct-from-workshop pricing for residential and commercial furniture.</p>
    </header>
  `
});

routes.push({
  path: '/blog',
  canonical: 'https://indiandecorcompany.in/blog/',
  title: 'Interior Design Insights & Guides Bangalore | IDC Journal',
  description: 'Expert insights on interior design trends, modular kitchen ergonomics, false ceiling costs, and custom furniture manufacturing in Bangalore.',
  image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
  h1: 'Interior Design Insights & Guides — Bangalore',
  schemas: [makeCoreBreadcrumb('Blog', 'blog')],
  html: `
    <header>
      <h1>Interior Design Insights & Guides — Bangalore</h1>
      <p>In-depth perspectives from our architects and master craftspeople on transforming modern spaces in Bangalore.</p>
    </header>
    <main>
      <h2>Featured Guides & Trend Analysis</h2>
      <ul>
        ${blogArticles.map(a => `<li><a href="/blog/${a.slug}/"><h3>${a.title}</h3></a><p>${a.subtitle}</p></li>`).join('')}
      </ul>
    </main>
  `
});

routes.push({
  path: '/contact',
  canonical: 'https://indiandecorcompany.in/contact/',
  title: 'Contact Indian Decor Company (IDC) Bangalore | Design Studio & Factory',
  description: "Get in touch with IDC's interior architects and furniture designers in Bangalore. Schedule a free design consultation or visit our local workshop.",
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
  h1: 'Contact Indian Decor Company Bangalore',
  schemas: [makeCoreBreadcrumb('Contact Us', 'contact')],
  html: `
    <header>
      <h1>Contact Indian Decor Company Bangalore</h1>
      <p>Schedule an interior consultation or visit our design studio and furniture workshop in Bangalore.</p>
      <p><strong>Phone:</strong> +91-80505-51406 | <strong>Email:</strong> info@indiandecorcompany.in</p>
      <p><strong>Address:</strong> 111, Nagavara, Bengaluru, Karnataka 560024</p>
    </header>
  `
});

routes.push({
  path: '/locations',
  canonical: 'https://indiandecorcompany.in/locations/',
  title: 'Interior Design Studios & Locations Bangalore | Indian Decor Company',
  description: "Explore Indian Decor Company's Bangalore submarket design studios and turnkey coverage across Nagavara, Manyata Tech Park, Hebbal, Whitefield, Indiranagar, and Koramangala.",
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  h1: 'Bangalore Interior Design Studios & Prime Neighborhoods',
  schemas: [makeCoreBreadcrumb('Locations', 'locations')],
  html: `
    <header>
      <h1>Bangalore Interior Design Studios & Prime Neighborhoods</h1>
      <p>Explore IDC's localized architectural and turnkey interior solutions tailored to Bangalore's premier communities.</p>
    </header>
    <main>
      <h2>Bangalore Prime Submarket Coverage</h2>
      <ul>
        ${bangaloreLocations.map(loc => `<li><a href="/locations/${loc.slug}/"><h3>${loc.headline}</h3></a><p>${loc.description}</p></li>`).join('')}
      </ul>
    </main>
  `
});

routes.push({
  path: '/legal',
  canonical: 'https://indiandecorcompany.in/legal/',
  title: 'Policies & Terms | Indian Decor Company (IDC)',
  description: "Review IDC's Privacy Policy, Terms of Service, Furniture White-Glove Shipping Policy, and 10-Year Craftsmanship Warranty.",
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  h1: 'Policies, Terms & Warranties',
  schemas: [makeCoreBreadcrumb('Policies & Legal', 'legal')],
  html: `
    <header>
      <h1>Policies, Terms & Warranties</h1>
      <p>IDC Trust & Governance: Privacy Policy, Terms of Service, White-Glove Delivery, and 10-Year Warranty.</p>
    </header>
  `
});

// 2. 9 Service Detail Pages
for (const service of servicesData) {
  const serviceDescription = service.shortDesc || service.overview;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} in Bangalore`,
    "serviceType": `${service.title} & Execution`,
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
      { "@type": "City", "name": "Bangalore" },
      { "@type": "AdministrativeArea", "name": "Karnataka" }
    ],
    "description": serviceDescription
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://indiandecorcompany.in/services/" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://indiandecorcompany.in/services/${service.slug}` }
    ]
  };

  routes.push({
    path: `/services/${service.slug}`,
    canonical: `https://indiandecorcompany.in/services/${service.slug}/`,
    title: `${service.title} in Bangalore | IDC Interiors`,
    description: serviceDescription,
    image: service.heroImage,
    h1: `${service.title} in Bangalore`,
    schemas: [serviceSchema, breadcrumbsSchema],
    html: `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/services/">Services</a> &gt; <span>${service.title}</span>
        </nav>
        <h1>${service.title} in Bangalore</h1>
        <p>${serviceDescription}</p>
        <p>${service.overview || ''}</p>
      </header>
      <main>
        <section>
          <h2>Service Deliverables & Scope</h2>
          <ul>
            ${(service.scope || []).map(d => `<li>${d}</li>`).join('')}
          </ul>
        </section>
        <section>
          <h2>Our Execution Process in Bangalore</h2>
          <ol>
            ${(service.process || []).map(step => `<li><strong>${step.title}:</strong> ${step.desc}</li>`).join('')}
          </ol>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <dl>
            ${(service.faqs || []).map(faq => `<dt><h3>${faq.question}</h3></dt><dd><p>${faq.answer}</p></dd>`).join('')}
          </dl>
        </section>
        <section>
          <h2>Related Services</h2>
          <ul>
            ${servicesData.filter(s => s.slug !== service.slug).slice(0, 4).map(s => `<li><a href="/services/${s.slug}/">${s.title} in Bangalore</a></li>`).join('')}
          </ul>
        </section>
        <section>
          <h2>Consult With Our Bangalore Designers</h2>
          <p>Contact our Bangalore design studio at <a href="tel:+918050551406">+91-80505-51406</a> or visit our <a href="/contact/">contact page</a>.</p>
        </section>
      </main>
    `
  });
}

// 3. 6 Project Detail Pages
for (const project of projectsData) {
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://indiandecorcompany.in/projects/" },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://indiandecorcompany.in/projects/${project.slug}/` }
    ]
  };

  routes.push({
    path: `/projects/${project.slug}`,
    canonical: `https://indiandecorcompany.in/projects/${project.slug}/`,
    title: `${project.title} — ${project.location} | Indian Decor Company Case Study`,
    description: project.overview,
    image: project.image,
    h1: project.title,
    schemas: [breadcrumbsSchema],
    html: `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/projects/">Projects</a> &gt; <span>${project.title}</span>
        </nav>
        <h1>${project.title}</h1>
        <p><strong>Location:</strong> ${project.location} | <strong>Category:</strong> ${project.category}</p>
        <p>${project.overview}</p>
      </header>
      <main>
        <section>
          <h2>Design Challenges & Architectural Execution</h2>
          <p>${project.challenge}</p>
        </section>
        <section>
          <h2>Craftsmanship & Delivered Solution</h2>
          <p>${project.solution}</p>
        </section>
        <section>
          <h2>Project Gallery</h2>
          <img src="${project.image}" alt="${project.title} - ${project.location} Turnkey Interior Design by IDC" />
        </section>
        <p><a href="/projects/">&larr; Back to all projects</a> | <a href="/contact/">Enquire about your space</a></p>
      </main>
    `
  });
}

// 4. 4 Location Detail Pages
for (const loc of bangaloreLocations) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": `Indian Decor Company (IDC) - ${loc.name}`,
    "url": `https://indiandecorcompany.in/locations/${loc.slug}`,
    "telephone": "+91-80505-51406",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": loc.name.split(',')[0].trim(),
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "description": loc.description
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://indiandecorcompany.in/locations/" },
      { "@type": "ListItem", "position": 3, "name": loc.name, "item": `https://indiandecorcompany.in/locations/${loc.slug}/` }
    ]
  };

  routes.push({
    path: `/locations/${loc.slug}`,
    canonical: `https://indiandecorcompany.in/locations/${loc.slug}/`,
    title: `Interior Designers in ${loc.name} | Luxury Home & Villa Interiors | IDC`,
    description: loc.description,
    image: loc.heroImage,
    h1: loc.headline,
    schemas: [localBusinessSchema, breadcrumbsSchema],
    html: `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/locations/">Locations</a> &gt; <span>${loc.name}</span>
        </nav>
        <h1>${loc.headline}</h1>
        <p>${loc.description}</p>
      </header>
      <main>
        <section>
          <h2>Key Gated Communities & Landmarks Served in ${loc.name}</h2>
          <ul>
            ${(loc.communitiesServed || []).map(c => `<li>${c}</li>`).join('')}
          </ul>
        </section>
        <section>
          <h2>Local Architecture & Design Specialization</h2>
          <p>${loc.localExpertise}</p>
        </section>
        <section>
          <h2>Frequently Asked Questions in ${loc.name}</h2>
          <dl>
            ${(loc.faqs || []).map(faq => `<dt><h3>${faq.question}</h3></dt><dd><p>${faq.answer}</p></dd>`).join('')}
          </dl>
        </section>
        <p><a href="/contact/">Schedule a consultation in ${loc.name} &rarr;</a></p>
      </main>
    `
  });
}

// 5. 10 Shop Category Pages
for (const cat of productCategories) {
  if (cat.slug === 'all') continue;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
      { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://indiandecorcompany.in/shop/" },
      { "@type": "ListItem", "position": 3, "name": cat.name, "item": `https://indiandecorcompany.in/shop/${cat.slug}/` }
    ]
  };

  const catProducts = shopProductsData.filter(p => p.category === cat.slug);

  routes.push({
    path: `/shop/${cat.slug}`,
    canonical: `https://indiandecorcompany.in/shop/${cat.slug}/`,
    title: `${cat.name} Collection | Luxury Furniture & Décor Bangalore | IDC`,
    description: `Shop handcrafted luxury ${cat.name.toLowerCase()} in Bangalore by Indian Decor Company. Factory-direct pricing, custom artisan finishes, and white-glove delivery.`,
    image: cat.image,
    h1: `${cat.name} Luxury Collection Bangalore`,
    schemas: [breadcrumbsSchema],
    html: `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/shop/">Shop</a> &gt; <span>${cat.name}</span>
        </nav>
        <h1>${cat.name} Luxury Collection Bangalore</h1>
        <p>Discover bespoke ${cat.name.toLowerCase()} manufactured in Bangalore with factory-direct pricing and precision craftsmanship.</p>
      </header>
      <main>
        <h2>${cat.name} Collection Products</h2>
        <ul>
          ${catProducts.map(p => `
            <li>
              <a href="/shop/${cat.slug}/${p.slug}/">
                <h3>${p.name}</h3>
                <img src="${p.image}" alt="${p.name} - ${cat.name} Bangalore" width="300" />
                <p>₹${p.price.toLocaleString('en-IN')}</p>
                <p>${p.shortDesc}</p>
              </a>
            </li>
          `).join('')}
        </ul>
      </main>
    `
  });
}

// 6. 12 Product Detail Pages
for (const product of shopProductsData) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.gallery || [product.image],
    "description": product.shortDesc,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Indian Decor Company"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://indiandecorcompany.in/shop/${product.category}/${product.slug}/`,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
      { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://indiandecorcompany.in/shop/" },
      { "@type": "ListItem", "position": 3, "name": product.categoryName, "item": `https://indiandecorcompany.in/shop/${product.category}/` },
      { "@type": "ListItem", "position": 4, "name": product.name, "item": `https://indiandecorcompany.in/shop/${product.category}/${product.slug}/` }
    ]
  };

  routes.push({
    path: `/shop/${product.category}/${product.slug}`,
    canonical: `https://indiandecorcompany.in/shop/${product.category}/${product.slug}/`,
    title: `${product.name} | Luxury Handcrafted Furniture Bangalore | IDC`,
    description: product.shortDesc,
    image: product.image,
    h1: product.name,
    schemas: [productSchema, breadcrumbsSchema],
    html: `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/shop/">Shop</a> &gt; <a href="/shop/${product.category}/">${product.categoryName}</a> &gt; <span>${product.name}</span>
        </nav>
        <h1>${product.name}</h1>
        <p><strong>Brand:</strong> ${product.brand} | <strong>SKU:</strong> ${product.sku} | <strong>Price:</strong> ₹${product.price.toLocaleString('en-IN')}</p>
        <p>${product.shortDesc}</p>
      </header>
      <main>
        <section>
          <h2>Product Description & Specifications</h2>
          <p>${product.description}</p>
          <ul>
            ${(product.specifications || []).map(s => `<li><strong>${s.key}:</strong> ${s.value}</li>`).join('')}
          </ul>
        </section>
        <section>
          <h2>Craftsmanship Gallery</h2>
          <img src="${product.image}" alt="${product.name} - Handcrafted by Indian Decor Company Bangalore" />
        </section>
      </main>
    `
  });
}

// 7. 4 Blog Post Pages
for (const article of blogArticles) {
  const authorName = typeof article.author === 'object' ? article.author.name : (article.author || 'IDC Editorial Team');
  const pubDate = article.publishDate || '2026-01-14';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.subtitle,
    "image": article.image,
    "datePublished": pubDate,
    "dateModified": "2026-10-18",
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Indian Decor Company",
      "logo": {
        "@type": "ImageObject",
        "url": "https://indiandecorcompany.in/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://indiandecorcompany.in/blog/${article.slug}/`
    }
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://indiandecorcompany.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://indiandecorcompany.in/blog/" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://indiandecorcompany.in/blog/${article.slug}/` }
    ]
  };

  const contentParagraphs = typeof article.content === 'string'
    ? article.content.split('\n\n').map(p => p.trim()).filter(Boolean)
    : [];

  routes.push({
    path: `/blog/${article.slug}`,
    canonical: `https://indiandecorcompany.in/blog/${article.slug}/`,
    title: `${article.title} | IDC Insights Bangalore`,
    description: article.subtitle,
    image: article.image,
    h1: article.title,
    schemas: [articleSchema, breadcrumbsSchema],
    html: `
      <header>
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a> &gt; <a href="/blog/">Blog</a> &gt; <span>${article.title}</span>
        </nav>
        <h1>${article.title}</h1>
        <p><strong>Published:</strong> ${pubDate} | <strong>Author:</strong> ${authorName} | <strong>Category:</strong> ${article.category}</p>
        <p>${article.subtitle}</p>
      </header>
      <main>
        <section>
          <h2>Overview & Architectural Analysis</h2>
          ${contentParagraphs.map(p => `<p>${p}</p>`).join('')}
        </section>
        ${article.faqs && article.faqs.length > 0 ? `
          <section>
            <h2>Frequently Asked Questions</h2>
            <dl>
              ${article.faqs.map(f => `<dt><h3>${f.question}</h3></dt><dd><p>${f.answer}</p></dd>`).join('')}
            </dl>
          </section>
        ` : ''}
        <p><a href="/blog/">&larr; Back to all design insights</a></p>
      </main>
    `
  });
}

console.log(`Prepared ${routes.length} routes for static prerendering.`);

for (const route of routes) {
  let html = templateHtml;
  const pageTitle = (route.title || 'Indian Decor Company (IDC) Bangalore').replace(/"/g, '&quot;');
  const pageDescription = (route.description || 'Indian Decor Company Bangalore - Luxury Interior Design and Bespoke Furniture').replace(/"/g, '&quot;');
  let canonicalUrl = route.canonical || 'https://indiandecorcompany.in/';
  if (!canonicalUrl.endsWith('/')) {
    canonicalUrl += '/';
  }

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${pageTitle}</title>`);

  // 2. Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${pageDescription}" />`
  );

  // 3. Inject Self-Referential Canonical Tag right after Meta Description
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  html = html.replace(
    /(<meta name="description" content=".*?" \/>)/s,
    `$1\n    ${canonicalTag}`
  );

  // 4. Update OpenGraph Tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${pageTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${pageDescription}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${canonicalUrl}" />`);
  if (route.image) {
    html = html.replace(/<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${route.image}" />`);
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/s, `<meta name="twitter:image" content="${route.image}" />`);
  }

  // 5. Update Twitter Tags
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/s, `<meta name="twitter:title" content="${pageTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/s, `<meta name="twitter:description" content="${pageDescription}" />`);

  // 6. Append route-specific JSON-LD schemas
  if (route.schemas && route.schemas.length > 0) {
    const schemaScripts = route.schemas.map(s => `\n    <script type="application/ld+json">\n    ${JSON.stringify(s, null, 2)}\n    </script>`).join('');
    html = html.replace('</head>', `${schemaScripts}\n  </head>`);
  }

  // 7. Inject crawler-accessible HTML inside <div id="root">
  if (route.html) {
    html = html.replace('<div id="root"></div>', `<div id="root">${route.html}</div>`);
  }

  // Determine output directory & file
  let targetPath;
  if (route.path === '/') {
    targetPath = path.join(distDir, 'index.html');
  } else {
    const subDir = path.join(distDir, route.path.replace(/^\//, ''));
    fs.mkdirSync(subDir, { recursive: true });
    targetPath = path.join(subDir, 'index.html');
  }

  fs.writeFileSync(targetPath, html, 'utf8');
}

console.log(`✅ Successfully prerendered ${routes.length} static routes in /dist!`);

console.log('\nRunning post-render structured-data verification...');
execSync('node scripts/validate-jsonld.js', { stdio: 'inherit' });

console.log('\nRunning post-render internal-link verification...');
execSync('node scripts/validate-internal-links.js', { stdio: 'inherit' });
