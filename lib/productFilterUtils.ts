import { ProductStone } from "./productsData";

export interface FilterCategoryOption {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

export const TOP_CATEGORIES_METADATA: FilterCategoryOption[] = [
  {
    id: "slate",
    slug: "slate-stone",
    title: "SLATE STONE",
    subtitle: "Markapur Slates & CNC Carvings",
    href: "/products?category=slate",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "applications",
    slug: "applications",
    title: "APPLICATIONS",
    subtitle: "Wall Cladding, Pavers & Cobbles",
    href: "/products?category=applications",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "limestone",
    slug: "limestone",
    title: "LIMESTONE",
    subtitle: "Cuddapah Black & Lime Yellow",
    href: "/products?category=limestone",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "south-indian-granite",
    slug: "south-indian-granite",
    title: "SOUTH INDIAN GRANITE",
    subtitle: "Black Galaxy & Steel Grey",
    href: "/products?category=south-indian-granite",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "north-indian-granite",
    slug: "north-indian-granite",
    title: "NORTH INDIAN GRANITE",
    subtitle: "Rajasthan Slabs & Crystals",
    href: "/products?category=north-indian-granite",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
];

export interface FilterDefinition {
  id: string;
  label: string;
  test: (val: string) => boolean;
}

export interface ColorFilterDefinition extends FilterDefinition {
  hex: string;
}

export const ARCHITECTURAL_FINISHES: FilterDefinition[] = [
  {
    id: "cnc-3d-sculpted",
    label: "CNC 3D Relief & Sculpted",
    test: (f: string) => /3d|relief|sculpted|carving|bas-relief|engrav|fluted|silhouette|cameo|fine-line|contour|cnc/i.test(f),
  },
  {
    id: "natural-cleft",
    label: "Natural Cleft (Hand-Split)",
    test: (f: string) => /cleft|hand-split|split|riven|stacked|chisel|veined|natural\s*tone|interlocking|texture/i.test(f),
  },
  {
    id: "honed-matte",
    label: "Honed Matte",
    test: (f: string) => /honed|matte|sandblast/i.test(f),
  },
  {
    id: "mirror-polished",
    label: "Mirror Polished (95+ Gloss)",
    test: (f: string) => /polish|gloss|mirror/i.test(f),
  },
  {
    id: "stone-inlay",
    label: "Stone Inlay & Pietra Dura",
    test: (f: string) => /inlay|fusion|lattice|perforated|jali/i.test(f),
  },
  {
    id: "gold-accents",
    label: "24K Gold Leaf & Foil Accents",
    test: (f: string) => /gold|foil|leaf|metallic/i.test(f),
  },
  {
    id: "artisanal-polychrome",
    label: "Artisanal Hand-Painted & Polychrome",
    test: (f: string) => /paint|polychrome|mineral|airbrush|pigment|tilak|color|burnished/i.test(f),
  },
  {
    id: "tumbled-antique",
    label: "Tumbled Antique",
    test: (f: string) => /tumbled|antique|aged/i.test(f),
  },
  {
    id: "brushed-leathered",
    label: "Brushed / Leathered / Flamed",
    test: (f: string) => /brushed|leathered|flamed|anti-skid/i.test(f),
  },
  {
    id: "biolux-sealed",
    label: "Biolux Sealed & Weatherproof",
    test: (f: string) => /biolux|sealed|protective/i.test(f),
  },
];

export function testSizeDimension(s: string, defId: string): boolean {
  const isCustom = /custom|bespoke|random|interlocking|bullnose/i.test(s);
  const isGangsaw = /gangsaw|monumental|panoramic/i.test(s);

  if (defId === "bespoke") return isCustom;

  let dim1 = 0;
  let dim2 = 0;

  const mmMatch = s.match(/(\d+)\s*x\s*(\d+)\s*mm/i);
  if (mmMatch) {
    dim1 = parseInt(mmMatch[1], 10);
    dim2 = parseInt(mmMatch[2], 10);
  } else {
    const cmMatch = s.match(/(\d+)(?:\.\d+)?\s*(?:cm|cms)?\s*x\s*(?:[Ww]\s*)?(\d+)(?:\.\d+)?\s*(?:cm|cms)?/i);
    if (cmMatch) {
      dim1 = parseFloat(cmMatch[1]) * 10;
      dim2 = parseFloat(cmMatch[2]) * 10;
    }
  }

  const maxDim = Math.max(dim1, dim2);
  const minDim = Math.min(dim1, dim2);

  if (defId === "monumental") {
    return isGangsaw || maxDim >= 2100 || (maxDim >= 1800 && minDim >= 1500);
  }
  if (defId === "large") {
    return maxDim >= 1200 && maxDim < 2100 && !(maxDim >= 1800 && minDim >= 1500);
  }
  if (defId === "medium") {
    return maxDim > 600 && maxDim < 1200;
  }
  if (defId === "compact") {
    return (maxDim > 0 && maxDim <= 600) || /cobble|paver/i.test(s);
  }
  return false;
}

export const ARCHITECTURAL_SIZES: FilterDefinition[] = [
  {
    id: "compact",
    label: "Compact & Modular (≤ 60cm / 600mm)",
    test: (s: string) => testSizeDimension(s, "compact"),
  },
  {
    id: "medium",
    label: "Medium Accent Panels (60 – 120cm)",
    test: (s: string) => testSizeDimension(s, "medium"),
  },
  {
    id: "large",
    label: "Large Feature Murals (120 – 180cm)",
    test: (s: string) => testSizeDimension(s, "large"),
  },
  {
    id: "monumental",
    label: "Monumental & Grand Scale (≥ 180cm)",
    test: (s: string) => testSizeDimension(s, "monumental"),
  },
  {
    id: "bespoke",
    label: "Bespoke / Custom Dimensions",
    test: (s: string) => testSizeDimension(s, "bespoke"),
  },
];

export const ARCHITECTURAL_COLORS: ColorFilterDefinition[] = [
  {
    id: "warm-sandstone",
    label: "Warm Sandstone & Gold",
    hex: "#d4a373",
    test: (c: string) => /sandstone|ochre|saffron|california gold|lime yellow/i.test(c),
  },
  {
    id: "autumn-copper",
    label: "Autumn Copper & Terracotta",
    hex: "#9a3412",
    test: (c: string) => /autumn|copper|rust/i.test(c),
  },
  {
    id: "midnight-black",
    label: "Midnight Black & Charcoal",
    hex: "#18181b",
    test: (c: string) => /black|charcoal|dark grey/i.test(c),
  },
  {
    id: "silver-steel-grey",
    label: "Silver & Steel Grey",
    hex: "#64748b",
    test: (c: string) => /grey|silver|blue|steel/i.test(c),
  },
  {
    id: "white-cream-marble",
    label: "White & Cream Marble",
    hex: "#fef3c7",
    test: (c: string) => /marble|white|cream|beige/i.test(c),
  },
  {
    id: "stone-lilac",
    label: "Stone Lilac & Lavender",
    hex: "#a855f7",
    test: (c: string) => /lilac/i.test(c),
  },
  {
    id: "gold-bronzite",
    label: "Gold Bronzite (Galaxy)",
    hex: "#854d0e",
    test: (c: string) => /bronzite|galaxy/i.test(c),
  },
  {
    id: "green-quartzite",
    label: "Green Quartzite",
    hex: "#15803d",
    test: (c: string) => /green|quartzite/i.test(c),
  },
  {
    id: "multicolor",
    label: "Multi-Color Natural Stone",
    hex: "linear-gradient(135deg, #ca8a04, #9a3412, #64748b)",
    test: (c: string) => /multi/i.test(c),
  },
];

export const APPLICATION_AREAS = [
  { id: "elevation", label: "Exterior Elevations & Murals" },
  { id: "flooring", label: "Living & Interior Floors" },
  { id: "pool", label: "Pool Decks & Water Features" },
  { id: "countertop", label: "Kitchen Countertops & Vanity" },
  { id: "driveway", label: "Vehicular Driveways & Paving" },
];

export const QUARRY_DIVISIONS = [
  { id: "Pavan Impex", label: "Pavan Impex (Markapur Slates & CNC)" },
  { id: "Sai Balaji Impex", label: "Sai Balaji Impex (Cuddapah Limestones)" },
  { id: "Pavan Granite", label: "Pavan Granite (Chimakurthy Galaxy)" },
  { id: "Pavan Stones World", label: "Pavan Stones World (Exotic Stones & Slabs)" },
];

export interface SubtypeDefinition {
  id: string;
  label: string;
  hex: string;
  test: (product: ProductStone) => boolean;
}

// 1. SLATE STONE (Official 6 Types + CNC)
export const SLATE_STONE_VARIETIES: SubtypeDefinition[] = [
  {
    id: "black-slate",
    label: "Black Slate",
    hex: "#18181b",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("black slate") || str.includes("midnight black") || (p.category === "slate" && str.includes("black")) || str.includes("black");
    },
  },
  {
    id: "indian-autumn",
    label: "Indian Autumn",
    hex: "#9a3412",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("autumn") || str.includes("copper") || str.includes("rust");
    },
  },
  {
    id: "california-gold",
    label: "California Gold",
    hex: "#d97706",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("california gold") || str.includes("gold mica") || str.includes("golden mica");
    },
  },
  {
    id: "grey-slate",
    label: "Grey Slate",
    hex: "#64748b",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("grey slate") || str.includes("gray slate") || str.includes("silver grey") || str.includes("steel grey") || str.includes("grey") || str.includes("silver");
    },
  },
  {
    id: "gold-rustic",
    label: "Gold Rustic",
    hex: "#ca8a04",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("gold rustic") || str.includes("rustic gold") || str.includes("gold painted") || str.includes("gold foil") || str.includes("golden");
    },
  },
  {
    id: "multicolour-slate",
    label: "Multicolour Slate",
    hex: "linear-gradient(135deg, #ca8a04, #9a3412, #64748b)",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("multi") || str.includes("polychrome") || str.includes("lilac") || str.includes("rainbow") || str.includes("variegated");
    },
  },
];

// 2. APPLICATIONS (Official 5 Subtypes)
export const APPLICATION_SUBTYPES: SubtypeDefinition[] = [
  {
    id: "ledgestone-panels",
    label: "Ledgestone Panels",
    hex: "#3f3f46",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${(p.features || []).join(" ")}`.toLowerCase();
      return str.includes("ledger") || str.includes("stacked") || str.includes("panel") || str.includes("z-shape") || str.includes("3d");
    },
  },
  {
    id: "wall-cladding",
    label: "Wall Cladding",
    hex: "#71717a",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${(p.features || []).join(" ")}`.toLowerCase();
      return p.category === "cladding" || p.area.includes("elevation") || str.includes("cladding") || str.includes("facade") || str.includes("wall");
    },
  },
  {
    id: "flooring",
    label: "Flooring",
    hex: "#a1a1aa",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${(p.features || []).join(" ")}`.toLowerCase();
      return p.area.includes("flooring") || str.includes("floor") || str.includes("paving") || str.includes("calibrated tile");
    },
  },
  {
    id: "landscaping",
    label: "Landscaping",
    hex: "#52525b",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${(p.features || []).join(" ")}`.toLowerCase();
      return p.area.includes("pool") || p.area.includes("driveway") || p.category === "pavers" || str.includes("paver") || str.includes("cobble") || str.includes("landscap") || str.includes("outdoor") || str.includes("driveway") || str.includes("pool");
    },
  },
  {
    id: "feature-walls",
    label: "Feature Walls",
    hex: "#27272a",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${(p.features || []).join(" ")}`.toLowerCase();
      return p.category === "cnc" || str.includes("mural") || str.includes("relief") || str.includes("carving") || str.includes("feature wall") || str.includes("inlay") || str.includes("sculpt");
    },
  },
];

// 3. LIMESTONE (Official 6 Subtypes)
export const LIMESTONE_SUBTYPES: SubtypeDefinition[] = [
  {
    id: "kadapa-black",
    label: "Kadapa Black",
    hex: "#1c1917",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.origin} ${p.color}`.toLowerCase();
      return str.includes("kadapa") || str.includes("cuddapah") || str.includes("black limestone") || str.includes("midnight black");
    },
  },
  {
    id: "lime-yellow",
    label: "Lime Yellow",
    hex: "#d97706",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("lime yellow") || str.includes("yellow limestone") || str.includes("butterscotch") || str.includes("desert gold") || str.includes("tandur yellow");
    },
  },
  {
    id: "lime-blue",
    label: "Lime Blue",
    hex: "#475569",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("lime blue") || str.includes("blue limestone") || str.includes("betamcherla") || str.includes("tandur blue") || str.includes("shahabad blue") || str.includes("kota blue");
    },
  },
  {
    id: "lime-green",
    label: "Lime Green",
    hex: "#4d7c0f",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("lime green") || str.includes("green limestone") || str.includes("kota green") || str.includes("tandur green") || str.includes("olive");
    },
  },
  {
    id: "ash-grey",
    label: "Ash Grey",
    hex: "#64748b",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("ash grey") || str.includes("grey limestone") || str.includes("gray limestone") || str.includes("smoke grey");
    },
  },
  {
    id: "other-limestone",
    label: "Other Limestone",
    hex: "#a8a29e",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("tumbled") || str.includes("antique") || str.includes("paver") || str.includes("coping") || str.includes("makrana") || str.includes("calcite") || str.includes("white") || str.includes("calcareous");
    },
  },
];

// 4. SOUTH INDIAN GRANITE (Official 13 Subtypes)
export const SOUTH_INDIAN_GRANITE_SUBTYPES: SubtypeDefinition[] = [
  {
    id: "black-galaxy",
    label: "Black Galaxy",
    hex: "#090a0c",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("black galaxy") || str.includes("galaxy") || str.includes("chimakurthy") || str.includes("bronzite");
    },
  },
  {
    id: "steel-grey",
    label: "Steel Grey",
    hex: "#334155",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("steel grey") || str.includes("steel gray") || str.includes("monolithic grey");
    },
  },
  {
    id: "black-pearl",
    label: "Black Pearl",
    hex: "#1e293b",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("black pearl") || str.includes("pearl black") || str.includes("silver pearl");
    },
  },
  {
    id: "andhra-black",
    label: "Andhra Black",
    hex: "#0f172a",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("andhra black") || str.includes("absolute black") || str.includes("jet black") || str.includes("khammam black");
    },
  },
  {
    id: "mahogany",
    label: "Mahogany",
    hex: "#78350f",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("mahogany") || str.includes("dakshin mahogany") || str.includes("ruby mahogany");
    },
  },
  {
    id: "cera-grey",
    label: "Cera Grey",
    hex: "#475569",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("cera grey") || str.includes("cera gray") || str.includes("classic grey");
    },
  },
  {
    id: "viscon-white",
    label: "Viscon White",
    hex: "#e2e8f0",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("viscon") || str.includes("viscount") || str.includes("viscount white");
    },
  },
  {
    id: "iskcon-white",
    label: "Iskcon White",
    hex: "#f1f5f9",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("iskcon") || str.includes("iscon");
    },
  },
  {
    id: "latina-white",
    label: "Latina White",
    hex: "#e5e7eb",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("latina");
    },
  },
  {
    id: "moon-white",
    label: "Moon White",
    hex: "#f3f4f6",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("moon white") || str.includes("kashmir white") || str.includes("garnet white");
    },
  },
  {
    id: "tan-brown",
    label: "Tan Brown",
    hex: "#92400e",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("tan brown") || str.includes("karimnagar brown") || str.includes("chestnut brown");
    },
  },
  {
    id: "chilly-red",
    label: "Chilly Red",
    hex: "#991b1b",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("chilly red") || str.includes("chilli red") || str.includes("imperial red") || str.includes("ruby red") || str.includes("red granite");
    },
  },
  {
    id: "tan-blue",
    label: "Tan Blue",
    hex: "#1e3a8a",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("tan blue") || str.includes("lavender blue") || str.includes("himalayan blue") || str.includes("blue granite");
    },
  },
];

// 5. NORTH INDIAN GRANITE (Official 2 Subtypes)
export const NORTH_INDIAN_GRANITE_SUBTYPES: SubtypeDefinition[] = [
  {
    id: "p-white",
    label: "P White",
    hex: "#e5e7eb",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("p white") || str.includes("platinum white") || str.includes("p-white") || str.includes("alaska white") || str.includes("white granite");
    },
  },
  {
    id: "tiger-skin",
    label: "Tiger Skin",
    hex: "#d97706",
    test: (p: ProductStone) => {
      const str = `${p.name} ${p.tagline} ${p.description} ${p.color}`.toLowerCase();
      return str.includes("tiger skin") || str.includes("tiger-skin") || str.includes("tiger yellow") || str.includes("cheetah") || str.includes("royal black") || str.includes("rajasthan");
    },
  },
];

// Subtype Getter and Matcher Utilities
export function getCategorySubtypes(categoryKey: string): SubtypeDefinition[] {
  const cat = categoryKey.toLowerCase();
  if (cat.includes("slate") || cat.includes("cnc")) return SLATE_STONE_VARIETIES;
  if (cat.includes("application") || cat.includes("paver") || cat.includes("cladding")) return APPLICATION_SUBTYPES;
  if (cat.includes("limestone")) return LIMESTONE_SUBTYPES;
  if (cat.includes("north-indian-granite") || cat.includes("north")) return NORTH_INDIAN_GRANITE_SUBTYPES;
  if (cat.includes("south-indian-granite") || cat.includes("south") || cat.includes("granite")) return SOUTH_INDIAN_GRANITE_SUBTYPES;
  return [];
}

export function matchesSlateVariety(product: ProductStone, selectedVarieties: string[]): boolean {
  if (selectedVarieties.length === 0) return true;
  return selectedVarieties.some((vId) => {
    const def = SLATE_STONE_VARIETIES.find((d) => d.id === vId || d.label.toLowerCase() === vId.toLowerCase());
    if (def) return def.test(product);
    return false;
  });
}

export function matchesApplicationSubtype(product: ProductStone, selectedSubtypes: string[]): boolean {
  if (selectedSubtypes.length === 0) return true;
  return selectedSubtypes.some((sId) => {
    const def = APPLICATION_SUBTYPES.find((d) => d.id === sId || d.label.toLowerCase() === sId.toLowerCase());
    if (def) return def.test(product);
    return false;
  });
}

export function matchesLimestoneSubtype(product: ProductStone, selectedSubtypes: string[]): boolean {
  if (selectedSubtypes.length === 0) return true;
  return selectedSubtypes.some((sId) => {
    const def = LIMESTONE_SUBTYPES.find((d) => d.id === sId || d.label.toLowerCase() === sId.toLowerCase());
    if (def) return def.test(product);
    return false;
  });
}

export function matchesSouthIndianGraniteSubtype(product: ProductStone, selectedSubtypes: string[]): boolean {
  if (selectedSubtypes.length === 0) return true;
  return selectedSubtypes.some((sId) => {
    const def = SOUTH_INDIAN_GRANITE_SUBTYPES.find((d) => d.id === sId || d.label.toLowerCase() === sId.toLowerCase());
    if (def) return def.test(product);
    return false;
  });
}

export function matchesNorthIndianGraniteSubtype(product: ProductStone, selectedSubtypes: string[]): boolean {
  if (selectedSubtypes.length === 0) return true;
  return selectedSubtypes.some((sId) => {
    const def = NORTH_INDIAN_GRANITE_SUBTYPES.find((d) => d.id === sId || d.label.toLowerCase() === sId.toLowerCase());
    if (def) return def.test(product);
    return false;
  });
}

export function matchesCategorySubtype(product: ProductStone, categoryKey: string, selectedSubtypes: string[]): boolean {
  if (selectedSubtypes.length === 0) return true;
  const subtypes = getCategorySubtypes(categoryKey);
  return selectedSubtypes.some((sId) => {
    const def = subtypes.find((d) => d.id === sId || d.label.toLowerCase() === sId.toLowerCase());
    if (def) return def.test(product);
    return false;
  });
}

// Matching functions
export function matchesCategory(product: ProductStone, selectedCategories: string[]): boolean {
  if (selectedCategories.length === 0) return true;
  return selectedCategories.some((cat) => {
    const catLower = cat.toLowerCase().trim();

    // 1) SLATE STONE (CNC products come under SLATE STONE category!)
    if (
      catLower === "slate" ||
      catLower === "slates" ||
      catLower === "slate-stone" ||
      catLower === "slate stone" ||
      catLower === "cnc" ||
      catLower === "cnc-carvings"
    ) {
      return product.category === "slate" || product.category === "cnc";
    }

    // 2) APPLICATIONS (Wall Cladding, Pavers, Cobbles)
    if (
      catLower === "applications" ||
      catLower === "application" ||
      catLower === "pavers" ||
      catLower === "cladding" ||
      catLower === "cobbles"
    ) {
      return product.category === "pavers" || product.category === "cladding";
    }

    // 3) LIMESTONE
    if (catLower === "limestone" || catLower === "limestones") {
      return product.category === "limestone";
    }

    // 4) SOUTH INDIAN GRANITE
    if (
      catLower === "south-indian-granite" ||
      catLower === "south indian granite" ||
      catLower === "south-granite"
    ) {
      if (product.category !== "granite") return false;
      const originLower = (product.origin || "").toLowerCase();
      const badgeLower = (product.badge || "").toLowerCase();
      return (
        !originLower.includes("rajasthan") &&
        !originLower.includes("north") &&
        !badgeLower.includes("north indian")
      );
    }

    // 5) NORTH INDIAN GRANITE
    if (
      catLower === "north-indian-granite" ||
      catLower === "north indian granite" ||
      catLower === "north-granite"
    ) {
      if (product.category !== "granite") return false;
      const originLower = (product.origin || "").toLowerCase();
      const badgeLower = (product.badge || "").toLowerCase();
      return (
        originLower.includes("rajasthan") ||
        originLower.includes("north") ||
        badgeLower.includes("north indian")
      );
    }

    // Fallback for general granite
    if (catLower === "granite" || catLower === "granites") {
      return product.category === "granite";
    }

    return product.category === catLower;
  });
}

export function matchesCompany(product: ProductStone, selectedCompanies: string[]): boolean {
  if (selectedCompanies.length === 0) return true;
  return selectedCompanies.some((comp) => {
    const compLower = comp.toLowerCase();
    const prodCompLower = product.company.toLowerCase();
    return (
      prodCompLower === compLower ||
      product.companySlug === compLower ||
      prodCompLower.includes(compLower) ||
      compLower.includes(prodCompLower)
    );
  });
}

export function matchesFinish(product: ProductStone, selectedFinishes: string[]): boolean {
  if (selectedFinishes.length === 0) return true;
  const finishPool = [...(product.availableFinishes || []), product.finish].filter(Boolean) as string[];

  return selectedFinishes.some((fin) => {
    const def = ARCHITECTURAL_FINISHES.find((d) => d.id === fin || d.label === fin);
    if (def) {
      return finishPool.some((f) => def.test(f));
    }
    const matchingDef = ARCHITECTURAL_FINISHES.find((d) => d.test(fin));
    if (matchingDef && finishPool.some((f) => matchingDef.test(f))) {
      return true;
    }
    return finishPool.some(
      (f) => f.toLowerCase().includes(fin.toLowerCase()) || fin.toLowerCase().includes(f.toLowerCase())
    );
  });
}

export function matchesSize(product: ProductStone, selectedSizes: string[]): boolean {
  if (selectedSizes.length === 0) return true;
  const sizePool = [...(product.availableSizes || [])];

  return selectedSizes.some((sz) => {
    const def = ARCHITECTURAL_SIZES.find((d) => d.id === sz || d.label === sz);
    if (def) {
      return sizePool.some((s) => def.test(s));
    }
    return sizePool.some(
      (s) => s.toLowerCase().includes(sz.toLowerCase()) || sz.toLowerCase().includes(s.toLowerCase())
    );
  });
}

export function matchesColor(product: ProductStone, selectedColors: string[]): boolean {
  if (selectedColors.length === 0) return true;
  return selectedColors.some((col) => {
    const def = ARCHITECTURAL_COLORS.find((d) => d.id === col || d.label === col);
    if (def) {
      return def.test(product.color);
    }
    return (
      product.color.toLowerCase().includes(col.toLowerCase()) ||
      col.toLowerCase().includes(product.color.toLowerCase())
    );
  });
}

export function matchesArea(product: ProductStone, selectedAreas: string[]): boolean {
  if (selectedAreas.length === 0) return true;
  return product.area.some((a) => selectedAreas.includes(a));
}

export function matchesSearch(product: ProductStone, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  return tokens.every((token) => {
    return (
      product.name.toLowerCase().includes(token) ||
      product.description.toLowerCase().includes(token) ||
      product.color.toLowerCase().includes(token) ||
      product.finish.toLowerCase().includes(token) ||
      product.origin.toLowerCase().includes(token) ||
      product.company.toLowerCase().includes(token) ||
      (product.tagline && product.tagline.toLowerCase().includes(token)) ||
      (product.badge && product.badge.toLowerCase().includes(token)) ||
      (product.availableFinishes &&
        product.availableFinishes.some((f) => f.toLowerCase().includes(token))) ||
      (product.availableSizes &&
        product.availableSizes.some((s) => s.toLowerCase().includes(token)))
    );
  });
}

// Facet Counts Generator
export function calculateFacetCounts(products: ProductStone[]) {
  const categories: Record<string, number> = {
    all: products.length,
    slate: 0,
    applications: 0,
    limestone: 0,
    "south-indian-granite": 0,
    "north-indian-granite": 0,
    granite: 0,
    cnc: 0,
    pavers: 0,
    cladding: 0,
  };

  const companies: Record<string, number> = {};
  const finishes: Record<string, number> = {};
  const sizes: Record<string, number> = {};
  const colors: Record<string, number> = {};
  const areas: Record<string, number> = {};

  ARCHITECTURAL_FINISHES.forEach((f) => (finishes[f.id] = 0));
  ARCHITECTURAL_SIZES.forEach((s) => (sizes[s.id] = 0));
  ARCHITECTURAL_COLORS.forEach((c) => (colors[c.id] = 0));
  APPLICATION_AREAS.forEach((a) => (areas[a.id] = 0));
  QUARRY_DIVISIONS.forEach((q) => (companies[q.id] = 0));

  products.forEach((p) => {
    // Categories
    if (p.category === "slate" || p.category === "cnc") {
      categories.slate = (categories.slate || 0) + 1;
      if (p.category === "cnc") categories.cnc = (categories.cnc || 0) + 1;
    } else if (p.category === "pavers" || p.category === "cladding") {
      categories.applications = (categories.applications || 0) + 1;
      if (p.category === "pavers") categories.pavers = (categories.pavers || 0) + 1;
      if (p.category === "cladding") categories.cladding = (categories.cladding || 0) + 1;
    } else if (p.category === "limestone") {
      categories.limestone = (categories.limestone || 0) + 1;
    } else if (p.category === "granite") {
      categories.granite = (categories.granite || 0) + 1;
      const originLower = (p.origin || "").toLowerCase();
      const badgeLower = (p.badge || "").toLowerCase();
      if (
        originLower.includes("rajasthan") ||
        originLower.includes("north") ||
        badgeLower.includes("north indian")
      ) {
        categories["north-indian-granite"] = (categories["north-indian-granite"] || 0) + 1;
      } else {
        categories["south-indian-granite"] = (categories["south-indian-granite"] || 0) + 1;
      }
    }

    // Companies
    if (companies[p.company] !== undefined) {
      companies[p.company]++;
    } else {
      companies[p.company] = 1;
    }

    // Finishes (check both availableFinishes and finish)
    const productFinishList = [...(p.availableFinishes || []), p.finish].filter(Boolean) as string[];
    ARCHITECTURAL_FINISHES.forEach((f) => {
      if (productFinishList.some((item) => f.test(item))) {
        finishes[f.id] = (finishes[f.id] || 0) + 1;
      }
    });

    // Sizes
    ARCHITECTURAL_SIZES.forEach((s) => {
      if (p.availableSizes.some((item) => s.test(item))) {
        sizes[s.id] = (sizes[s.id] || 0) + 1;
      }
    });

    // Colors
    ARCHITECTURAL_COLORS.forEach((c) => {
      if (c.test(p.color)) {
        colors[c.id] = (colors[c.id] || 0) + 1;
      }
    });

    // Areas
    p.area.forEach((a) => {
      areas[a] = (areas[a] || 0) + 1;
    });
  });

  const slateVarieties: Record<string, number> = {};
  SLATE_STONE_VARIETIES.forEach((v) => {
    slateVarieties[v.id] = products.filter((p) => (p.category === "slate" || p.category === "cnc") && v.test(p)).length;
  });

  const applicationSubtypes: Record<string, number> = {};
  APPLICATION_SUBTYPES.forEach((s) => {
    applicationSubtypes[s.id] = products.filter((p) => (p.category === "pavers" || p.category === "cladding") && s.test(p)).length;
  });

  const limestoneSubtypes: Record<string, number> = {};
  LIMESTONE_SUBTYPES.forEach((l) => {
    limestoneSubtypes[l.id] = products.filter((p) => p.category === "limestone" && l.test(p)).length;
  });

  const southGraniteSubtypes: Record<string, number> = {};
  SOUTH_INDIAN_GRANITE_SUBTYPES.forEach((sg) => {
    southGraniteSubtypes[sg.id] = products.filter((p) => {
      if (p.category !== "granite") return false;
      const originLower = (p.origin || "").toLowerCase();
      const badgeLower = (p.badge || "").toLowerCase();
      const isSouth = !originLower.includes("rajasthan") && !originLower.includes("north") && !badgeLower.includes("north indian");
      return isSouth && sg.test(p);
    }).length;
  });

  const northGraniteSubtypes: Record<string, number> = {};
  NORTH_INDIAN_GRANITE_SUBTYPES.forEach((ng) => {
    northGraniteSubtypes[ng.id] = products.filter((p) => {
      if (p.category !== "granite") return false;
      const originLower = (p.origin || "").toLowerCase();
      const badgeLower = (p.badge || "").toLowerCase();
      const isNorth = originLower.includes("rajasthan") || originLower.includes("north") || badgeLower.includes("north indian");
      return isNorth && ng.test(p);
    }).length;
  });

  return {
    categories,
    companies,
    finishes,
    sizes,
    colors,
    areas,
    slateVarieties,
    applicationSubtypes,
    limestoneSubtypes,
    southGraniteSubtypes,
    northGraniteSubtypes,
  };
}

export function normalizeFinishParam(param: string): string {
  if (!param) return "";
  const decoded = decodeURIComponent(param).trim();
  const direct = ARCHITECTURAL_FINISHES.find(
    (f) => f.id.toLowerCase() === decoded.toLowerCase() || f.label.toLowerCase() === decoded.toLowerCase()
  );
  if (direct) return direct.id;
  const matched = ARCHITECTURAL_FINISHES.find((f) => f.test(decoded));
  return matched ? matched.id : decoded;
}

export function normalizeSizeParam(param: string): string {
  if (!param) return "";
  const decoded = decodeURIComponent(param).trim();
  const direct = ARCHITECTURAL_SIZES.find(
    (s) => s.id.toLowerCase() === decoded.toLowerCase() || s.label.toLowerCase() === decoded.toLowerCase()
  );
  if (direct) return direct.id;
  for (const sz of ARCHITECTURAL_SIZES) {
    if (sz.test(decoded)) return sz.id;
  }
  return decoded;
}

export function normalizeColorParam(param: string): string {
  if (!param) return "";
  const decoded = decodeURIComponent(param).trim();
  const direct = ARCHITECTURAL_COLORS.find(
    (c) => c.id.toLowerCase() === decoded.toLowerCase() || c.label.toLowerCase() === decoded.toLowerCase()
  );
  if (direct) return direct.id;
  const matched = ARCHITECTURAL_COLORS.find((c) => c.test(decoded));
  return matched ? matched.id : decoded;
}
