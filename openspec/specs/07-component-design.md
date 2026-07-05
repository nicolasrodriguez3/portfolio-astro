# Component Design Specification

Diseño detallado de cada componente del sistema. Todos los componentes tienen TypeScript interfaces completas, definición de estados, variantes, y ejemplos de uso.

---

## UI Base Components

### `Button`

Componente de botón polimórfico: `<a>` cuando tiene `href`, `<button>` cuando no.

#### Props

```typescript
import type { ReactNode } from 'react'

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  href?: string
  download?: boolean
  external?: boolean
  disabled?: boolean
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  className?: string
  ariaLabel?: string
}
```

#### States

| State | Primary | Secondary | Ghost |
|-------|---------|-----------|-------|
| **Default** | Gradiente indigo→violet, texto blanco, border none | `bg-zinc-800 text-zinc-100 border border-zinc-700` | `text-zinc-400` |
| **Hover** | `brightness-110 shadow-lg shadow-indigo-500/20` | `bg-zinc-700 border-zinc-600` | `bg-zinc-800/50 text-zinc-100` |
| **Active** | `scale-[0.98]` | `scale-[0.98]` | `scale-[0.98]` |
| **Focus visible** | `ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-950` | Same | Same |
| **Disabled** | `opacity-50 cursor-not-allowed` | `opacity-50 cursor-not-allowed` | `opacity-50 cursor-not-allowed` |
| **Loading** (futuro) | Reemplazar children con spinner SVG | Same | Same |

#### Sizes

| Size | Padding | Text | Icon gap |
|------|---------|------|----------|
| `sm` | `px-3 py-1.5` | `text-sm` | `gap-1.5` |
| `md` | `px-5 py-2.5` | `text-sm` | `gap-2` |
| `lg` | `px-7 py-3.5` | `text-base` | `gap-2.5` |

#### Rendering logic

```tsx
// Polimorphic: <a> for links, <button> for actions
if (href) {
  const rel = external ? 'noopener noreferrer' : undefined
  const target = external ? '_blank' : undefined
  return (
    <a href={href} download={download} rel={rel} target={target}
       className={classes} aria-label={ariaLabel}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </a>
  )
}
return (
  <button onClick={onClick} disabled={disabled}
          className={classes} aria-label={ariaLabel}>
    {iconPosition === 'left' && icon}
    {children}
    {iconPosition === 'right' && icon}
  </button>
)
```

#### Usage examples

```astro
<!-- Primary CTA → WhatsApp -->
<Button variant="primary" size="lg" href="https://wa.me/549XXXXXXXXX?text=Hola..." external>
  Solicitar presupuesto
</Button>

<!-- Secondary → descargar CV -->
<Button variant="secondary" size="md" href="/cv-nicolas-rodriguez.pdf" download>
  Descargar CV
</Button>

<!-- Ghost → nav link (usado dentro de Navbar) -->
<Button variant="ghost" size="sm" href="#servicios">
  Servicios
</Button>

<!-- Con icono -->
<Button variant="primary" size="md" icon={<GithubIcon />} iconPosition="left" href="..." external>
  GitHub
</Button>
```

---

### `Container`

Wrapper centrado con max-width y padding responsive.

#### Props

```typescript
interface ContainerProps {
  size?: 'default' | 'narrow'
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  id?: string
}
```

#### Variants

| Size | Classes |
|------|---------|
| `default` | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` |
| `narrow` | `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8` |

#### Usage examples

```astro
<Container>
  <SectionTitle title="Servicios" />
</Container>

<Container size="narrow">
  <p class="text-lg">Texto más legible con ancho reducido.</p>
</Container>
```

---

### `SectionTitle`

Título de sección con decoración y subtítulo opcional.

#### Props

```typescript
interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  gradient?: boolean   // si true, usa heading-gradient
  className?: string
}
```

#### States

| Prop | Default | Description |
|------|---------|-------------|
| `align` | `center` | Centrado para la mayoría de secciones. `left` para hero recruiters. |
| `gradient` | `true` | Título con gradiente de acento. |
| `as` | `h2` | `h1` solo en Hero. `h3` en sub-secciones. |

#### Rendering

```tsx
<>
  <Component as={as} className={`font-semibold text-3xl md:text-4xl ${gradient ? 'heading-gradient' : 'text-zinc-100'} ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {title}
  </Component>
  {subtitle && (
    <p class={`text-lg text-zinc-400 mt-4 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      {subtitle}
    </p>
  )}
</>
```

#### Usage examples

```astro
<SectionTitle
  title="Servicios"
  subtitle="Todo lo que necesitás para tener presencia online profesional"
/>

<SectionTitle
  title="Sobre mí"
  subtitle="Full Stack Developer con 4+ años de experiencia"
  align="left"
  gradient={false}
/>
```

---

### `TechBadge`

Badge de tecnología con color según categoría.

#### Props

```typescript
interface TechBadgeProps {
  technology: string           // Key del objeto en technologies data
  technologies?: Record<string, Technology>  // Opcional, usa data si no se pasa
  size?: 'sm' | 'md'
  className?: string
}
```

#### Category color mapping

Ver `08-design-system.md` sección "Categorías de tecnologías".

#### States

| State | Visual |
|-------|--------|
| Default | Badge con bg y border según categoría |
| Hover | `brightness-125` |
| Unknown tech | `bg-zinc-500/10 text-zinc-400 border-zinc-500/20` |

#### Usage examples

```astro
<TechBadge technology="react" />
<TechBadge technology="python" size="sm" />
```

---

### `AnimatedSection`

Wrapper que aplica animación scroll-triggered con GSAP.

#### Props

```typescript
interface AnimatedSectionProps {
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'blur' | 'scale'
  duration?: number        // segundos, default 0.5
  delay?: number           // segundos, default 0
  stagger?: number         // segundos entre hijos, default 0
  threshold?: number       // 0-1, default 0.2 (equivalente a top 85%)
  once?: boolean           // default true
  className?: string
  children: ReactNode
  as?: 'div' | 'section' | 'article'
  id?: string
}
```

#### Animation presets

| Type | From | To | Duration |
|------|------|----|----------|
| `fade` | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.5s |
| `slide-up` | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.6s |
| `slide-left` | opacity: 0, x: -30 | opacity: 1, x: 0 | 0.5s |
| `blur` | opacity: 0, blur(4px) | opacity: 1, blur(0) | 0.6s |
| `scale` | opacity: 0, scale(0.95) | opacity: 1, scale(1) | 0.5s |

#### Implementation outline

```tsx
// Client-side React component (no SSR animation)
// Uses useRef + useEffect with GSAP + ScrollTrigger

useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const ctx = gsap.context(() => {
    const targets = stagger
      ? ref.current?.children
      : ref.current

    gsap.from(targets, {
      scrollTrigger: {
        trigger: ref.current,
        start: `top ${threshold * 100}%` in practice → `top 85%`,
        once: once ?? true,
        markers: false,
      },
      ...animationConfig,
      duration,
      delay,
      stagger: stagger || 0,
      ease: 'power2.out',
    })
  }, ref)

  return () => ctx.revert()
}, [])
```

#### Usage examples

```astro
<AnimatedSection animation="slide-up">
  <SectionTitle title="Servicios" />
</AnimatedSection>

<AnimatedSection animation="fade" stagger={0.1}>
  {services.map(service => <ServiceCard {...service} />)}
</AnimatedSection>
```

---

## Shared Components

### `Navbar`

Barra de navegación fija con soporte para dos modos.

#### Props

```typescript
interface NavbarLink {
  label: string
  href: string
}

interface NavbarProps {
  mode: 'freelance' | 'recruiter'
  className?: string
}
```

#### Link sets

| Mode | Links |
|------|-------|
| `freelance` | Inicio (`/`), Servicios (`/#servicios`), Casos de Éxito (`/#casos`), FAQ (`/#faq`) + "¿Buscás un desarrollador? →" (`/hire-me`) |
| `recruiter` | Sobre mí (`/#about`), Stack (`/#stack`), Experiencia (`/#experience`), Proyectos (`/#projects`) — sin cross-link |

#### States

| State | Visual |
|-------|--------|
| **Default** (top) | `bg-transparent backdrop-blur-none` |
| **Scrolled** (> 50px) | `bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50 shadow-lg shadow-zinc-900/50` |
| **Mobile menu open** | Overlay full-screen, `bg-zinc-950/95 backdrop-blur-xl`, links centrados |
| **Hamburger** (≤ 767px) | Icono de 3 líneas que se transforma en X al abrir |

#### Mobile menu behavior

- Overlay slide-in desde la derecha, duración 0.3s, ease `power3.out`
- Focus trapped dentro del menú cuando está abierto
- Click en link cierra menú y navega (scroll smooth a sección)
- Click fuera del menú (backdrop) lo cierra
- Escape key cierra el menú
- Body scroll lock cuando el menú está abierto

#### Usage examples

```astro
<!-- En layout freelance -->
<Navbar mode="freelance" />

<!-- En layout recruiter -->
<Navbar mode="recruiter" />
```

---

### `Footer`

Footer con navegación contextual y redes sociales.

#### Props

```typescript
interface FooterProps {
  mode: 'freelance' | 'recruiter'
  className?: string
}
```

#### Sections

| Columna | Contenido |
|---------|-----------|
| Left | Logo/nombre, social icons (LinkedIn, GitHub) |
| Right | Nav links del modo actual (mismos que Navbar sin el cross-link) |
| Bottom | Copyright: `© {year} Nicolás Rodríguez. Todos los derechos reservados.` |

#### Rendering

```tsx
<footer class="border-t border-zinc-800/50 bg-glow-section">
  <Container>
    <div class="flex flex-col md:flex-row justify-between items-center gap-8 py-12">
      {/* Left: Brand + Social */}
      <div class="flex flex-col items-center md:items-start gap-4">
        <a href="/" class="text-xl font-semibold hover:text-zinc-100 transition-colors">
          Nicolás Rodríguez
        </a>
        <div class="flex gap-3">
          <SocialLink href={linkedin} icon={<LinkedinIcon />} label="LinkedIn" />
          <SocialLink href={github} icon={<GithubIcon />} label="GitHub" />
        </div>
      </div>

      {/* Right: Nav */}
      <nav class="flex flex-col items-center md:items-end gap-2">
        {links.map(link => (
          <a href={link.href} class="nav-link">{link.label}</a>
        ))}
      </nav>
    </div>

    {/* Copyright */}
    <div class="border-t border-zinc-800/30 py-6 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} Nicolás Rodríguez. Todos los derechos reservados.
    </div>
  </Container>
</footer>
```

---

### `Hero`

Plantilla de hero section configurable por props.

#### Props

```typescript
interface HeroButton {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
  external?: boolean
  download?: boolean
  icon?: ReactNode
}

interface HeroProps {
  headline: string
  subtitle?: string
  subtitleSize?: 'sm' | 'lg'
  buttons: HeroButton[]
  align?: 'left' | 'center'
  media?: ReactNode        // Slot opcional para foto/profile image
  gradient?: boolean       // Fondo con glow radial
  className?: string
}
```

#### Variants

| Prop | Freelance default | Recruiter default |
|------|-------------------|-------------------|
| `align` | `center` | `left` |
| `gradient` | `true` | `true` |
| `subtitleSize` | `lg` | `sm` |
| `media` | Foto de perfil (round) | Ninguna |

#### Layout

```tsx
<section class="relative min-h-[85vh] flex items-center section-first overflow-hidden">
  {gradient && <div class="absolute inset-0 bg-glow-hero pointer-events-none" />}
  <Container size={align === 'center' ? 'narrow' : 'default'}>
    <div class={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} gap-6 relative z-10`}>
      {media && <div class="mb-2">{media}</div>}
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        {headline}
      </h1>
      {subtitle && (
        <p class={`text-zinc-400 max-w-2xl ${subtitleSize === 'lg' ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
          {subtitle}
        </p>
      )}
      <div class={`flex flex-wrap gap-4 pt-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        {buttons.map(btn => (
          <Button key={btn.label} {...btn} />
        ))}
      </div>
    </div>
  </Container>
</section>
```

#### Usage examples

```astro
<!-- Freelance hero -->
<Hero
  headline="Ayudo a negocios y emprendedores a tener una presencia online profesional"
  subtitle="Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes"
  buttons={[
    { label: 'Solicitar presupuesto', href: 'https://wa.me/...', variant: 'primary', external: true },
  ]}
  align="center"
  media={<img src="/img-perfil.png" alt="" class="w-24 h-24 rounded-full ring-2 ring-zinc-700" />}
/>

<!-- Recruiter hero -->
<Hero
  headline="Nicolás Rodríguez"
  subtitle="Full Stack Developer especializado en React, Next.js, PHP, Python y arquitectura de software"
  buttons={[
    { label: 'Descargar CV', href: '/cv-nicolas-rodriguez.pdf', variant: 'primary', download: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/...', variant: 'secondary', external: true },
    { label: 'GitHub', href: 'https://github.com/...', variant: 'ghost', external: true },
  ]}
  align="left"
/>
```

---

### `CTA`

Call-to-action section.

#### Props

```typescript
interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
  download?: boolean
  icon?: ReactNode
}

interface CTAProps {
  headline: string
  description?: string
  buttons: CTAButton[]
  variant?: 'default' | 'card'    // 'card' tiene bg-secondary + border
  className?: string
}
```

#### Usage examples

```astro
<CTA
  headline="¿Tenés un proyecto en mente?"
  description="Sin compromiso — te respondo en menos de 24 horas"
  buttons={[
    { label: 'Solicitar presupuesto', href: 'https://wa.me/...', variant: 'primary', external: true },
  ]}
/>

<CTA
  headline="¿Buscás un desarrollador para tu equipo?"
  buttons={[
    { label: 'Descargar CV', href: '/cv.pdf', variant: 'primary', download: true },
    { label: 'Contactarme', href: 'mailto:...', variant: 'secondary' },
  ]}
  variant="card"
/>
```

---

### `ProjectCard`

Card de proyecto con imagen, badges y acciones.

#### Props

```typescript
interface CasoExito {
  problema: string
  solucion: string
  resultado: string
}

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  technologies: string[]       // Keys del data de technologies
  linkToCode?: string          // GitHub
  deployedSite?: string        // Demo URL
  casoExito?: CasoExito
  slug?: string
}
```

#### States

| Element | Default | Hover |
|---------|---------|-------|
| Card | `bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden` | `border-zinc-700 shadow-md -translate-y-0.5` |
| Image container | `aspect-video bg-zinc-800` | — |
| Image | `object-cover w-full h-full` | `scale-105 transition-transform` |
| Placeholder (no image) | Gradiente `from-zinc-800 to-zinc-900` + iniciales del título | — |

#### Responsive

| Viewport | Layout |
|----------|--------|
| ≤ 767px | Single column, imagen arriba |
| 768-1023px | 2 columnas |
| ≥ 1024px | 3 columnas |

#### Usage examples

```astro
<ProjectCard
  title="Beo Landing"
  description="Landing page para estudio de marketing digital"
  image="/beo-landing1.webp"
  technologies={["react", "nextjs", "tailwind"]}
  linkToCode="https://github.com/..."
  deployedSite="https://beo.com"
  casoExito={{
    problema: "No tenían presencia online",
    solucion: "Diseñamos y desarrollamos...",
    resultado: "+150% leads en 3 meses"
  }}
/>
```

---

### `Timeline`

Timeline vertical genérico para experiencia laboral.

#### Props

```typescript
interface TimelineItem {
  date: string            // Display text, ej: "Mar 2022 - Presente"
  title: string           // Job title
  subtitle: string        // Company name
  description?: string    // Opcional
  children?: ReactNode    // Contenido extra (badges, lists)
  isCurrent?: boolean     // Marca visual "actual"
}

interface TimelineProps {
  items: TimelineItem[]
  layout?: 'single-side'    // Siempre single-side por legibilidad
  className?: string
}
```

#### Rendering

```tsx
<div class="relative">
  {/* Línea vertical */}
  <div class="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-zinc-800" />

  <div class="space-y-12">
    {items.map((item, i) => (
      <div class="relative pl-12 md:pl-16">
        {/* Dot on the line */}
        <div class={`absolute left-2.5 md:left-4.5 w-3 h-3 rounded-full border-2
          ${item.isCurrent ? 'bg-indigo-500 border-indigo-400 shadow-lg shadow-indigo-500/20' : 'bg-zinc-900 border-zinc-700'}`} />

        <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <span class="text-sm text-zinc-500">{item.date}</span>
          <h3 class="text-xl font-semibold mt-1">{item.title}</h3>
          <p class="text-zinc-400">{item.subtitle}</p>
          {item.description && <p class="text-zinc-400 mt-2">{item.description}</p>}
          {item.children}
        </div>
      </div>
    ))}
  </div>
</div>
```

#### Usage example

```astro
<Timeline
  items={experienceData.map(exp => ({
    date: formatDateRange(exp.startDate, exp.endDate),
    title: exp.role,
    subtitle: exp.company,
    isCurrent: !exp.endDate,
    children: (
      <>
        <ul class="mt-3 space-y-1">
          {exp.achievements.map(a => <li class="text-sm text-zinc-400">• {a}</li>)}
        </ul>
        <div class="flex flex-wrap gap-2 mt-3">
          {exp.technologies.map(t => <TechBadge technology={t} size="sm" />)}
        </div>
      </>
    ),
  }))}
/>
```

---

### `ExperienceCard`

Card individual de experiencia (wrapper para usar dentro de Timeline o standalone).

#### Props

```typescript
interface Experience {
  company: string
  logo?: string
  role: string
  startDate: string
  endDate: string | null
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
}

interface ExperienceCardProps {
  experience: Experience
  className?: string
}
```

#### Date formatting

```typescript
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${months[parseInt(month) - 1]} ${year}`
}

function formatDateRange(start: string, end: string | null): string {
  return `${formatDate(start)} - ${end ? formatDate(end) : 'Presente'}`
}
```

---

### `ServiceCard`

Card de servicio freelance.

#### Props

```typescript
interface Service {
  slug: string
  name: string
  description: string
  icon: string       // Nombre del icono
  features: string[]
}

interface ServiceCardProps {
  service: Service
  className?: string
}
```

#### Layout

| Viewport | Grid |
|----------|------|
| ≤ 639px | 1 columna |
| 640-1023px | 2 columnas |
| ≥ 1024px | 4 columnas |

#### Usage example

```astro
<section id="servicios" class="section-padding">
  <Container>
    <SectionTitle title="Servicios" subtitle="..." />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {services.map(s => <ServiceCard service={s} />)}
    </div>
  </Container>
</section>
```

---

### `FAQ`

Acordeón de preguntas frecuentes.

#### Props

```typescript
interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  className?: string
}
```

#### Behavior

- **Single open**: Solo un item expandido a la vez
- **Toggle off**: Click en item abierto lo cierra
- **Animación**: altura con transición CSS `max-height` + `opacity`, duración 0.3s
- **Accesibilidad**: cada item tiene `aria-expanded`, `aria-controls`, `id` vinculado
- **Keyboard**: Enter/Space abre/cierra, Tab navega entre items

#### Usage example

```astro
<FAQ items={[
  { question: "¿Cuánto tiempo toma desarrollar un sitio?", answer: "..." },
  { question: "¿Cuánto cuesta una landing page?", answer: "..." },
]} />
```

---

## Section Compositions (page-specific)

### Freelance sections (`src/components/freelance/`)

#### `ServicesSection`

```astro
<ServicesSection services={services} />

<!-- Mapea a: SectionTitle + grid de ServiceCards -->
```

#### `ProcessSection`

```astro
<ProcessSection steps={processSteps} />

<!-- Timeline visual horizontal/vertical con 6 pasos numerados -->
```

#### `SuccessCases`

```astro
<SuccessCases projects={projectsWithCasoExito} />

<!-- Filtra projects.filter(p => p.casoExito) y renderiza ProjectCards -->
```

### Recruiter sections (`src/components/portfolio/`)

#### `AboutSection`

```astro
<AboutSection profile={profile} />

<!-- Prose con datos del perfil profesional -->
```

#### `StackSection`

```astro
<StackSection technologies={technologies} />

<!-- Agrupa por categoría, renderiza TechBadges -->
```

#### `ExperienceSection`

```astro
<ExperienceSection experiences={experiences} />

<!-- Mapea a Timeline con ExperienceCards -->
```

---

## Acceptance Criteria

- [ ] Every component listed here has an implementation file in `src/components/`
- [ ] All TypeScript interfaces are exported from component files or `@/types`
- [ ] All components render without errors in both `.astro` and `.tsx` contexts
- [ ] Components gracefully handle `undefined`/`null`/empty array props
- [ ] No component depends on Keystatic (all data via props or data files)
- [ ] Interactive elements have visible `:focus-visible` ring
- [ ] Mobile menu is focus-trapped when open
- [ ] All animations respect `prefers-reduced-motion`
