import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lag smoothing OFF para consistencia cross-device
gsap.ticker.lagSmoothing(0)

// Default ease global
gsap.defaults({ ease: 'power2.out' })

export { gsap, ScrollTrigger }
export { prefersReducedMotion } from './utils'
