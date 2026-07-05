# Implementation Plan

Plan de implementación por etapas para el rediseño completo del portfolio. Cada etapa tiene dependencias claras, archivos a crear/modificar, y criterios de completitud.

---

## Etapa 1: Fundación (archivos de datos + tipos + layout base)

### Dependencias

- Ninguna (punto de partida)

### Archivos a crear

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/types/index.ts` | Crear | Todas las interfaces: Profile, Experience, Technology, Project, Service, FAQItem, ButtonProps, etc. |
| `src/data/profile.ts` | Crear | Datos personales, hero content ambas landings, social links, CV URL |
| `src/data/experience.ts` | Crear | Timeline de experiencia laboral (mínimo 3 entries) |
| `src/data/technologies.ts` | Crear | Tecnologías categorizadas con colores |
| `src/data/projects.ts` | Crear | Proyectos con campo `destacado`, `casoExito`, `orden` |
| `src/data/services.ts` | Crear | 4 servicios freelance con iconos y features |
| `src/data/success-cases.ts` | Crear | Opcional: si se prefiere separar de projects |
| `src/data/faq.ts` | Crear | 6 preguntas frecuentes |
| `src/lib/utils.ts` | Crear | Helpers: formatDate, formatDateRange, prefersReducedMotion, cn() |
| `src/lib/animations.ts` | Crear | Export centralizado de gsap + ScrollTrigger + config global |
| `src/styles/global.css` | Crear | Estilos globales, layer base/components/utilities |
| `src/layouts/BaseLayout.astro` | Crear | HTML shell con SEO metadata, fonts, favicons |
| `src/layouts/PageLayout.astro` | Crear | Layout con Navbar + Footer según mode |
| `tailwind.config.mjs` | Modificar | Agregar colores extendidos, bg-glow utilities, fontFamily |

### Archivos a eliminar

| Archivo | Razón |
|---------|-------|
| `src/constants/` | Reemplazado por data tipada en `src/data/` |
| `src/lib/content.ts` | Reemplazado por archivos de datos estáticos |
| `keystatic.config.ts` | Ya no se usa Keystatic |
| `keystatic/` | Directorio completo |

### Dependencias a instalar

```bash
pnpm add @astrojs/sitemap
```

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `astro.config.mjs` | Agregar @astrojs/sitemap, remover keystatic, markdoc, node adapter |
| `package.json` | Remover @keystatic/astro, @keystatic/core, @astrojs/markdoc |
| `tsconfig.json` | Agregar `baseUrl: '.'`, `paths: { '@/*': ['src/*'] }` |

### Criterios de completitud

- [ ] `tsc --noEmit` pasa sin errores
- [ ] Todos los tipos están exportados desde `@/types`
- [ ] Todos los archivos de datos son importables en `.astro` y `.tsx`
- [ ] `BaseLayout` renderiza HTML completo con SEO meta tags
- [ ] `PageLayout` acepta `mode` y renderiza Navbar + Footer
- [ ] Google Fonts (Inter) carga con preconnect
- [ ] `global.css` compila sin errores
- [ ] `astro dev` inicia sin warnings de dependencias faltantes

---

## Etapa 2: UI Kit (componentes base)

### Dependencias

- Etapa 1 completa

### Archivos a crear

| Archivo | Componente |
|---------|------------|
| `src/components/ui/Button.tsx` | Button polimórfico (a/button) |
| `src/components/ui/Container.astro` | Container con size variant |
| `src/components/ui/SectionTitle.astro` | SectionTitle con subtitle opcional |
| `src/components/ui/TechBadge.astro` | TechBadge con colores por categoría |
| `src/components/ui/AnimatedSection.tsx` | AnimatedSection con GSAP + ScrollTrigger |

### Criterios de completitud

- [ ] Button renderiza como `<a>` con href, como `<button>` sin href
- [ ] Button variant/size funcionan visualmente
- [ ] Container centra contenido con max-width correcto
- [ ] SectionTitle no renderiza `<p>` vacío si no hay subtitle
- [ ] TechBadge muestra color correcto según categoría, neutral si unknowntech
- [ ] AnimatedSection anima con ScrollTrigger, respeta prefers-reduced-motion
- [ ] Todos los componentes son importables desde alias `@/components/ui/`
- [ ] Sin dependencia circular entre componentes

---

## Etapa 3: Shared Components

### Dependencias

- Etapa 2 completa (usa Button, Container, etc.)

### Archivos a crear

| Archivo | Componente |
|---------|------------|
| `src/components/shared/Navbar.astro` | Navbar con hamburger mobile, scroll background |
| `src/components/shared/Footer.astro` | Footer con nav contextual + social links |
| `src/components/shared/Hero.astro` | Hero template configurable |
| `src/components/shared/CTA.astro` | Call-to-action section |
| `src/components/shared/ProjectCard.tsx` | Project card con imagen/placeholder |
| `src/components/shared/Timeline.astro` | Timeline vertical |
| `src/components/shared/ExperienceCard.tsx` | Experience card wrapper |
| `src/components/shared/ServiceCard.tsx` | Service card freelance |
| `src/components/shared/FAQ.tsx` | FAQ accordion con React state |

### Criterios de completitud

- [ ] Navbar tiene dos modos (freelance/recruiter) con links correctos
- [ ] Navbar mobile: hamburger → overlay menu, focus trapped, body scroll lock
- [ ] Navbar scroll: background cambia después de 50px
- [ ] Footer muestra año dinámico, nav links del modo, redes sociales
- [ ] FAQ: single open, toggle off, aria-expanded correcto
- [ ] ProjectCard: placeholder gradient si falta imagen
- [ ] Timeline: línea vertical se extiende hasta el final
- [ ] Timeline: dot accent para entrada "current"
- [ ] ServiceCard: render en grid responsive 1→2→4 cols
- [ ] CTA: variante "default" y "card" con estilos diferentes
- [ ] Todos los componentes aceptan `className` para override

---

## Etapa 4: Landing Freelance (`/`)

### Dependencias

- Etapa 3 completa (shared components disponibles)

### Archivos a crear

| Archivo | Componente |
|---------|------------|
| `src/components/freelance/ServicesSection.astro` | Grid de ServiceCards |
| `src/components/freelance/ProcessSection.astro` | 6-step workflow visual |
| `src/components/freelance/SuccessCases.astro` | ProjectCards filtrados por casoExito |
| `src/components/freelance/FAQSection.astro` | FAQ wrapper con data |

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/pages/index.astro` | Reemplazar contenido actual con la nueva estructura de secciones |

### Criterios de completitud

- [ ] Hero: headline correcto, CTA abre WhatsApp con mensaje predefinido
- [ ] WhatsApp link usa `wa.me/549XXXXXXXXX?text={encoded}`
- [ ] Services: 4 cards en grid responsive
- [ ] Process: 6 pasos con conexión visual
- [ ] SuccessCases: solo projects con `casoExito` completo
- [ ] FAQ: accordion funcional con 6 preguntas
- [ ] CTA final: "¿Tenés un proyecto en mente?" con botón WhatsApp
- [ ] Navbar incluye cross-link "¿Buscás un desarrollador? →" a `/hire-me`
- [ ] No sections vacías si no hay datos
- [ ] Animaciones funcionan en cada sección

---

## Etapa 5: Landing Recruiters (`/hire-me`)

### Dependencias

- Etapa 3 completa (shared components disponibles)

### Archivos a crear

| Archivo | Componente |
|---------|------------|
| `src/components/portfolio/AboutSection.astro` | About me con prose |
| `src/components/portfolio/StackSection.astro` | Tecnologías agrupadas por categoría |
| `src/components/portfolio/ExperienceSection.astro` | Timeline con ExperienceCards |
| `src/components/portfolio/ProjectsSection.astro` | Grid de ProjectCards con filtro `destacado` |

### Archivos a modificar

| Archivo | Cambio |
|--------|--------|
| `src/pages/hire-me.astro` | Crear página (no existe en la versión actual) |

### Criterios de completitud

- [ ] Hero: nombre, título, 3 botones (CV download, LinkedIn, GitHub)
- [ ] "Descargar CV" descarga el PDF (no navega)
- [ ] Links externos abren en new tab con `rel="noopener noreferrer"`
- [ ] Stack: 4 categorías con TechBadges coloreados
- [ ] Timeline: orden reverse cronológico, "Presente" para trabajo actual
- [ ] Projects: solo `destacado: true`, ordenados por `orden`
- [ ] ProjectCard: placeholder si falta imagen
- [ ] Sin cross-link a `/hire-me` en la navbar
- [ ] CTA: "Descargar CV" + "Contactarme" (mailto)

---

## Etapa 6: SEO + Performance

### Dependencias

- Etapa 4 y 5 completas (páginas existen y funcionan)

### Archivos a crear

| Archivo | Descripción |
|---------|-------------|
| `public/robots.txt` | Robots.txt estático |
| `public/site.webmanifest` | Web App Manifest |
| `public/og-freelance.jpg` | OG image para freelance landing |
| `public/og-recruiter.jpg` | OG image para recruiter landing |
| `public/og-default.jpg` | OG image fallback |
| `public/apple-touch-icon.png` | Apple touch icon (180×180) |
| `public/icon-192.png` | PWA icon (192×192) |
| `public/icon-512.png` | PWA icon (512×512) |

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `astro.config.mjs` | Verificar site URL, sitemap config |
| `src/layouts/BaseLayout.astro` | Verificar JSON-LD, canonical, OG tags |

### Tasks de performance

1. **Image optimization**
   - Usar `<Image />` de Astro (`@astrojs/image` o built-in) para proyectos
   - WebP para todas las imágenes de proyecto
   - `loading="eager"` en hero, `loading="lazy"` en el resto
   - `width` y `height` explícitos en todas las imágenes
   - Preload hero images con `<link rel="preload">`

2. **Critical CSS**
   - Inline critical CSS (Astro lo hace automáticamente en build)
   - Deferred non-critical CSS

3. **Bundle analysis**
   ```bash
   pnpm astro build
   # Verificar tamaños en dist/
   ls -lh dist/_astro/ | sort -k5 -h
   ```

4. **Lighthouse audit**
   - Desktop ≥ 95 en todas las categorías
   - Mobile ≥ 80 en Performance
   - Zero CLS, FCP ≤ 1.5s, LCP ≤ 2.5s, TBT ≤ 100ms

### Bundle budget

| Resource | Limit |
|----------|-------|
| JS per page (gzipped) | ≤ 100KB |
| CSS per page (gzipped) | ≤ 20KB |
| Fonts | Solo Inter (rsms.me, preconnect) |
| Third-party | CERO (no analytics, no trackers) |

### Criterios de completitud

- [ ] `robots.txt` retorna 200 con Allow: / y referencia al sitemap
- [ ] Sitemap generado con `/` y `/hire-me`
- [ ] JSON-LD valida como LocalBusiness y Person respectivamente
- [ ] OG images existen y cargan en social previews
- [ ] Lighthouse desktop ≥ 95 en Performance, Accessibility, Best Practices, SEO
- [ ] Lighthouse mobile Performance ≥ 80
- [ ] Zero CLS entre 320-1920px
- [ ] No third-party scripts
- [ ] Todas las imágenes tienen dimensiones explícitas
- [ ] `will-change: transform, opacity` en elementos animados
- [ ] Bundle JS < 100KB gzipped por página

---

## Dependencias entre etapas (DAG)

```
Etapa 1 (Foundation)
  └── Etapa 2 (UI Kit)
       └── Etapa 3 (Shared Components)
            ├── Etapa 4 (Freelance Landing)
            └── Etapa 5 (Recruiter Landing)
                 └── Etapa 6 (SEO + Performance)
```

Cada etapa puede comenzar solo cuando todas las etapas de las que depende están completas. Las etapas 4 y 5 son paralelizables.

---

## Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| GSAP + ScrollTrigger causa CLS | Performance | will-change, solo transform+opacity, test en CI |
| data migration pierde contenido | Funcional | Comparar datos Keystatic vs nuevos data files |
| Navbar mobile overlay no accesible | Accesibilidad | Focus trap + aria-expanded + Escape key |
| Bundle GSAP muy grande | Performance | Tree-shaking (solo importar gsap/ScrollTrigger) |
| WhatsApp link cambia | Funcional | Centralizar phone en data/profile.ts |
| prefers-reduced-motion no respetado | Accesibilidad | Early return en cada useEffect |

---

## Resumen de archivos

| Etapa | Crear | Modificar | Eliminar |
|-------|-------|-----------|----------|
| 1 | 15 | 3 | ~5 |
| 2 | 5 | 0 | 0 |
| 3 | 9 | 0 | 0 |
| 4 | 4 | 1 | 0 |
| 5 | 4 | 1 | 0 |
| 6 | 8 | 2 | 0 |
| **Total** | **45** | **7** | **~5** |

---

## Acceptance Criteria (globales)

- [ ] Todas las etapas se completan en orden sin saltos ni dependencias rotas
- [ ] `astro build` produce output estático sin errores
- [ ] `tsc --noEmit` pasa en strict mode
- [ ] Lighthouse ≥ 95 desktop, ≥ 80 mobile
- [ ] Sin console errors en ninguna página
- [ ] SEO metadata única por página
- [ ] Animaciones no causan layout shift
- [ ] Código base sin dependencias a Keystatic
