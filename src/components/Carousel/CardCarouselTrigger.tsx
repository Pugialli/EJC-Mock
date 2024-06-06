import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { type ElementType } from 'react'

export interface CardInfo {
  title: string
  content: string
  icon: ElementType
}

interface CardCarouselTriggerProps extends CardInfo {
  selectedIndex: number
  index: number
  setIndex: (index: number) => void
}

export function CardCarouselTrigger({
  title,
  content,
  icon: Icon,
  selectedIndex,
  index,
  setIndex,
}: CardCarouselTriggerProps) {
  const ariaSelected = selectedIndex === index
  function selectCard() {
    setIndex(index)
  }
  return (
    <Card
      className="flex w-32 cursor-pointer flex-col gap-1 bg-zinc-50 px-1 py-2 text-center text-tertiary shadow-lg aria-selected:-translate-y-2 lg:w-100 lg:gap-6 lg:px-8 lg:py-8 lg:aria-selected:-translate-y-4"
      aria-selected={ariaSelected}
      onMouseEnter={selectCard}
      onClick={selectCard}
    >
      <CardTitle className="flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary lg:h-12 lg:w-12" />
      </CardTitle>
      <CardContent className="flex h-full flex-col justify-center pb-0 lg:justify-start lg:gap-4">
        <span className="text-xs font-bold lg:text-xl">{title}</span>
        <span className="hidden text-xs lg:flex lg:text-base">{content}</span>
      </CardContent>
    </Card>
  )
}
