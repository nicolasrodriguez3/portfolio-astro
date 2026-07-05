# Task Breakdown — Portfolio Redesign

Desglose de tareas concretas para implementar el rediseño completo del portfolio de Nicolás Rodríguez.
Cada tarea está diseñada para que un sub-agente `sdd-apply` pueda implementarla de forma independiente.

---

## DAG de dependencias entre etapas

```
Etapa 1 (Foundation)
  └── Etapa 2 (UI Kit)
       └── Etapa 3 (Shared Components)
            ├── Etapa 4 (Freelance Landing)
            └── Etapa 5 (Recruiter Landing)
                 └── Etapa 6 (SEO + Performance)
```

Las etapas 4 y 5 son paralelizables una vez completada la etapa 3.

---

## Etapa 1 — Fundación (archivos de datos + tipos + layout base)

### T-1.1: Configurar tsconfig con alias `@/`

- **Etapa**: 1
- **Dependencias**: Ninguna
- **Archivos**:
  - Modificar: `tsconfig.json`
- **Criterios de aceptación**:
  - [ ] `tsconfig.json` tiene `baseUrl: '.'`
  - [ ] `tsconfig.json` tiene `paths: { '@/*': ['src/*'] }`
  - [ ] `tsc --noEmit` no da errores de módulo por el alias
  - [ ] Se puede importar `import { foo } from '@/types'` desde cualquier archivo
- **Estimación**: Baja (1 archivo)

---

### T-1.2: Crear tipos compartidos en `src/types/index.ts`

- **Etapa**: 1
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/types/index.ts`
- **Criterios de aceptación**:
  - [ ] Exporta todas las interfaces: `Profile`, `Experience`, `Technology`, `TechCategory`, `Project`, `Service`, `FAQItem`, `NavbarLink`
  - [ ] Exporta interfaces de UI: `ButtonProps`, `ContainerProps`, `SectionTitleProps`, `TechBadgeProps`, `AnimatedSectionProps`, `HeroProps`, `CTAProps`, `CTAButton`, `HeroButton`
  - [ ] Exporta interfaces de shared: `NavbarProps`, `FooterProps`, `ProjectCardProps`, `TimelineProps`, `TimelineItem`, `ExperienceCardProps`, `ServiceCardProps`, `FAQProps`, `FAQItem`
  - [ ] Exporta `CasoExito` type (problema, solución, resultado)
  - [ ] TechCategory es `'frontend' | 'backend' | 'database' | 'tools'`
  - [ ] Todos los tipos usan `interface` o `type` con campos opcionales marcados con `?`
  - [ ] No hay `any` en ninguna definición
- **Estimación**: Media (1 archivo, ~150 líneas de tipos)

---

### T-1.3: Crear `src/data/profile.ts`

- **Etapa**: 1
- **Dependencias**: T-1.2
- **Archivos**:
  - Crear: `src/data/profile.ts`
- **Datos reales**:
  - name: "Nicolás Rodríguez"
  - email: "nicolasrodriguez@outlook.com.ar"
  - phone: "5491161587621" (ejemplo representativo de Argentina)
  - location: "Argentina"
  - cvUrl: "/cv-nicolas-rodriguez.pdf"
  - freelance.headline: "Ayudo a negocios y emprendedores a tener una presencia online profesional"
  - freelance.subtitle: "Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes"
  - freelance.whatsappMessage: "Hola Nicolás, quiero solicitar un presupuesto para mi proyecto web"
  - recruiter.headline: "Nicolás Rodríguez"
  - recruiter.subtitle: "Full Stack Developer"
  - recruiter.valueProp: "Full Stack Developer con experiencia en React, PHP, Python y desarrollo de sistemas ERP. Apasionado por la arquitectura de software, el backend y resolver problemas complejos."
  - social.linkedin: "https://www.linkedin.com/in/nirodriguez/"
  - social.github: "https://github.com/nicolasrodriguez3"
- **Criterios de aceptación**:
  - [ ] Exporta un objeto `profile` de tipo `Profile`
  - [ ] `tsc --noEmit` pasa sin errores
  - [ ] Importable desde `.astro` y `.tsx`
- **Estimación**: Baja (1 archivo)

---

### T-1.4: Crear `src/data/experience.ts`

- **Etapa**: 1
- **Dependencias**: T-1.2
- **Archivos**:
  - Crear: `src/data/experience.ts`
- **Datos reales (mínimo 3 entries)**:

  1. **Cianbox ERP** (basado en proyecto real)
     - company: "Cianbox"
     - role: "Full Stack Developer"
     - startDate: "2022-03"
     - endDate: null
     - technologies: ["PHP", "JS", "MySQL", "Git", "HTML"]
     - responsibilities: [
         "Desarrollo y mantenimiento de funcionalidades del sistema ERP",
         "Implementación de mejoras solicitadas por usuarios",
         "Generación de reportes personalizados en PDF y Excel"
       ]
     - achievements: [
         "Optimización de reportes reduciendo tiempos de generación",
         "Desarrollo de módulos de informes personalizados para clientes"
       ]

  2. **Freelance Web Developer**
     - company: "Freelance"
     - role: "Web Developer"
     - startDate: "2021-01"
     - endDate: "2022-02"
     - technologies: ["React", "Astro", "Tailwind", "JS", "HTML"]
     - responsibilities: [
         "Desarrollo de landing pages y sitios web para emprendedores y negocios",
         "Migración de sitios WordPress a Astro para mejorar performance",
         "Implementación de diseño responsive y animaciones con GSAP"
       ]
     - achievements: [
         "Cliente BEO: landing page institucional con TinaCMS + Astro (beo.ar)",
         "Cliente La Nerd Shop: landing page React con diseño geek/nerd"
       ]

  3. **Desarrollador de Apps — Municipalidad de Crespo** (basado en Somos Crespo)
     - company: "Municipalidad de Crespo"
     - role: "Desarrollador Frontend"
     - startDate: "2023-01"
     - endDate: "2023-06"
     - technologies: ["React", "Tailwind", "Git"]
     - responsibilities: [
         "Desarrollo de aplicación municipal para interacción vecino-gobierno"
       ]
     - achievements: [
         "App desarrollada para concurso municipal de innovación",
         "Sistema de reclamos y seguimiento para ciudadanos"
       ]

- **Criterios de aceptación**:
  - [ ] Exporta `experiences` como `Experience[]`
  - [ ] Al menos 3 entries de experiencia
  - [ ] Una entry con `endDate: null` (trabajo actual)
  - [ ] Arrays vacíos de responsibilities/achievements no rompen el render
- **Estimación**: Baja (1 archivo)

---

### T-1.5: Crear `src/data/technologies.ts`

- **Etapa**: 1
- **Dependencias**: T-1.2
- **Archivos**:
  - Crear: `src/data/technologies.ts`
- **Datos reales (categorizados)**:

  | Key | Name | Category |
  |-----|------|----------|
  | `js` | JavaScript | `frontend` |
  | `typescript` | TypeScript | `frontend` |
  | `react` | React | `frontend` |
  | `astro` | Astro | `frontend` |
  | `tailwind` | Tailwind CSS | `frontend` |
  | `html` | HTML & CSS | `frontend` |
  | `node` | Node.js | `backend` |
  | `express` | Express | `backend` |
  | `php` | PHP | `backend` |
  | `python` | Python | `backend` |
  | `fastapi` | FastAPI | `backend` |
  | `mongodb` | MongoDB | `database` |
  | `mysql` | MySQL | `database` |
  | `git` | Git | `tools` |
  | `tinacms` | TinaCMS | `tools` |

- **Criterios de aceptación**:
  - [ ] Exporta `technologies` como `Record<string, Technology>`
  - [ ] Cada technology tiene `name`, `category`
  - [ ] Cubre todas las categorías (frontend, backend, database, tools)
- **Estimación**: Baja (1 archivo)

---

### T-1.6: Crear `src/data/projects.ts`

- **Etapa**: 1
- **Dependencias**: T-1.2
- **Archivos**:
  - Crear: `src/data/projects.ts`
- **Datos reales (4 proyectos existentes)**:

  1. **BEO Landing**
     - slug: "beo-landing"
     - title: "Landing Page — BEO"
     - description: "Diseño y desarrollo de landing page institucional para BEO, estudio de estrategia y marketing. Construida con Astro y Tailwind CSS, con contenido gestionable vía TinaCMS."
     - image: "/beo-landing1.webp"
     - technologies: ["astro", "tailwind", "git", "tinacms"]
     - deployedSite: "https://beo.ar"
     - destacado: false
     - orden: 3

  2. **Cianbox ERP**
     - slug: "cianbox-erp"
     - title: "Cianbox ERP"
     - description: "Sistema ERP para emprendedores y empresas. Participé en el desarrollo y mantenimiento de funcionalidades, reportes en PDF/Excel e informes personalizados."
     - image: "/cianbox.webp"
     - technologies: ["js", "php", "mysql", "git", "html"]
     - destacado: true
     - orden: 1
     - casoExito: { problema: "Emprendedores necesitaban un sistema para gestionar su negocio", solucion: "Desarrollo de ERP con módulos de facturación, stock y reportes", resultado: "+50 clientes activos usando el sistema" }

  3. **Somos Crespo**
     - slug: "somos-crespo"
     - title: "Somos Crespo"
     - description: "App municipal desarrollada para el concurso de la Municipalidad de Crespo. Facilita la interacción entre vecinos y el gobierno local."
     - image: "/somos-crespo-1.webp"
     - technologies: ["react", "tailwind", "git"]
     - linkToCode: "https://github.com/nicolasrodriguez3/crespo-app"
     - destacado: true
     - orden: 2

  4. **La Nerd Shop**
     - slug: "la-nerd-shop"
     - title: "La Nerd Shop"
     - description: "Landing page con temática geek y nerd, diseño moderno y colorido. Construida en React como base para futuro e-commerce."
     - image: "/la-nerd-1.webp"
     - technologies: ["html", "react", "git"]
     - linkToCode: "https://github.com/nicolasrodriguez3/la-nerd-shop"
     - deployedSite: "https://la-nerd-shop.vercel.app/"
     - destacado: false
     - orden: 4

- **Criterios de aceptación**:
  - [ ] Exporta `projects` como `Project[]`
  - [ ] 4 proyectos con datos reales verificables
  - [ ] `destacado: true` en projects que se muestran en recruiter landing
  - [ ] `casoExito` presente solo donde corresponde
  - [ ] Orden ascendente por `orden`
- **Estimación**: Baja (1 archivo)

---

### T-1.7: Crear `src/data/services.ts`

- **Etapa**: 1
- **Dependencias**: T-1.2
- **Archivos**:
  - Crear: `src/data/services.ts`
- **Datos reales (4 servicios)**:

  1. **Landing Pages con Astro**
     - slug: "landing-pages"
     - name: "Landing Pages con Astro"
     - description: "Landing pages ultrarrápidas construidas con Astro. 95+ en PageSpeed, cero JavaScript innecesario, SEO on-page optimizado."
     - icon: "rocket" (o nombre de icono a definir)
     - features: ["95+ PageSpeed", "SEO optimizado", "CMS opcional (TinaCMS)", "Deploy automatizado"]

  2. **Migraciones desde WordPress**
     - slug: "migraciones-wordpress"
     - name: "Migraciones desde WordPress"
     - description: "Migración de sitios WordPress y Elementor a Astro. Mantenés el diseño y el contenido, ganás velocidad, seguridad y cero mantenimiento de plugins."
     - icon: "switch" (o equivalente)
     - features: ["Mismo diseño y contenido", "Velocidad 10x superior", "Sin plugins vulnerables", "Proyecto llave en mano"]

  3. **Sitios Web Institucionales**
     - slug: "sitios-institucionales"
     - name: "Sitios Web Institucionales"
     - description: "Sitios web profesionales para tu negocio o emprendimiento. Diseño moderno, responsive y optimizado para convertir visitantes en clientes."
     - icon: "building" (o equivalente)
     - features: ["Diseño responsive", "Formulario de contacto", "Galería de imágenes", "Optimización SEO"]

  4. **E-commerce con Tienda Nube**
     - slug: "ecommerce-tienda-nube"
     - name: "E-commerce con Tienda Nube"
     - description: "Tu tienda online sobre Tienda Nube con diseño a medida, integración de medios de pago y optimización para conversión."
     - icon: "cart" (o equivalente)
     - features: ["Diseño a medida", "Medios de pago integrados", "Optimizado para conversión", "Sin complicaciones técnicas"]

- **Criterios de aceptación**:
  - [ ] Exporta `services` como `Service[]`
  - [ ] 4 servicios con slug, name, description, icon, features
  - [ ] features es un array con al menos 3 items por servicio
- **Estimación**: Baja (1 archivo)

---

### T-1.8: Crear `src/data/faq.ts`

- **Etapa**: 1
- **Dependencias**: T-1.2
- **Archivos**:
  - Crear: `src/data/faq.ts`
- **Datos reales** (6 preguntas frecuentes para freelance):

  1. Q: "¿Cuánto tiempo toma desarrollar un sitio web?" | A: "Dependiendo de la complejidad, una landing page puede estar lista en 1-2 semanas. Un sitio institucional o e-commerce puede llevar de 3 a 6 semanas. Siempre te doy un cronograma estimado antes de empezar."
  2. Q: "¿Cuánto cuesta una landing page?" | A: "Cada proyecto es único y el precio depende de las funcionalidades que necesites. Trabajo con presupuestos personalizados. Contactame sin compromiso y te paso un estimativo."
  3. Q: "¿Incluye hosting y dominio?" | A: "El desarrollo no incluye hosting ni dominio, pero puedo asesorarte sobre las mejores opciones y ayudarte con la configuración inicial."
  4. Q: "¿Ofrecen mantenimiento después de entregar el sitio?" | A: "Sí, ofrezco planes de mantenimiento mensual para mantener tu sitio actualizado, seguro y funcionando correctamente. También puedo hacer cambios puntuales cuando los necesites."
  5. Q: "¿Trabajás con WordPress?" | A: "Actualmente recomiendo Astro como tecnología principal por su velocidad y seguridad. Si ya tenés un sitio en WordPress, ofrezco servicios de migración a Astro manteniendo el diseño y contenido."
  6. Q: "¿Cómo es el proceso de trabajo?" | A: "Primero tenemos una reunión para entender tu proyecto, luego te presento una propuesta con alcance y presupuesto. Aprobado eso, diseño la maqueta, desarrollamos, y finalmente hacemos la entrega con soporte incluido."

- **Criterios de aceptación**:
  - [ ] Exporta `faq` como `FAQItem[]`
  - [ ] 6 items con question y answer
  - [ ] Preguntas relevantes para un cliente freelance de desarrollo web
- **Estimación**: Baja (1 archivo)

---

### T-1.9: Crear `src/lib/utils.ts`

- **Etapa**: 1
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/lib/utils.ts`
- **Funciones a implementar**:

  ```typescript
  // Merge de clases Tailwind (clsx + twMerge ligero o manual)
  function cn(...classes: (string | undefined | null | false)[]): string

  // Formatear fecha "YYYY-MM" → "Ene 2022"
  function formatDate(dateStr: string): string

  // Formatear rango: formatDate(start) - formatDate(end) o "Presente"
  function formatDateRange(start: string, end: string | null): string

  // prefers-reduced-motion check (con guard SSR)
  function prefersReducedMotion(): boolean
  ```

- **Criterios de aceptación**:
  - [ ] `cn()` mergea clases condicionalmente sin duplicados
  - [ ] `formatDate("2022-03")` → "Mar 2022"
  - [ ] `formatDateRange("2022-03", null)` → "Mar 2022 - Presente"
  - [ ] `prefersReducedMotion()` retorna `true` en SSR (typeof window === 'undefined')
  - [ ] `tsc --noEmit` pasa sin errores
- **Estimación**: Baja (1 archivo)

---

### T-1.10: Crear `src/lib/animations.ts` (config GSAP global)

- **Etapa**: 1
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/lib/animations.ts`
- **Contenido**:

  ```typescript
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)
  gsap.ticker.lagSmoothing(0)            // Consistencia cross-device
  gsap.defaults({ ease: 'power2.out' })  // Default ease global

  export { gsap, ScrollTrigger }
  export { prefersReducedMotion } from './utils'
  ```

- **Criterios de aceptación**:
  - [ ] `gsap` y `ScrollTrigger` se exportan centralizadamente
  - [ ] `gsap.ticker.lagSmoothing(0)` configurado
  - [ ] `gsap.defaults({ ease: 'power2.out' })` configurado
  - [ ] `prefersReducedMotion()` re-exportado desde utils
  - [ ] Importable desde cualquier `.tsx` o `<script>` en `.astro`
- **Estimación**: Baja (1 archivo)

---

### T-1.11: Crear `src/styles/global.css` con hex pattern utilities

- **Etapa**: 1
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/styles/global.css`
- **Contenido**:
  - Directivas `@tailwind base/components/utilities`
  - `@layer base`: html (font-family Inter, color-scheme dark, scroll-behavior smooth), body (bg-zinc-950, text-zinc-100, antialiased), `::selection`, scrollbar styling
  - `@layer components`: `.container-default`, `.container-narrow`, `.heading-gradient`, `.section-padding`, `.section-first`, `.section-last`
  - `@layer utilities`: `.bg-hex-pattern`, `.bg-hex-hero`, `.bg-hex-section`, `.bg-hex-decorative`
  - Transiciones globales (color, background-color, border-color, box-shadow, transform) duración 200ms
  - Clase `.no-transition` para elementos animados por GSAP
- **Criterios de aceptación**:
  - [ ] Compila sin errores con `astro dev`
  - [ ] `bg-hex-pattern` renderiza el patrón SVG de hexágonos
  - [ ] `bg-hex-hero` tiene el glow gradient + hex pattern
  - [ ] `bg-hex-section` tiene el gradient glow inferior
  - [ ] `bg-hex-decorative` tiene clip-path de hexágono + blur
  - [ ] Scrollbar styling presente (oscuro, sutil)
  - [ ] `::selection` con color indigo-500/30
  - [ ] No hay reglas para light mode
- **Estimación**: Media (1 archivo, ~100 líneas)

---

### T-1.12: Crear `src/layouts/BaseLayout.astro`

- **Etapa**: 1
- **Dependencias**: T-1.1, T-1.11
- **Archivos**:
  - Crear: `src/layouts/BaseLayout.astro`
- **Props**: `title`, `description`, `ogImage?`, `ogType?`, `canonical?`, `jsonLd?`
- **Contenido**:
  - `<!doctype html>` con `<html lang="es" class="bg-zinc-950 text-zinc-100">`
  - Meta tags: charset, viewport, color-scheme, author, description, title, canonical
  - OpenGraph tags: og:type, og:title, og:description, og:image, og:url
  - Twitter Card: summary_large_image
  - Favicons: /favicon.svg (light), /favicon-white.svg (dark), apple-touch-icon
  - Manifest: /site.webmanifest
  - Font: preconnect + stylesheet a rsms.me/inter/inter.css
  - JSON-LD script condicional
  - `<body class="antialiased min-h-screen">` con `<slot />`
- **Criterios de aceptación**:
  - [ ] Renderiza HTML5 doctype completo
  - [ ] OG tags presentes con fallback a valores por defecto
  - [ ] JSON-LD se renderiza solo si `jsonLd` prop está presente
  - [ ] preconnect a rsms.me con crossorigin
  - [ ] No renderiza etiquetas vacías (ej: sin JSON-LD si no hay prop)
  - [ ] `astro dev` funciona sin errores
- **Estimación**: Baja (1 archivo)

---

### T-1.13: Crear `src/layouts/PageLayout.astro`

- **Etapa**: 1
- **Dependencias**: T-1.12
- **Archivos**:
  - Crear: `src/layouts/PageLayout.astro`
- **Props**: todas las de BaseLayout + `mode: 'freelance' | 'recruiter'`
- **Contenido**:
  - Wrappeo con `BaseLayout`
  - Renderiza `<Navbar mode={mode} />` antes del main
  - Renderiza `<main>` con `<slot />`
  - Renderiza `<Footer mode={mode} />` después del main
  - `<script>` con ScrollTrigger para efecto de navbar scrolled:
    - Selecciona `[data-navbar]`
    - `ScrollTrigger.create` con `start: 'top -50px'`
    - Toggle class `navbar-scrolled` según `self.progress > 0`
- **Criterios de aceptación**:
  - [ ] Acepta `mode` y lo pasa a Navbar y Footer
  - [ ] Spread de `...baseProps` a BaseLayout
  - [ ] Script de navbar scroll funciona sin errores
  - [ ] `tsc --noEmit` pasa sin errores
- **Estimación**: Baja (1 archivo)

---

### T-1.14: Modificar `tailwind.config.mjs`

- **Etapa**: 1
- **Dependencias**: T-1.1
- **Archivos**:
  - Modificar: `tailwind.config.mjs`
- **Cambios**:
  - Agregar `fontFamily.sans` con `['InterVariable', 'Inter', 'system-ui', 'sans-serif']`
  - Agregar `colors.accent` con `{ from: '#6366f1', to: '#8b5cf6' }`
  - Agregar `backgroundImage['gradient-radial']`
  - Agregar `animation` fade-in (0.5s) y slide-up (0.5s)
  - Agregar `keyframes` fadeIn y slideUp
  - Mantener `@tailwindcss/typography` en plugins
- **Criterios de aceptación**:
  - [ ] `font-sans` incluye InterVariable con fallbacks
  - [ ] `accent-from` y `accent-to` mapean a los valores del design system
  - [ ] `tsc --noEmit` pasa sin errores
  - [ ] `astro dev` inicia sin warnings
- **Estimación**: Baja (1 archivo)

---

### T-1.15: Modificar `astro.config.mjs` (sitemap, limpiar dependencias)

- **Etapa**: 1
- **Dependencias**: T-1.1
- **Archivos**:
  - Modificar: `astro.config.mjs`
  - Modificar: `package.json` (remover @keystatic/astro, @keystatic/core, @astrojs/markdoc, @astrojs/node)
- **Cambios en `astro.config.mjs`**:
  - Agregar import `sitemap` from `@astrojs/sitemap`
  - Agregar `site: 'https://www.nicorodriguez.com.ar'`
  - Mantener `output: 'static'`
  - Remover `adapter: node(...)`
  - Remover `keystatic()` integration
  - Remover `markdoc()` integration
  - Agregar `sitemap({ changefreq: 'monthly', priority: 1.0, lastmod: new Date(), filter: (page) => page !== 'https://www.nicorodriguez.com.ar/404/' })`
- **Dependencias a instalar**: `pnpm add @astrojs/sitemap`
- **Dependencias a remover**: `@keystatic/astro`, `@keystatic/core`, `@astrojs/markdoc`, `@astrojs/node`, `split-type`
- **Criterios de aceptación**:
  - [ ] `astro dev` inicia sin errores ni warnings
  - [ ] `pnpm astro build` produce output estático
  - [ ] No hay referencias a keystatic, markdoc, node adapter
  - [ ] Sitemap genera URLs correctas
- **Estimación**: Media (2 archivos)

---

### T-1.16: Limpiar archivos legacy de Keystatic

- **Etapa**: 1
- **Dependencias**: T-1.15
- **Archivos**:
  - Eliminar: `keystatic.config.ts`
  - Eliminar: `src/lib/content.ts`
  - Eliminar: `src/constants/contact.js`
  - Eliminar: `src/constants/technologies.js`
  - Eliminar: `content/` (directorio completo con collections)
  - Eliminar: `keystatic/` (directorio si existe)
- **Criterios de aceptación**:
  - [ ] No queda ningún archivo de Keystatic en el proyecto
  - [ ] `astro dev` funciona sin errores (ningún import roto)
  - [ ] No hay referencias a `@keystatic/core` o `@keystatic/astro`
  - [ ] `content/collections/` ya no existe
- **Estimación**: Media (5+ archivos a eliminar)

---

## Etapa 2 — UI Kit (componentes base)

### T-2.1: Crear `src/components/ui/Button.tsx`

- **Etapa**: 2
- **Dependencias**: T-1.1, T-1.2
- **Archivos**:
  - Crear: `src/components/ui/Button.tsx`
- **Props**: `variant`, `size`, `href?`, `download?`, `external?`, `disabled?`, `children`, `icon?`, `iconPosition?`, `onClick?`, `className?`, `ariaLabel?`
- **Comportamiento**:
  - Polimórfico: `<a>` si tiene `href`, `<button>` si no
  - Si `external`, agrega `target="_blank"` y `rel="noopener noreferrer"`
  - Si `download`, agrega atributo `download`
  - Si `disabled`, agrega `aria-disabled` y clase `opacity-50 cursor-not-allowed`
- **Estados**: Default, Hover, Active (`scale-[0.98]`), Focus visible, Disabled según tabla del design system
- **Sizes**: sm (`px-3 py-1.5 text-sm`), md (`px-5 py-2.5 text-sm`), lg (`px-7 py-3.5 text-base`)
- **Criterios de aceptación**:
  - [ ] Renderiza `<a>` cuando tiene `href`
  - [ ] Renderiza `<button>` cuando no tiene `href`
  - [ ] Variante primary tiene gradiente indigo→violet
  - [ ] Variante secondary tiene bg-zinc-800 + border
  - [ ] Variante ghost tiene text-zinc-400
  - [ ] Icon se renderiza en la posición indicada
  - [ ] External links tienen `target="_blank" rel="noopener noreferrer"`
  - [ ] Download links tienen atributo `download`
  - [ ] `className` se mergea con clases internas (vía `cn()`)
- **Estimación**: Media (1 archivo, ~80 líneas)

---

### T-2.2: Crear `src/components/ui/Container.astro`

- **Etapa**: 2
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/components/ui/Container.astro`
- **Props**: `size?`, `className?`, `as?`, `id?`
- **Variants**:
  - `default`: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
  - `narrow`: `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8`
- **Criterios de aceptación**:
  - [ ] Renderiza como `div` por defecto
  - [ ] Renderiza como `section` o `article` cuando se pasa `as`
  - [ ] `size="narrow"` aplica `max-w-3xl`
  - [ ] `className` se mergea correctamente
- **Estimación**: Baja (1 archivo)

---

### T-2.3: Crear `src/components/ui/SectionTitle.astro`

- **Etapa**: 2
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/components/ui/SectionTitle.astro`
- **Props**: `title`, `subtitle?`, `align?`, `as?`, `gradient?`, `className?`
- **Comportamiento**:
  - Por defecto: `align="center"`, `gradient=true`, `as="h2"`
  - Si `gradient`, aplica `heading-gradient` class
  - Si `align === 'center'`, titulo centrado y subtitle con `mx-auto`
  - No renderiza `<p>` si no hay subtitle
- **Criterios de aceptación**:
  - [ ] Renderiza como `h1`/`h2`/`h3` según `as`
  - [ ] Título con gradiente cuando `gradient=true`
  - [ ] Sin gradiente cuando `gradient=false`
  - [ ] No renderiza `<p>` vacío si no hay subtitle
  - [ ] `align="left"` alinea a la izquierda
- **Estimación**: Baja (1 archivo)

---

### T-2.4: Crear `src/components/ui/TechBadge.astro`

- **Etapa**: 2
- **Dependencias**: T-1.1, T-1.5
- **Archivos**:
  - Crear: `src/components/ui/TechBadge.astro`
- **Props**: `technology`, `technologies?`, `size?`, `className?`
- **Comportamiento**:
  - Busca la tecnología en el map de `technologies` (por defecto usa `@/data/technologies`)
  - Si la encuentra, aplica color según categoría:
    - `frontend`: bg-sky-500/10, text-sky-400, border-sky-500/20
    - `backend`: bg-emerald-500/10, text-emerald-400, border-emerald-500/20
    - `database`: bg-amber-500/10, text-amber-400, border-amber-500/20
    - `tools`: bg-zinc-500/10, text-zinc-400, border-zinc-500/20
  - Si no encuentra la tecnología: colores neutrales (bg-zinc-500/10)
  - `aria-label` con la categoría (ej: "Frontend: React")
- **Criterios de aceptación**:
  - [ ] Badge con color correcto según categoría
  - [ ] Unknown tech: colores neutrales, no crash
  - [ ] `size="sm"` version más pequeña
  - [ ] `aria-label` descriptivo
- **Estimación**: Baja (1 archivo)

---

### T-2.5: Crear `src/components/ui/AnimatedSection.tsx`

- **Etapa**: 2
- **Dependencias**: T-1.1, T-1.10
- **Archivos**:
  - Crear: `src/components/ui/AnimatedSection.tsx`
- **Props**: `animation?`, `duration?`, `delay?`, `stagger?`, `threshold?`, `once?`, `className?`, `children`, `as?`, `id?`
- **Animation presets**:
  - `fade`: opacity 0, y: 20
  - `slide-up`: opacity 0, y: 40
  - `slide-left`: opacity 0, x: -30
  - `blur`: opacity 0, filter blur(4px)
  - `scale`: opacity 0, scale(0.95)
- **Comportamiento**:
  - useRef + useEffect con GSAP context pattern
  - Si `stagger > 0`, anima `ref.current.children` secuencialmente
  - ScrollTrigger con `start: 'top 85%'` (default), `once: true`
  - `prefersReducedMotion()`: early return sin animación, render directo
  - Cleanup: `ctx.revert()` en return de useEffect
  - `will-change: transform, opacity` en elementos animados, cleanup a `auto`
  - Usa `as` prop para el tag contenedor (div/section/article)
- **Criterios de aceptación**:
  - [ ] Animación fade-in en scroll con GSAP
  - [ ] Stagger anima hijos secuencialmente
  - [ ] `prefers-reduced-motion` desactiva toda animación
  - [ ] No layout shift (solo transform + opacity)
  - [ ] Cleanup mata ScrollTriggers al desmontar
  - [ ] `will-change` se limpia después de la animación
- **Estimación**: Media (1 archivo, ~80 líneas)

---

## Etapa 3 — Shared Components

### T-3.1: Crear `src/components/shared/Navbar.astro`

- **Etapa**: 3
- **Dependencias**: T-2.1, T-2.2
- **Archivos**:
  - Crear: `src/components/shared/Navbar.astro`
- **Props**: `mode: 'freelance' | 'recruiter'`, `className?`
- **Link sets**:
  - freelance: Inicio (`/`), Servicios (`/#servicios`), Casos de Éxito (`/#casos`), FAQ (`/#faq`), cross-link "¿Buscás un desarrollador? →" (`/hire-me`)
  - recruiter: Sobre mí (`/#about`), Stack (`/#stack`), Experiencia (`/#experience`), Proyectos (`/#projects`), sin cross-link
- **Data attribute**: `<nav data-navbar>` (para ScrollTrigger en PageLayout)
- **Estados**:
  - Default (top): `bg-transparent backdrop-blur-none`
  - Scrolled (> 50px): clase `navbar-scrolled` via JS (añade `bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50 shadow-lg`)
  - Mobile menu: overlay full-screen slide-in desde derecha (0.3s ease)
- **Mobile behavior**:
  - Hamburger icon (3 líneas → X al abrir)
  - Overlay con `bg-zinc-950/95 backdrop-blur-xl`
  - Focus trap dentro del menú
  - Click en link cierra y navega (scroll smooth)
  - Escape key cierra
  - Body scroll lock
- **Criterios de aceptación**:
  - [ ] Navbar con `data-navbar` attribute
  - [ ] Freelance mode: links correctos + cross-link a /hire-me
  - [ ] Recruiter mode: links correctos, sin cross-link
  - [ ] Scroll background cambia > 50px
  - [ ] Mobile: hamburger → overlay con animación
  - [ ] Mobile: focus trap funcional
  - [ ] Mobile: body scroll lock cuando menú abierto
  - [ ] Escape key cierra el menú
- **Estimación**: Alta (1 archivo, ~150 líneas)

---

### T-3.2: Crear `src/components/shared/Footer.astro`

- **Etapa**: 3
- **Dependencias**: T-2.2
- **Archivos**:
  - Crear: `src/components/shared/Footer.astro`
- **Props**: `mode: 'freelance' | 'recruiter'`, `className?`
- **Sections**:
  - Left: logo/nombre "Nicolás Rodríguez", social icons (LinkedIn, GitHub) con SVGs inline
  - Right: nav links del modo actual (mismos que Navbar sin cross-link)
  - Bottom: copyright `© {currentYear} Nicolás Rodríguez. Todos los derechos reservados.`
- **Criterios de aceptación**:
  - [ ] Footer con border-top sutil
  - [ ] Nombre linkea a `/` en freelance, `/hire-me` en recruiter
  - [ ] LinkedIn y GitHub icons renderizan y linkean correctamente
  - [ ] Nav links del modo actual
  - [ ] Año dinámico: `new Date().getFullYear()`
  - [ ] Texto de copyright correcto
- **Estimación**: Media (1 archivo)

---

### T-3.3: Crear `src/components/shared/Hero.astro`

- **Etapa**: 3
- **Dependencias**: T-2.1, T-2.2
- **Archivos**:
  - Crear: `src/components/shared/Hero.astro`
- **Props**: `headline`, `subtitle?`, `subtitleSize?`, `buttons`, `align?`, `media?`, `gradient?`, `className?`
- **Variants**:
  - Freelance default: `align="center"`, `gradient=true`, `subtitleSize="lg"`, media (foto)
  - Recruiter default: `align="left"`, `gradient=true`, `subtitleSize="sm"`, sin media
- **Layout**:
  - `min-h-[85vh]` flex, centrado vertical
  - Background `bg-hex-hero` si `gradient=true`
  - Media (foto redonda con ring opcional)
  - Headline `text-4xl md:text-5xl lg:text-6xl font-bold`
  - Subtitle con tamaño según `subtitleSize`
  - Botones con flex-wrap y gap
  - Hexágono decorativo grande (bg-hex-decorative) posicionado, solo ≥ 768px
- **Criterios de aceptación**:
  - [ ] Headline renderiza el texto correcto
  - [ ] Subtitle opcional: no renderiza si no hay
  - [ ] Media slot opcional
  - [ ] Botones centrados o alineados a izquierda según `align`
  - [ ] Fondo gradient-hero cuando `gradient=true`
  - [ ] Hexágono decorativo visible solo ≥ 768px
  - [ ] `min-h-[85vh]` se mantiene en todas las viewports
- **Estimación**: Media (1 archivo, ~80 líneas)

---

### T-3.4: Crear `src/components/shared/CTA.astro`

- **Etapa**: 3
- **Dependencias**: T-2.1, T-2.2
- **Archivos**:
  - Crear: `src/components/shared/CTA.astro`
- **Props**: `headline`, `description?`, `buttons`, `variant?`, `className?`
- **Variants**:
  - `default`: fondo con bg-hex-section, sin border
  - `card`: bg-zinc-900 + border-zinc-800 + rounded-2xl + shadow
- **Criterios de aceptación**:
  - [ ] Headline renderiza correctamente
  - [ ] Description opcional
  - [ ] Botones se renderizan con variant correcta
  - [ ] `variant="card"` tiene bg-secondary + border
  - [ ] Responsive: botones stack en mobile
- **Estimación**: Baja (1 archivo)

---

### T-3.5: Crear `src/components/shared/ProjectCard.tsx`

- **Etapa**: 3
- **Dependencias**: T-2.4 (TechBadge)
- **Archivos**:
  - Crear: `src/components/shared/ProjectCard.tsx`
- **Props**: `title`, `description`, `image?`, `technologies`, `linkToCode?`, `deployedSite?`, `casoExito?`, `slug?`
- **Layout**:
  - Card: `bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden`
  - Imagen: `aspect-video` container, `object-cover w-full h-full`, hover scale-105
  - Placeholder sin imagen: gradiente from-zinc-800 to-zinc-900 + iniciales del título
  - Content area: title, description, tech badges, action buttons
  - CasoExito: problema, solución, resultado (si existe)
- **Estados**:
  - Default: border-zinc-800 shadow-sm
  - Hover: border-zinc-700 shadow-md -translate-y-0.5
  - Focus visible: ring-2 ring-indigo-400
- **Criterios de aceptación**:
  - [ ] Card con imagen y aspect-ratio container
  - [ ] Placeholder gradiente si falta imagen
  - [ ] TechBadges se renderizan correctamente
  - [ ] GitHub y Demo buttons solo si existen los links
  - [ ] CasoExito se renderiza si existe
  - [ ] Hover: translate-y y shadow cambian
  - [ ] No layout shift por carga de imagen
- **Estimación**: Alta (1 archivo, ~120 líneas)

---

### T-3.6: Crear `src/components/shared/Timeline.astro`

- **Etapa**: 3
- **Dependencias**: Ninguna de UI Kit (usa HTML directo)
- **Archivos**:
  - Crear: `src/components/shared/Timeline.astro`
- **Props**: `items: TimelineItem[]`, `className?`
- **TimelineItem**: `date`, `title`, `subtitle`, `description?`, `children?`, `isCurrent?`
- **Layout**:
  - Línea vertical absoluta: `left-4 md:left-6`, `w-px bg-zinc-800`
  - Dot en la línea: 12px círculo, `bg-indigo-500` si isCurrent, `bg-zinc-900` si no
  - Content card: `bg-zinc-900 border border-zinc-800 rounded-xl p-6`
  - Fecha: `text-sm text-zinc-500`
  - Título: `text-xl font-semibold`
  - Subtítulo: `text-zinc-400`
  - Slot `children` para contenido adicional (TechBadges, listas)
- **Criterios de aceptación**:
  - [ ] Línea vertical se extiende full height
  - [ ] Dot accent para item "current"
  - [ ] Cards con espaciado vertical consistente
  - [ ] Slot children renderiza correctamente
  - [ ] Sin hardcoded text
- **Estimación**: Media (1 archivo, ~70 líneas)

---

### T-3.7: Crear `src/components/shared/ExperienceCard.tsx`

- **Etapa**: 3
- **Dependencias**: T-2.4 (TechBadge)
- **Archivos**:
  - Crear: `src/components/shared/ExperienceCard.tsx`
- **Props**: `experience: Experience`, `className?`
- **Contenido**:
  - Company + role como header
  - Date range (formatDateRange)
  - Lista de responsibilities (si existe)
  - Lista de achievements (si existe)
  - TechBadges con technologies del experience
  - Logo de empresa (opcional, placeholder si no)
- **Criterios de aceptación**:
  - [ ] Renderiza company, role, date range
  - [ ] Responsibilities list solo si hay datos
  - [ ] Achievements list solo si hay datos
  - [ ] TechBadges renderizan correctamente
  - [ ] No renderiza `<ul>` vacío si no hay items
- **Estimación**: Baja (1 archivo)

---

### T-3.8: Crear `src/components/shared/ServiceCard.tsx`

- **Etapa**: 3
- **Dependencias**: T-2.1? (puede usar Button opcional)
- **Archivos**:
  - Crear: `src/components/shared/ServiceCard.tsx`
- **Props**: `service: Service`, `className?`
- **Layout**:
  - Card: `bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3`
  - Icono (SVG inline o emoji como placeholder)
  - Título: `text-xl font-semibold`
  - Descripción: `text-zinc-400`
  - Features list con checkmarks
  - Hover: border-zinc-700 shadow-md
- **Criterios de aceptación**:
  - [ ] Icono, título, descripción renderizan
  - [ ] Features list renderiza correctamente
  - [ ] Hover state funcional
  - [ ] Layout responsive (columnas en grid padre)
- **Estimación**: Baja (1 archivo)

---

### T-3.9: Crear `src/components/shared/FAQ.tsx`

- **Etapa**: 3
- **Dependencias**: T-1.1
- **Archivos**:
  - Crear: `src/components/shared/FAQ.tsx`
- **Props**: `items: FAQItem[]`, `className?`
- **Comportamiento**:
  - React component con useState para item activo
  - Single open: solo un item expandido a la vez
  - Toggle off: click en item abierto lo cierra
  - Animación max-height via CSS transition (0.3s ease)
  - `aria-expanded` y `aria-controls` en cada trigger
  - `id` vinculado entre button y panel de respuesta
  - Keyboard: Enter/Space abre/cierra, Tab navega
- **Criterios de aceptación**:
  - [ ] Single open: click abre uno, cierra el anterior
  - [ ] Toggle off: click en abierto lo cierra
  - [ ] Animación suave de altura
  - [ ] `aria-expanded` se actualiza correctamente
  - [ ] Keyboard navegable (Enter, Space, Tab)
  - [ ] No console errors
- **Estimación**: Media (1 archivo, ~90 líneas)

---

## Etapa 4 — Freelance Landing (`/`)

### T-4.1: Crear `src/components/freelance/ServicesSection.astro`

- **Etapa**: 4
- **Dependencias**: T-3.8 (ServiceCard), T-2.2 (Container), T-2.3 (SectionTitle), T-2.5 (AnimatedSection)
- **Archivos**:
  - Crear: `src/components/freelance/ServicesSection.astro`
- **Contenido**:
  - Section con `id="servicios"`
  - Container → SectionTitle "Servicios" con subtitle
  - Grid responsive: 1 col ≤ 639px, 2 cols 640-1023px, 4 cols ≥ 1024px
  - AnimatedSection con stagger para animar cards
  - Map de `services` a `ServiceCard`
- **Criterios de aceptación**:
  - [ ] Section con id="servicios"
  - [ ] SectionTitle con título y subtítulo correctos
  - [ ] Grid 1→2→4 columnas responsive
  - [ ] AnimatedSection envuelve las cards
  - [ ] No renderiza si services está vacío
- **Estimación**: Baja (1 archivo)

---

### T-4.2: Crear `src/components/freelance/ProcessSection.astro`

- **Etapa**: 4
- **Dependencias**: T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/freelance/ProcessSection.astro`
- **Proceso de 6 pasos**:
  1. "Reunión" — "Entendemos tu proyecto y objetivos"
  2. "Propuesta" — "Te presento alcance y presupuesto"
  3. "Diseño" — "Maqueta y diseño de la interfaz"
  4. "Desarrollo" — "Programación y pruebas"
  5. "Entrega" — "Deploy y configuración final"
  6. "Soporte" — "Mantenimiento y ajustes post-lanzamiento"
- **Layout visual**:
  - Números conectados visualmente (grid o timeline horizontal en desktop)
  - Mobile: vertical, desktop: grid 2×3 o 3×2
  - Cada paso: número grande + título + descripción
- **Criterios de aceptación**:
  - [ ] 6 pasos con número, título y descripción
  - [ ] Conexión visual entre pasos
  - [ ] Responsive: vertical mobile, grid desktop
  - [ ] Animación con AnimatedSection
- **Estimación**: Media (1 archivo)

---

### T-4.3: Crear `src/components/freelance/SuccessCases.astro`

- **Etapa**: 4
- **Dependencias**: T-3.5 (ProjectCard), T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/freelance/SuccessCases.astro`
- **Contenido**:
  - Section con `id="casos"`
  - Importa `projects` de `@/data/projects`
  - Filtra `projects.filter(p => p.casoExito && p.casoExito.problema && p.casoExito.solucion && p.casoExito.resultado)`
  - Grid responsive de ProjectCards
  - Section vacía si no hay casos de éxito
- **Criterios de aceptación**:
  - [ ] Section con id="casos"
  - [ ] Solo projects con casoExito completo
  - [ ] Grid responsive 1→2→3 columnas
  - [ ] No renderiza si no hay casos válidos
  - [ ] Cada card muestra problema, solución, resultado
- **Estimación**: Baja (1 archivo)

---

### T-4.4: Crear `src/components/freelance/FAQSection.astro`

- **Etapa**: 4
- **Dependencias**: T-3.9 (FAQ), T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/freelance/FAQSection.astro`
- **Contenido**:
  - Section con `id="faq"`
  - Container narrow (max-w-3xl)
  - SectionTitle con "Preguntas frecuentes"
  - FAQ component con items de `@/data/faq`
- **Criterios de aceptación**:
  - [ ] Section con id="faq"
  - [ ] FAQ items desde data
  - [ ] Container narrow para mejor legibilidad
  - [ ] No renderiza si FAQ vacío
- **Estimación**: Baja (1 archivo)

---

### T-4.5: Crear `src/pages/index.astro` (ensamblar freelance landing)

- **Etapa**: 4
- **Dependencias**: T-4.1, T-4.2, T-4.3, T-4.4, T-3.3 (Hero), T-3.4 (CTA)
- **Archivos**:
  - Modificar: `src/pages/index.astro`
- **Contenido**:
  - PageLayout con `mode="freelance"`
  - SEO metadata específica (title, description, canonical, ogImage)
  - JSON-LD como `LocalBusiness`
  - Hero: headline/subtitle freelance + foto perfil + botón WhatsApp
  - ServicesSection
  - ProcessSection
  - SuccessCases
  - FAQSection
  - CTA: "¿Tenés un proyecto en mente?" + botón WhatsApp
- **Criterios de aceptación**:
  - [ ] Hero con contenido freelance correcto
  - [ ] Todas las secciones en orden
  - [ ] WhatsApp link con wa.me + mensaje predefinido
  - [ ] JSON-LD como LocalBusiness
  - [ ] SEO metadata única
  - [ ] Navbar con cross-link a /hire-me
  - [ ] `astro build` sin errores
  - [ ] Sin console errors en navegación
- **Estimación**: Media (1 archivo, ~80 líneas)

---

## Etapa 5 — Recruiter Landing (`/hire-me`)

### T-5.1: Crear `src/components/portfolio/AboutSection.astro`

- **Etapa**: 5
- **Dependencias**: T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/portfolio/AboutSection.astro`
- **Props**: `profile: Profile`
- **Contenido**:
  - Section con `id="about"`
  - Prose con datos del perfil profesional:
    - "Full Stack Developer con experiencia en React, PHP, Python y desarrollo de sistemas ERP."
    - "Apasionado por la arquitectura de software, el backend y resolver problemas complejos."
    - "Actualmente enfocado en desarrollo web moderno con Astro, React y TypeScript."
- **Criterios de aceptación**:
  - [ ] Section con id="about"
  - [ ] Prose legible con max-w adecuado
  - [ ] Menciona experiencia, ERP, arquitectura, backend
- **Estimación**: Baja (1 archivo)

---

### T-5.2: Crear `src/components/portfolio/StackSection.astro`

- **Etapa**: 5
- **Dependencias**: T-2.4 (TechBadge), T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/portfolio/StackSection.astro`
- **Props**: `technologies: Record<string, Technology>`
- **Contenido**:
  - Section con `id="stack"`
  - Agrupa technologies por categoría
  - 4 categorías: "Frontend", "Backend", "Bases de datos", "Herramientas"
  - Cada categoría: heading + flex-wrap de TechBadges
  - No renderiza categoría vacía
- **Criterios de aceptación**:
  - [ ] Section con id="stack"
  - [ ] 4 categorías con headings correctos
  - [ ] TechBadges con colores por categoría
  - [ ] Categoría vacía no se renderiza
- **Estimación**: Baja (1 archivo)

---

### T-5.3: Crear `src/components/portfolio/ExperienceSection.astro`

- **Etapa**: 5
- **Dependencias**: T-3.6 (Timeline), T-3.7 (ExperienceCard), T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/portfolio/ExperienceSection.astro`
- **Contenido**:
  - Section con `id="experience"`
  - Mapea `experiences` de `@/data/experience`
  - Reverse chronological (most recent first)
  - Timeline con ExperienceCards como children
  - FormatDateRange para fechas
- **Criterios de aceptación**:
  - [ ] Section con id="experience"
  - [ ] Timeline con orden reverse cronológico
  - [ ] "Presente" para trabajo actual
  - [ ] Dot accent para entry actual
  - [ ] TechBadges se renderizan dentro de cada card
- **Estimación**: Baja (1 archivo)

---

### T-5.4: Crear `src/components/portfolio/ProjectsSection.astro`

- **Etapa**: 5
- **Dependencias**: T-3.5 (ProjectCard), T-2.2, T-2.3, T-2.5
- **Archivos**:
  - Crear: `src/components/portfolio/ProjectsSection.astro`
- **Contenido**:
  - Section con `id="projects"`
  - Filtra `projects.filter(p => p.destacado).sort((a, b) => a.orden - b.orden)`
  - Grid responsive de ProjectCards
- **Criterios de aceptación**:
  - [ ] Section con id="projects"
  - [ ] Solo projects con `destacado: true`
  - [ ] Ordenados por `orden` ascendente
  - [ ] Grid responsive 1→2→3 columnas
  - [ ] No renderiza si no hay projects destacados
- **Estimación**: Baja (1 archivo)

---

### T-5.5: Crear `src/pages/hire-me.astro` (ensamblar recruiter landing)

- **Etapa**: 5
- **Dependencias**: T-5.1, T-5.2, T-5.3, T-5.4, T-3.3 (Hero), T-3.4 (CTA), T-4.5
- **Archivos**:
  - Crear: `src/pages/hire-me.astro`
- **Contenido**:
  - PageLayout con `mode="recruiter"`
  - SEO metadata específica (title, description, canonical, ogImage)
  - JSON-LD como `Person`
  - Hero: nombre, "Full Stack Developer", value prop, 3 botones (CV, LinkedIn, GitHub)
  - AboutSection con profile
  - StackSection con technologies
  - ExperienceSection
  - ProjectsSection
  - CTA: "¿Buscás un desarrollador para tu equipo?" + CV download + mailto
- **Criterios de aceptación**:
  - [ ] Hero con contenido recruiter correcto
  - [ ] "Descargar CV" con atributo download
  - [ ] LinkedIn y GitHub abren en nueva pestaña con rel="noopener noreferrer"
  - [ ] JSON-LD como Person
  - [ ] Navbar sin cross-link a /hire-me
  - [ ] SEO metadata única
  - [ ] `astro build` sin errores
  - [ ] Sin console errors
- **Estimación**: Media (1 archivo, ~70 líneas)

---

## Etapa 6 — SEO + Performance

### T-6.1: Crear `public/robots.txt`

- **Etapa**: 6
- **Dependencias**: T-4.5, T-5.5
- **Archivos**:
  - Crear: `public/robots.txt`
- **Contenido**:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://www.nicorodriguez.com.ar/sitemap-index.xml
  ```
- **Criterios de aceptación**:
  - [ ] robots.txt existe en public/
  - [ ] Contenido correcto con Allow: /
  - [ ] Referencia al sitemap
  - [ ] Retorna 200 en `astro build`
- **Estimación**: Baja (1 archivo)

---

### T-6.2: Crear `public/site.webmanifest`

- **Etapa**: 6
- **Dependencias**: T-4.5
- **Archivos**:
  - Crear: `public/site.webmanifest`
- **Contenido**:
  ```json
  {
    "name": "Nicolás Rodríguez | Desarrollo Web",
    "short_name": "NicoDev",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0a0a0b",
    "theme_color": "#0a0a0b",
    "icons": [
      { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
      { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
  }
  ```
- **Criterios de aceptación**:
  - [ ] webmanifest con JSON válido
  - [ ] Icon paths correctos
  - [ ] theme_color y background_color consistentes con dark mode
- **Estimación**: Baja (1 archivo)

---

### T-6.3: Generar OG images y assets estáticos

- **Etapa**: 6
- **Dependencias**: T-4.5, T-5.5
- **Archivos**:
  - Crear: `public/og-freelance.jpg`
  - Crear: `public/og-recruiter.jpg`
  - Crear: `public/og-default.jpg`
  - Crear: `public/apple-touch-icon.png` (180×180)
  - Crear: `public/icon-192.png` (192×192)
  - Crear: `public/icon-512.png` (512×512)
- **Nota**: Las imágenes OG pueden ser generadas con un script de Astro o colocadas manualmente como assets estáticos. Para una primera iteración, usar assets placeholder que cumplan con las dimensiones mínimas (≥ 1200×630 para OG).
- **Criterios de aceptación**:
  - [ ] og-freelace.jpg existe (1200×630 mínimo)
  - [ ] og-recruiter.jpg existe (1200×630 mínimo)
  - [ ] og-default.jpg existe (fallback)
  - [ ] apple-touch-icon.png existe (180×180)
  - [ ] icon-192.png y icon-512.png existen
  - [ ] OG images referenciadas desde BaseLayout cargan correctamente
- **Estimación**: Media (6 archivos)

---

### T-6.4: Crear `src/pages/404.astro`

- **Etapa**: 6
- **Dependencias**: T-2.1, T-1.12 (BaseLayout)
- **Archivos**:
  - Crear: `src/pages/404.astro`
- **Contenido**:
  - BaseLayout con title "Página no encontrada"
  - 404 grande con heading-gradient
  - Mensaje "La página que buscas no existe"
  - Subtítulo "O fue movida, o nunca existió. Volvamos al inicio."
  - Botón "Volver al inicio" → `/`
- **Criterios de aceptación**:
  - [ ] 404 page con diseño consistente
  - [ ] heading-gradient en el número 404
  - [ ] Botón linkea a `/`
  - [ ] Filtrada del sitemap (config astro)
- **Estimación**: Baja (1 archivo)

---

### T-6.5: Verificar sitemap generation

- **Etapa**: 6
- **Dependencias**: T-4.5, T-5.5, T-6.4
- **Archivos**:
  - Verificar: `astro.config.mjs` (config sitemap)
  - Verificar output build
- **Comprobación**:
  - Ejecutar `pnpm astro build`
  - Verificar `dist/sitemap-index.xml` existe
  - Verificar URLs: `/` y `/hire-me` presentes
  - Verificar `404/` NO está en el sitemap
- **Criterios de aceptación**:
  - [ ] build produce sitemap-index.xml
  - [ ] `/` con priority 1.0
  - [ ] `/hire-me` con priority 0.8
  - [ ] 404 excluido del sitemap
- **Estimación**: Baja (verificación)

---

### T-6.6: Verificar JSON-LD en ambas páginas

- **Etapa**: 6
- **Dependencias**: T-4.5, T-5.5
- **Archivos**:
  - Verificar: `src/pages/index.astro`
  - Verificar: `src/pages/hire-me.astro`
- **Comprobación**:
  - `astro build` + inspeccionar HTML generado
  - `/`: `<script type="application/ld+json">` con `@type: "LocalBusiness"`
  - `/hire-me`: `<script type="application/ld+json">` con `@type: "Person"`
- **Criterios de aceptación**:
  - [ ] `/` tiene JSON-LD LocalBusiness con name, description, url, telephone, email, sameAs
  - [ ] `/hire-me` tiene JSON-LD Person con name, jobTitle, url, sameAs
  - [ ] Ambos tienen `@context: 'https://schema.org'`
- **Estimación**: Baja (verificación)

---

### T-6.7: Image optimization (WebP, lazy loading, dimensiones)

- **Etapa**: 6
- **Dependencias**: T-4.5, T-5.5
- **Archivos**:
  - Modificar: imágenes existentes en `public/` (convertir a WebP si es necesario)
  - Modificar: componentes que usan imágenes (Hero.astro, ProjectCard.tsx)
- **Tareas**:
  - Verificar que todas las imágenes en `public/` existentes ya están en WebP (beo-landing1.webp, etc.)
  - Agregar `loading="eager"` en hero
  - Agregar `loading="lazy"` en ProjectCard
  - Agregar `width` y `height` explícitos en todas las imágenes
  - Considerar `<picture>` con fallback para compatibilidad
- **Criterios de aceptación**:
  - [ ] Hero image con `loading="eager"`
  - [ ] Project images con `loading="lazy"`
  - [ ] Todas las imágenes tienen `width` y `height`
  - [ ] Aspect-ratio containers presentes
  - [ ] Lighthouse no reporta "missing explicit width/height"
- **Estimación**: Media (2-3 archivos)

---

### T-6.8: Lighthouse audit y ajustes

- **Etapa**: 6
- **Dependencias**: T-6.1, T-6.2, T-6.3, T-6.5, T-6.6, T-6.7
- **Archivos**:
  - Ejecutar: `pnpm astro build && pnpm astro preview`
  - Verificar métricas en Chrome DevTools
- **Objetivos**:
  - Desktop: ≥ 95 en Performance, Accessibility, Best Practices, SEO
  - Mobile: ≥ 80 en Performance
  - Zero CLS (320-1920px)
  - FCP ≤ 1.5s, LCP ≤ 2.5s, TBT ≤ 100ms
  - No third-party scripts (zero analytics, zero trackers)
  - JS bundle ≤ 100KB gzipped por página
  - CSS bundle ≤ 20KB gzipped por página
- **Ajustes si no cumple**:
  - Revisar bundle (analizar dist/_astro/)
  - Asegurar que GSAP tree-shakea (solo gsap + ScrollTrigger)
  - Verificar que no hay CSS sin usar
- **Criterios de aceptación**:
  - [ ] Lighthouse desktop ≥ 95 todas las categorías
  - [ ] Lighthouse mobile Performance ≥ 80
  - [ ] No console errors
  - [ ] Zero third-party scripts
  - [ ] JS bundle < 100KB gzipped
- **Estimación**: Media (revisión + ajustes)

---

## Review Workload Forecast

### Total aproximado de líneas cambiadas

| Etapa | Archivos creados | Archivos modificados | Archivos eliminados | Est. líneas |
|-------|-----------------|---------------------|-------------------|-------------|
| 1 — Foundation | 13 | 3 | ~5 | ~800 |
| 2 — UI Kit | 5 | 0 | 0 | ~350 |
| 3 — Shared Components | 9 | 0 | 0 | ~700 |
| 4 — Freelance Landing | 4 | 1 | 0 | ~250 |
| 5 — Recruiter Landing | 5 | 0 | 0 | ~250 |
| 6 — SEO + Performance | 8 | 2 | 0 | ~100 |
| **Total** | **44** | **6** | **~5** | **~2,450** |

### ¿Supera las 400 líneas?

**Sí, por mucho.** Este rediseño completo implica ~2,450 líneas estimadas entre archivos nuevos, modificaciones y eliminaciones. Es un cambio masivo.

### Recomendación de PR strategy

**Chained PRs (múltiples PRs encadenados).** No es viable un solo PR de 2,450 líneas. Estrategia recomendada:

| PR | Etapas | Líneas est. | Reviewer focus |
|----|--------|-------------|----------------|
| PR #1 | Etapa 1 (Foundation) | ~800 | Tipos, data, layouts, config |
| PR #2 | Etapa 2 (UI Kit) | ~350 | Componentes base, animaciones |
| PR #3 | Etapa 3 (Shared Components) | ~700 | Navbar, Footer, Hero, CTA, cards |
| PR #4 | Etapas 4+5 (Landings) | ~500 | Páginas, secciones específicas |
| PR #5 | Etapa 6 (SEO + Performance) | ~100 | SEO, imágenes, audit |

**Alternativa**: Si se quiere reducir aún más, dividir PR #3 en dos:
- PR #3a: Navbar, Footer, Hero, CTA (~300 líneas)
- PR #3b: ProjectCard, Timeline, ExperienceCard, ServiceCard, FAQ (~400 líneas)

Cada PR debe indicar en su descripción:
- Qué revisar primero
- Qué está fuera de scope
- Link al PR anterior/siguiente
