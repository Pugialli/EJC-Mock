import { Card } from '@/components/ui/card'
import { useDroppable } from '@dnd-kit/core'
import { useUniqueId } from '@dnd-kit/utilities'
import { compareDesc } from 'date-fns'
import { CardEncontrista, type SortableEncontrista } from './CardEncontristas'

interface ListaConfirmadosSemCirculoProps {
  encontristas: SortableEncontrista[]
}

function compareDate(a: SortableEncontrista, b: SortableEncontrista) {
  return compareDesc(a.content.dataNasc, b.content.dataNasc)
}

export function ListaConfirmadosSemCirculo({
  encontristas,
}: ListaConfirmadosSemCirculoProps) {
  const encontristasWithoutCirculo = encontristas
    .filter((encontrista) => encontrista.circuloId === '0')
    .sort(compareDate)

  const { setNodeRef } = useDroppable({
    id: useUniqueId('EncontristaSemCirculo', '0'),
    data: {
      type: 'Circulo',
      accepts: ['Encontrista'],
    },
  })

  return (
    <div className="p-4">
      <Card
        ref={setNodeRef}
        className="flex flex-col gap-8 p-4 text-zinc-700 shadow-lg"
      >
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold">Encontristas sem Círculo</h2>
          <span className="font-medium">
            {encontristasWithoutCirculo.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {encontristasWithoutCirculo.map((encontrista) => {
            return (
              <CardEncontrista
                key={`${encontrista.id}-${encontrista.circuloId}`}
                encontrista={encontrista}
              />
            )
          })}
        </div>
      </Card>
    </div>
  )
}
