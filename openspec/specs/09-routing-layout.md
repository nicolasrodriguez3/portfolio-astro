# Routing & Layout

Definición de layouts, páginas, metadata SEO, y configuración de sitemap/robots.

---

## 1. File Structure

```
src/
├── layouts/
│   ├── BaseLayout.astro        # Layout raíz: HTML shell, fuentes, estilos globales
│   └── PageLayout.astro         # Layout por página: Navbar + Footer según mode
├── pages/
│   ├── index.astro              # Freelance landing (/)
│   ├── hire-me.astro            # Recruiter landing (/hire-me)
│   └── 404.astro               # Página no encontrada
└── styles/
    └── global.css               # Estilos globales (importado en BaseLayout)
```

---

## 2. BaseLayout (`src/layouts/BaseLayout.astro`)

Layout raíz que toda página usa. Define el HTML shell, carga de fonts, y metadata global.

### Props

```typescript
interface BaseLayoutProps {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'profile'
  canonical?: string
  jsonLd?: Record<string, unknown>
  children?: any
}
```

### Template

```astro
---
// src/layouts/BaseLayout.astro
import '@/styles/global.css'

interface Props {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'profile'
  canonical?: string
  jsonLd?: Record<string, unknown>
}

const {
  title,
  description,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  canonical = 'https://www.nicorodriguez.com.ar',
  jsonLd,
} = Astro.props
---

<!doctype html>
<html lang="es" class="bg-zinc-950 text-zinc-100">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="author" content="Nicolás Rodríguez" />

    <!-- Title & Description -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- OpenGraph -->
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`https://www.nicorodriguez.com.ar${ogImage}`} />
    <meta property="og:url" content={canonical} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`https://www.nicorodriguez.com.ar${ogImage}`} />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/favicon-white.svg" media="(prefers-color-scheme: dark)" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Font: Inter from rsms.me -->
    <link rel="preconnect" href="https://rsms.me/" crossorigin />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

    <!-- JSON-LD Structured Data -->
    {jsonLd && (
      <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
    )}
  </head>
  <body class="antialiased min-h-screen">
    {children}
  </body>
</html>
```

---

## 3. PageLayout (`src/layouts/PageLayout.astro`)

Layout que agrega Navbar + Footer según el modo, y configura las secciones con datos tipados.

### Props

```typescript
interface PageLayoutProps {
  mode: 'freelance' | 'recruiter'
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'profile'
  canonical?: string
  jsonLd?: Record<string, unknown>
  children?: any
}
```

### Template

```astro
---
// src/layouts/PageLayout.astro
import BaseLayout from './BaseLayout.astro'
import Navbar from '@/components/shared/Navbar.astro'
import Footer from '@/components/shared/Footer.astro'
import { gsap, ScrollTrigger } from '@/lib/animations'

interface Props { /* same as BaseLayoutProps + mode */ }
const { mode, ...baseProps } = Astro.props
---

<BaseLayout {...baseProps}>
  <Navbar mode={mode} />
  <main>
    {children}
  </main>
  <Footer mode={mode} />
</BaseLayout>

<script>
  import { gsap, ScrollTrigger } from '@/lib/animations'

  // Navbar scroll effect
  const navbar = document.querySelector('[data-navbar]')
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -50px',
      onUpdate: (self) => {
        navbar.classList.toggle('navbar-scrolled', self.progress > 0)
      },
    })
  }
</script>
```

---

## 4. Pages

### 4.1 `/` — Freelance Landing

```astro
---
// src/pages/index.astro
import PageLayout from '@/layouts/PageLayout.astro'
import Hero from '@/components/shared/Hero.astro'
// ... import sections

import { profile } from '@/data/profile'
import { services } from '@/data/services'
// ... import data

// SEO metadata
const title = 'Nicolás Rodríguez | Desarrollo Web Profesional'
const description = 'Ayudo a negocios y emprendedores a tener presencia online profesional. Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.'
const canonical = 'https://www.nicorodriguez.com.ar/'
const ogImage = '/og-freelance.jpg'

// JSON-LD: LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Nicolás Rodríguez - Desarrollo Web',
  description,
  url: canonical,
  telephone: profile.phone,
  email: profile.email,
  sameAs: [profile.social.linkedin, profile.social.github],
}
---

<PageLayout
  mode="freelance"
  {title}
  {description}
  {canonical}
  {ogImage}
  {jsonLd}
>
  <Hero
    headline={profile.freelance.headline}
    subtitle={profile.freelance.subtitle}
    buttons={[
      { label: 'Solicitar presupuesto', href: `https://wa.me/${profile.phone}?text=${encodeURIComponent(profile.freelance.whatsappMessage)}`, variant: 'primary', external: true },
    ]}
    align="center"
    media={<img src="/img-perfil.png" alt="" class="w-24 h-24 rounded-full ring-2 ring-zinc-700" />}
  />

  <ServicesSection services={services} />
  <ProcessSection />
  <SuccessCases />
  <FAQSection />
  <CTA
    headline="¿Tenés un proyecto en mente?"
    description="Sin compromiso — te respondo en menos de 24 horas"
    buttons={[
      { label: 'Solicitar presupuesto', href: `https://wa.me/${profile.phone}?...`, variant: 'primary', external: true },
    ]}
  />
</PageLayout>
```

### 4.2 `/hire-me` — Recruiter Landing

```astro
---
// src/pages/hire-me.astro
import PageLayout from '@/layouts/PageLayout.astro'
import Hero from '@/components/shared/Hero.astro'
// ... import sections

import { profile } from '@/data/profile'
import { technologies } from '@/data/technologies'
// ... import data

const title = 'Nicolás Rodríguez | Full Stack Developer'
const description = 'Full Stack Developer con experiencia en React, Next.js, PHP, Python y arquitectura de software.'
const canonical = 'https://www.nicorodriguez.com.ar/hire-me'
const ogImage = '/og-recruiter.jpg'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nicolás Rodríguez',
  jobTitle: 'Full Stack Developer',
  url: canonical,
  sameAs: [profile.social.linkedin, profile.social.github],
}
---

<PageLayout
  mode="recruiter"
  {title}
  {description}
  {canonical}
  {ogImage}
  {jsonLd}
>
  <Hero
    headline={profile.recruiter.headline}
    subtitle={profile.recruiter.valueProp}
    buttons={[
      { label: 'Descargar CV', href: profile.cvUrl, variant: 'primary', download: true },
      { label: 'LinkedIn', href: profile.social.linkedin, variant: 'secondary', external: true },
      { label: 'GitHub', href: profile.social.github, variant: 'ghost', external: true },
    ]}
    align="left"
  />

  <AboutSection profile={profile} />
  <StackSection technologies={technologies} />
  <ExperienceSection />
  <ProjectsSection />
  <CTA
    headline="¿Buscás un desarrollador para tu equipo?"
    buttons={[
      { label: 'Descargar CV', href: profile.cvUrl, variant: 'primary', download: true },
      { label: 'Contactarme', href: `mailto:${profile.email}`, variant: 'secondary' },
    ]}
    variant="card"
  />
</PageLayout>
```

### 4.3 404 Page

```astro
---
// src/pages/404.astro
import BaseLayout from '@/layouts/BaseLayout.astro'
import Button from '@/components/ui/Button.astro'

const title = 'Página no encontrada | Nicolás Rodríguez'
const description = 'La página que buscas no existe.'
---

<BaseLayout {title} {description}>
  <main class="min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6 px-4">
      <h1 class="text-7xl font-bold heading-gradient">404</h1>
      <p class="text-xl text-zinc-400">La página que buscas no existe</p>
      <p class="text-zinc-500">O fue movida, o nunca existió. Volvamos al inicio.</p>
      <Button variant="primary" size="lg" href="/">
        Volver al inicio
      </Button>
    </div>
  </main>
</BaseLayout>
```

---

## 5. Sitemap Configuration

Usar `@astrojs/sitemap` integrado en astro.config:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.nicorodriguez.com.ar',
  output: 'static',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date(),
      filter: (page) => page !== 'https://www.nicorodriguez.com.ar/404/',
    }),
  ],
})
```

### Sitemap entries esperadas

| URL | Priority | Changefreq |
|-----|----------|------------|
| `/` | 1.0 | monthly |
| `/hire-me` | 0.8 | monthly |

---

## 6. Robots.txt

Archivo estático en `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://www.nicorodriguez.com.ar/sitemap-index.xml
```

---

## 7. JSON-LD Summary

| Page | `@type` | Key fields |
|------|---------|------------|
| `/` | `LocalBusiness` | `name`, `description`, `url`, `telephone`, `email`, `sameAs` |
| `/hire-me` | `Person` | `name`, `jobTitle`, `url`, `sameAs` |

Ambos incluyen `@context: 'https://schema.org'`.

---

## 8. SEO Metadata per Page

| Element | `/` | `/hire-me` |
|---------|-----|------------|
| Title | "Nicolás Rodríguez \| Desarrollo Web Profesional" | "Nicolás Rodríguez \| Full Stack Developer" |
| Description | "Ayudo a negocios y emprendedores..." | "Full Stack Developer con experiencia..." |
| OG Type | `website` | `profile` |
| OG Image | `/og-freelance.jpg` | `/og-recruiter.jpg` |
| Canonical | `https://www.nicorodriguez.com.ar/` | `https://www.nicorodriguez.com.ar/hire-me` |
| JSON-LD | `LocalBusiness` | `Person` |

---

## 9. Dependencies to Install

```bash
pnpm add @astrojs/sitemap
pnpm add -D @tailwindcss/typography  # si no está
```

---

## Acceptance Criteria

- [ ] `BaseLayout.astro` existe y exporta props tipadas
- [ ] `PageLayout.astro` existe, recibe `mode`, configura Navbar + Footer automáticamente
- [ ] `/` usa `mode="freelance"` con todos los datos correctos
- [ ] `/hire-me` usa `mode="recruiter"` con todos los datos correctos
- [ ] 404 page tiene diseño consistente con el sistema y link a `/`
- [ ] Sitemap genera correctamente con `astro build`
- [ ] `robots.txt` existe en `public/` y referencia el sitemap
- [ ] JSON-LD valida en Google Structured Data Testing Tool
- [ ] OpenGraph + Twitter Cards funcionan en ambas páginas
- [ ] `canonical` está presente en cada página
- [ ] OG image fallback a `/og-default.jpg` si falta el específico
