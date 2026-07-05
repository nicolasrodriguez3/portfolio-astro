import { useState, useId } from 'react'
import type { FAQProps } from '@/types'
import { cn } from '@/lib/utils'

export default function FAQ({ items, className }: FAQProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const baseId = useId()

  if (!items || items.length === 0) return null

  function toggle(id: string) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, i) => {
        const id = `${baseId}-faq-${i}`
        const isOpen = activeId === id

        return (
          <div
            key={id}
            className="border border-zinc-800 rounded-xl overflow-hidden"
          >
            <h3>
              <button
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-trigger`}
                className="flex items-center justify-between w-full px-6 py-4 text-left text-zinc-100 font-medium hover:bg-zinc-800/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400"
              >
                <span>{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-zinc-500 flex-shrink-0 ml-4 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>

            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-6 pb-4 text-sm text-zinc-400 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
