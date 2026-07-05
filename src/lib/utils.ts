/**
 * Mergea clases condicionalmente, eliminando falsy values y duplicados.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  const set = new Set<string>()
  for (const cls of classes) {
    if (cls) {
      for (const c of cls.split(' ')) {
        if (c) set.add(c)
      }
    }
  }
  return Array.from(set).join(' ')
}

const MONTHS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

/**
 * Formatea "YYYY-MM" a "Ene 2022"
 */
export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const monthIndex = parseInt(month, 10) - 1
  const monthLabel = MONTHS[monthIndex] ?? month
  return `${monthLabel} ${year}`
}

/**
 * Formatea rango de fechas: "Mar 2022 - Presente"
 */
export function formatDateRange(start: string, end: string | null): string {
  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : 'Presente'
  return `${startFormatted} - ${endFormatted}`
}

/**
 * Retorna true si el usuario prefiere animaciones reducidas.
 * En SSR retorna true (safe default).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
