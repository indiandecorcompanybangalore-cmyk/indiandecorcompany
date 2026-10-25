export const productCategories = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "sofas-seating", name: "Sofas & Seating", slug: "sofas-seating", count: 120, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80" },
  { id: "beds-bedroom", name: "Beds & Bedroom", slug: "beds-bedroom", count: 85, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80" },
  { id: "dining-furniture", name: "Dining Furniture", slug: "dining-furniture", count: 76, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=300&q=80" },
  { id: "modular-furniture", name: "Modular Furniture", slug: "modular-furniture", count: 63, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80" },
  { id: "lighting", name: "Lighting", slug: "lighting", count: 98, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80" },
  { id: "wall-decor", name: "Wall Décor", slug: "wall-decor", count: 112, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=300&q=80" },
  { id: "rugs-carpets", name: "Rugs & Carpets", slug: "rugs-carpets", count: 67, image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=300&q=80" },
  { id: "home-accessories", name: "Home Accessories", slug: "home-accessories", count: 142, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80" },
  { id: "storage-cabinets", name: "Storage & Cabinets", slug: "storage-cabinets", count: 55, image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80" },
  { id: "outdoor-collection", name: "Outdoor Collection", slug: "outdoor-collection", count: 32, image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=300&q=80" }
];

export const shopProductsData = [
  // Row 1 from mockup
  {
    id: "luxe-modular-sofa",
    slug: "luxe-modular-sofa",
    sku: "IDC-SOF-101",
    name: "Luxe Modular Sofa",
    brand: "IDC Signature",
    category: "sofas-seating",
    categoryName: "Sofas & Seating",
    shortDesc: "Architectural deep-cushioned modular sofa with feather-blend topper and stain-resistant fabric.",
    price: 89999,
    originalPrice: 120000,
    onSale: true,
    badge: "Bestseller",
    badgeType: "dark",
    rating: 4.8,
    reviewsCount: 120,
    availability: "In Stock (320)",
    material: "Fabric",
    color: "Beige",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Luxury Contemporary",
    dimensions: "112\" W x 42\" D x 32\" H",
    description: "The Luxe Modular Sofa pairs deep relaxed ergonomics with architectural low-profile lines. Built on a kiln-dried hardwood frame in our Bangalore atelier.",
    specifications: [
      { key: "Frame", value: "Kiln-dried hardwood with lifetime structural guarantee" },
      { key: "Cushioning", value: "High-density HR foam with 50% down feather wrap" },
      { key: "Fabric", value: "Stain-resistant textured performance weave" }
    ],
    careInstructions: "Spot clean with damp microfibre cloth. Vacuum regularly."
  },
  {
    id: "marble-top-dining-table",
    slug: "marble-top-dining-table",
    sku: "IDC-DIN-102",
    name: "Marble Top Dining Table",
    brand: "IDC Signature",
    category: "dining-furniture",
    categoryName: "Dining Furniture",
    shortDesc: "Sculptural Italian Statuario marble dining table with tapered fluted wood pedestal legs.",
    price: 125000,
    originalPrice: 145000,
    onSale: false,
    badge: "New",
    badgeType: "brown",
    rating: 4.9,
    reviewsCount: 86,
    availability: "In Stock (320)",
    material: "Marble",
    color: "Grey",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Dining Room",
    style: "Architectural Luxury",
    dimensions: "84\" L x 40\" W x 30\" H",
    description: "A monumental dining center-piece featuring a hand-honed 20mm Italian marble top with anti-stain nano seal, comfortably seating 8 guests.",
    specifications: [
      { key: "Top Surface", value: "Solid Italian Statuario Marble (20mm bullnose)" },
      { key: "Base", value: "Smoked Ash Fluted Solid Timber Pedestal" }
    ],
    careInstructions: "Wipe with damp cloth and mild stone-safe cleaner. Use coasters."
  },
  {
    id: "modern-pendant-light",
    slug: "modern-pendant-light",
    sku: "IDC-LGT-103",
    name: "Modern Pendant Light",
    brand: "Häfele",
    category: "lighting",
    categoryName: "Lighting",
    shortDesc: "Brushed champagne brass chandelier with cylindrical fluted crystal glass diffusers.",
    price: 12999,
    originalPrice: 16999,
    onSale: true,
    badge: "20% Off",
    badgeType: "red",
    rating: 4.9,
    reviewsCount: 64,
    availability: "In Stock (320)",
    material: "Metal",
    color: "Gold",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Modern Glamour",
    dimensions: "36\" Dia x 28\" H (Adjustable drop)",
    description: "Multi-tiered warm ambient chandelier engineered with warm 2700K flicker-free LED illumination.",
    specifications: [
      { key: "Finish", value: "Electroplated Brushed Champagne Brass" },
      { key: "Lighting", value: "Dimmable 2700K Warm Architectural LEDs" }
    ],
    careInstructions: "Dust with soft dry microfibre cloth."
  },
  {
    id: "king-size-upholstered-bed",
    slug: "king-size-upholstered-bed",
    sku: "IDC-BED-104",
    name: "King Size Upholstered Bed",
    brand: "IDC Signature",
    category: "beds-bedroom",
    categoryName: "Beds & Bedroom",
    shortDesc: "Padded channel-tufted headboard with floating side plinths and hydraulic storage platform.",
    price: 145000,
    originalPrice: 165000,
    onSale: false,
    badge: null,
    rating: 4.8,
    reviewsCount: 72,
    availability: "In Stock (320)",
    material: "Fabric",
    color: "Grey",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Bedroom",
    style: "Minimalist Luxury",
    dimensions: "82\" W x 88\" L x 54\" H (Fits King Mattress 72x78)",
    description: "Designed for master bedroom sanctuaries with concealed German gas-lift storage and ultra-soft upholstery.",
    specifications: [
      { key: "Frame", value: "BWP Marine Ply with Hardwood Ribs" },
      { key: "Mechanism", value: "Heavy-Duty German Hydraulic Gas-Lifts" }
    ],
    careInstructions: "Vacuum fabric using upholstery attachment."
  },

  // Row 2 from mockup
  {
    id: "accent-lounge-chair",
    slug: "accent-lounge-chair",
    sku: "IDC-CHR-105",
    name: "Accent Lounge Chair",
    brand: "Livoxo",
    category: "sofas-seating",
    categoryName: "Sofas & Seating",
    shortDesc: "Sculptural cocoon bouclé armchair with 360-degree silent ball-bearing swivel plinth.",
    price: 24999,
    originalPrice: 29999,
    onSale: false,
    badge: null,
    rating: 4.6,
    reviewsCount: 53,
    availability: "In Stock (320)",
    material: "Fabric",
    color: "Beige",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Modern Minimalist",
    dimensions: "34\" W x 32\" D x 30\" H",
    description: "A favorite for reading corners and living rooms with high-density ergonomic moulded foam.",
    specifications: [
      { key: "Swivel", value: "360-Degree Concealed Steel Mechanism" },
      { key: "Fabric", value: "Textured Ivory Bouclé" }
    ],
    careInstructions: "Spot clean with dry foam cleaner."
  },
  {
    id: "handwoven-area-rug",
    slug: "handwoven-area-rug",
    sku: "IDC-RUG-106",
    name: "Handwoven Area Rug",
    brand: "Furnitech",
    category: "rugs-carpets",
    categoryName: "Rugs & Carpets",
    shortDesc: "High-density circular hand-tufted New Zealand wool rug with organic geometric relief carvings.",
    price: 8999,
    originalPrice: 11999,
    onSale: false,
    badge: null,
    rating: 4.7,
    reviewsCount: 91,
    availability: "In Stock (320)",
    material: "Fabric",
    color: "Grey",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Scandinavian",
    dimensions: "6 Ft Diameter Round",
    description: "Soft underfoot warmth crafted from 100% natural wool fibers, shedding-treated.",
    specifications: [
      { key: "Weave", value: "Hand-Tufted High-Pile Wool" },
      { key: "Backing", value: "Natural Latex Cotton Scrim" }
    ],
    careInstructions: "Vacuum without beater bar. Professional rug clean only."
  },
  {
    id: "solid-wood-sideboard",
    slug: "solid-wood-sideboard",
    sku: "IDC-STG-107",
    name: "Solid Wood Sideboard",
    brand: "IDC Signature",
    category: "storage-cabinets",
    categoryName: "Storage & Cabinets",
    shortDesc: "Natural fluted teak and smoked oak credenza with concealed push-to-open German runners.",
    price: 69999,
    originalPrice: 82000,
    onSale: false,
    badge: null,
    rating: 4.9,
    reviewsCount: 48,
    availability: "In Stock (320)",
    material: "Wood",
    color: "Brown",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Dining Room",
    style: "Modern Indian Contemporary",
    dimensions: "72\" W x 18\" D x 32\" H",
    description: "Versatile storage credenza with acoustic louvers, perfect for dining dinnerware or living room media.",
    specifications: [
      { key: "Wood", value: "Solid Natural Teak with Matte Polyurethane Finish" },
      { key: "Hardware", value: "Blum Tip-On Soft-Close Hinges" }
    ],
    careInstructions: "Wipe with microfibre duster. Avoid direct heat."
  },
  {
    id: "abstract-wall-art",
    slug: "abstract-wall-art",
    sku: "IDC-ART-108",
    name: "Abstract Wall Art (Diptych Set)",
    brand: "IDC Signature",
    category: "wall-decor",
    categoryName: "Wall Décor",
    shortDesc: "Textured plaster and gold-leaf diptych canvas paintings encased in slim champagne brass frames.",
    price: 12499,
    originalPrice: 15000,
    onSale: false,
    badge: null,
    rating: 4.5,
    reviewsCount: 37,
    availability: "In Stock (320)",
    material: "Metal",
    color: "Beige",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Minimalist Luxe",
    dimensions: "24\" x 36\" (Each Canvas)",
    description: "Hand-textured gallery-wrapped canvas diptych with subtle metallic accents that catch ambient lighting.",
    specifications: [
      { key: "Medium", value: "Mixed Media Plaster & Acrylic on Canvas" },
      { key: "Frame", value: "Brushed Aluminum in Champagne Tone" }
    ],
    careInstructions: "Dust gently with dry feather duster."
  },

  // Row 3 from mockup
  {
    id: "ceramic-planter-set",
    slug: "ceramic-planter-set",
    sku: "IDC-ACC-109",
    name: "Ceramic Planter Set (Set of 2)",
    brand: "Home Essentials",
    category: "home-accessories",
    categoryName: "Home Accessories",
    shortDesc: "Handcrafted ribbed terracotta and matte off-white ceramic planters with drainage trays.",
    price: 4999,
    originalPrice: 6500,
    onSale: false,
    badge: "New",
    badgeType: "brown",
    rating: 4.6,
    reviewsCount: 29,
    availability: "In Stock (320)",
    material: "Marble",
    color: "Beige",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Organic Modern",
    dimensions: "Large: 14\" Dia x 16\" H | Small: 10\" Dia x 12\" H",
    description: "Infuse living spaces with biophilic greenery in tactile stoneware ceramic pots.",
    specifications: [
      { key: "Material", value: "High-fired glazed ceramic stoneware" },
      { key: "Drainage", value: "Included rubber plug with saucer" }
    ],
    careInstructions: "Wipe with damp cloth."
  },
  {
    id: "tripod-floor-lamp",
    slug: "tripod-floor-lamp",
    sku: "IDC-LGT-110",
    name: "Tripod Floor Lamp",
    brand: "Philips",
    category: "lighting",
    categoryName: "Lighting",
    shortDesc: "Architectural natural beechwood tripod floor lamp with natural flax linen drum shade.",
    price: 9999,
    originalPrice: 12999,
    onSale: false,
    badge: "Bestseller",
    badgeType: "dark",
    rating: 4.8,
    reviewsCount: 61,
    availability: "In Stock (320)",
    material: "Wood",
    color: "Brown",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Scandinavian Modern",
    dimensions: "20\" W x 20\" D x 60\" H",
    description: "Gentle diffused illumination ideal for armchairs and bedroom reading nooks. Includes foot-step switch.",
    specifications: [
      { key: "Base", value: "FSC Solid Beech Timber" },
      { key: "Shade", value: "Natural Woven Linen Drum" }
    ],
    careInstructions: "Clean shade with dry lint roller."
  },
  {
    id: "round-coffee-table",
    slug: "round-coffee-table",
    sku: "IDC-TBL-111",
    name: "Round Coffee Table",
    brand: "IDC Signature",
    category: "sofas-seating",
    categoryName: "Sofas & Seating",
    shortDesc: "Fluted wood tambour cylindrical base with tempered smoked glass top plate.",
    price: 34999,
    originalPrice: 44999,
    onSale: true,
    badge: "20% Off",
    badgeType: "red",
    rating: 4.7,
    reviewsCount: 78,
    availability: "In Stock (320)",
    material: "Wood",
    color: "Brown",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Contemporary",
    dimensions: "36\" Dia x 16\" H",
    description: "Striking sculptural tambour slatted coffee table celebrating the warmth of natural wood grain.",
    specifications: [
      { key: "Base", value: "Solid Ash Wood Fluted Tambour Cylinder" },
      { key: "Top", value: "10mm Toughened Tinted Glass" }
    ],
    careInstructions: "Wipe glass with glass cleaner; wipe wood with dry cloth."
  },
  {
    id: "display-shelf",
    slug: "display-shelf",
    sku: "IDC-STG-112",
    name: "Geometric Display Shelf",
    brand: "IDC Signature",
    category: "storage-cabinets",
    categoryName: "Storage & Cabinets",
    shortDesc: "Asymmetrical open bookcase in smoked oak veneer with brushed brass support vertical dividers.",
    price: 28999,
    originalPrice: 34999,
    onSale: false,
    badge: "New",
    badgeType: "brown",
    rating: 4.6,
    reviewsCount: 46,
    availability: "In Stock (320)",
    material: "Wood",
    color: "Brown",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=85"
    ],
    room: "Living Room",
    style: "Architectural Minimal",
    dimensions: "48\" W x 14\" D x 68\" H",
    description: "Display books, sculptures, and art objects on varied open cantilevered shelving niches.",
    specifications: [
      { key: "Shelving", value: "Smoked Oak Veneer over Marine Core" },
      { key: "Dividers", value: "Anodized Champagne Gold Metal Plates" }
    ],
    careInstructions: "Dust regularly. Maximum shelf load: 25 kg per tier."
  }
];

// Featured collections for bottom section matching mockup
export const featuredCollectionsData = [
  {
    title: "Sofa Collection",
    subtitle: "Comfort Meets Style",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=85",
    link: "/shop?cat=sofas-seating"
  },
  {
    title: "Lighting Collection",
    subtitle: "Brighten Your World",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=85",
    link: "/shop?cat=lighting"
  },
  {
    title: "Dining Collection",
    subtitle: "Gather in Style",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=85",
    link: "/shop?cat=dining-furniture"
  },
  {
    title: "Rugs & Carpets",
    subtitle: "Add Warmth to Every Space",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=85",
    link: "/shop?cat=rugs-carpets"
  }
];

export const productsData = shopProductsData;
