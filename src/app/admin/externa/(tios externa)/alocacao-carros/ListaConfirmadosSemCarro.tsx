import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { useUniqueId } from '@dnd-kit/utilities'
import {
  CardEncontristaCarro,
  type SortableEncontristaCarro,
} from './CardEncontristasCarro'

interface ListaConfirmadosSemCirculoProps {
  encontristas: SortableEncontristaCarro[]
}

export function ListaConfirmadosSemCarro({
  encontristas,
}: ListaConfirmadosSemCirculoProps) {
  const encontristasWithoutCarro = encontristas.filter(
    (encontrista) => encontrista.carroId === '0',
  )

  const { setNodeRef } = useDroppable({
    id: useUniqueId('EncontristaSemCarro', '0'),
    data: {
      type: 'Carro',
      accepts: ['Encontrista'],
    },
  })

  const encontristasSul = encontristasWithoutCarro.filter(
    (encontrista) => encontrista.content.zona === 'sul',
  )
  const encontristasNorte = encontristasWithoutCarro.filter(
    (encontrista) => encontrista.content.zona === 'norte',
  )
  const encontristasOeste = encontristasWithoutCarro.filter(
    (encontrista) => encontrista.content.zona === 'oeste',
  )
  const encontristasCentro = encontristasWithoutCarro.filter(
    (encontrista) => encontrista.content.zona === 'central',
  )
  const encontristasNaoDefinido = encontristasWithoutCarro.filter(
    (encontrista) => encontrista.content.zona === 'nenhuma',
  )

  const encontristasPorZona = [
    {
      zona: 'Sul',
      bg: 'bg-red-500/20',
      encontristas: encontristasSul,
    },
    {
      zona: 'Norte',
      bg: 'bg-emerald-500/20',
      encontristas: encontristasNorte,
    },
    {
      zona: 'Oeste',
      bg: 'bg-yellow-500/20',
      encontristas: encontristasOeste,
    },
    {
      zona: 'Centro',
      bg: 'bg-blue-500/20',
      encontristas: encontristasCentro,
    },
    {
      zona: '?',
      bg: 'bg-zinc-500/20',
      encontristas: encontristasNaoDefinido,
    },
  ]

  return (
    <div className="p-4">
      <div className="">
        <Card
          ref={setNodeRef}
          className="flex flex-col gap-8 p-4 text-zinc-700 shadow-lg"
        >
          <div className="flex items-center justify-between p-2">
            <h2 className="text-xl font-bold">Encontristas sem Carro</h2>
            {/* <span className="rounded-lg bg-zinc-500/20 px-2 py-1 font-medium">
            {encontristasWithoutCarro.length}
          </span> */}
          </div>

          <div className="flex flex-col gap-4">
            {/* <ScrollArea className="max-h-96 rounded-md px-4"> */}
            {encontristasPorZona.map((encontristasZona) => {
              if (encontristasZona.encontristas.length === 0)
                return <div key={encontristasZona.zona} className="sr-only" />
              return (
                <div
                  key={encontristasZona.zona}
                  className="flex flex-col gap-4"
                >
                  <div
                    className={cn(
                      'flex items-center justify-between rounded-lg p-2',
                      encontristasZona.bg,
                    )}
                  >
                    <span className="text-xl font-bold">
                      Zona {encontristasZona.zona}
                    </span>
                    <span>{encontristasZona.encontristas.length}</span>
                  </div>
                  {encontristasZona.encontristas.map((encontrista) => {
                    return (
                      <CardEncontristaCarro
                        key={`${encontrista.id}-${encontrista.content.zona}`}
                        encontrista={encontrista}
                      />
                    )
                  })}
                </div>
              )
            })}
            {/* </ScrollArea> */}
          </div>
        </Card>
      </div>
    </div>
  )
}
