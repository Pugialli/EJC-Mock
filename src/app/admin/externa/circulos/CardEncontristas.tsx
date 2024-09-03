import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { getAge } from '@/utils/get-age'
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core'
import { cva } from 'class-variance-authority'
import { Calendar, Car, GripVertical } from 'lucide-react'
import type { CirculoId } from './page'

export interface CardEncontrista {
  id: string
  nome: string
  dataNasc: Date
  bairro: string
}

export interface SortableEncontrista {
  id: UniqueIdentifier
  circuloId: CirculoId
  content: CardEncontrista
}

export type EncontristaType = 'Encontrista'

export interface EncontristaDragData {
  type: EncontristaType
  encontrista: SortableEncontrista
}

interface CardEncontristaProps {
  encontrista: SortableEncontrista
  isOverlay?: boolean
}
export function CardEncontrista({
  encontrista,
  isOverlay,
}: CardEncontristaProps) {
  const idade = encontrista.content.dataNasc
    ? getAge(encontrista.content.dataNasc)
    : 0

  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: encontrista.id,
    data: {
      type: 'Encontrista',
      encontrista,
    } satisfies EncontristaDragData,
    attributes: {
      roleDescription: 'Encontrista',
    },
  })

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary cursor-grabbing',
      },
    },
  })

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        'cursor-grab',
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
        }),
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between px-2 py-3">
        <span>{encontrista.content.nome}</span>
        <div className="h-auto rounded-md p-1">
          <span className="sr-only">Mover encontrista</span>
          <GripVertical className="h-4 w-4 text-zinc-400" />
        </div>
      </div>
      <Separator />
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar className="h-4 w-4" />
          <span>{idade} anos</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Car className="h-4 w-4" />
          <span>{encontrista.content.bairro}</span>
        </div>
      </div>
    </Card>
  )
}
