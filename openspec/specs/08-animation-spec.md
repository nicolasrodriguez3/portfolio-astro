# Animation Specification

Especificación completa de animaciones con GSAP para el portfolio. Aplica a todas las secciones de ambas landings.

---

## 1. Global Configuration

Se ejecuta UNA vez al cargar la página, antes de cualquier timeline.

```typescript
// src/lib/animations.ts

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lag smoothing OFF para consistencia cross-device
gsap.ticker.lagSmoothing(0)

// Default ease global
gsap.defaults({
  ease: 'power2.out',
})

export { gsap, ScrollTrigger }
```

---

## 2. prefers-reduced-motion Guard

**REQUISITO IMPRESCINDIBLE**: TODAS las animaciones deben respetar esta preferencia.

```typescript
// Utility usado como early return en cada useEffect de animación
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// En cada componente animado:
useEffect(() => {
  if (prefersReducedMotion()) return
  // ... GSAP animation code ...
}, [])
```

Cuando `prefersReducedMotion: reduce`:
- Todos los elementos aparecen completamente opacos y en posición final
- `opacity: 1`, `transform: none`, `filter: none`
- No se crean timelines de GSAP
- No se registran ScrollTriggers

---

## 3. Animation Types

### 3.1 `fade` (default)

```
opacity: 0 → 1
y: 20px → 0
duration: 0.5s
ease: power2.out
```

```typescript
gsap.from(target, {
  opacity: 0,
  y: 20,
  duration: 0.5,
  ease: 'power2.out',
  scrollTrigger: { trigger: target, start: 'top 85%', once: true },
})
```

### 3.2 `slide-up`

```
opacity: 0 → 1
y: 40px → 0
duration: 0.6s
ease: power2.out
```

Usar para secciones enteras o elementos que se benefician de un movimiento más notorio.

### 3.3 `slide-left`

```
opacity: 0 → 1
x: -30px → 0
duration: 0.5s
ease: power2.out
```

Usar para elementos que aparecen desde el borde, como text blocks en hero.

### 3.4 `blur`

```
opacity: 0 → 1
filter: blur(4px) → blur(0)
duration: 0.6s
ease: power2.out
```

Usar para elementos "revelados", como imágenes o highlights visuales.

### 3.5 `scale`

```
opacity: 0 → 1
scale: 0.95 → 1
duration: 0.5s
ease: power2.out
```

Usar para cards, modales, o elementos que aparecen "creciendo" desde el centro.

---

## 4. Stagger Configuration

Cuando múltiples hijos deben animarse secuencialmente:

```typescript
// Calcular stagger dinámico basado en cantidad de hijos
const staggerDelay = Math.min(0.15, Math.max(0.05, 0.5 / childrenCount))

gsap.from(children, {
  opacity: 0,
  y: 20,
  duration: 0.4,
  stagger: staggerDelay,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: parent,
    start: 'top 85%',
    once: true,
  },
})
```

| Child count | Stagger |
|-------------|---------|
| 2-4 | 0.15s |
| 5-8 | 0.1s |
| 9+ | 0.05s |

---

## 5. Hover Animations

Solo para elementos interactivos (buttons, cards, links). **No aplicar hover en touch devices**.

### Cards

```css
/* CSS transition (preferido sobre GSAP para hover por performance) */
.card {
  @apply transition-all duration-300 ease-out;
}
.card:hover {
  @apply -translate-y-0.5 shadow-md;
}
```

A menos que se requiera GSAP (ej: morph, follow-through), hover effects se implementan con CSS transitions.

### Buttons

```css
/* Button hover con CSS */
.btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

---

## 6. ScrollTrigger Configuration

Valores consistentes para todos los ScrollTriggers:

```typescript
const DEFAULT_SCROLL_TRIGGER = {
  start: 'top 85%',     // Trigger cuando el top del elemento está al 85% del viewport
  end: 'bottom 15%',    // End cuando el bottom está al 15% (para scrub si se usa)
  once: true,           // Play una sola vez, no reverse en scroll up
  markers: false,       // NO debug markers en producción
  invalidateOnRefresh: true,  // Recalcular en resize/refresh
}
```

**Solo para efecto parallax** usar `scrub: 1` (con suavizado de 1s).

---

## 7. Parallax (sutil)

Sección con efecto parallax muy sutil en el background:

```typescript
gsap.to(sectionRef, {
  y: () => sectionRef.current.offsetHeight * 0.05,  // 5% de la altura
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
})
```

- **NO usar parallax en mobile** (≤ 768px) — desactivar con media query
- **Solo en backgrounds o imágenes decorativas**, nunca en contenido
- **Máximo 1 efecto parallax por página**

---

## 8. Performance Rules

### 8.1 will-change

SIEMPRE agregar `will-change` en elementos animados por GSAP:

```typescript
// Antes de animar:
gsap.set(target, { willChange: 'transform, opacity' })

// Limpiar después (en cleanup del useEffect):
gsap.set(target, { willChange: 'auto' })
```

En CSS (para elementos siempre animados):
```css
.animated-element {
  will-change: transform, opacity;
}
```

### 8.2 Layout-safe properties

Solo animar `transform` y `opacity`. **NUNCA** animar:
- `width`, `height`
- `margin`, `padding`
- `top`, `left`, `right`, `bottom`
- `font-size`, `line-height`

Excepción: el acordeón FAQ puede animar `max-height` vía CSS transition (0.3s ease).

### 8.3 Kill unused ScrollTriggers

```typescript
useEffect(() => {
  if (prefersReducedMotion()) return

  const ctx = gsap.context(() => {
    // ... animaciones ...
  }, ref)

  return () => {
    ctx.revert() // Mata todos los ScrollTriggers del contexto
  }
}, [])
```

---

## 9. GSAP Context Pattern (Component Standard)

```typescript
// src/components/ui/AnimatedSection.tsx
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/animations'

interface Props {
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'blur' | 'scale'
  duration?: number
  delay?: number
  stagger?: number
  threshold?: number
  className?: string
  children: React.ReactNode
}

const ANIMATION_MAP = {
  fade: { opacity: 0, y: 20 },
  'slide-up': { opacity: 0, y: 40 },
  'slide-left': { opacity: 0, x: -30 },
  blur: { opacity: 0, filter: 'blur(4px)' },
  scale: { opacity: 0, scale: 0.95 },
}

export function AnimatedSection({
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  stagger = 0,
  threshold = 0.2,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const targets = stagger ? ref.current?.children : ref.current
      if (!targets) return

      gsap.from(targets, {
        ...ANIMATION_MAP[animation],
        duration,
        delay,
        stagger: stagger || undefined,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${(1 - threshold) * 100}%`,
          once: true,
        },
      })

      if (!stagger) {
        gsap.set(ref.current, { willChange: 'transform, opacity' })
      }
    }, ref)

    return () => {
      ctx.revert()
      if (ref.current) {
        gsap.set(ref.current, { willChange: 'auto' })
      }
    }
  }, [animation, duration, delay, stagger, threshold])

  // Si prefers-reduced-motion, render con opacidad total directamente
  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return <div className={className}>{children}</div>
  }

  return <div ref={ref} className={className}>{children}</div>
}
```

---

## 10. Page-level Animation Sequence

```
Page Load:
  1. Hero: fade-in (0.5s) con stagger en [title, subtitle, buttons]
     → No espera ScrollTrigger, play inmediato
  2. Cada sección subsiguiente: AnimatedSection con ScrollTrigger
     → top 85%, once: true

Navigation (same-page, anchors):
  → Smooth scroll nativo (html { scroll-behavior: smooth })
  → NO animaciones en secciones ya visitadas (GSAP cachea ScrollTrigger state)
```

---

## 11. Summary Table

| Animation | Opacity Start | Transform Start | Filter Start | Duration | Best for |
|-----------|--------------|-----------------|-------------|----------|----------|
| `fade` | 0 | y: 20 | — | 0.5s | Sections, blocks |
| `slide-up` | 0 | y: 40 | — | 0.6s | Hero subtitle, process |
| `slide-left` | 0 | x: -30 | — | 0.5s | Text columns |
| `blur` | 0 | — | blur(4px) | 0.6s | Images, highlights |
| `scale` | 0 | scale(0.95) | — | 0.5s | Cards, badges |
| **Hover** | — | scale(1.02-1.05) | — | 0.3s | Buttons, cards |
| **Parallax** | — | y: ±5-10% speed | — | scrub:1 | Backgrounds |

---

## Acceptance Criteria

- [ ] `prefers-reduced-motion: reduce` desactiva TODAS las animaciones GSAP
- [ ] Ninguna animación causa layout shift (solo transform + opacity)
- [ ] `will-change: transform, opacity` está en todos los elementos animados
- [ ] `gsap.ticker.lagSmoothing(0)` está configurado globalmente
- [ ] ScrollTrigger `start: 'top 85%'` es consistente en todos los componentes
- [ ] Stagger delay es dinámico según cantidad de hijos
- [ ] No hay animaciones en layout properties
- [ ] Los hover effects en cards usan CSS transitions (no GSAP)
- [ ] Parallax solo en desktop y solo en backgrounds decorativos
- [ ] No hay fugas de memoria: todos los efectos GSAP se limpian en return de useEffect
