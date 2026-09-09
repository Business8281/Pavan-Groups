export interface StoneFinishDetail {
  name: string;
  description: string;
  texture: string;
  recommendedFor: string;
}

export interface ProductStone {
  id: string;
  name: string;
  tagline: string;
  company: "Pavan Impex" | "Sai Balaji Impex" | "Pavan Granite";
  companySlug: string;
  category: "slate" | "limestone" | "granite" | "cladding" | "pavers";
  area: ("elevation" | "flooring" | "pool" | "countertop" | "driveway")[];
  finish: string;
  color: string;
  availableSizes: string[];
  thickness: string;
  availableFinishes: string[];
  gradient: string;
  image: string;
  gallery: string[];
  description: string;
  origin: string;
  quarryType: string;
  density: string;
  compressive: string;
  waterAbs: string;
  mohsHardness: string;
  slipResistance: string;
  flexuralStrength: string;
  features: string[];
  finishesDetail: StoneFinishDetail[];
  applications: { title: string; desc: string; icon?: string }[];
  exportPackaging: {
    crateType: string;
    palletCapacity: string;
    containerCapacity: string;
    fumigation: string;
    portOfLoading: string;
  };
}

export const PRODUCTS_DATABASE: ProductStone[] = [
  {
    id: "markapur-black-slate",
    name: "Markapur Midnight Black Slate",
    tagline: "Hand-split authentic natural slate extracted directly from historic Markapur reserves.",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "slate",
    area: ["elevation", "flooring"],
    finish: "Natural Cleft",
    color: "Midnight Black",
    availableSizes: ["600x300 mm", "600x600 mm", "300x300 mm", "1200x600 mm"],
    thickness: "12 - 15 mm (±1mm)",
    availableFinishes: ["Natural Cleft", "Honed Matte", "Brushed", "Tumbled"],
    gradient: "linear-gradient(135deg, #1c1f24 0%, #2f343d 50%, #131518 100%)",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Extracted directly from Pavan Groups' Markapur quarry reserves, this fine-grained metamorphic slate features an authentic hand-split clefted texture. Celebrated for low water absorption, exceptional frost resilience, and deep graphite-to-midnight-black tonality that ages gracefully without fading.",
    origin: "Markapur, Andhra Pradesh, India",
    quarryType: "Direct Open-Cast Quarry Reserve (Pavan Impex)",
    density: "2,780 kg/m³",
    compressive: "165 MPa",
    waterAbs: "0.24%",
    mohsHardness: "4.5 - 5.0",
    slipResistance: "R11 (Anti-Skid Natural Cleft)",
    flexuralStrength: "32 MPa",
    features: [
      "Naturally non-porous with superior thermal stability",
      "Zero-efflorescence metamorphic quartz-mica matrix",
      "Calibrated thickness tolerance ±1mm for precision rainscreens",
      "Resistant to acid rain and environmental weathering",
    ],
    finishesDetail: [
      {
        name: "Natural Cleft",
        description: "Hand-split along natural metamorphic cleavage planes, creating tactile dimensional texture.",
        texture: "Riven & 3D Tactile",
        recommendedFor: "Exterior Facades, Step Treads, Accent Walls",
      },
      {
        name: "Honed Matte",
        description: "Diamond abrasives produce an ultra-smooth, light-absorbing satin touch with no glare.",
        texture: "Velvety Matte",
        recommendedFor: "Interior Luxury Flooring, Bathroom Linings",
      },
      {
        name: "Brushed Satin",
        description: "Silicon carbide wire brushes soften the cleft peaks, creating an antiqued leather feel.",
        texture: "Soft Tactile",
        recommendedFor: "High-Traffic Corridors, Patios",
      },
      {
        name: "Tumbled Antique",
        description: "Mechanical rumbling rounds the edges and softens the surface for old-world charm.",
        texture: "Aged Weathered",
        recommendedFor: "Courtyards, Garden Pathways",
      },
    ],
    applications: [
      { title: "Rainscreen & Facade Elevation", desc: "Ventilated curtain walls and exterior cladding resisting heavy environmental exposure." },
      { title: "Interior Architectural Flooring", desc: "Monolithic dark stone floors with natural radiant heat absorption." },
      { title: "Feature Accent Walls", desc: "Contrast backdrop behind minimalist joinery, reception desks, and fireplaces." },
    ],
    exportPackaging: {
      crateType: "Hardwood Fumigated ISPM-15 Crates",
      palletCapacity: "28 - 32 m² per wooden crate",
      containerCapacity: "850 - 920 m² per 20ft heavy-duty container (27 MT limit)",
      fumigation: "Methyl Bromide (MB) certified with phyto-sanitary inspection",
      portOfLoading: "Chennai (INMAA) / Krishnapatnam (INKRI)",
    },
  },
  {
    id: "black-galaxy-granite",
    name: "Chimakurthy Black Galaxy Granite",
    tagline: "World-renowned deep plutonic granite studded with golden-bronze bronzite crystal stars.",
    company: "Pavan Granite",
    companySlug: "pavan-granite",
    category: "granite",
    area: ["countertop", "flooring", "elevation"],
    finish: "95+ Mirror Polish",
    color: "Gold Bronzite",
    availableSizes: ["Jumbo Gangsaw Slabs (3000x1800+ mm)", "1200x600 mm", "600x600 mm", "600x300 mm"],
    thickness: "20 mm / 30 mm / 40 mm",
    availableFinishes: ["95+ Mirror Polish", "Honed Matte", "Leathered Velvet", "Flamed"],
    gradient: "linear-gradient(135deg, #090a0c 0%, #221f17 50%, #040506 100%)",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Extracted exclusively from the Chimakurthy plutonic belt in Andhra Pradesh, Black Galaxy is globally recognized as the pinnacle of luxury igneous stone. Golden enstatite/bronzite metallic flecks are suspended in an intense pitch-black obsidian matrix, creating a mesmerising galaxy optical effect under ambient lighting.",
    origin: "Chimakurthy, Prakasam District, Andhra Pradesh",
    quarryType: "Deep-Crust Igneous Pluton (Pavan Granite)",
    density: "2,980 kg/m³",
    compressive: "210 MPa",
    waterAbs: "0.08%",
    mohsHardness: "6.5 - 7.0",
    slipResistance: "R9 (Polished) / R12 (Flamed)",
    flexuralStrength: "38 MPa",
    features: [
      "Deep igneous gabbro-anorthosite rock matrix with zero hairline fissures",
      "Metallic golden-bronze bronzite fleck consistency across quarry lots",
      "Ultra-dense 2,980 kg/m³ density resisting oil, citrus, and chemical spills",
      "Diamond gangsaw sliced and Breton-line 95+ gloss mirror polished",
    ],
    finishesDetail: [
      {
        name: "95+ Mirror Polish",
        description: "12-head continuous polishing line delivers glass-like reflectivity highlighting golden flecks.",
        texture: "High Gloss Mirror",
        recommendedFor: "Kitchen Islands, Vanity Tops, Grand Entry Foyers",
      },
      {
        name: "Honed Matte",
        description: "Non-reflective flat finish with subdued sheen, muting light while preserving the gold stars.",
        texture: "Silky Matte",
        recommendedFor: "Commercial Office Foyers, Executive Boardrooms",
      },
      {
        name: "Leathered Velvet",
        description: "Diamond-encrusted brushes reveal undulating topography with warm tactile comfort.",
        texture: "Textured Leather",
        recommendedFor: "Alfresco Dining Counters, Bespoke Bar Tops",
      },
      {
        name: "Flamed / Thermal",
        description: "High-temperature thermal flame treatment for maximum non-slip traction.",
        texture: "Rough Crystalline",
        recommendedFor: "Outdoor Pavements, Pool Copings, Commercial Steps",
      },
    ],
    applications: [
      { title: "Luxury Kitchen Island & Countertops", desc: "Scratch, heat, and stain proof surfacing for high-end culinary architecture." },
      { title: "Grand Hotel & Commercial Lobbies", desc: "Reflective monolithic floor expanses engineered for high-footfall endurance." },
      { title: "Monumental Wall Panels", desc: "Bookmatched vertical stone installations in high-profile international headquarters." },
    ],
    exportPackaging: {
      crateType: "Steel Reinforced A-Frames & Heavy Timber Bundles",
      palletCapacity: "10 - 12 Jumbo Slabs per steel frame",
      containerCapacity: "380 - 440 m² (20mm) or 260 - 290 m² (30mm) per 20ft container",
      fumigation: "ISPM-15 Certified Heat Treatment / Methyl Bromide",
      portOfLoading: "Chennai (INMAA) Port, India",
    },
  },
  {
    id: "cuddapah-black-limestone",
    name: "Cuddapah Calcareous Limestone",
    tagline: "Fine-grained, heavy-duty calcareous calcrete stone engineered for tropical climates and pool wet decks.",
    company: "Sai Balaji Impex",
    companySlug: "sai-balaji-impex",
    category: "limestone",
    area: ["pool", "flooring", "driveway"],
    finish: "Anti-Skid R11",
    color: "Midnight Black",
    availableSizes: ["600x600 mm", "600x300 mm", "200x100 mm Pavers", "300x300 mm", "Bullnose Coping"],
    thickness: "20 mm / 25 mm / 30 mm",
    availableFinishes: ["Anti-Skid R11", "Natural Cleft", "Honed", "Tumbled Antique"],
    gradient: "linear-gradient(135deg, #2b2823 0%, #443c33 50%, #1c1915 100%)",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Extracted from the renowned Kurnool-Cuddapah sedimentary formations, Cuddapah Black Limestone is prized worldwide for its uniform dark charcoal tone and remarkable resistance to heat absorption. Stays comfortably cool under scorching tropical sunlight while maintaining certified R11 wet slip resistance.",
    origin: "Cuddapah / Kadapa Basin, Andhra Pradesh",
    quarryType: "Stratified Sedimentary Formation (Sai Balaji Impex)",
    density: "2,620 kg/m³",
    compressive: "148 MPa",
    waterAbs: "0.38%",
    mohsHardness: "4.0 - 4.5",
    slipResistance: "R11 (Certified Wet Deck)",
    flexuralStrength: "24 MPa",
    features: [
      "Thermal comfort under intense sunlight — remains cool underfoot",
      "Uniform deep charcoal hue with minimal mineral veining",
      "High density micro-crystalline calcareous structure",
      "Salt and chlorine water resistant for aquatic environments",
    ],
    finishesDetail: [
      {
        name: "Anti-Skid R11",
        description: "Micro-textured surface engineered specifically for pool surrounds and wet barefoot transit.",
        texture: "Grip-Safe Matte",
        recommendedFor: "Swimming Pool Copings, Splash Decks, Spa Areas",
      },
      {
        name: "Natural Cleft",
        description: "Quarry split-face retaining gentle natural undulations and architectural character.",
        texture: "Subtle Cleft",
        recommendedFor: "Patios, Courtyard Walkways, Terraces",
      },
      {
        name: "Honed",
        description: "Smooth uniform surface with subdued sheen for contemporary architectural continuity.",
        texture: "Smooth Matte",
        recommendedFor: "Indoor-Outdoor Flow Flooring",
      },
      {
        name: "Tumbled Antique",
        description: "Softened edge geometry delivering historical European paving aesthetics.",
        texture: "Soft Weathered",
        recommendedFor: "Mediterranean Style Plazas, Heritage Courtyards",
      },
    ],
    applications: [
      { title: "Pool Surrounds & Coping", desc: "Slip-safe, cool-underfoot perimeter stone resisting chlorinated and salt water." },
      { title: "Alfresco Dining Terraces", desc: "Continuous indoor-outdoor floor transitions with low maintenance requirements." },
      { title: "Vehicular Paving & Driveways", desc: "Thick 30mm calibrated pavers capable of bearing residential vehicle loads." },
    ],
    exportPackaging: {
      crateType: "Reinforced Sea-Worthy Hardwood Crates",
      palletCapacity: "22 - 25 m² per crate",
      containerCapacity: "700 - 750 m² (25mm) per 20ft container",
      fumigation: "ISPM-15 Certified with barcode tracking",
      portOfLoading: "Chennai (INMAA) Port",
    },
  },
  {
    id: "indian-autumn-slate",
    name: "Indian Autumn Rustic Slate",
    tagline: "Rich copper, terracotta, and deep slate variegations delivering organic geological warmth.",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "slate",
    area: ["elevation", "flooring"],
    finish: "Natural Cleft",
    color: "Autumn Copper",
    availableSizes: ["600x300 mm", "300x300 mm", "600x600 mm"],
    thickness: "12 - 15 mm (±1mm)",
    availableFinishes: ["Natural Cleft", "Honed Matte", "Rustic Antique"],
    gradient: "linear-gradient(135deg, #532f1f 0%, #7d4428 50%, #3a1f13 100%)",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "A geological tapestry of iron-oxide rust, burnt terracotta, and warm charcoal slate stratum. Every individual tile is a unique piece of earth history, transforming plain exterior building facades into textured architectural landmarks.",
    origin: "Markapur Mineral Belt, Andhra Pradesh",
    quarryType: "Selective Stratum Quarry (Pavan Impex)",
    density: "2,740 kg/m³",
    compressive: "158 MPa",
    waterAbs: "0.32%",
    mohsHardness: "4.5",
    slipResistance: "R11",
    flexuralStrength: "29 MPa",
    features: [
      "Rich mineral oxidation creating warm natural earth tones",
      "Excellent resistance to thermal shock and freeze-thaw cycles",
      "Precision calibrated backs for zero-hollow adhesive setting",
    ],
    finishesDetail: [
      {
        name: "Natural Cleft",
        description: "Dramatic organic topography celebrating raw earth variations.",
        texture: "Natural Split",
        recommendedFor: "Exterior Facades, Accent Pillars",
      },
      {
        name: "Honed Matte",
        description: "Smooth matte surface highlighting internal copper swirling.",
        texture: "Silky Matte",
        recommendedFor: "Interior Feature Walls, Bathrooms",
      },
    ],
    applications: [
      { title: "Residential Villa Facades", desc: "Warm earth-toned cladding harmonizing with landscape greenery." },
      { title: "Fireplace & Chimney Surrounds", desc: "Heat-tolerant natural stone with organic texture under interior lighting." },
    ],
    exportPackaging: {
      crateType: "Heavy-Duty ISPM-15 Wooden Crates",
      palletCapacity: "30 m² per crate",
      containerCapacity: "850 m² per 20ft container",
      fumigation: "Methyl Bromide Treated",
      portOfLoading: "Chennai (INMAA)",
    },
  },
  {
    id: "3d-stacked-ledger",
    name: "3D Interlocking Slate Ledger",
    tagline: "Precision Z-shape modular panels assembled from layered natural slate strips.",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "cladding",
    area: ["elevation"],
    finish: "3D Ledger Relief",
    color: "Midnight Black",
    availableSizes: ["600x150 mm", "600x300 mm", "Interlocking Z-Corner Sets"],
    thickness: "15 - 25 mm Multi-Level Relief",
    availableFinishes: ["3D Natural Split", "Layered Relief", "Interlocking"],
    gradient: "linear-gradient(135deg, #151618 0%, #2b2c31 40%, #0e0f11 100%)",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Engineered for seamless architectural facades, these pre-assembled Z-shape panels interlock without visible vertical seams. Individual slate strips of varying depths create dynamic shadow lines that shift naturally with the path of the sun.",
    origin: "Markapur, Andhra Pradesh",
    quarryType: "Hand-Fabricated Assembly Unit (Pavan Impex)",
    density: "2,760 kg/m³",
    compressive: "160 MPa",
    waterAbs: "0.28%",
    mohsHardness: "4.5 - 5.0",
    slipResistance: "N/A (Vertical Cladding)",
    flexuralStrength: "30 MPa",
    features: [
      "Precision stepped Z-shape profile eliminates straight vertical joint lines",
      "Heavy-duty polymer resin backing for structural adherence",
      "Matching 90-degree corner sets available for clean columns and returns",
    ],
    finishesDetail: [
      {
        name: "3D Natural Split",
        description: "Multi-depth raw cleft strips creating dramatic architectural relief.",
        texture: "Multi-Tiered 3D",
        recommendedFor: "Facade Pillars, Retaining Walls, Entry Statements",
      },
    ],
    applications: [
      { title: "Architectural Exterior Facades", desc: "Monumental stone columns and facade features with zero visible joint grout." },
      { title: "Interior Feature Walls", desc: "Textured backdrop for luxury living rooms, wine cellars, and corporate reception areas." },
    ],
    exportPackaging: {
      crateType: "Cardboard Encased in Timber Crates",
      palletCapacity: "24 m² per crate",
      containerCapacity: "650 m² per 20ft container",
      fumigation: "ISPM-15 Certified",
      portOfLoading: "Chennai (INMAA)",
    },
  },
  {
    id: "tumbled-limestone-paver",
    name: "Tumbled Calcareous Pavers",
    tagline: "Aged tumbled edges and soft antiqued surface for vehicular driveways and historic plazas.",
    company: "Sai Balaji Impex",
    companySlug: "sai-balaji-impex",
    category: "pavers",
    area: ["driveway", "pool", "flooring"],
    finish: "Tumbled Antique",
    color: "Midnight Black",
    availableSizes: ["200x100 mm Pavers", "300x300 mm", "140x140 mm Cobbles", "Custom Modular Cobbles"],
    thickness: "30 mm / 40 mm / 50 mm Calibrated",
    availableFinishes: ["Tumbled Antique", "Hand-Chiseled Edge", "Flamed Top"],
    gradient: "linear-gradient(135deg, #383e46 0%, #4f5762 50%, #24282d 100%)",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Robust calcareous limestone pavers subjected to intensive mechanical tumbling to produce rounded, time-worn edges and a smooth, weathered top. Engineered to withstand heavy vehicular traffic, turning driveways and town courtyards into permanent architectural monuments.",
    origin: "Cuddapah, Andhra Pradesh",
    quarryType: "Heavy-Duty Quarry Formation (Sai Balaji Impex)",
    density: "2,640 kg/m³",
    compressive: "152 MPa",
    waterAbs: "0.35%",
    mohsHardness: "4.5",
    slipResistance: "R12 (High Traction Antique)",
    flexuralStrength: "26 MPa",
    features: [
      "Calibrated 30-50mm thickness supporting cars, SUVs, and service vehicles",
      "Tumbled edges resist chipping and accommodate flexible sand jointing",
      "High chemical resistance against automotive drippings and salt deicers",
    ],
    finishesDetail: [
      {
        name: "Tumbled Antique",
        description: "Rumbled in large revolving drums to soften sharp edges and distress surface.",
        texture: "Weathered Antique",
        recommendedFor: "Driveways, Courtyards, Historic Patios",
      },
    ],
    applications: [
      { title: "Residential & Commercial Driveways", desc: "Load-bearing natural stone paving that will never crack like concrete." },
      { title: "Pedestrian Streetscapes & Courtyards", desc: "Timeless European cobblestone atmosphere for civic plazas." },
    ],
    exportPackaging: {
      crateType: "Heavy-Duty Box Crates with Corner Bracing",
      palletCapacity: "18 - 20 m² per crate",
      containerCapacity: "500 - 550 m² (40mm) per 20ft container",
      fumigation: "ISPM-15 Certified",
      portOfLoading: "Chennai (INMAA)",
    },
  },
  {
    id: "california-gold-slate",
    name: "California Gold Natural Slate",
    tagline: "Golden bronze, ochre, and shimmering mica flecks running through deep slate stratum.",
    company: "Pavan Impex",
    companySlug: "pavan-impex",
    category: "slate",
    area: ["elevation", "flooring"],
    finish: "Natural Cleft",
    color: "California Gold",
    availableSizes: ["600x300 mm", "600x600 mm", "300x300 mm"],
    thickness: "12 - 15 mm (±1mm)",
    availableFinishes: ["Natural Cleft", "Honed Matte", "Brushed Satin"],
    gradient: "linear-gradient(135deg, #6c471c 0%, #96692f 50%, #442a0e 100%)",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "A rare slate variant containing high concentrations of embedded gold mica and quartzite flecks that catch and reflect incoming daylight. Ideal for luxury hotel lobbies, resort facades, and private residential master villas.",
    origin: "Markapur, Andhra Pradesh",
    quarryType: "Selected Mica Vein Reserve (Pavan Impex)",
    density: "2,750 kg/m³",
    compressive: "162 MPa",
    waterAbs: "0.30%",
    mohsHardness: "4.5",
    slipResistance: "R11",
    flexuralStrength: "30 MPa",
    features: [
      "Reflective mica flakes shimmer under ambient and direct sunlight",
      "High natural cleavage split accuracy ensuring consistent installation",
      "Calibrated thickness for smooth grout lines",
    ],
    finishesDetail: [
      {
        name: "Natural Cleft",
        description: "Raw hand split finish highlighting golden mica layers.",
        texture: "Tactile Riven",
        recommendedFor: "Feature Facades, Porticos",
      },
    ],
    applications: [
      { title: "Hotel & Resort Porticos", desc: "Prestigious entry portals that gleam under sun and architectural uplighting." },
      { title: "Interior Feature Columns", desc: "Natural luxury stone wrapping for living areas and statement lobbies." },
    ],
    exportPackaging: {
      crateType: "ISPM-15 Timber Crates",
      palletCapacity: "30 m² per crate",
      containerCapacity: "850 m² per 20ft container",
      fumigation: "Methyl Bromide Certified",
      portOfLoading: "Chennai (INMAA)",
    },
  },
  {
    id: "steel-grey-granite",
    name: "Steel Grey Architectural Granite",
    tagline: "Consistent medium-grey crystalline granite available in leathered and flamed heavy commercial finishes.",
    company: "Pavan Granite",
    companySlug: "pavan-granite",
    category: "granite",
    area: ["countertop", "flooring", "elevation"],
    finish: "Leathered Velvet",
    color: "Lime Blue",
    availableSizes: ["Jumbo Gangsaw Slabs", "1200x600 mm", "600x600 mm", "Custom Cut-to-Size"],
    thickness: "20 mm / 30 mm",
    availableFinishes: ["Leathered Velvet", "95+ Polish", "Honed", "Flamed"],
    gradient: "linear-gradient(135deg, #2e3842 0%, #475564 50%, #1e242b 100%)",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "An understated, monolithic architectural granite characterized by consistent silver-grey feldspar crystals interspersed with charcoal quartz pockets. Its neutral tonal palette seamlessly complements modern glass, concrete, and blackened steel architecture.",
    origin: "Prakasam District, Andhra Pradesh",
    quarryType: "Massive Intrusive Granite Bedrock (Pavan Granite)",
    density: "2,940 kg/m³",
    compressive: "200 MPa",
    waterAbs: "0.10%",
    mohsHardness: "6.5",
    slipResistance: "R10 (Leathered) / R12 (Flamed)",
    flexuralStrength: "34 MPa",
    features: [
      "Extremely consistent grain structure across large commercial batches",
      "Virtually impervious to staining and moisture penetration",
      "Superb resistance to heavy pallet jacks and industrial foot traffic",
    ],
    finishesDetail: [
      {
        name: "Leathered Velvet",
        description: "Soft tactile feel with non-glare surface ideal for contemporary interiors.",
        texture: "Soft Matte Leather",
        recommendedFor: "Kitchen Tops, Airport Terminal Flooring",
      },
    ],
    applications: [
      { title: "High-Traffic Commercial Flooring", desc: "Transit stations, shopping malls, and corporate headquarters." },
      { title: "Contemporary Kitchen Surfaces", desc: "Neutral, stain-impervious worktops paired with modern cabinetry." },
    ],
    exportPackaging: {
      crateType: "Steel Reinforced A-Frames",
      palletCapacity: "12 Gangsaw Slabs per frame",
      containerCapacity: "420 m² (20mm) per 20ft container",
      fumigation: "ISPM-15 Certified",
      portOfLoading: "Chennai (INMAA)",
    },
  },
  {
    id: "lime-yellow-stone",
    name: "Lime Yellow Calcareous Stone",
    tagline: "Sunlit desert gold and warm butterscotch tone for Mediterranean and tropical resort architecture.",
    company: "Sai Balaji Impex",
    companySlug: "sai-balaji-impex",
    category: "limestone",
    area: ["pool", "flooring"],
    finish: "Honed Matte",
    color: "Lime Yellow",
    availableSizes: ["600x600 mm", "600x300 mm", "300x300 mm", "Cobble Pavers"],
    thickness: "20 mm / 25 mm",
    availableFinishes: ["Honed Matte", "Natural Cleft", "Tumbled Antique", "Brushed"],
    gradient: "linear-gradient(135deg, #7c6433 0%, #a48a4c 50%, #524220 100%)",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Capturing the golden warmth of sun-bleached desert sands, Lime Yellow is an organic sedimentary limestone that brings gentle, luminous radiance to private villas and tropical resorts. Naturally stays cool under high ambient heat.",
    origin: "Tandur / Cuddapah Formation, Andhra Pradesh",
    quarryType: "Sedimentary Limestone Quarry (Sai Balaji Impex)",
    density: "2,580 kg/m³",
    compressive: "135 MPa",
    waterAbs: "0.55%",
    mohsHardness: "4.0",
    slipResistance: "R10 (Honed) / R11 (Natural)",
    flexuralStrength: "22 MPa",
    features: [
      "Radiant golden-yellow tone with subtle organic fossil impressions",
      "Thermal dissipation properties keep stone cool in hot climates",
      "Available in multiple modular paving sizes for organic patterns",
    ],
    finishesDetail: [
      {
        name: "Honed Matte",
        description: "Silky matte finish accentuating the gentle golden warmth.",
        texture: "Soft Matte",
        recommendedFor: "Resort Living Rooms, Shaded Verandas",
      },
    ],
    applications: [
      { title: "Mediterranean Villa Courtyards", desc: "Warm stone expanses for outdoor seating and sunlit verandas." },
      { title: "Resort Walkways & Spa Decks", desc: "Gentle natural warmth complementing water features and botanical landscaping." },
    ],
    exportPackaging: {
      crateType: "Hardwood Wooden Crates",
      palletCapacity: "25 m² per crate",
      containerCapacity: "720 m² per 20ft container",
      fumigation: "ISPM-15 Certified",
      portOfLoading: "Chennai (INMAA)",
    },
  },
];

// Helper functions for data access
export function getAllProducts(): ProductStone[] {
  return PRODUCTS_DATABASE;
}

export function getProductById(id: string): ProductStone | undefined {
  return PRODUCTS_DATABASE.find((p) => p.id === id);
}

export function getRelatedProducts(currentId: string, limit: number = 3): ProductStone[] {
  const current = getProductById(currentId);
  if (!current) return PRODUCTS_DATABASE.slice(0, limit);

  // Prefer products from same category or same company
  const others = PRODUCTS_DATABASE.filter((p) => p.id !== currentId);
  const prioritized = others.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.category === current.category) scoreA += 2;
    if (a.company === current.company) scoreA += 1;
    if (b.category === current.category) scoreB += 2;
    if (b.company === current.company) scoreB += 1;
    return scoreB - scoreA;
  });

  return prioritized.slice(0, limit);
}
