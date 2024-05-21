import { cn } from '@/lib/utils'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { SortableItem } from '../DragNDrop/SortableItem'
import { Button } from '../ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface ChangeOrderDialogProps {
  order: number
}

type CoresMapProps = {
  index: number
  color: string
  label: string
}

const coresMap: CoresMapProps[] = [
  { index: 1, color: 'bg-yellow-400', label: 'Amarelo' },
  { index: 2, color: 'bg-blue-400', label: 'Azul' },
  { index: 3, color: 'bg-orange-400', label: 'Laranja' },
  { index: 4, color: 'bg-emerald-400', label: 'Verde' },
  { index: 5, color: 'bg-red-500', label: 'Vermelho' },
]

export function ChangeOrderDialog({ order }: ChangeOrderDialogProps) {
  const orderCirculos = order.toString().split('').map(Number)

  const dndSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )
  return (
    <>
      <DialogHeader>
        <DialogTitle>Ordem dos Círculos</DialogTitle>
        <DialogDescription>
          Altere a ordem dos círculos deste encontro.
        </DialogDescription>
      </DialogHeader>
      <DndContext
        onDragEnd={(event) => {
          console.log(event)
        }}
        collisionDetection={closestCenter}
        sensors={dndSensors}
      >
        <SortableContext
          items={orderCirculos}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex w-full flex-col gap-2">
            <span>Mais novo</span>
            {orderCirculos.map((circuloIndex) => {
              const cor = coresMap.filter(
                (cor) => cor.index === circuloIndex,
              )[0]
              return (
                <SortableItem id={cor.index.toString()} key={cor.index}>
                  <div
                    className={cn(
                      'flex justify-center rounded-full p-4',
                      cor.color,
                    )}
                  >
                    <span className="text-base">{cor.label}</span>
                  </div>
                </SortableItem>
              )
            })}
            <span>Mais velho</span>
          </div>
        </SortableContext>
      </DndContext>

      <DialogFooter>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </>
  )
}
