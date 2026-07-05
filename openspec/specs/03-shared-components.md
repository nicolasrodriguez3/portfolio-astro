# Shared Components & Animations

Componentes reutilizables entre las dos landings (`/` y `/hire-me`). Todos deben ser agnósticos al contexto y recibir datos por props.

## Component tree

```
src/components/
├── ui/              # Base components
│   ├── Button.astro / .tsx
│   ├── Container.astro
│   ├── SectionTitle.astro
│   ├── TechBadge.astro
│   └── AnimatedSection.astro / .tsx
├── shared/          # Shared sections
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── CTA.astro
│   ├── ProjectCard.astro / .tsx
│   ├── Timeline.astro
│   ├── ServiceCard.astro
│   ├── ExperienceCard.astro
│   └── FAQ.astro
├── freelance/       # / only
│   ├── ServicesSection.astro
│   ├── ProcessSection.astro
│   ├── SuccessCases.astro
│   └── FAQSection.astro
└── portfolio/       # /hire-me only
    ├── AboutSection.astro
    ├── StackSection.astro
    └── ExperienceSection.astro
```

## Requirements

### REQ-UI-BUTTON: Button component

Button MUST support variants (primary, secondary, ghost), sizes (sm, md, lg), icons, and external links.

#### Scenario: Primary CTA
- GIVEN `variant="primary"` and `href="https://wa.me/..."` 
- THEN button renders as an `<a>` with filled background, white text, and hover scale effect
- AND `target="_blank"` and `rel="noopener noreferrer"` are set for external URLs

#### Scenario: Download action
- GIVEN `variant="primary"` and `download` prop
- THEN button renders as `<a>` with `download` attribute set

#### Scenario: No href → button
- GIVEN no `href` prop is provided
- THEN the component renders as a `<button>` element

#### Scenario: Icon slot
- GIVEN `icon` slot content is provided
- THEN the icon renders before the button text
- AND icon and text remain vertically centered

### REQ-UI-CONTAINER: Container component

Container MUST center content with max-width and responsive padding.

#### Scenario: Default container
- GIVEN default props
- THEN container renders as a `<div>` with `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

#### Scenario: Narrow variant
- GIVEN `size="narrow"`
- THEN container uses `max-w-3xl`

### REQ-UI-SECTIONTITLE: SectionTitle component

SectionTitle MUST render a heading with optional subtitle and decorative accent.

#### Scenario: With subtitle
- GIVEN `title` and `subtitle` props
- THEN renders an `<h2>` with the title
- AND a `<p>` below with the subtitle in muted color

#### Scenario: Sans subtitle
- GIVEN only `title` prop
- THEN only the `<h2>` renders (no empty subtitle element)

### REQ-UI-TECHBADGE: TechBadge component

TechBadge MUST display a technology name with category-based color.

#### Scenario: Known technology
- GIVEN a technology key that exists in technologies data
- THEN renders a `<span>` with the technology name and its category color
- AND includes the category as an `aria-label` (e.g., "Frontend: React")

#### Scenario: Unknown technology
- GIVEN a technology key NOT in the data
- THEN renders with a neutral/default color
- AND does NOT crash

### REQ-ANIM: AnimatedSection component

AnimatedSection MUST wrap children with configurable scroll-triggered animation.

#### Scenario: Default fade-in
- GIVEN default props
- WHEN the element scrolls into view (threshold: 85%)
- THEN children fade in and slide up 20px over 0.5s
- AND the animation plays once (does not replay on scroll back)

#### Scenario: prefers-reduced-motion
- GIVEN the user has `prefers-reduced-motion: reduce`
- THEN children render fully visible with zero animation
- AND no GSAP timeline is created

#### Scenario: Stagger children
- GIVEN `stagger` prop with a value > 0
- THEN direct children animate sequentially with the given stagger delay

#### Scenario: Custom animation
- GIVEN `animation="blur"` or `animation="slide-left"` or `animation="scale"` prop
- THEN the corresponding GSAP animation plays instead of default fade-in

### REQ-SHARED-NAVBAR: Navbar component

Navbar MUST be fixed at top, support two link sets (freelance / recruiter), and include the hire-me cross-link.

#### Scenario: Freelance mode
- GIVEN `mode="freelance"`
- THEN Navbar renders links: Inicio, Servicios, Casos de Éxito, FAQ
- AND "¿Buscás un desarrollador? →" link to `/hire-me` in top-right
- AND the logo/name links to `/`

#### Scenario: Recruiter mode
- GIVEN `mode="recruiter"`
- THEN Navbar renders links: Sobre mí, Stack, Experiencia, Proyectos
- AND no cross-link appears
- AND the logo/name links to `/hire-me`

#### Scenario: Mobile menu
- GIVEN viewport width < 768px
- THEN a hamburger button appears
- WHEN tapped, a full-screen overlay menu slides in from the right
- WHEN a link is tapped, the menu closes and navigates

#### Scenario: Scroll background
- GIVEN the page has scrolled > 50px
- THEN the navbar background gains stronger backdrop-blur and shadow

### REQ-SHARED-FOOTER: Footer component

Footer MUST show copyright, social links, and navigation links matching the current mode.

#### Scenario: Renders
- GIVEN `mode="freelance"` or `mode="recruiter"`
- THEN footer shows: logo/name, social icons (LinkedIn, GitHub), and nav links for the mode
- AND a copyright line with the current year

### REQ-SHARED-HERO: Hero component

Hero MUST be a template that accepts headline, subtitle, CTA buttons, and optional media slot.

#### Scenario: Freelance hero
- GIVEN headline, subtitle, and CTA config props
- THEN renders centered content with optional background gradient
- AND CTA buttons render from config array

#### Scenario: Recruiter hero
- GIVEN different headline + buttons config
- THEN same component renders different content
- AND layout might shift left-aligned vs centered based on `align` prop

### REQ-SHARED-CTA: CTA component

CTA MUST render a heading, optional description, and action buttons.

#### Scenario: Dual buttons
- GIVEN `buttons` array with 2 items
- THEN both buttons render side by side (stacked on mobile)
- AND the first button uses `variant="primary"`, the second `variant="secondary"`

### REQ-SHARED-PROJECTCARD: ProjectCard component

ProjectCard MUST display project image, title, description, tech badges, and action links.

#### Scenario: Full card
- GIVEN all project data provided
- THEN renders image (preloaded with blur placeholder), title, description, tech badges, GitHub and Demo buttons
- AND image has aspect-ratio container to prevent layout shift

#### Scenario: Missing image
- GIVEN no image in project data
- THEN renders a gradient placeholder with the project initials
- AND the card layout is preserved

### REQ-SHARED-TIMELINE: Timeline component

Timeline MUST render a vertical chronological list of items.

#### Scenario: Multiple items
- GIVEN an array of timeline items
- THEN each item renders with a left-side date, a connecting line, and right-side content
- AND items are ordered by the provided array (caller controls ordering)

#### Scenario: Single item
- GIVEN array with 1 item
- THEN the connecting line extends below the item to the section bottom

## Acceptance criteria

- [ ] All components accept typed props (TypeScript interfaces exported)
- [ ] Components render without errors in both Astro (.astro) and React (.tsx) contexts
- [ ] prefers-reduced-motion disables ALL GSAP animations globally
- [ ] Mobile hamburger menu is focus-trapped when open
- [ ] No console errors or warnings in any component
- [ ] All interactive elements have visible :focus-visible ring
