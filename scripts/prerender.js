import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

import { servicesData } from '../src/data/servicesData.js';
import { projectsData } from '../src/data/projectsData.js';
import { bangaloreLocations } from '../src/data/locationsData.js';
import { productCategories, shopProductsData } from '../src/data/productsData.js';
import { blogArticles } from '../src/data/blogData.js';
import { parseArticleContent } from '../src/utils/articleContent.js';

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
  title: 'Interior Designers in Bangalore | Indian Decor Company',
  description: "Explore Indian Decor Company’s residential and commercial interior design services in Bangalore. View projects, compare service scopes and plan your budget.",
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  h1: 'Interior Designers in Bangalore for Homes & Workspaces',
  html: `
    <header>
      <h1>Interior Designers in Bangalore for Homes &amp; Workspaces</h1>
      <p>Explore Indian Decor Company’s interior design services for homes, offices, and commercial spaces in Bangalore, including turnkey interiors, modular solutions, and custom furniture.</p>
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
        <h2>Explore Interior Projects</h2>
        <p>Review the project examples and service details before deciding what to include in your brief. Project scope, materials, site conditions, and availability are confirmed for each enquiry.</p>
        <ul>
          ${projectsData.slice(0, 4).map(project => `<li><a href="/projects/${project.slug}/">${project.title}</a> — ${project.location}</li>`).join('')}
        </ul>
        <p><a href="/projects/">Browse all interior projects</a></p>
      </section>
      <section>
        <h2>Plan Your Interior Design Scope and Budget</h2>
        <p>List the rooms, work required, preferred finishes, and items you plan to buy separately. Compare estimates against the same written scope, including inclusions, exclusions, materials, installation, and taxes. Final pricing depends on measured site conditions and selected specifications.</p>
        <p><a href="/blog/interior-design-cost-in-bangalore-guide/">Read the Bangalore interior design cost guide</a> or <a href="/contact/">discuss your project with IDC</a>.</p>
      </section>
      <section>
        <h2>What to Prepare Before a Consultation</h2>
        <ul>
          <li>A floor plan or room measurements, if available.</li>
          <li>Photos of the existing space and building access details.</li>
          <li>A room-by-room list of priorities, storage needs, and items to retain.</li>
          <li>Reference images, preferred materials, and a target budget.</li>
        </ul>
      </section>
      <section>
        <h2>Bangalore Interior Design Service Areas</h2>
        <p>IDC reviews each property and project enquiry individually. Listed areas are service locations, not separate studio addresses.</p>
        <ul>
          ${bangaloreLocations.map(loc => `<li><a href="/locations/${loc.slug}/">Interior design service coverage in ${loc.name}</a></li>`).join('')}
        </ul>
      </section>
    </main>
  `
});

routes.push({
  path: '/about',
  canonical: 'https://indiandecorcompany.in/about/',
  title: 'About Us | Interior Design Studio Bangalore | IDC',
  description: "Learn about Indian Decor Company's Bangalore design studio, in-house furniture workshop, architectural philosophy, and turnkey interior fitout standards.",
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
  description: "Compare Bangalore interior design services for homes, offices and commercial spaces. Explore turnkey work, modular and custom furniture, projects and next steps.",
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  h1: 'Luxury Interior Design & Execution Services in Bangalore',
  schemas: [makeCoreBreadcrumb('Services', 'services')],
  html: `
    <header>
      <h1>Luxury Interior Design & Execution Services in Bangalore</h1>
      <p>Complete turnkey architecture, interior design, and bespoke furniture manufacturing for residential, corporate, and commercial clients in Bangalore.</p>
    </header>
    <main>
      <h2>Choose a Service for Your Project</h2>
      <p>Start with the type of space and work you need. Each service page explains its focus; final inclusions, materials, schedule, and pricing are confirmed against the property and written project scope.</p>
      <ul>
        ${servicesData.map(s => `<li><h3><a href="/services/${s.slug}/">${s.title} in Bangalore</a></h3><p>${s.shortDesc}</p></li>`).join('')}
      </ul>
      <section>
        <h2>How to Compare Interior Service Proposals</h2>
        <p>Give each provider the same room list, drawings, finish preferences, and requirements. Compare design work, civil and electrical scope, furniture, materials, taxes, delivery, installation, exclusions, and the written process for approving changes.</p>
        <p>For home projects, use the <a href="/blog/interior-design-cost-in-bangalore-guide/">Bangalore interior design cost guide</a> to prepare questions and compare estimates. Review <a href="/projects/">project examples</a> for context, then <a href="/contact/">contact IDC to discuss your requirements</a>.</p>
      </section>
      <section>
        <h2>Questions to Ask Before Starting</h2>
        <h3>What should an interior design estimate include?</h3>
        <p>Ask for a written room-by-room scope with materials, quantities, taxes, delivery, installation, exclusions, and any optional items clearly identified.</p>
        <h3>Can I request only selected services?</h3>
        <p>Share the property details and the work you need. IDC can confirm whether the requested scope and site are a fit after reviewing the enquiry.</p>
        <h3>How do I get a project-specific price?</h3>
        <p>Provide available measurements, plans, photos, finish preferences, and priorities. A project-specific estimate depends on verified site conditions and selected specifications.</p>
      </section>
    </main>
  `
});

routes.push({
  path: '/projects',
  canonical: 'https://indiandecorcompany.in/projects/',
  title: 'Interior Design Projects in Bangalore | IDC Portfolio',
  description: "Explore Indian Decor Company's portfolio of residential villas, penthouses, modern apartments, and tech office interiors completed across Bangalore.",
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
  title: 'Furniture & Home Décor Store in Bangalore | IDC',
  description: 'Explore furniture, architectural lighting, rugs, and home décor accessories from Indian Decor Company in Bangalore.',
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
  title: 'Architectural Materials & Finishes Library | IDC',
  description: "Explore IDC's curated materials library in Bangalore: Italian marble, smoked oak veneers, anti-fingerprint laminates, brass accents, and bouclé fabrics.",
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
  title: 'Custom Furniture Manufacturer in Bangalore | IDC',
  description: 'Indian Decor Company offers custom furniture and modular cabinetry for residential and commercial interior projects in Bangalore.',
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
  title: 'Interior Design Insights & Guides in Bangalore | IDC Journal',
  description: 'Read interior design guides on home trends, false ceilings, office design, and Bangalore project budgets from Indian Decor Company.',
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
  title: 'Contact IDC | Interior Design Studio in Bangalore',
  description: "Contact Indian Decor Company in Bangalore to discuss residential, commercial, or turnkey interior design requirements.",
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
  title: 'Bangalore Interior Design Service Areas | Indian Decor Company',
  description: "Explore Bangalore interior design service areas. IDC confirms project fit and site availability individually; listed areas are not separate offices.",
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  h1: 'Bangalore Interior Design Service Areas',
  schemas: [makeCoreBreadcrumb('Locations', 'locations')],
  html: `
    <header>
      <h1>Bangalore Interior Design Service Areas</h1>
      <p>Explore the Bangalore areas where IDC accepts interior design enquiries. Each property and project is reviewed individually; these pages do not represent separate IDC offices.</p>
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
  title: 'Policies, Terms & Warranties | Indian Decor Company',
  description: "Review Indian Decor Company's privacy policy, terms of service, white-glove furniture delivery guidelines, and 10-year craftsmanship warranty terms.",
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
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://indiandecorcompany.in/services/${service.slug}/` }
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
    title: `${project.title} — ${project.location.split(",")[0]} | IDC Case Study`,
    description: project.metaDescription || project.overview,
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
    title: loc.metaTitle || `Interior Designers in ${loc.name.split(',')[0]}, Bangalore | IDC`,
    description: loc.metaDescription || loc.description,
    image: loc.heroImage,
    h1: loc.headline,
    schemas: [
      breadcrumbsSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (loc.faqs || []).map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ],
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
          <h2>Planning an interior project in ${loc.name}</h2>
          <p>Service coverage does not mean IDC has a studio or branch in this neighbourhood. Project fit, property access, and site-visit availability are confirmed individually.</p>
          ${loc.localConsiderations?.length ? `<ul>${loc.localConsiderations.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
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
        <p><a href="/contact/">Ask IDC to confirm project fit and availability for ${loc.name} &rarr;</a></p>
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
    title: `${cat.name} Collection Bangalore | IDC Store`,
    description: `Shop handcrafted luxury ${cat.name.toLowerCase()} in Bangalore by Indian Decor Company. Factory-direct pricing, custom finishes, and white-glove delivery.`,
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
    title: `${product.name} | IDC Furniture Bangalore`,
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
    "datePublished": new Date(pubDate).toISOString().slice(0, 10),
    "dateModified": article.dateModified || "2026-10-18",
    "author": {
      "@type": authorName === "Indian Decor Company Editorial Team" ? "Organization" : "Person",
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

  const contentBlocks = parseArticleContent(article.content);
  const contentHtml = contentBlocks.map((block) => {
    const safeText = block.text?.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
    const formattedText = safeText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (block.type === 'heading') return `<h${block.level}>${formattedText}</h${block.level}>`;
    if (block.type === 'list') {
      const items = block.items.map((item) => {
        const safeItem = item.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `<li>${safeItem}</li>`;
      }).join('');
      return `<ul>${items}</ul>`;
    }
    return `<p>${formattedText}</p>`;
  }).join('\n');
  const relatedService = servicesData.find((service) => service.slug === article.relatedServiceSlug);

  routes.push({
    path: `/blog/${article.slug}`,
    canonical: `https://indiandecorcompany.in/blog/${article.slug}/`,
    title: article.title.includes('|') ? article.title : `${article.title} | IDC Insights`,
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
          ${contentHtml}
        </section>
        ${article.faqs && article.faqs.length > 0 ? `
          <section>
            <h2>Frequently Asked Questions</h2>
            <dl>
              ${article.faqs.map(f => `<dt><h3>${f.question}</h3></dt><dd><p>${f.answer}</p></dd>`).join('')}
            </dl>
          </section>
        ` : ''}
        ${relatedService ? `<aside><h2>Related interior design service</h2><p>${relatedService.shortDesc}</p><p><a href="/services/${relatedService.slug}/">Explore ${relatedService.title}</a></p></aside>` : ''}
        <p><a href="/contact/">Discuss your project with Indian Decor Company</a></p>
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
