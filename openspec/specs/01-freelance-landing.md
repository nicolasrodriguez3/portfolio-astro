# Freelance Landing (`/`)

Landing orientada a conseguir clientes freelance. Convierte visitantes en leads mediante WhatsApp. El hero comunica beneficios de negocio, no tecnologías.

## Sections overview

| # | Section | Content | CTA |
|---|---------|---------|-----|
| 1 | Hero | Value prop centrado en beneficios + foto | "Solicitar presupuesto" → WhatsApp |
| 2 | Services | 4 servicios: Landing, Institucional, Tienda, Mantenimiento | — |
| 3 | Process | 6 pasos: Reunión → Propuesta → Diseño → Desarrollo → Entrega → Soporte | — |
| 4 | Success Cases | 4 casos: problema → solución → resultado (beo, cianbox, somos-crespo, la-nerd-shop) | — |
| 5 | FAQ | 6 preguntas: tiempo, costo, hosting, dominio, mantenimiento | — |
| 6 | Final CTA | "¿Tenés un proyecto en mente?" | "Solicitar presupuesto" → WhatsApp |

## Requirements

### REQ-FL-HERO: Hero section

The hero MUST display a benefit-focused headline and CTA. The hero MUST NOT mention specific technologies.

#### Scenario: Initial load
- GIVEN a visitor lands on `/`
- WHEN the page renders
- THEN the hero shows the headline "Ayudo a negocios y emprendedores a tener una presencia online profesional mediante sitios web modernos, rápidos y optimizados para convertir visitantes en clientes"
- AND a subtitle with secondary benefit text
- AND a prominent CTA button "Solicitar presupuesto"
- WHEN the CTA is clicked
- THEN the browser opens WhatsApp with a pre-filled message "Hola Nicolás, quiero solicitar un presupuesto para mi proyecto web"

#### Scenario: Mobile viewport
- GIVEN viewport width < 640px
- THEN hero text reflows without overflow
- AND the CTA button has minimum 44x44px touch target
- AND layout remains single-column

#### Scenario: prefers-reduced-motion
- GIVEN the user has `prefers-reduced-motion: reduce`
- THEN hero content appears fully opaque (no fade-in animation)
- AND no GSAP timeline plays

### REQ-FL-SERVICES: Services section

The services section MUST render 4 service cards from data. Each card MUST have icon, title, and description.

#### Scenario: All services loaded
- GIVEN services data has 4 entries
- WHEN the section renders
- THEN each card shows icon, name, and description
- AND cards display in a responsive grid (1 col ≤640px, 2 cols 641-1024px, 4 cols >1024px)

#### Scenario: Empty services
- GIVEN services data is empty array
- WHEN the section renders
- THEN the section is NOT rendered (no empty container)

### REQ-FL-PROCESS: Process section

The process section MUST show a 6-step workflow in sequential order with connecting visual.

#### Scenario: All steps present
- GIVEN process data has 6 steps
- WHEN the section renders
- THEN each step displays step number (1-6), title, and description
- AND steps connect visually with a line or arrow between them
- AND layout alternates or flows in a single direction

### REQ-FL-SUCCESS: Success cases section

The section MUST render only projects that have complete `casoExito` data (problema, solucion, resultado).

#### Scenario: Valid success cases exist
- GIVEN 4 projects with complete `casoExito` fields
- WHEN the section renders
- THEN each case shows: project image, problem statement, solution description, and measurable result
- AND each case links to the corresponding project detail if available

#### Scenario: No valid cases
- GIVEN zero projects have complete `casoExito`
- THEN the section is NOT rendered

### REQ-FL-FAQ: FAQ accordion

The FAQ MUST render as an accordion: single open item at a time, close on re-click.

#### Scenario: Click to expand
- GIVEN FAQ data with 6 items
- WHEN a question is clicked
- THEN its answer expands with a smooth height transition
- AND any previously open answer collapses

#### Scenario: Click same question
- GIVEN an FAQ item is already open
- WHEN the same question is clicked again
- THEN the answer collapses (toggle off)

### REQ-FL-CTA: Final CTA section

A closing CTA section MUST appear before the footer.

#### Scenario: Scroll past FAQ
- GIVEN the visitor scrolls below the FAQ section
- THEN a CTA section appears with headline "¿Tenés un proyecto en mente?"
- AND a "Solicitar presupuesto" button (same WhatsApp link as hero)
- AND secondary reassurance text: "Sin compromiso — te respondo en menos de 24 horas"

### REQ-FL-NAV: Navbar hire-me link

The navbar MUST include a link to `/hire-me` labeled "¿Buscás un desarrollador? →" in the top-right corner.

#### Scenario: Visible on all sections
- GIVEN the visitor scrolls through any section of `/`
- THEN the "¿Buscás un desarrollador? →" link remains visible in the navbar
- WHEN clicked
- THEN the browser navigates to `/hire-me`

## Edge cases

| Case | Behavior |
|------|----------|
| No services data | Section hidden |
| No success cases | Section hidden |
| Empty FAQ | Section hidden |
| WhatsApp API blocked | Copy fallback: show phone number |
| Script disabled | Hero + CTA render server-side (Astro islands) |
| Network slow | Content renders progressively (no blank states) |

## Acceptance criteria

- [ ] WhatsApp link opens `wa.me/549XXXXXXXXX?text={encodedMessage}`
- [ ] All sections render without console errors
- [ ] Keyboard navigable: Tab order follows visual order
- [ ] Lighthouse ≥ 90 in all categories (desktop)
- [ ] No layout shift at 320-1920px viewport widths
- [ ] prefers-reduced-motion respected globally
