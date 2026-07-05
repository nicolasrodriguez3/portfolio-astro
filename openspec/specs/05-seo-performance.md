# SEO & Performance

SEO, metadatos, structured data, sitemap, y métricas de rendimiento para ambas landings.

## SEO per page

| Element | `/` (freelance) | `/hire-me` (recruiter) |
|---------|-----------------|----------------------|
| **Title** | "Nicolás Rodríguez | Desarrollo Web Profesional" | "Nicolás Rodríguez | Full Stack Developer" |
| **Description** | "Ayudo a negocios y emprendedores a tener presencia online profesional. Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes." | "Full Stack Developer con experiencia en React, Next.js, PHP, Python y arquitectura de software. Conocé mi experiencia y proyectos." |
| **Keywords** | desarrollo web, páginas web, landing page, tienda online, sitio institucional, presencia online | full stack developer, react, next.js, python, fastapi, backend, arquitectura de software |
| **OG Image** | `/og-freelance.jpg` | `/og-recruiter.jpg` |
| **JSON-LD** | `LocalBusiness` | `Person` |

## Requirements

### REQ-SEO-META: Per-page metadata

Each page MUST have unique title, description, OpenGraph, and Twitter Card metadata.

#### Scenario: Both pages render correct meta
- GIVEN a visitor loads `/`
- THEN `<title>` matches the freelance title
- AND `<meta property="og:title">` matches
- AND `<meta name="twitter:card">` is `summary_large_image`
- AND `<meta name="twitter:title">` matches
- AND `<meta name="twitter:description">` matches page description

- GIVEN a visitor loads `/hire-me`
- THEN same structure applies with recruiter-specific values

### REQ-SEO-JSONLD: Structured data

Each page MUST include JSON-LD structured data in the `<head>`.

#### Scenario: Freelance JSON-LD
- GIVEN a visitor loads `/`
- THEN the page includes a `<script type="application/ld+json">` block
- AND `@type` is `LocalBusiness`
- AND `name` is "Nicolás Rodríguez - Desarrollo Web"
- AND `description` matches the page description
- AND `url` is `https://www.nicorodriguez.com.ar/`
- AND `telephone` matches the WhatsApp number
- AND `sameAs` includes LinkedIn and GitHub URLs

#### Scenario: Recruiter JSON-LD
- GIVEN a visitor loads `/hire-me`
- THEN `@type` is `Person`
- AND `name` is "Nicolás Rodríguez"
- AND `jobTitle` is "Full Stack Developer"
- AND `sameAs` includes LinkedIn and GitHub URLs
- AND `url` is `https://www.nicorodriguez.com.ar/hire-me`

### REQ-SEO-SITEMAP: Sitemap & robots

The site MUST generate a sitemap and robots.txt.

#### Scenario: Sitemap generation
- GIVEN the project is built with `astro build`
- THEN `dist/sitemap-index.xml` exists
- AND it includes entries for `/` and `/hire-me`
- AND each entry has `<lastmod>` with the build date
- AND each entry has `<changefreq>` and `<priority>`

#### Scenario: Robots.txt
- GIVEN a crawler requests `/robots.txt`
- THEN it returns a valid robots.txt
- AND it references the sitemap URL
- AND it allows all crawlers (`Allow: /`)

### REQ-SEO-FAVICON: Favicons & manifest

The site MUST provide favicons for all platforms and a Web App Manifest.

#### Scenario: Favicon set
- GIVEN a browser requests `/favicon.svg`
- THEN it returns the light-mode SVG favicon
- AND `<link rel="icon" ... media="(prefers-color-scheme: dark)">` serves the dark variant
- AND the following are present:
  - `favicon.ico` (legacy, 32x32)
  - `apple-touch-icon.png` (180x180)
  - `icon-192.png` and `icon-512.png` (PWA)

#### Scenario: Web Manifest
- GIVEN a browser requests `/site.webmanifest`
- THEN it returns a valid JSON manifest
- AND `name` and `short_name` match the brand
- AND `start_url` is `/`
- AND `display` is `standalone`
- AND icons array includes 192 and 512 sizes

### REQ-SEO-CANONICAL: Canonical URLs

Every page MUST include a canonical URL.

#### Scenario: Canonical present
- GIVEN a page renders
- THEN `<link rel="canonical" href="https://www.nicorodriguez.com.ar{path}">` is in `<head>`
- AND the path matches the current page (`/` or `/hire-me`)

### REQ-PERF-BUDGET: Performance budget

The site MUST meet performance budgets on simulated 3G.

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 (desktop) / ≥ 80 (mobile) |
| First Contentful Paint (FCP) | ≤ 1.5s |
| Largest Contentful Paint (LCP) | ≤ 2.5s |
| Total Blocking Time (TBT) | ≤ 100ms |
| Cumulative Layout Shift (CLS) | ≤ 0.05 |
| Time to Interactive (TTI) | ≤ 2.5s |
| Bundle size (JS per page) | ≤ 100KB gzipped |
| Bundle size (CSS per page) | ≤ 20KB gzipped |

#### Scenario: Build output
- GIVEN `astro build` completes
- THEN the output in `dist/` contains:
  - Static HTML per page (SSG output)
  - Inlined critical CSS (via Astro's built-in optimization)
  - Deferred non-critical CSS
  - Optimized images (WebP/AVIF via Astro's `<Image />` component)
  - Preloaded hero images via `<link rel="preload">`

#### Scenario: Image optimization
- GIVEN images in `/public/projects/` are referenced in data files
- WHEN the site is built
- THEN images are served in modern formats (WebP/AVIF)
- AND each `<img>` has explicit `width` and `height` attributes
- AND each `<img>` has `loading="lazy"` (below-fold) or `loading="eager"` (hero)

#### Scenario: Third-party scripts
- GIVEN no analytics are configured
- THEN no third-party scripts load on any page
- AND no external font services (Inter is loaded from rsms.me with preconnect)

### REQ-PERF-GSAP: Animation performance

GSAP animations MUST NOT cause layout shifts or long frames.

#### Scenario: ScrollTrigger efficiency
- GIVEN GSAP ScrollTrigger animations exist
- THEN they use `scrub: true` sparingly (only where needed)
- AND animations use `will-change: transform, opacity` on animated elements
- AND no animation triggers layout (only `transform` and `opacity` properties)
- AND `gsap.ticker.lagSmoothing(0)` is configured to reduce jitter on low-end devices

## Edge cases

| Case | Behavior |
|------|----------|
| OG image missing | Falls back to default `/og-default.jpg` |
| Sitemap generation fails | Build warns but doesn't fail |
| JSON-LD parse error | Build fails (data must be valid) |
| 404 page | Renders with proper `<title>` and canonical to `/` |
| Script blocking (NoScript) | Content renders server-side (Astro static output) |

## Acceptance criteria

- [ ] Lighthouse ≥ 95 desktop / ≥ 80 mobile in CI
- [ ] All social previews show correct title, description, and image
- [ ] Google Structured Data Testing Tool validates both JSON-LD blocks
- [ ] Sitemap has exactly 2 entries
- [ ] robots.txt returns 200 with correct content
- [ ] No console errors related to SEO metadata
- [ ] All images have explicit dimensions (zero CLS from images)
