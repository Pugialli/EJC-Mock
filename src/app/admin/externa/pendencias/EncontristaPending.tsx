import type { EncontristaPendencias } from '@/app/api/encontro/[numeroEncontro]/pendencias/get-pendencias'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { DollarSign, Mails, Users } from 'lucide-react'
import { useState } from 'react'

export interface EncontristaProps {
  encontrista: EncontristaPendencias
}

type Cores = {
  label: string
  value: string
}

export function EncontristaPending({ encontrista }: EncontristaProps) {
  const [checkFamilia, setCheckFamilia] = useState(encontrista.familiaOk)
  const [checkGenerosa, setCheckGenerosa] = useState(encontrista.generosaOk)
  const [checkCartas, setCheckCartas] = useState(encontrista.cartasOk)

  const coresMap: Cores[] = [
    { label: 'Amarelo', value: 'bg-yellow-400 text-yellow-400' },
    { label: 'Azul', value: 'bg-blue-400 text-blue-400' },
    { label: 'Laranja', value: 'bg-orange-400 text-orange-400' },
    { label: 'Verde', value: 'bg-emerald-400 text-emerald-400' },
    { label: 'Vermelho', value: 'bg-red-400 text-red-400' },
    { label: 'Undefined', value: 'bg-zinc-400 text-zinc-400' },
  ]

  const cor =
    encontrista.corCirculo !== undefined
      ? coresMap.filter((cor) => cor.label === encontrista.corCirculo)
      : coresMap.filter((cor) => cor.label === 'Undefined')

  function handleFamilia() {
    api.patch(`/encontrista/${encontrista.id}/change-familia-status`, {
      id: encontrista.id,
      status: !checkFamilia,
    })
    setCheckFamilia(!checkFamilia)
  }

  function handleGenerosa() {
    api.patch(`/encontrista/${encontrista.id}/change-generosa-status`, {
      id: encontrista.id,
      status: !checkGenerosa,
    })
    setCheckGenerosa(!checkGenerosa)
  }

  function handleCartas() {
    api.patch(`/encontrista/${encontrista.id}/change-carta-status`, {
      id: encontrista.id,
      status: !checkCartas,
    })
    setCheckCartas(!checkCartas)
  }

  return (
    <Card className="border-0 bg-primary/5">
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center gap-2">
          <div className={cn('h-4 w-4 rounded-md', cor[0].value)} />
          <span>{encontrista.nome}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  'rounded-full border border-tertiary p-2',
                  checkFamilia
                    ? 'border-primary bg-primary text-white'
                    : 'border-tertiary bg-transparent text-tertiary',
                )}
                onClick={handleFamilia}
              >
                <Users className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-72 text-center">
              Família confirmada
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  'rounded-full border border-tertiary p-2',
                  checkGenerosa
                    ? 'border-primary bg-primary text-white'
                    : 'border-tertiary bg-transparent text-tertiary',
                )}
                onClick={handleGenerosa}
              >
                <DollarSign className={cn('h-4 w-4')} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-72 text-center">
              Generosa paga
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  'rounded-full border border-tertiary p-2',
                  checkCartas
                    ? 'border-primary bg-primary text-white'
                    : 'border-tertiary bg-transparent text-tertiary',
                )}
                onClick={handleCartas}
              >
                <Mails className={cn('h-4 w-4')} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="w-72 text-center">
              Cartas recolhidas
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  )
}
