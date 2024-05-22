import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core'
import { CardEncontrista, type SortableEncontrista } from './CardEncontristas'
import { TioCirculo, type TioCirculoProps } from './TioCirculo'

interface CirculoInfo {
  idCor: number
  aparente?: TioCirculoProps
  secreto?: TioCirculoProps
}

export interface CirculoDroppable {
  id: UniqueIdentifier
  circuloInfo: CirculoInfo
}

interface CirculoProps {
  circulo: CirculoDroppable
  encontristas: SortableEncontrista[]
}

export type CirculoType = 'Circulo'

export interface CirculoDropData {
  type: CirculoType
  circuloData: CirculoDroppable
}

type CoresMapProps = {
  index: number
  color: string
  label: string
}

const coresMap: CoresMapProps[] = [
  { index: 1, color: 'bg-yellow-500/50', label: 'Amarelo' },
  { index: 2, color: 'bg-blue-500/50', label: 'Azul' },
  { index: 3, color: 'bg-orange-500/50', label: 'Laranja' },
  { index: 4, color: 'bg-emerald-500/50', label: 'Verde' },
  { index: 5, color: 'bg-red-500/50', label: 'Vermelho' },
]

function compareName(a: SortableEncontrista, b: SortableEncontrista) {
  if (a.content.nome < b.content.nome) {
    return -1
  }
  if (a.content.nome > b.content.nome) {
    return 1
  }
  return 0
}

export function Circulo({ circulo, encontristas }: CirculoProps) {
  const cor = coresMap.filter(
    (cor) => cor.index === circulo.circuloInfo.idCor,
  )[0]

  const { setNodeRef } = useDroppable({
    id: circulo.id,
    data: {
      type: 'Circulo',
      accepts: ['Encontrista'],
    },
  })

  const encontristasFromThisCirculo = encontristas
    .filter((encontrista) => encontrista.circuloId === circulo.id)
    .sort(compareName)

  return (
    <div className="p-4">
      <Card
        ref={setNodeRef}
        className="flex flex-col gap-4 text-zinc-700 shadow-lg"
      >
        <CardTitle className={cn('rounded-t-lg', cor.color)}>
          <div className="flex justify-between p-4">
            <h2>{cor.label}</h2>
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {encontristasFromThisCirculo.length}
              </span>
            </div>
          </div>
        </CardTitle>
        <CardContent>
          <div className="flex justify-between gap-4">
            {circulo.circuloInfo.aparente && (
              <TioCirculo
                nome={circulo.circuloInfo.aparente.nome}
                nascimento={circulo.circuloInfo.aparente.nascimento}
                tipo={circulo.circuloInfo.aparente.tipo}
              />
            )}
            {circulo.circuloInfo.secreto && (
              <TioCirculo
                nome={circulo.circuloInfo.secreto.nome}
                nascimento={circulo.circuloInfo.secreto.nascimento}
                tipo={circulo.circuloInfo.secreto.tipo}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            {encontristasFromThisCirculo &&
              encontristasFromThisCirculo.map((encontrista) => {
                return (
                  <CardEncontrista
                    key={`${encontrista.id}-${encontrista.circuloId}`}
                    encontrista={encontrista}
                  />
                )
              })}

            {/* <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-violet-700 bg-violet-200/80">
              Adicione um encontrista aqui
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
