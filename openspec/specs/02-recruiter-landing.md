# Recruiter Landing (`/hire-me`)

Landing orientada a recruiters y hiring managers. Objetivo: conseguir entrevistas. Muestra perfil profesional, stack, experiencia y proyectos destacados.

## Sections overview

| # | Section | Content | Actions |
|---|---------|---------|---------|
| 1 | Hero | Nombre, "Full Stack Developer", value prop técnico | Descargar CV · LinkedIn · GitHub |
| 2 | About Me | Experiencia profesional, ERP, backend, arquitectura | — |
| 3 | Stack | Tecnologías categorizadas: Frontend, Backend, DBs, Herramientas | — |
| 4 | Experience | Timeline empresas: cargo, techs, logros | — |
| 5 | Projects | Proyectos destacados: imagen, descripción, techs | GitHub · Demo |
| 6 | Final CTA | "¿Buscás un desarrollador para tu equipo?" | Descargar CV · Contactarme |

## Requirements

### REQ-RL-HERO: Hero section

The hero MUST display full name, title, value proposition focused on technical strengths, and action buttons.

#### Scenario: Full hero renders
- GIVEN a recruiter lands on `/hire-me`
- WHEN the page renders
- THEN the hero shows:
  - Name: "Nicolás Rodríguez"
  - Title: "Full Stack Developer"
  - Value prop mentioning React, Next.js, PHP, Python, FastAPI, APIs REST, Backend, Arquitectura
  - Three buttons: "Descargar CV" (downloads PDF), "LinkedIn" (external link), "GitHub" (external link)
- AND "Descargar CV" is visually primary (filled button)

#### Scenario: CV download
- WHEN "Descargar CV" is clicked
- THEN the browser downloads `/cv-nicolas-rodriguez.pdf`
- AND the file is NOT opened in a new tab

#### Scenario: External links
- WHEN "LinkedIn" or "GitHub" is clicked
- THEN the link opens in a new tab with `rel="noopener noreferrer"`

### REQ-RL-ABOUT: About me section

The about section MUST highlight professional experience, ERP development, and interests in architecture and backend.

#### Scenario: Content renders
- GIVEN profile data is present
- WHEN the section renders
- THEN the text describes:
  - Years of professional experience
  - Experience building ERP systems
  - Passion for architecture, backend, and problem-solving
  - Current focus and interests
- AND the text is formatted as prose with clear paragraph breaks

### REQ-RL-STACK: Technology stack

The stack MUST display technologies grouped into categories with visual badges.

#### Scenario: Full stack renders
- GIVEN technologies data is present
- WHEN the section renders
- THEN technologies appear in 4 categories: "Frontend", "Backend", "Bases de datos", "Herramientas"
- AND each technology shows its name and a visual indicator (color/badge)
- AND categories are clearly separated with headings

#### Scenario: Empty category
- GIVEN a category has zero technologies
- THEN that category heading is NOT rendered
- AND no empty container appears

### REQ-RL-EXPERIENCE: Experience timeline

The timeline MUST show work history in reverse chronological order with company, role, technologies, responsibilities, and achievements.

#### Scenario: Timeline renders
- GIVEN experience data with 3+ entries
- WHEN the section renders
- THEN each entry displays:
  - Company name and logo (if available) or initials
  - Job title
  - Date range (month/year - month/year or "Presente")
  - Key responsibilities (bullet list)
  - Notable achievements (bullet list)
  - Technologies used (TechBadge components)
- AND entries connect visually with a vertical line
- AND the most recent entry appears at the top

#### Scenario: Single entry
- GIVEN experience data has exactly 1 entry
- THEN the timeline renders correctly with one entry
- AND the connecting line extends below the entry

### REQ-RL-PROJECTS: Featured projects

The projects section MUST display detailed project cards with image, description, tech stack, and links.

#### Scenario: Projects render
- GIVEN projects data with `destacado: true` flags
- WHEN the section renders
- THEN each project card displays:
  - Project image from `/public/`
  - Title and description
  - Problem statement and solution approach
  - Technologies used (TechBadge components)
  - Key learnings (optional)
  - "GitHub" and "Demo" buttons (when links exist)
- AND projects appear in order defined by `orden` field

#### Scenario: Missing image
- GIVEN a project has no `image` field
- THEN a placeholder gradient/pattern is shown instead
- AND the layout does not break

#### Scenario: No links
- GIVEN a project has no `linkToCode` and no `deployedSite`
- THEN the GitHub and Demo buttons are NOT rendered
- AND no empty button container appears

### REQ-RL-CTA: Final CTA section

A closing CTA targeting recruiters MUST appear before the footer.

#### Scenario: Scroll past projects
- GIVEN the visitor scrolls past the projects section
- THEN a CTA section appears with headline "¿Buscás un desarrollador para tu equipo?"
- AND two buttons: "Descargar CV" (download) and "Contactarme" (mailto: link)

## Edge cases

| Case | Behavior |
|------|----------|
| No experience data | Timeline section hidden |
| No featured projects | Projects section hidden |
| Empty tech category | Category heading hidden |
| CV file missing | "Descargar CV" button disabled with tooltip |
| LinkedIn/GitHub URLs missing | Corresponding button hidden |

## Acceptance criteria

- [ ] "Descargar CV" triggers a download, not a navigation
- [ ] All external links open in new tab with `rel="noopener noreferrer"`
- [ ] Timeline is reverse chronological
- [ ] TechBadge colors are consistent with categories
- [ ] Lighthouse ≥ 90 in all categories (desktop)
- [ ] No layout shift at 320-1920px
- [ ] Tab order flows: hero → about → stack → experience → projects → cta
