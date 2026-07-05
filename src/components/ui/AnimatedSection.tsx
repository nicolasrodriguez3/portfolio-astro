import { useRef, useEffect } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/animations'
import { cn } from '@/lib/utils'
import type { AnimatedSectionProps } from '@/types'

const animationPresets: Record<
  string,
  gsap.TweenVars
> = {
  fade: { opacity: 0, y: 20 },
  'slide-up': { opacity: 0, y: 40 },
  'slide-left': { opacity: 0, x: -30 },
  blur: { opacity: 0, filter: 'blur(4px)' },
  scale: { opacity: 0, scale: 0.95 },
}

export default function AnimatedSection({
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  stagger = 0,
  threshold = 0.2,
  once = true,
  className,
  children,
  as: Tag = 'div',
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const targets = stagger > 0
        ? ref.current?.children
        : ref.current

      if (!targets) return

      const fromVars: gsap.TweenVars = {
        ...animationPresets[animation] ?? animationPresets.fade,
        willChange: 'transform, opacity',
      }

      gsap.from(targets, {
        ...fromVars,
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${Math.round((1 - threshold) * 100)}%`,
          once,
          markers: false,
        },
        duration,
        delay,
        stagger: stagger || undefined,
        ease: 'power2.out',
        onComplete: () => {
          if (ref.current) {
            ref.current.style.willChange = 'auto'
          }
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(className)}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Tag>
  )
}
