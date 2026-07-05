import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'cianbox-erp',
    title: 'Cianbox ERP',
    description:
      'Sistema ERP para emprendedores y empresas. Participé en el desarrollo y mantenimiento de funcionalidades, reportes en PDF/Excel e informes personalizados.',
    image: '/cianbox.webp',
    technologies: ['js', 'php', 'mysql', 'git', 'html'],
    destacado: true,
    orden: 1,
    casoExito: {
      problema: 'Emprendedores necesitaban un sistema para gestionar su negocio',
      solucion: 'Desarrollo de ERP con módulos de facturación, stock y reportes',
      resultado: '+50 clientes activos usando el sistema',
    },
  },
  {
    slug: 'somos-crespo',
    title: 'Somos Crespo',
    description:
      'App municipal desarrollada para el concurso de la Municipalidad de Crespo. Facilita la interacción entre vecinos y el gobierno local.',
    image: '/somos-crespo-1.webp',
    technologies: ['react', 'tailwind', 'git'],
    linkToCode: 'https://github.com/nicolasrodriguez3/crespo-app',
    destacado: true,
    orden: 2,
  },
  {
    slug: 'beo-landing',
    title: 'Landing Page — BEO',
    description:
      'Diseño y desarrollo de landing page institucional para BEO, estudio de estrategia y marketing. Construida con Astro y Tailwind CSS, con contenido gestionable vía TinaCMS.',
    image: '/beo-landing1.webp',
    technologies: ['astro', 'tailwind', 'git', 'tinacms'],
    deployedSite: 'https://beo.ar',
    destacado: false,
    orden: 3,
  },
  {
    slug: 'la-nerd-shop',
    title: 'La Nerd Shop',
    description:
      'Landing page con temática geek y nerd, diseño moderno y colorido. Construida en React como base para futuro e-commerce.',
    image: '/la-nerd-1.webp',
    technologies: ['html', 'react', 'git'],
    linkToCode: 'https://github.com/nicolasrodriguez3/la-nerd-shop',
    deployedSite: 'https://la-nerd-shop.vercel.app/',
    destacado: false,
    orden: 4,
  },
]
