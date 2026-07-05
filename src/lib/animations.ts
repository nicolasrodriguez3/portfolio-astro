import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Guard SSR — GSAP es client-side only
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Lag smoothing OFF para consistencia cross-device
  gsap.ticker.lagSmoothing(0)

  // Default ease global
  gsap.defaults({ ease: 'power2.out' })
}

export { gsap, ScrollTrigger }
export { prefersReducedMotion } from './utils'
