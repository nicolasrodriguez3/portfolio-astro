# Design System Specification

Sistema de diseño para el portfolio de Nicolás Rodríguez. Dark mode por defecto, sin toggle. Basado en Tailwind CSS v3 con extensiones personalizadas.

---

## 1. Color Palette

### Base

| Token | Tailwind | Hex | Uso |
|-------|----------|-----|-----|
| `bg-primary` | `bg-zinc-950` | `#0a0a0b` | Fondo base (body) |
| `bg-secondary` | `bg-zinc-900` | `#18181b` | Superficies elevadas (cards, navbar) |
| `bg-tertiary` | `bg-zinc-800/50` | `#27272a` /50 | Hover states, badges |
| `border-subtle` | `border-zinc-800` | `#27272a` | Bordes por defecto |
| `border-muted` | `border-zinc-700/50` | `#3f3f46` /50 | Bordes hover, separadores |
| `text-primary` | `text-zinc-100` | `#f4f4f5` | Texto principal |
| `text-secondary` | `text-zinc-400` | `#a1a1aa` | Texto secundario (subtítulos, metadata) |
| `text-muted` | `text-zinc-500` | `#71717a` | Texto deshabilitado, placeholders |

### Acento (dual gradient)

| Token | Valor | Uso |
|-------|-------|-----|
| `accent-from` | `#6366f1` (indigo-500) | Gradiente inicio |
| `accent-to` | `#8b5cf6` (violet-500) | Gradiente fin |
| `accent-text` | `#a78bfa` (violet-400) | Texto con acento |
| `accent-ring` | `#818cf8` (indigo-400) | Focus ring |

Clase utilitaria: `bg-gradient-to-br from-indigo-500 to-violet-500` para botones primary y acentos.

### Fondo geométrico hexagonal

El fondo principal usa un patrón de hexágomos en mosaico (SVG inline) en todo el sitio. Los hexágomos decorativos más grandes con blur se usan solo en Hero y CTA.

#### Patrón base (todas las secciones)

SVG inline para el patrón de hexágomos. Hexágomos regulares de ~60px, stroke sutil, fill transparente.

```css
.bg-hex-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpath d='M60 2 L118 30 L118 74 L60 102 L2 74 L2 30 Z' fill='none' stroke='%2327272a' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E");
  background-size: 120px 104px;
}
```

#### Variante hero (mayor opacidad + glow)

```css
.bg-hex-hero {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpath d='M60 2 L118 30 L118 74 L60 102 L2 74 L2 30 Z' fill='none' stroke='%2327272a' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E"),
    radial-gradient(100% 50% at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 100%);
  background-size: 120px 104px, 100% 100%;
}
```

#### Gradient glow sections (CTA)

```css
.bg-hex-section {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpath d='M60 2 L118 30 L118 74 L60 102 L2 74 L2 30 Z' fill='none' stroke='%2327272a' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E"),
    radial-gradient(100% 50% at 50% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 80%);
  background-size: 120px 104px, 100% 100%;
}
```

#### Hexágomo decorativo grande (Hero y CTA)

Un hexágomo más grande (~200px) con gradiente y blur, posicionado detrás del contenido.

```css
.bg-hex-decorative {
  width: 200px;
  height: 174px;
  background: rgba(99, 102, 241, 0.08);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  filter: blur(60px);
  position: absolute;
  pointer-events: none;
}
```

Ubicación: 1-2 en Hero (esquina superior derecha e inferior izquierda), 1 en CTA final. Solo visible en viewports ≥ 768px.

### Categorías de tecnologías

| Categoría | Badge bg | Badge text | Border |
|-----------|----------|------------|--------|
| `frontend` | `bg-sky-500/10` | `text-sky-400` | `border-sky-500/20` |
| `backend` | `bg-emerald-500/10` | `text-emerald-400` | `border-emerald-500/20` |
| `database` | `bg-amber-500/10` | `text-amber-400` | `border-amber-500/20` |
| `tools` | `bg-zinc-500/10` | `text-zinc-400` | `border-zinc-500/20` |

---

## 2. Typography

### Font stack

```css
--font-sans: 'InterVariable', 'Inter', system-ui, -apple-system, sans-serif;
```

Cargado desde `https://rsms.me/inter/inter.css` con preconnect.

### Type scale

| Token | Tailwind | Size | Line height | Weight | Uso |
|-------|----------|------|-------------|--------|-----|
| `text-xs` | `text-xs` | 0.75rem | 1rem | 400/500 | TechBadge, metadata |
| `text-sm` | `text-sm` | 0.875rem | 1.25rem | 400 | Cuerpo secundario |
| `text-base` | `text-base` | 1rem | 1.5rem | 400 | Cuerpo, párrafos |
| `text-lg` | `text-lg` | 1.125rem | 1.75rem | 400/500 | Section subtitle |
| `text-xl` | `text-xl` | 1.25rem | 1.75rem | 500 | Card titles |
| `text-2xl` | `text-2xl` | 1.5rem | 2rem | 600 | Section heading |
| `text-3xl` | `text-3xl` | 1.875rem | 2.25rem | 600 | Hero subtitle |
| `text-4xl` | `text-4xl` | 2.25rem | 2.5rem | 700 | Hero headline (mobile) |
| `text-5xl` | `text-5xl` | 3rem | 1 | 700 | Hero headline (desktop) |
| `text-6xl` | `text-6xl` | 3.75rem | 1 | 700 | Featured display |
| `text-7xl` | `text-7xl` | 4.5rem | 1 | 700 | Large hero (rare) |

### Pesos

| Weight | Uso |
|--------|-----|
| 400 | Texto corporal, descripciones |
| 500 | Subtítulos, card titles |
| 600 | Section headings, nav links |
| 700 | Hero headlines, display text |

### Reglas de texto acentuado

Headings con acento gradiente usan:

```css
.heading-gradient {
  @apply bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent;
}
```

---

## 3. Spacing & Layout

### Container widths

```css
.container-default {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
}

.container-narrow {
  @apply max-w-3xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### Section spacing

| Contexto | Padding |
|----------|---------|
| Section vertical | `py-16 md:py-24` |
| Section first | `pt-24 md:pt-32` (compensa navbar) |
| Section last before footer | `pb-16 md:pb-24` |
| Entre elementos dentro de sección | `space-y-12 md:space-y-16` |
| Entre cards en grid | `gap-6 md:gap-8` |
| Stack interno de card | `space-y-3` |

---

## 4. Borders

| Token | Tailwind | Uso |
|-------|----------|-----|
| `rounded-sm` | `rounded-sm` | TechBadge |
| `rounded-lg` | `rounded-lg` | Cards, inputs |
| `rounded-xl` | `rounded-xl` | Modals, hero media |
| `rounded-2xl` | `rounded-2xl` | Feature sections |
| `rounded-full` | `rounded-full` | Avatars, pills |
| `border-default` | `border border-zinc-800` | Card default |
| `border-hover` | `hover:border-zinc-700` | Card hover |
| `ring-focus` | `focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950` | Interactive elements |

---

## 5. Shadows

| Token | Tailwind | Uso |
|-------|----------|-----|
| `shadow-sm` | `shadow-sm shadow-zinc-900/50` | Card default |
| `shadow-md` | `shadow-md shadow-zinc-900/50` | Card hover |
| `shadow-lg` | `shadow-lg shadow-indigo-500/5` | Elevated states |
| `shadow-xl` | `shadow-xl shadow-indigo-500/10` | Navbar scrolled, modals |

Nunca usar `shadow-2xl` o `shadow-inner` — mantener sutileza.

---

## 6. Breakpoints (Tailwind default)

| Breakpoint | Min-width | Target |
|------------|-----------|--------|
| `sm` | 640px | Large phones landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop (rare) |

### Responsive strategy

- **Mobile-first**: estilos base son mobile, breakpoints agregan.
- **Single column** ≤ 768px en todas las grillas.
- **2 columnas** 769-1024px.
- **3-4 columnas** > 1024px según sección.
- **Navbar**: hamburger ≤ 767px, horizontal ≥ 768px.

---

## 7. Dark Mode

Por defecto y único modo. Sin toggle. Aplicar colores base directamente sin `dark:`.

```html
<html lang="es" class="bg-zinc-950 text-zinc-100">
```

El `color-scheme` debe ser `dark` en la meta:

```html
<meta name="color-scheme" content="dark" />
```

---

## 8. Interactive States

### Button states

| State | Primary | Secondary | Ghost |
|-------|---------|-----------|-------|
| **Default** | `bg-gradient-to-br from-indigo-500 to-violet-500 text-white` | `bg-zinc-800 text-zinc-100 border border-zinc-700` | `text-zinc-400 hover:text-zinc-100` |
| **Hover** | `brightness-110 shadow-lg shadow-indigo-500/20` | `bg-zinc-700 border-zinc-600` | `text-zinc-100 bg-zinc-800/50` |
| **Active** | `brightness-90 scale-[0.98]` | `scale-[0.98]` | `scale-[0.98]` |
| **Focus visible** | `ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-950` | Mismo ring | Mismo ring |
| **Disabled** | `opacity-50 cursor-not-allowed brightness-100` | `opacity-50 cursor-not-allowed` | `opacity-50 cursor-not-allowed` |

### Card states

| State | Efecto |
|-------|--------|
| **Default** | `bg-zinc-900 border-zinc-800 shadow-sm` |
| **Hover** | `border-zinc-700 shadow-md -translate-y-0.5` |
| **Focus visible** | `ring-2 ring-indigo-400` |

### Link states

| State | Efecto |
|-------|--------|
| **Default** | `text-zinc-400 hover:text-zinc-100` |
| **Hover** | `text-zinc-100` |
| **Focus visible** | `ring-2 ring-indigo-400 rounded` |

### Transitions globales

```css
* {
  transition-property: color, background-color, border-color, box-shadow, transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Excluir elementos animados por GSAP */
.no-transition {
  transition: none !important;
}
```

---

## 9. Tailwind Config Extension

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,tsx,ts,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          from: '#6366f1',
          to: '#8b5cf6',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

---

## 10. Global Styles (`src/styles/global.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'InterVariable', 'Inter', system-ui, sans-serif;
    color-scheme: dark;
    scroll-behavior: smooth;
  }

  body {
    @apply bg-zinc-950 text-zinc-100 antialiased;
    min-height: 100vh;
  }

  ::selection {
    @apply bg-indigo-500/30 text-zinc-100;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-zinc-950;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-zinc-800 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-zinc-700;
  }
}

@layer components {
  .container-default {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .container-narrow {
    @apply max-w-3xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .heading-gradient {
    @apply bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent;
  }

  .section-padding {
    @apply py-16 md:py-24;
  }

  .section-first {
    @apply pt-24 md:pt-32;
  }

  .section-last {
    @apply pb-16 md:pb-24;
  }
}

@layer utilities {
  .bg-hex-pattern {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpath d='M60 2 L118 30 L118 74 L60 102 L2 74 L2 30 Z' fill='none' stroke='%2327272a' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E");
    background-size: 120px 104px;
  }

  .bg-hex-hero {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpath d='M60 2 L118 30 L118 74 L60 102 L2 74 L2 30 Z' fill='none' stroke='%2327272a' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E"),
      radial-gradient(100% 50% at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 100%);
    background-size: 120px 104px, 100% 100%;
  }

  .bg-hex-decorative {
    width: 200px;
    height: 174px;
    background: rgba(99, 102, 241, 0.08);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    filter: blur(60px);
    pointer-events: none;
  }

  .bg-hex-section {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpath d='M60 2 L118 30 L118 74 L60 102 L2 74 L2 30 Z' fill='none' stroke='%2327272a' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E"),
      radial-gradient(100% 50% at 50% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 80%);
    background-size: 120px 104px, 100% 100%;
  }
}
```

---

## Acceptance Criteria

- [ ] All tokens documented here match the actual Tailwind config
- [ ] No light-mode overrides exist anywhere in the codebase
- [ ] Global CSS file exists at `src/styles/global.css`
- [ ] Tailwind config is extended as specified
- [ ] Type scale is consistent across all components
- [ ] Interactive states are consistent across all buttons and links
- [ ] Color contrast ratios meet WCAG 2.1 AA minimum (4.5:1 for text, 3:1 for large text)
- [ ] Scrollbar styling is applied globally
- [ ] `::selection` color is set
