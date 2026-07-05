export type TechCategory = 'frontend' | 'backend' | 'database' | 'tools'

export interface Profile {
  name: string
  email: string
  phone: string
  location: string
  cvUrl: string
  freelance: {
    headline: string
    subtitle: string
    whatsappMessage: string
  }
  recruiter: {
    headline: string
    subtitle: string
    valueProp: string
  }
  social: {
    linkedin: string
    github: string
  }
}

export interface Experience {
  company: string
  logo?: string
  role: string
  startDate: string
  endDate: string | null
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
}

export interface Technology {
  name: string
  category: TechCategory
  color?: string
  icon?: string
}

export interface Project {
  slug: string
  title: string
  description: string
  image?: string
  technologies: string[]
  linkToCode?: string
  deployedSite?: string
  destacado: boolean
  orden: number
  casoExito?: CasoExito
}

export interface CasoExito {
  problema: string
  solucion: string
  resultado: string
}

export interface Service {
  slug: string
  name: string
  description: string
  icon: string
  features: string[]
}

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export interface NavbarLink {
  label: string
  href: string
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  href?: string
  download?: boolean
  external?: boolean
  disabled?: boolean
  children?: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

export interface ContainerProps {
  size?: 'default' | 'narrow'
  children?: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  id?: string
}

export interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  gradient?: boolean
  className?: string
}

export interface TechBadgeProps {
  technology: string
  technologies?: Record<string, Technology>
  size?: 'sm' | 'md'
  className?: string
}

export interface AnimatedSectionProps {
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'blur' | 'scale'
  duration?: number
  delay?: number
  stagger?: number
  threshold?: number
  once?: boolean
  className?: string
  children?: React.ReactNode
  as?: 'div' | 'section' | 'article'
  id?: string
}

export interface HeroButton {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
  external?: boolean
  download?: boolean
  icon?: React.ReactNode
}

export interface HeroProps {
  headline: string
  subtitle?: string
  subtitleSize?: 'sm' | 'lg'
  buttons: HeroButton[]
  align?: 'left' | 'center'
  media?: React.ReactNode
  gradient?: boolean
  className?: string
}

export interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
  download?: boolean
  icon?: React.ReactNode
}

export interface CTAProps {
  headline: string
  description?: string
  buttons: CTAButton[]
  variant?: 'default' | 'card'
  className?: string
}

export interface NavbarProps {
  mode: 'freelance' | 'recruiter'
  className?: string
}

export interface FooterProps {
  mode: 'freelance' | 'recruiter'
  className?: string
}

export interface ProjectCardProps {
  title: string
  description: string
  image?: string
  technologies: string[]
  linkToCode?: string
  deployedSite?: string
  casoExito?: CasoExito
  slug?: string
}

export interface TimelineItem {
  date: string
  title: string
  subtitle: string
  description?: string
  children?: React.ReactNode
  isCurrent?: boolean
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export interface ExperienceCardProps {
  experience: Experience
  className?: string
}

export interface ServiceCardProps {
  service: Service
  className?: string
}

export interface FAQProps {
  items: FAQItem[]
  className?: string
}
