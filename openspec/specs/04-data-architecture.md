# Data Architecture & Types

Archivos de datos tipados que reemplazan Keystatic CMS. Todo el contenido vive en `src/data/` como archivos TypeScript con tipos compartidos.

## File structure

```
src/
├── types/
│   └── index.ts              # Todos los tipos compartidos
├── data/
│   ├── profile.ts            # Información personal y hero
│   ├── experience.ts         # Experiencia laboral (timeline)
│   ├── technologies.ts       # Stack tecnológico categorizado
│   ├── projects.ts           # Proyectos destacados + casos de éxito
│   ├── services.ts           # Servicios freelance
│   ├── success-cases.ts      # Casos de éxito (problema→solución→resultado)
│   └── faq.ts               # Preguntas frecuentes
└── lib/
    └── utils.ts             # Helpers generales
```

## Requirements

### REQ-DATA-TYPES: TypeScript types

All data MUST have dedicated TypeScript types exported from `src/types/index.ts`.

#### Scenario: Compile-time validation
- GIVEN a data file imports types from `@/types`
- WHEN the project is built with `astro build` or `tsc --noEmit`
- THEN all data structures are type-checked
- AND type errors produce build failures

### REQ-DATA-PROFILE: Profile data

The profile type MUST contain personal info, hero content for both landings, and CV URL.

```typescript
interface Profile {
  name: string
  email: string
  phone: string
  location: string
  cvUrl: string
  freelance: {
    headline: string
    subtitle: string
    whatsappMessage: string
  }
  recruiter: {
    headline: string
    subtitle: string
    valueProp: string
  }
  social: {
    linkedin: string
    github: string
  }
}
```

#### Scenario: Complete profile
- GIVEN `profile.ts` exports a `Profile` object
- THEN `freelance.headline` appears on `/` hero
- AND `recruiter.headline` appears on `/hire-me` hero
- AND `cvUrl` points to `/cv-nicolas-rodriguez.pdf`

### REQ-DATA-EXPERIENCE: Experience data

Experience data MUST support multiple entries with date ranges, responsibilities, and achievements.

```typescript
interface Experience {
  company: string
  logo?: string
  role: string
  startDate: string   // "YYYY-MM"
  endDate: string | null  // null = "Presente"
  responsibilities: string[]
  achievements: string[]
  technologies: string[]  // keys referencing technologies data
}
```

#### Scenario: Current job
- GIVEN `endDate: null`
- WHEN rendered in the timeline
- THEN displays "Presente" as the end date
- AND shows a "current" visual indicator (e.g., accent dot)

#### Scenario: Empty arrays
- GIVEN `responsibilities: []` or `achievements: []`
- THEN the corresponding list is NOT rendered
- AND no empty `<ul>` appears in the DOM

### REQ-DATA-TECHNOLOGIES: Technology data

Technologies MUST be categorized with display metadata.

```typescript
type TechCategory = "frontend" | "backend" | "database" | "tools"

interface Technology {
  name: string
  category: TechCategory
  color?: string   // Tailwind color class override
  icon?: string     // Optional icon name
}
```

#### Scenario: Categorized rendering
- GIVEN technologies with `category: "frontend"`
- WHEN rendered in the stack section
- THEN they appear under "Frontend" heading
- AND each technology shows its name and category color

### REQ-DATA-PROJECTS: Project data

Projects MUST support both detailed view (recruiter) and success-case view (freelance).

```typescript
interface Project {
  slug: string
  title: string
  description: string
  image?: string
  technologies: string[]
  linkToCode?: string    // GitHub
  deployedSite?: string  // Demo URL
  destacado: boolean     // Show on /hire-me?
  orden: number          // Display order
  // Success case (freelance)
  casoExito?: {
    problema: string
    solucion: string
    resultado: string
  }
}
```

#### Scenario: Filtered by destacado
- GIVEN projects with `destacado: true` and `destacado: false`
- WHEN rendering `/hire-me`
- THEN only `destacado: true` projects appear
- AND they sort by `orden` ascending

#### Scenario: Success case exists
- GIVEN a project with complete `casoExito` data
- WHEN rendering `/`
- THEN it appears in the success cases section
- AND `problema`, `solucion`, `resultado` all render

#### Scenario: Partial casoExito
- GIVEN `casoExito` is missing one or more fields
- THEN the project is excluded from success cases
- AND no partial/failed render occurs

### REQ-DATA-SERVICES: Service data

```typescript
interface Service {
  slug: string
  name: string
  description: string
  icon: string   // Icon component name or path
  features: string[]
}
```

#### Scenario: All services render
- GIVEN 4 services in the data file
- WHEN the services section renders on `/`
- THEN each card shows icon, name, description, and feature list

### REQ-DATA-FAQ: FAQ data

```typescript
interface FAQItem {
  question: string
  answer: string
  category?: string  // Optional grouping
}
```

#### Scenario: All questions render
- GIVEN 6 FAQ items
- WHEN the FAQ section renders
- THEN all questions are visible
- AND answers expand on click (accordion behavior)

## Edge cases

| Case | Behavior |
|------|----------|
| Missing required field | Build error (TypeScript strict) |
| Empty array where data expected | Section hidden gracefully |
| Invalid technology key | Neutral styling, no crash |
| Date format invalid | Rendered as-is, no crash |
| Image path missing file | Browser 404 handled by next/image-like placeholder |

## Migration from Keystatic

| Step | Action |
|------|--------|
| 1 | Create `src/types/index.ts` with all interfaces |
| 2 | Create each `.ts` file in `src/data/` with hardcoded content from Keystatic |
| 3 | Delete `src/lib/content.ts` (Keystatic reader) |
| 4 | Remove `@keystatic/astro`, `@keystatic/core`, `@astrojs/markdoc` from dependencies |
| 5 | Remove `keystatic.config.ts` and `keystatic/` directory |
| 6 | Update all component imports to use `@/data/...` instead of Keystatic readers |

## Acceptance criteria

- [ ] `tsc --noEmit` passes with strict mode
- [ ] All data files are importable in both `.astro` and `.tsx` components
- [ ] No circular dependencies between data files
- [ ] All content from Keystatic is preserved in data files
- [ ] Data files contain only static data (no async/await, no fetch)
