import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core'
import { cva } from 'class-variance-authority'
import { GripVertical, MapPin } from 'lucide-react'
import type { CarroId } from './page'

export interface CardEncontristaCarroContent {
  id: string
  nome: string
  bairro: string
  rua: string
  endNumero: number | null
  endComplemento: string | null
  zona: string | null
  corCirculo: string | null
}

export interface SortableEncontristaCarro {
  id: UniqueIdentifier
  carroId: CarroId
  content: CardEncontristaCarroContent
}

export type EncontristaType = 'Encontrista'

export interface EncontristaDragData {
  type: EncontristaType
  encontrista: SortableEncontristaCarro
}

interface CardEncontristaProps {
  encontrista: SortableEncontristaCarro
  isOverlay?: boolean
}
export function CardEncontristaCarro({
  encontrista,
  isOverlay,
}: CardEncontristaProps) {
  // const endereco = `${encontrista.content.rua} ${encontrista.content.endNumero}/${encontrista.content.endComplemento}`

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

  type Cores = {
    label: string
    value: string
  }

  const coresMap: Cores[] = [
    { label: 'Amarelo', value: 'bg-yellow-400 text-yellow-400' },
    { label: 'Azul', value: 'bg-blue-400 text-blue-400' },
    { label: 'Laranja', value: 'bg-orange-400 text-orange-400' },
    { label: 'Verde', value: 'bg-emerald-400 text-emerald-400' },
    { label: 'Vermelho', value: 'bg-red-400 text-red-400' },
    { label: 'Undefined', value: 'bg-zinc-400 text-zinc-400' },
  ]
  const cor =
    encontrista.content.corCirculo !== null
      ? coresMap.filter((cor) => cor.label === encontrista.content.corCirculo)
      : coresMap.filter((cor) => cor.label === 'Undefined')

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
        <div className="flex items-center gap-2">
          <div className={cn('h-4 w-4 rounded-md', cor[0].value)} />
          <span>{encontrista.content.nome}</span>
        </div>
        <div className="h-auto rounded-md p-1">
          <span className="sr-only">Mover encontrista</span>
          <GripVertical className="h-4 w-4 text-zinc-400" />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col justify-between p-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <MapPin className="h-4 w-4" />
          <span>{encontrista.content.bairro}</span>
        </div>
      </div>
    </Card>
  )
}
