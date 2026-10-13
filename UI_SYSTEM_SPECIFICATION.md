# Pavan Stones Group — UI Architecture, Design System & Animation Specification

> **Purpose:** This document is the definitive master specification of the entire visual architecture, animation choreography, design tokens, layout math, component hierarchy, and interaction flows for the Pavan Stones Group application.
> **Rule for Future Updates:** When implementing new features, backend integrations, APIs, or content changes, **ALL visual contracts, z-index hierarchies, scroll offsets, animation choreographies, and layout constraints documented herein MUST remain uncompromised.**

---

## Table of Contents

1. [System Architecture & Runtime Stack](#1-system-architecture--runtime-stack)
2. [Global Design System & Token Dictionary](#2-global-design-system--token-dictionary)
3. [Master Z-Index & Layering Hierarchy](#3-master-z-index--layering-hierarchy)
4. [Global Layout Shell & Viewport Management](#4-global-layout-shell--viewport-management)
5. [Animation Engine & Interaction Choreography](#5-animation-engine--interaction-choreography)
6. [Page-by-Page Anatomy & UI Invariants](#6-page-by-page-anatomy--ui-invariants)
7. [Core Interactive Modules & Widget Specs](#7-core-interactive-modules--widget-specs)
8. [Data Contracts, Routing & URL State](#8-data-contracts-routing--url-state)
9. [Strict UI Guardrails for Future Feature Updates](#9-strict-ui-guardrails-for-future-feature-updates)

---

## 1. System Architecture & Runtime Stack

### 1.1 Core Technologies
| Layer | Technology | Version / Configuration | Role |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `^16.3.2` (Webpack mode) | Server & Client Components, Route Handlers |
| **UI Library** | React | `^19.0.0` | Component lifecycle, hooks, state |
| **Styling** | Tailwind CSS + Vanilla CSS | `^3.4.17` | Utility-first styling + custom CSS keyframes |
| **Smooth Scroll** | Lenis | `^1.1.14` | Smooth inertial scroll engine |
| **Animations (Physics)** | Framer Motion | `^11.11.11` | Spring physics, LayoutGroup, MotionValues, Stagger |
| **Animations (Timeline)** | GSAP | `^3.12.5` | Navbar hide/reveal, mobile drawer stagger |
| **Mapping & GIS** | Leaflet + D3.js | Leaflet `^1.9.4`, D3 `^7.9.0` | 2D world map, ocean routes, port markers |
| **Iconography** | `lucide-react` & `@animateicons/react` | Standard Lucide icons + animated vector icons |

### 1.2 Layout Wrapping Architecture
Every page in the application inherits the following exact structural hierarchy in [`app/layout.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/layout.tsx) and [`components/ClientLayout.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/ClientLayout.tsx):

```
RootLayout (html, body)
 └── ClientLayout
      ├── Preloader (Fixed full-screen z-[99999] - Runs on first tab load)
      ├── div.grain (Fixed full-screen z-[9999] noise overlay)
      └── SmoothScroll (Lenis scroll wrapper + anchor click interceptor)
           ├── Navigation (Fixed top z-[80] navbar + z-[75] mobile drawer)
           ├── PageTransition (main.min-h-screen)
           │    └── {Children / Active Route Page}
           └── Footer (Relative z-20 with parallax pull-out banner)
```

---

## 2. Global Design System & Token Dictionary

### 2.1 Color Palette ("Luminous Natural Stone")

The design system is grounded in organic earth, metamorphic slate, igneous obsidian, and warm coral tones:

#### Primary & Backgrounds
* **Canvas Pure White:** `#ffffff` (`--white-pure`)
* **Canvas Soft Slate:** `#f8fafc` (`--white`) — Root body background
* **Canvas Off-White Warm:** `#fcf8f1` (`cream`)
* **Sand Neutral:** `#f2ece2` (`--sand`) / `#e8dfd3` (`--sand-dark`) / `#faf5ec` (`--sand-light`)

#### Typography & Ink Colors
* **Primary Deep Ink:** `#241919` / `#140d0a` (`--ink`, `--stone-dark`) — Headlines, dominant text
* **Secondary Slate Body:** `#454545` (`--ink-secondary`, `--stone-body`) — Paragraphs & descriptions
* **Muted Editorial:** `#747474` (`--ink-muted`, `--stone-muted`) — Subtitles, borders, metadata
* **Earth Brown:** `#3e352a` (`--stone-earth`)
* **Olive Stone:** `#514a38` (`--stone-olive`)

#### Brand Accents & Call-to-Actions
* **Primary Coral / Terracotta:** `#c85a32` (`--coral`) — Primary brand highlight, hover states
* **Vibrant Accent Orange:** `#ff5500` / `#ea580c` — Active navigation indicators, primary buttons
* **Deep Coral Hover:** `#a84a27` (`--coral-hover`)
* **Coral Soft Alpha:** `rgba(255, 68, 58, 0.08)`
* **Coral Border Alpha:** `rgba(255, 68, 58, 0.25)`

#### Division Identity Palettes
Each of the four conglomerate divisions possesses a dedicated accent theme:
1. **Pavan Impex (Slate & Cladding):**
   * Accent: `#9a3412` / `#ea580c`
   * Button: `#241008` (Dark Umber) with `#fdba74` text and `#c2410c` border
2. **Sai Balaji Impex (Limestone & Pavers):**
   * Accent: `#b45309` / `#fbbf24`
   * Button: `#2b2118` (Warm Sandstone) with `#fbbf24` text and `#d97706` border
3. **Pavan Granite (Black Galaxy Granite):**
   * Accent: `#0f766e` / `#2dd4bf`
   * Button: `#042f2e` (Deep Teal Obsidian) with `#5eead4` text and `#0f766e` border
4. **Pavan Stones World (Exotic Quartzite & Marble):**
   * Accent: `#722424` / `#f87171`
   * Button: `#241919` (Imperial Wine) with `#f87171` text and `#722424` border

### 2.2 Typography Hierarchy

Fonts are loaded from Google Fonts in [`app/globals.css`](file:///Users/praneeth/Desktop/Pavan-Groups/app/globals.css):
* **Display / Editorial Serifs:** `'Cormorant Garamond'`, Georgia, serif
  * *Weights:* 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold)
  * *Usage:* Hero titles, Section headings (`h1`, `h2`, `h3`), large numbers, company names
* **Sans / Body Copy:** `'DM Sans'`, system-ui, -apple-system, sans-serif
  * *Weights:* 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold)
  * *Usage:* Narrative paragraphs, button labels, UI elements, data tables
* **Technical / Monospace:** `ui-monospace`, 'SF Mono', 'Courier New', monospace
  * *Usage:* Metric labels, timestamps, coordinates, facet counts, badge IDs

#### Scale & Letter-Spacing Rules
* **Hero Super-Titles:** `clamp(34px, 6vw, 76px)` with `tracking-[0.16em]` to `tracking-[0.24em]` uppercase.
* **Section Headers (`h2`):** `clamp(32px, 4.5vw, 64px)` with `tracking-[-0.015em]`.
* **Sub-Headings (`h3`):** `clamp(22px, 3vw, 36px)` with `font-normal` or `font-light`.
* **Category / Tracking Eyebrows:** `text-[9.5px]` to `text-[11px]` with `tracking-[0.24em]` to `tracking-[0.4em]` uppercase `font-mono font-bold`.
* **Body Text:** `text-[13.5px]` to `text-[15.5px]` with `leading-[1.7]` to `leading-[1.8]` and `font-light`.

---

## 3. Master Z-Index & Layering Hierarchy

To avoid visual stacking bugs or overlapping modal issues, all components MUST respect this explicit z-index ladder:

| Z-Index Value | Component / Layer | Purpose / Behavior |
| :--- | :--- | :--- |
| `z-[99999]` | **Preloader** ([`Preloader.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Preloader.tsx)) | Covers entire viewport during initial 0-100% asset boot |
| `z-[9999]` | **Grain Texture Overlay** (`.grain`) | Fixed full-screen SVG noise overlay with step animation |
| `z-[90]` | **Lightboxes / Image Zoom Modals** | High-priority modal dialogs & full-screen inspections |
| `z-[80]` | **Navbar** ([`Navigation.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Navigation.tsx)) | Fixed 72px frosted glass header with smart scroll visibility |
| `z-[75]` | **Mobile Drawer Menu** | Full-screen blurred mobile navigation drawer |
| `z-[60]` | **Sticky Floating Docks & Toolbars** | Bottom quote dock in product pages, interactive filters |
| `z-[40]` | **Travelling Orbital Stamp Badge** | Smooth spring-driven floating badge in [`Products.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Products.tsx) |
| `z-[30]` | **Stacking Card 3 (Pavan Granite & Stones World)** | Highest sticky card in the stack (`top: 120px`) |
| `z-[20]` | **Stacking Card 2 (Sai Balaji Impex)** | Middle sticky card in the stack (`top: 102px`) |
| `z-[10]` | **Stacking Card 1 (Pavan Impex)** | First sticky card in the stack (`top: 84px`) |
| `z-10` | **Page Content Sections** | Standard sections rolling over the sticky hero curtain |
| `z-0` | **Sticky Parallax Hero** ([`Hero.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Hero.tsx)) | Sits under page content; gets covered on scroll |

---

## 4. Global Layout Shell & Viewport Management

### 4.1 Fixed Navigation Geometry
* **Navbar Height:** Exactly `72px` (`h-[72px]`).
* **Anchor Scroll Offset:** `NAV_OFFSET = -80` (Lenis and native scroll stop precisely 80px above section anchors to prevent titles being obscured by the fixed navbar).
* **Backdrop Filter:** `blur(20px)` with `rgba(255, 255, 255, 0.8)` on top of page, changing to `rgba(255, 255, 255, 0.96)` and bottom border `rgba(20, 13, 10, 0.08)` once scrolled (`stuck > 40px`).

### 4.2 Maximum Container Widths
* **Standard Page Container:** `max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16` (1280px).
* **Editorial & Narrow Hero Containers:** `max-w-4xl` to `max-w-5xl mx-auto`.
* **Elevated Parallax Banner:** `max-w-6xl mx-auto`.
* **Full-Width Hero / Grids:** `w-full max-w-[1400px]`.

### 4.3 Background Noise Overlay (`.grain`)
* **Geometry:** `position: fixed; inset: -40%; width: 180%; height: 180%;`
* **Texture:** Fractal noise SVG (`feTurbulence baseFrequency='0.75' numOctaves='4'`).
* **Blending:** `opacity: 0.02; mix-blend-mode: multiply; pointer-events: none;`
* **Animation:** `grain 8s steps(1) infinite;` (10-frame random matrix shifts).

---

## 5. Animation Engine & Interaction Choreography

### 5.1 Lenis Smooth Scroll Engine ([`SmoothScroll.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/SmoothScroll.tsx))
* **Configuration:**
  * `duration: 1.2s`
  * `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` (Exponential ease-out)
  * `wheelMultiplier: 1.0`
  * `touchMultiplier: 1.7`
* **Anchor Click Interception:**
  * Catches all `<a>` tags with `href="#..."` or `href="/#..."`.
  * Computes smooth arrival using Quartic Ease-Out `1 - Math.pow(1 - t, 4)` over 1.6 seconds.
  * Synchronizes browser URL hash with `window.history.replaceState`.
* **Route Transition Retries:**
  * When navigating between pages with a hash (e.g. from `/about` to `/#contact`), polls up to 70 animation frames (with a 200ms initial debounce) to guarantee the DOM is hydrated before scrolling.

### 5.2 Preloader Choreography ([`Preloader.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Preloader.tsx))
1. **Increment Phase (0% → 100%):**
   * Ticks every 45ms with random natural increments `+3.2% to +8.2%`.
   * Stroked outline text (`-webkit-text-stroke: 1.2px rgba(252,248,241,0.85)`).
   * Left-to-right fill overlay clipped to `${pct}%` with amber-to-copper gradient (`#8b4513` → `#c85a32` → `#d8c3a5`).
   * Diamond sparkle glyph `✦` tracks the leading edge with drop shadow and pulse.
2. **Completion & Exit (100%):**
   * Delays 350ms upon reaching 100%.
   * Slides up `translateY(-100%)` with Cubic Bezier `(0.76, 0, 0.24, 1)` over 600ms.
   * Caches completion in `sessionStorage.setItem("pavan_preloader_shown", "true")` so subsequent page loads in the same tab skip directly without delay.
   * Debug bypass parameter supported: `?preloader=true` forces preloader replay.

### 5.3 Hero Choreography & Parallax Curtain ([`Hero.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Hero.tsx))
* **Autoplay Video Layer:** [`/assets/webpage_front_display_video.mp4`](file:///Users/praneeth/Desktop/Pavan-Groups/public/assets/webpage_front_display_video.mp4) with muted inline loop and dark vignette overlay.
* **4-Phase Synchronized Reveal Timeline:**
  * **Phase 1 (`laser`, 0ms → 500ms):** Horizontal central white laser filament ray expands (`scaleX: 0 → 1`, `opacity: 1`).
  * **Phase 2 (`split`, 500ms → 1300ms):** Top typography half rises (`y: 40% → 0%`, `clipPath: inset(0 0 50% 0)`) while bottom half lowers (`y: -40% → 0%`, `clipPath: inset(50% 0 0 0)`).
  * **Phase 3 (`locked`, 1300ms → 1700ms):** The two halves fuse seamlessly into a single unbroken line; clip paths are removed.
  * **Phase 4 (`glow`, 1700ms+):** Activates continuous `whiteNeonPulse` keyframes (3.5s alternate) and `liquidPrismSweep` (7s linear gradient position shift).
* **Parallax Stacking Behavior:**
  * `Hero` has `sticky top-0 z-0`.
  * Following sections (`Products` onwards) have `relative z-10` with `bg-white` and `shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)]`, sliding up over the Hero like an architectural curtain.

### 5.4 Travelling Orbital Stamp Badge Physics ([`Products.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Products.tsx))
* **Spring Dynamics:**
  * Coordinates: `springX`, `springY` with `stiffness: 280, damping: 60, mass: 0.15` (critically overdamped for zero overshoot/bounce).
  * Rotation & Scale: `stiffness: 55, damping: 30, mass: 0.6`.
* **4 Trajectory Stations:**
  1. **Station 1 (Heritage):** Anchored to the right-center seam of the About facility image.
  2. **Station 2 (Pavan Impex):** Glides smoothly to the right-top corner of Card 0.
  3. **Station 3 (Sai Balaji Impex):** Traverses diagonally across to the left-top corner of Card 1.
  4. **Station 4 (Pavan Granite & Stones World):** Centers perfectly at the middle seam between the two sister company columns.
* **Color & Glow Morphing:**
  * Ring SVG stroke morphs smoothly: `#9a3412` (Impex) → `#b45309` (Balaji) → `#0f766e` (Granite) → `#722424` (Stones World).
  * Center disc: 360° rotating circular text ring (`22s linear infinite`) + counter-rotating dashed ring (`32s linear infinite`) + glassmorphic core disc.

### 5.5 Stacking Card Architecture ([`Products.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Products.tsx))
* **Card 0 (Pavan Impex):** `sticky top-[84px] z-10` (Border: 2px `#ea580c`).
* **Card 1 (Sai Balaji Impex):** `sticky top-[102px] z-20` (Border: 2px `#ea580c`, layout flipped left-to-right).
* **Card 2 (Pavan Granite & Pavan Stones World):** `sticky top-[120px] z-30` (Dual column with architectural bracket borders `]` for Granite and `[` for Stones World).
* As the user scrolls, each card locks in place 18px below the previous one, creating a layered deck of cards.

### 5.6 Navbar Smart Hide/Reveal ([`Navigation.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Navigation.tsx))
* **Scroll Down (> 10px delta):** GSAP animates `nav` to `y: "-100%"` over 0.45s with `power2.inOut`.
* **Scroll Up (> 5px delta):** GSAP animates `nav` to `y: 0` over 0.35s with `power2.out`.
* **Top of Page (< 80px):** Always locked at `y: 0`.
* **Active Indicator:** Framer Motion `LayoutGroup` (`navbar-flow-underline`) slides an orange gradient bar under the active or hovered navigation link using spring `stiffness: 350, damping: 28`.

---

## 6. Page-by-Page Anatomy & UI Invariants

### 6.1 Homepage ([`app/page.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/page.tsx))
1. **Sticky Parallax Hero Wrapper (`relative`):**
   * `<Hero />` (`sticky top-0 z-0`)
   * `<Products />` (`relative z-10 bg-white` with About Split section + Stacking cards + Travelling Badge)
2. **`<BrowseTilesBy />` (`relative z-40 bg-white`):**
   * Expanding monolithic slab accordion (6 stone categories).
   * Hover expands active panel to `flex-[3.5]` / `flex-[4]`, collapsing others to `flex-1` with vertical rotated labels.
3. **`<ElegantDiscovery />` (`relative z-10 bg-white`):**
   * Asymmetric 7-cell Bento masonry grid with central typography card and image hover zooms.
4. **`<WhyChooseUs />` (`relative z-30 bg-white`):**
   * Sticky left trust assurance card (`top-28`) + 8 interactive expandable accordion FAQs on the right.
5. **`<Footer />` (`relative z-20 bg-white`):**
   * Floating 24-hour quote card sliding out from under FAQ on scroll via `useScroll` parallax.
   * Telemetry hub, live IST / AEST timezone clocks, global export links.

### 6.2 About Page ([`app/about/page.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/about/page.tsx))
* **Interactive Geological Map & Timeline:** 5 milestone eras (2000 Genesis → 2003 Deccan → 2012 Processing Hub → 2019 Eco Protocol → Present Global).
* **Quarry Concessions Explorer:** Interactive cards for North Basin (Rajasthan), Deccan Pluton (Karnataka), and Andhra Reserves with mineral assays.
* **Processing Infrastructure Monograph:** 9 plants, Italian gang saws, 5-axis CNC metrics.
* **Sustainability & ESG:** Closed-loop 88% water recycling telemetry.

### 6.3 Products Catalog & Multi-Facet Filter Engine ([`app/products/page.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/products/page.tsx))
* **Live Dynamic Facets:** Calculates realtime product counts across 10 filter dimensions:
  1. *Category* (Slate Stone, Applications, Limestones, South Indian Granite, North Indian Granite, Pavers)
  2. *Slate Varieties* (Autumn Rustic, Black Slate, California Gold, Copper Slate, etc.)
  3. *Application Subtypes* (3D Ledger Panels, Wall Cladding, Monolithic Slabs, etc.)
  4. *Limestone Subtypes* (Cuddapah Black, Lime Yellow, Lime Blue, Kota, etc.)
  5. *Granite Subtypes* (Black Galaxy, Steel Grey, Absolute Black, Tan Brown, etc.)
  6. *Company Division* (Pavan Impex, Sai Balaji Impex, Pavan Granite, Pavan Stones World)
  7. *Architectural Finish* (Mirror Polish, Honed Matte, Flamed, Leathered, Natural Cleft, Tumbled, 3D Relief)
  8. *Thickness / Size* (12mm, 15mm, 18mm, 20mm, 30mm, 300x300, 600x300, 600x600, Gangsaw Slabs)
  9. *Color Palette* (Black, Grey, Gold, Brown, Beige, Green, Multicolour)
  10. *Application Area* (Exterior Facades, High-Traffic Flooring, Kitchen Countertops, Swimming Pools)
* **Product Card UI:** [`ProductCardImage.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/ProductCardImage.tsx) handles image fallback, aspect ratio preservation, finish badges, origin tags, and quick-view modals.

### 6.4 Product Detail View ([`app/products/[id]/page.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/products/%5Bid%5D/page.tsx))
* **3D Mouse Tilt Hero:** Interactive spring tilt on mouse move (`rotateX: ±12°`, `rotateY: ±12°`).
* **Interactive Finish Selector:** Dynamic preview swapping between Polished, Honed, Leathered, Flamed, and Natural Cleft.
* **Interactive 3D Room Visualizer:** [`ProductSceneVisualizer.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/ProductSceneVisualizer.tsx) renders the stone on 5 realistic architectural settings (Kitchen Island, Living Floor, Exterior Facade, Bathroom Vanity, Pool Deck).
* **360° Texture Rotator:** [`StoneTextureRotator.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/StoneTextureRotator.tsx) with mouse drag light reflection simulation.
* **Container Weight & FCL Calculator:** [`ProductContainerCalculator.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/ProductContainerCalculator.tsx) computes weight vs square meter limits for 20ft FCL (up to 27 MT max payload).
* **Sticky Glass Bottom Dock:** Appears after 600px scroll with Quick Spec, Sample Request, and Direct WhatsApp/Call actions.

### 6.5 Export & Global Logistics ([`app/export/page.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/export/page.tsx))
* **Packaging Engineering Breakdown:** Gangsaw A-frames, ISPM-15 fumigated hardwood crates, EPE foam custom moldings.
* **5-Step Container Stuffing Protocol:** Pre-inspection → Weight Centering → Timber Chocking → Dunnage Bags → Bolt Sealing.
* **Ocean Freight Telemetry:** Direct routes from Chennai (INMAA), Krishnapatnam (INKRI), and Vizag (INVTZ) to 40+ global destinations.
* **Interactive Landed Freight Calculator:** [`ShippingAustralia.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/ShippingAustralia.tsx).

### 6.6 Dedicated Company Profile Pages ([`app/companies/[slug]/page.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/app/companies/pavan-granite/page.tsx))
* **SVG Stroke Signature Title:** Outline SVG morphs into solid white on load.
* **Section Overlay Mechanism:** White content container covers the hero background on scroll.
* **Editorial Monograph:** [`CompanyEditorialShowcase.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/CompanyEditorialShowcase.tsx).
* **Dimensional Matrix:** [`DimensionalMatrix.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/DimensionalMatrix.tsx) (Metric vs Imperial specs, ASTM physical tests, crate capacities).

---

## 7. Core Interactive Modules & Widget Specs

### 7.1 Real-Time Container Payload Calculator
* **Formula:** `Total Weight (MT) = (Area (m²) × Thickness (mm) × Density (kg/m³)) / 1000`
* **Limits:** 20ft General Purpose FCL Payload capped strictly at `27.0 MT` / `28.0 MT`.
* **UI Feedback:** Progress bar turns amber above 85% and red above 100% with crate count estimations.

### 7.2 Interactive GIS World Map ([`RealInteractiveMap.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/RealInteractiveMap.tsx) & [`Map2D.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Map2D.tsx))
* **Dispatch Ports:** Chennai (INMAA), Krishnapatnam, Vizag.
* **Destination Hubs:** USNYC (New York), USLAX (Los Angeles), AUSYD (Sydney), AUMEL (Melbourne), NLRTM (Rotterdam), DEHAM (Hamburg), GBDVR (Felixstowe), AEJEA (Jebel Ali).
* **Interactive Tooltips:** Show average sailing days, container lines (Maersk, MSC, CMA CGM), transit insurance indices, and customs documentation checklist.

### 7.3 Multi-Step Sample Request Desk ([`SampleRequest.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/SampleRequest.tsx))
* **Step 1:** Select up to 3 stone varieties from the live database.
* **Step 2:** Select thickness (15mm / 20mm / 30mm) and architectural finish.
* **Step 3:** Enter recipient architectural firm details and DHL/FedEx courier account for priority dispatch.

---

## 8. Data Contracts, Routing & URL State

### 8.1 URL Query Parameter Conventions
All catalog and detail pages synchronize filter and UI state with the browser URL:
* `?company=pavan-granite` — Pre-filters products by company division.
* `?stone=slate` / `?category=limestone` — Activates category filter.
* `?finish=Mirror+Polish` — Normalizes and selects architectural finish.
* `?size=Gangsaw+Slabs` — Normalizes and selects dimensional spec.
* `?search=galaxy` — Live keyword query string.
* `?preloader=true` — Forces intro preloader to replay.

### 8.2 Image Asset Conventions
* **Local Assets:** Loaded via `getAssetPath("/assets/...")` to support base path flexibility.
* **Unsplash / Remote Assets:** Standardized with `auto=format&fit=crop&q=80` parameters and explicit responsive widths (`w=800`, `w=1200`, `w=1600`).
* **Fallback Handling:** All `<img />` components implement `onError` fallbacks to default stone textures to prevent broken image icons.

---

## 9. Strict UI Guardrails for Future Feature Updates

When writing any new code or modifying existing files, follow these strict guardrails:

### Guardrail 1: Icon Import Integrity
* **Rule:** Do NOT import icons from `@animateicons/react/lucide` unless verified that the icon exists in that specific package.
* **Standard:** Default to standard `lucide-react` (e.g. `import { Award, Microscope, CheckCircle2, ShieldCheck, Truck } from "lucide-react";`).

### Guardrail 2: Z-Index & Sticky Stacking Preservation
* Never alter the `top` offsets or `z-index` numbers of the stacking cards in [`Products.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/Products.tsx) (`top: 84px` [z-10], `top: 102px` [z-20], `top: 120px` [z-30]).
* Never remove the `overflow-x: clip` or `overflow-hidden` constraints from sticky parent sections, as doing so breaks CSS sticky positioning.

### Guardrail 3: Fixed Navbar Offset Coordination
* All internal page anchors (`#about`, `#products`, `#contact`, `#shipping`, etc.) must maintain `NAV_OFFSET = -80` in [`SmoothScroll.tsx`](file:///Users/praneeth/Desktop/Pavan-Groups/components/SmoothScroll.tsx) to prevent target headings from landing behind the 72px navbar.

### Guardrail 4: Color Palette Consistency
* Do NOT introduce generic bright HTML colors (`#ff0000`, `#00ff00`, `#0000ff`).
* Use the exact Luminous Stone tokens (`#c85a32`, `#ff5500`, `#241919`, `#454545`, `#747474`, `#f8fafc`, `#ffffff`).

### Guardrail 5: Typography Family Discipline
* All large headings and editorial quotes MUST use `font-display` (`Cormorant Garamond`).
* All paragraphs, buttons, and UI components MUST use `font-sans` (`DM Sans`).
### Guardrail 6: Client vs Server Boundary Rules
* Any component using Framer Motion, GSAP, Lenis, Leaflet, `useState`, `useEffect`, or `useSearchParams` MUST include the `"use client";` directive at line 1.
* Any page utilizing `useSearchParams` must be wrapped in a `<Suspense fallback={...}>` boundary to maintain Next.js SSR build validity.

### Guardrail 7: Cross-Device Responsiveness & Invariants
* **Mobile (< 768px):** Viewport-aware navigation drawer (`calc(100dvh - 72px)`), $\ge 44\text{px}$ touch targets, and `overflow-x: clip;` on `html` and `body`.
* **Tablet (768px – 1023px, `md:`):** 3-column product catalog, centered max-w-md drawer with quick quote button, 480px interactive 2D maritime map, and balanced dual-bracket gaps (`md:gap-12`).
* **Desktop (≥ 1024px, `lg:`, `xl:`):** 100% preserved sticky parallax coordinates (`top: 84px, 102px, 120px`), expanding horizontal slabs accordion (`h-[560px]`), and 78%/22% maritime split.
* **Single Horizontal Line Invariant:** Brand headings such as `PAVAN STONES GROUP` in editorial titles must enforce `whitespace-nowrap` paired with fluid typography clamps (`clamp(20px, 4.2vw, 64px)`) to guarantee single horizontal line alignment on all screen sizes.

---
*Document compiled and verified against the Pavan Stones Group codebase. Updated: 2026.*
