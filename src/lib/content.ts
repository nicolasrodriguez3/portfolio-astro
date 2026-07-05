/**
 * Shim adapter — mantiene la API de los componentes legacy mientras
 * se migran a los nuevos data files en etapas posteriores.
 * NO usa Keystatic.
 */
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { profile } from '@/data/profile'

export async function getTrabajos() {
  return projects.map((p) => ({
    name: p.title,
    slug: p.slug,
    description: p.description.split('\n\n').filter(Boolean),
    technologies: p.technologies.map((key) => ({
      name: key,
      className: 'bg-zinc-200 text-zinc-800',
    })),
    linkToCode: p.linkToCode || null,
    deployedSite: p.deployedSite || null,
    video: null,
    images: p.image ? [p.image] : [],
    destacado: p.destacado,
    orden: p.orden,
  }))
}

export async function getServicios() {
  return services.map((s) => ({
    name: s.name,
    description: s.description,
    icono: s.icon,
    orden: 0,
  }))
}

export async function getHero() {
  return {
    titulo: profile.freelance.headline,
    tagline: profile.freelance.subtitle,
    bio: profile.recruiter.valueProp,
    fotoPerfil: '/img-perfil.png',
  }
}
