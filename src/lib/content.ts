import { createReader } from '@keystatic/core/reader'
import config from '../../keystatic.config'
import { TECHNOLOGIES } from '../constants/technologies'

const reader = createReader(process.cwd(), config)

export async function getTrabajos() {
  const trabajos = await reader.collections.trabajos.all()
  return trabajos.map(entry => ({
    name: entry.entry.titulo,
    slug: entry.slug,
    description: entry.entry.descripcion
      ? entry.entry.descripcion.split('\n\n')
      : [],
    technologies: (entry.entry.stack || [])
      .map(slug => TECHNOLOGIES[slug as keyof typeof TECHNOLOGIES])
      .filter(Boolean),
    linkToCode: entry.entry.urlRepo || null,
    deployedSite: entry.entry.urlSitio || null,
    video: null,
    images:
      entry.entry.imagenes
        ?.map((img: any) =>
          img && (typeof img === 'string' ? img : img.src || img.path),
        )
        .filter(Boolean) || [],
    destacado: entry.entry.destacado || false,
    orden: entry.entry.orden,
  }))
}

export async function getServicios() {
  const servicios = await reader.collections.servicios.all()
  return servicios.map(entry => ({
    name: entry.entry.titulo,
    description: entry.entry.descripcion,
    icono: entry.entry.icono || null,
    orden: entry.entry.orden,
  }))
}

export async function getHero() {
  const hero = await reader.singletons.hero.read()
  if (!hero) return null
  return {
    titulo: hero.titulo,
    tagline: hero.tagline,
    bio: (hero.bio || '').replace('{years}', '2'),
    fotoPerfil:
      hero.fotoPerfil &&
      (typeof hero.fotoPerfil === 'string'
        ? hero.fotoPerfil
        : hero.fotoPerfil.src || hero.fotoPerfil.path),
  }
}
