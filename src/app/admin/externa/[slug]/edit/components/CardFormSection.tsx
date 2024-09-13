import type { ReactNode } from 'react'

interface CardFormSectionProps {
  children: ReactNode
}

export function CardFormSection({ children }: CardFormSectionProps) {
  return (
    <div className="flex flex-col gap-5 px-0 py-5 text-lg lg:gap-7 lg:py-7">
      {children}
    </div>
  )
}
