import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core'
import { CircleUserRound, MessageSquare } from 'lucide-react'
import {
  CardEncontristaCarro,
  type SortableEncontristaCarro,
} from './CardEncontristasCarro'
import { type TioExternaProps } from './TioExterna'

interface CarroInfo {
  numeroCarro: number
  motorista: TioExternaProps
  carona?: TioExternaProps
  bairro: string
  zona: string | null
  lugaresCarro: number
  observacoes: string
  externa: string
}

export interface CarroDroppable {
  id: UniqueIdentifier
  carroInfo: CarroInfo
}

interface CarroProps {
  carro: CarroDroppable
  encontristas: SortableEncontristaCarro[]
}

export type CarroType = 'Carro'

export interface CarroDropData {
  type: CarroType
  circuloData: CarroDroppable
}

function compareName(a: SortableEncontristaCarro, b: SortableEncontristaCarro) {
  if (a.content.nome < b.content.nome) {
    return -1
  }
  if (a.content.nome > b.content.nome) {
    return 1
  }
  return 0
}

const corZona = [
  {
    zona: 'sul',
    bg: 'bg-red-500/20',
  },
  {
    zona: 'norte',
    bg: 'bg-emerald-500/20',
  },
  {
    zona: 'oeste',
    bg: 'bg-yellow-500/20',
  },
  {
    zona: 'central',
    bg: 'bg-blue-500/20',
  },
  {
    zona: '?',
    bg: 'bg-zinc-500/20',
  },
]

export function Carro({ carro, encontristas }: CarroProps) {
  const { setNodeRef } = useDroppable({
    id: carro.id,
    data: {
      type: 'Carro',
      accepts: ['Encontrista'],
    },
  })

  const cor = carro.carroInfo.zona
    ? corZona.filter((zona) => zona.zona === carro.carroInfo.zona)
    : corZona.filter((zona) => zona.zona === '?')

  const encontristasFromThisCarro = encontristas
    .filter((encontrista) => encontrista.carroId === carro.id)
    .sort(compareName)

  const obsColor = carro.carroInfo.observacoes
    ? 'text-zinc-700'
    : 'text-zinc-400'

  const externaColor = carro.carroInfo.externa
    ? 'text-zinc-700'
    : 'text-zinc-400'

  return (
    <div className="p-4">
      <Card
        ref={setNodeRef}
        className="flex flex-col gap-4 text-zinc-700 shadow-lg"
      >
        <CardTitle className={cn('rounded-t-lg', cor[0].bg)}>
          <div className="flex items-center justify-between px-4 py-2 text-xl">
            <div className="flex flex-col gap-2 ">
              <h2>
                {carro.carroInfo.motorista.nome}{' '}
                {carro.carroInfo.carona && (
                  <span>e {carro.carroInfo.carona.nome} </span>
                )}
              </h2>
              <div className="flex gap-4 text-sm">
                <span className="text-sm">{`${carro.carroInfo.bairro}`}</span>
                <span>
                  Vagas:{' '}
                  {carro.carroInfo.lugaresCarro -
                    encontristasFromThisCarro.length}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-base">
              <span>#{carro.carroInfo.numeroCarro}</span>
              <Tooltip>
                <TooltipTrigger disabled={carro.carroInfo.observacoes === ''}>
                  <MessageSquare className={cn('size-4', obsColor)} />
                </TooltipTrigger>
                <TooltipContent className="w-72 text-center">
                  {carro.carroInfo.observacoes ? (
                    <span>{carro.carroInfo.observacoes}</span>
                  ) : (
                    <span className="text-zinc-400">Não tem observação</span>
                  )}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger disabled={carro.carroInfo.externa === ''}>
                  <CircleUserRound className={cn('size-4', externaColor)} />
                </TooltipTrigger>
                <TooltipContent className="w-auto text-center">
                  {carro.carroInfo.externa ? (
                    <span>{carro.carroInfo.externa}</span>
                  ) : (
                    <span className="text-zinc-400">
                      Não tem responsável ainda
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardTitle>
        <CardContent>
          <div className="flex flex-col gap-4">
            {encontristasFromThisCarro &&
              encontristasFromThisCarro.map((encontrista) => {
                return (
                  <CardEncontristaCarro
                    key={`${encontrista.id}-${encontrista.carroId}`}
                    encontrista={encontrista}
                  />
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
