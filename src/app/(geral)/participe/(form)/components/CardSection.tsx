import { ReactNode } from 'react'

interface CardSectionProps {
  children: ReactNode
  title: string
}

export function CardSection({ children, title }: CardSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold lg:text-xl ">{title}</span>
        <span className="text-end text-xs text-zinc-500">
          *Perguntas obrigatórias
        </span>
      </div>
      {children}
    </div>
  )
}
