# 🏛️ PAVAN STONES GROUP — Global Natural Stone Exporter

> **"Delivering Natural Elegance Worldwide"**  
> Direct Quarry Extraction, Processing & International Export to Australia, USA & Global Architectural Markets.  
> Headquarters: **Markapur, Andhra Pradesh, India**

---

## 🎨 Design System & Color Palette

The digital experience is built upon a **Luminous Architectural Stone Palette**, combining warm natural quarry cream backdrops with deep ink typography and energetic coral/amber accents:

| Token Name | Hex Code | Visual Swatch & Role |
| :--- | :--- | :--- |
| **`Cream (Base Canvas)`** | `#fcf8f1` | Primary light luxury background across the entire web application |
| **`Sand Pure`** | `#ffffff` | Elevated component cards, interactive selectors & modal surfaces |
| **`Sand Accent`** | `#f2ece2` / `#faf5ec` | Secondary callout boxes, table row alternates & caliper canvas |
| **`Deep Ink`** | `#140d0a` | Primary architectural typography, high-contrast headings & dark badges |
| **`Primary Coral`** | `#ff443a` | Vibrant call-to-action buttons, active navigation pins & pulsating radar |
| **`Rose Coral`** | `#ff6e8f` | Limestone highlights & secondary ocean sealane trajectories |
| **`Amber Gold`** | `#d97706` | Granite dossier badges & luxury material rating highlights |

### 🔤 Typography & Proportions
- **Display Headings**: `Cormorant Garamond` (Editorial serif with optical sizing, italic styling, and luxury character kerning).
- **Body & Metrics**: `DM Sans` (Precision Swiss geometric sans for technical specifications, data tables, and metrics).
- **Technical Dossiers**: `Monospace` (For container specs, Incoterms, transit times, and ISO calibration numbers).

---

## ⚡ Smoothness, Kinetic Physics & Inertia Engine

The application delivers an ultra-smooth, native-feeling scroll experience engineered through a layered kinetic architecture:

```
┌────────────────────────────────────────────────────────┐
│                   USER INPUT (Wheel / Touch)           │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             LENIS SCROLL INTERTIA ENGINE               │
│   • Duration: 1.2s                                     │
│   • Easing: 1.001 - Math.pow(2, -10 * t)               │
│   • Smooth Touch Multiplier: 1.7x                      │
│   • Custom RequestAnimationFrame Loop                  │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│     GSAP & FRAMER MOTION  │ │     BROWSER CSS ENGINE    │
│ • ClearProps: "transform" │ │ • overflow-x: clip        │
│ • Staggered Spring Physics│ │ • position: sticky        │
│ • Zero Stacking Clashes   │ │ • Zero Viewport Trapping  │
└───────────────────────────┘ └───────────────────────────┘
```

### 1. **Lenis Momentum Scroll (`components/SmoothScroll.tsx`)**
- Powered by `lenis` (v1.1.14), configuring an exponential dampening curve (`t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`).
- Provides buttery inertial momentum for desktop trackpads, mousewheels, and mobile touch events.

### 2. **Anchor Navigation with Kinetic Easing**
- Custom `scrollToHash` utility intercepting all internal anchor clicks (`#products`, `#guide`, `#shipping`, `#contact`).
- Applies a 4th-order polynomial ease-out curve (`1 - Math.pow(1 - t, 4)`) over `1.6s` with an automatic `-80px` fixed navbar offset.

### 3. **Viewport Optimization (`overflow-x: clip` vs `overflow-x: hidden`)**
- Standard `overflow-x: hidden` creates secondary scroll containers that break viewport `position: sticky`.
- Resolved globally using `overflow-x: clip` in [`app/globals.css`](file:///Users/praneeth/Desktop/Pavan-Groups/app/globals.css), ensuring sticky sidebars float smoothly without escaping their parent section boundaries.

### 4. **GSAP Transform Cleanups (`components/PageTransition.tsx`)**
- GSAP entrance animations automatically execute `clearProps: "transform"` on completion. This prevents descendant elements from being trapped in local coordinate stacking contexts.

---

## 🏗️ Architecture & Component Walkthrough

```
Pavan-Groups/
├── app/
│   ├── layout.tsx              # Root HTML wrapper with ClientLayout & font definitions
│   ├── page.tsx                # Single-page assembled homepage
│   └── globals.css             # Tailwind tokens, Leaflet CSS & typography imports
├── components/
│   ├── Preloader.tsx           # Intro stroked-text percentage counter
│   ├── Navigation.tsx          # Fixed floating glassmorphism navbar & mobile menu
│   ├── Hero.tsx                # Section 1: Hero presentation & video reel modal
│   ├── Marquee.tsx             # Continuous stone texture marquee ticker
│   ├── Products.tsx            # Section 2: 3-Division catalog with sticky float navigation
│   ├── BeginnersGuide.tsx      # Section 3: Interactive stone studio, caliper & comparisons
│   ├── ShippingAustralia.tsx   # Section 4: 8-Step pipeline, live map, cost studio & Incoterms
│   ├── RealInteractiveMap.tsx  # Dynamic Leaflet map with CartoDB Voyager tiles & GPS ports
│   ├── Stats.tsx               # Scale and trust metrics counter
│   ├── Projects.tsx            # Global architectural portfolio showcase
│   ├── Process.tsx             # 4-Stage direct extraction to delivery workflow
│   ├── Testimonials.tsx        # Australian client case studies & reviews
│   ├── CTA.tsx                 # Final conversion banner & contact drawer
│   ├── Footer.tsx              # Corporate legal info & quarry address
│   ├── Cursor.tsx              # Custom interactive magnetic cursor
│   └── SmoothScroll.tsx        # Global Lenis momentum scroll provider
```

---

## 🧭 Detailed Section Breakdown

### 🌟 Intro Preloader (`components/Preloader.tsx`)
- Animated stroked-text percentage counter (`00%` &rarr; `100%`) with responsive `clamp()` typography to prevent mobile text overlap.
- Smooth exit curtain animation revealing the hero viewport.

### 🏛️ Section 1 — Hero Experience (`components/Hero.tsx`)
- **Headline**: *"Direct From Indian Quarries to Australian Projects."*
- **Interactive Reel**: Modal video player featuring quarry extraction footage.
- **Trust Badges**: ISO 9001 Certified, ISPM-15 Crating, Direct Factory Export.

### 📦 Section 2 — 3 Company Divisions (`components/Products.tsx`)
- **2A. Pavan Impex Natural Stone Exports (Slate & Wall Cladding)**:
  - *Products*: Black Slate Stone, Indian Autumn Slate, California Gold Slate, Black Slate Mosaic.
  - *Thicknesses*: `12mm | 15mm | 18mm | 20mm` · *Sizes*: `1x1 ft | 2x1 ft | 2x2 ft | 2x4 ft | Random | Ledgers`.
- **2B. Sai Balaji Impex (Limestone Products)**:
  - *Products*: Cuddapah Black, Lime Yellow, Lime Blue, Limestone Pavers, Stepping Stones.
  - *Thicknesses*: `15mm | 18mm | 20mm | 25mm` · *Sizes*: `1x1 ft | 2x1 ft | 2x2 ft | Pavers | Steps | Custom`.
- **2C. Pavan Granite (Premium Monolithic Granite)**:
  - *Products*: Black Galaxy Granite.
  - *Thicknesses*: `16mm | 18mm | 20mm | 30mm` · *Sizes*: `8x3 ft Slabs | 9x4 ft Slabs | 1x1 ft | 2x2 ft | Custom`.
- **Kinetic Float Navigation**: 3 company selectors stick and float smoothly within Section 2's column container.

### 🔬 Section 3 — Beginner's Guide to Natural Stone (`components/BeginnersGuide.tsx`)
- **Tab 01 · Stone Types (Comparison Matrix & Performance Gauges)**:
  - Quick-Match Use-Case Recommender (`🏊 Pools`, `🍳 Kitchens`, `🏛️ Walls`, `🚗 Driveways`, `🌿 Gardens`).
  - Animated Mohs Hardness, Anti-Skid Traction, and Heat Coolness progress bars.
  - Expandable Geological Deep-Dive Report with origin formation, Australian climate resistance, and pro installation tips.
  - Collapsible Architectural Project Showcase photo frame that hides when report expands and reappears when collapsed.
- **Tab 02 · Thickness & Sizes (Interactive Caliper Studio)**:
  - Live interactive caliper buttons (`12mm`, `18mm`, `20mm`, `30mm`) with physical spring-animated cross-section slab blocks.
  - 5 Standard Size format canvases (`1x1 Tile`, `2x2 Grid`, `8x3 Jumbo Slab`, `Random Freeform`, `3D Ledgers`).
- **Tab 03 · Stone vs. Ceramic Tiles (Material Benchmark)**:
  - 7 Value Pillar Cards with custom architectural vector SVG icons comparing Natural Stone vs Ceramic Glaze.

### 🚢 Section 4 — Shipping to Australia (`components/ShippingAustralia.tsx`)
- **Phase 1 · The 8-Step Journey Pipeline**:
  - `Order Confirmed (Day 0)` &rarr; `Production (3-10d)` &rarr; `Packing (1-2d)` &rarr; `Inland Transport (1-2d)` &rarr; `Port Loading (2-5d)` &rarr; `Sea Freight (12-25d)` &rarr; `Aus Port (3-7d)` &rarr; `Local Delivery (1-3d)`. Total: **`30–45 Days Typical`**.
- **Phase 2 · Real Interactive Geographic Web Map (`components/RealInteractiveMap.tsx`)**:
  - Live Leaflet map with **CartoDB Voyager** luxury architectural tiles.
  - Real GPS Coordinates & Popups for **Chennai (`13.0827° N`)**, **Perth (`AUFRE`)**, **Sydney (`AUSYD`)**, **Melbourne (`AUMEL`)**, and **Brisbane (`AUBNE`)**.
  - Dynamic camera `flyToBounds()` transitions and real Indian Ocean geodesic sealanes.
- **Phase 3 · Landed Cost Breakdown & Live Client Studio**:
  - 9-Pillar itemized fee schedule (FOB Material, Inland Trucking, Sea Freight, Marine Insurance, Port THC, DAFF Biosecurity, Customs Duty 0%, 10% GST, Local Delivery).
  - Interactive Landed Cost Studio with Stone Specimen Selector, Australian Port Selector, Area Volume Slider (`50–2,000 m²`), and dynamic 4-segment investment progress bar in AUD.
- **Phase 4 · International Trade Incoterms**:
  - Interactive comparison cards for **FOB (Free On Board)**, **CIF (Cost Insurance Freight)**, and **DDP (Delivered Duty Paid - Turnkey)**.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.3 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Smooth Inertia Scrolling**: [Lenis (v1.1.14)](https://github.com/darkroomengineering/lenis)
- **Kinetic Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP 3](https://gsap.com/)
- **Interactive Mapping Engine**: [Leaflet](https://leafletjs.com/) with [CartoDB Voyager Tiles](https://carto.com/basemaps/)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and **npm** installed.

### 2. Installation
```bash
git clone <repository-url>
cd Pavan-Groups
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to explore the web application.

### 4. Production Build & Validation
```bash
# Verify TypeScript types
npx tsc --noEmit --incremental false

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📄 License & Ownership
Copyright © 2026 **Pavan Stones Group**. All Rights Reserved.  
Markapur, Andhra Pradesh, India. Contact: `+91 9246462600`.
