import { Card, CardContent } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CardFormProps {
  title: string
  sectionId: string
  children: ReactNode
}

export function CardForm({ title, sectionId, children }: CardFormProps) {
  return (
    <Card id={sectionId} className="w-full px-3 pt-8 text-zinc-700 ">
      <CardContent className="w-full">
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold lg:text-nowrap">{title}</span>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
