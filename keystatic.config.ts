import { config, collection, singleton, fields } from '@keystatic/core'

const { text, document, image, multiselect, array, checkbox, url, number, slug } = fields

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'nicolasrodriguez3',
      name: 'portfolio-astro',
    },
  },
  collections: {
    trabajos: collection({
      label: 'Trabajos',
      slugField: 'slug',
      path: 'content/collections/trabajos/*',
      format: { contentField: 'contenido' },
      schema: {
        titulo: text({ label: 'Título', validation: { isRequired: true } }),
        slug: slug({ name: { label: 'titulo' } }),
        descripcion: text({ label: 'Descripción', multiline: true }),
        contenido: document({
          label: 'Contenido',
          description: 'Contenido adicional o case study (opcional)',
          layouts: [[1, 1], [2, 1], [1, 2]],
        }),
        stack: multiselect({
          label: 'Stack',
          options: [
            { label: 'JavaScript', value: 'JS' },
            { label: 'TypeScript', value: 'TypeScript' },
            { label: 'React', value: 'React' },
            { label: 'Node.js', value: 'Node' },
            { label: 'Express', value: 'Express' },
            { label: 'MongoDB', value: 'MongoDB' },
            { label: 'Git', value: 'Git' },
            { label: 'Tailwind CSS', value: 'Tailwind' },
            { label: 'Astro', value: 'Astro' },
            { label: 'HTML & CSS', value: 'HTML' },
            { label: 'PHP', value: 'PHP' },
            { label: 'MySQL', value: 'MySQL' },
            { label: 'Python', value: 'Python' },
            { label: 'FastAPI', value: 'FastAPI' },
            { label: 'TinaCMS', value: 'TinaCMS' },
          ],
        }),
        imagenes: array(image({ label: 'Imagen', directory: 'public/images' }), {
          label: 'Imágenes',
        }),
        urlSitio: url({ label: 'URL del sitio' }),
        urlRepo: url({ label: 'URL del repositorio' }),
        destacado: checkbox({ label: 'Destacado', defaultValue: false }),
        orden: number({ label: 'Orden' }),
      },
    }),
    servicios: collection({
      label: 'Servicios',
      slugField: 'slug',
      path: 'content/collections/servicios/*',
      format: { contentField: 'contenido' },
      schema: {
        titulo: text({ label: 'Título', validation: { isRequired: true } }),
        slug: slug({ name: { label: 'titulo' } }),
        descripcion: text({ label: 'Descripción', multiline: true }),
        contenido: document({ label: 'Contenido', description: 'Contenido adicional (opcional)' }),
        icono: text({ label: 'Icono' }),
        orden: number({ label: 'Orden' }),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'content/singletons/hero',
      format: 'yaml',
      schema: {
        titulo: text({ label: 'Título' }),
        tagline: text({ label: 'Tagline' }),
        bio: text({ label: 'Biografía', multiline: true }),
        fotoPerfil: image({ label: 'Foto de perfil', directory: 'public/images' }),
      },
    }),
  },
})
