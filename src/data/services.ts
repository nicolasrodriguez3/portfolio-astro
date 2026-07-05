import type { Service } from '@/types'

export const services: Service[] = [
  {
    slug: 'landing-pages',
    name: 'Landing Pages con Astro',
    description:
      'Landing pages ultrarrápidas construidas con Astro. 95+ en PageSpeed, cero JavaScript innecesario, SEO on-page optimizado.',
    icon: 'rocket',
    features: ['95+ PageSpeed', 'SEO optimizado', 'CMS opcional (TinaCMS)', 'Deploy automatizado'],
  },
  {
    slug: 'migraciones-wordpress',
    name: 'Migraciones desde WordPress',
    description:
      'Migración de sitios WordPress y Elementor a Astro. Mantenés el diseño y el contenido, ganás velocidad, seguridad y cero mantenimiento de plugins.',
    icon: 'switch',
    features: ['Mismo diseño y contenido', 'Velocidad 10x superior', 'Sin plugins vulnerables', 'Proyecto llave en mano'],
  },
  {
    slug: 'sitios-institucionales',
    name: 'Sitios Web Institucionales',
    description:
      'Sitios web profesionales para tu negocio o emprendimiento. Diseño moderno, responsive y optimizado para convertir visitantes en clientes.',
    icon: 'building',
    features: ['Diseño responsive', 'Formulario de contacto', 'Galería de imágenes', 'Optimización SEO'],
  },
  {
    slug: 'ecommerce-tienda-nube',
    name: 'E-commerce con Tienda Nube',
    description:
      'Tu tienda online sobre Tienda Nube con diseño a medida, integración de medios de pago y optimización para conversión.',
    icon: 'cart',
    features: ['Diseño a medida', 'Medios de pago integrados', 'Optimizado para conversión', 'Sin complicaciones técnicas'],
  },
]
