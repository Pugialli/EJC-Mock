import { Card } from '@/components/ui/card'
import Image, { type StaticImageData } from 'next/image'

export interface CardEventoContentProps {
  title: string
  content: string
}

export interface CardCarouselContentProps {
  imageSrc: StaticImageData
  aditionalInfo?: CardEventoContentProps
  type?: 'evento' | 'mapa'
}

export function CardCarouselContent({
  imageSrc,
  aditionalInfo,
  type = 'evento',
}: CardCarouselContentProps) {
  return (
    <Card className="flex items-center justify-center bg-zinc-50 p-0 shadow-xl">
      {type === 'evento' ? (
        <div className="flex h-98 flex-col items-center gap-2 p-4 lg:h-auto lg:flex-row lg:gap-8 lg:p-8">
          <Image
            src={imageSrc.src}
            width={imageSrc.width}
            height={imageSrc.height}
            alt="Imagem card"
          />
          {aditionalInfo && (
            <div className="flex flex-col gap-2 text-tertiary lg:gap-9">
              <h2 className="text-sm font-bold lg:text-2xl">
                {aditionalInfo.title}
              </h2>
              <span className="text-xs lg:text-base">
                {aditionalInfo.content}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-0 lg:p-4">
          <Image src={imageSrc} className="h-auto w-auto" alt="Imagem card" />
        </div>
      )}
    </Card>
  )
}
