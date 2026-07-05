import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    company: 'Cianbox',
    role: 'Full Stack Developer',
    startDate: '2022-03',
    endDate: null,
    technologies: ['PHP', 'JS', 'MySQL', 'Git', 'HTML'],
    responsibilities: [
      'Desarrollo y mantenimiento de funcionalidades del sistema ERP',
      'Implementación de mejoras solicitadas por usuarios',
      'Generación de reportes personalizados en PDF y Excel',
    ],
    achievements: [
      'Optimización de reportes reduciendo tiempos de generación',
      'Desarrollo de módulos de informes personalizados para clientes',
    ],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    startDate: '2021-01',
    endDate: '2022-02',
    technologies: ['React', 'Astro', 'Tailwind', 'JS', 'HTML'],
    responsibilities: [
      'Desarrollo de landing pages y sitios web para emprendedores y negocios',
      'Migración de sitios WordPress a Astro para mejorar performance',
      'Implementación de diseño responsive y animaciones con GSAP',
    ],
    achievements: [
      'Cliente BEO: landing page institucional con TinaCMS + Astro (beo.ar)',
      'Cliente La Nerd Shop: landing page React con diseño geek/nerd',
    ],
  },
  {
    company: 'Municipalidad de Crespo',
    role: 'Desarrollador Frontend',
    startDate: '2023-01',
    endDate: '2023-06',
    technologies: ['React', 'Tailwind', 'Git'],
    responsibilities: [
      'Desarrollo de aplicación municipal para interacción vecino-gobierno',
    ],
    achievements: [
      'App desarrollada para concurso municipal de innovación',
      'Sistema de reclamos y seguimiento para ciudadanos',
    ],
  },
]
