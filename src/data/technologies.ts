import type { Technology } from '@/types'

export const technologies: Record<string, Technology> = {
  js: { name: 'JavaScript', category: 'frontend' },
  typescript: { name: 'TypeScript', category: 'frontend' },
  react: { name: 'React', category: 'frontend' },
  astro: { name: 'Astro', category: 'frontend' },
  tailwind: { name: 'Tailwind CSS', category: 'frontend' },
  html: { name: 'HTML & CSS', category: 'frontend' },
  node: { name: 'Node.js', category: 'backend' },
  express: { name: 'Express', category: 'backend' },
  php: { name: 'PHP', category: 'backend' },
  python: { name: 'Python', category: 'backend' },
  fastapi: { name: 'FastAPI', category: 'backend' },
  mongodb: { name: 'MongoDB', category: 'database' },
  mysql: { name: 'MySQL', category: 'database' },
  git: { name: 'Git', category: 'tools' },
  tinacms: { name: 'TinaCMS', category: 'tools' },
}
