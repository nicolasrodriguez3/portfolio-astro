import { technologies } from '@/data/technologies'

const COLOR_MAP = {
  frontend: 'bg-sky-200 text-sky-800',
  backend: 'bg-emerald-200 text-emerald-800',
  database: 'bg-amber-200 text-amber-800',
  tools: 'bg-zinc-200 text-zinc-800',
}

export const TECHNOLOGIES = Object.fromEntries(
  Object.entries(technologies).map(([key, tech]) => [
    key.charAt(0).toUpperCase() + key.slice(1),
    {
      name: tech.name,
      className: COLOR_MAP[tech.category] || 'bg-zinc-200 text-zinc-800',
    },
  ]),
)
