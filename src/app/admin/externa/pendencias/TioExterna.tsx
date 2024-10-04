import type { CarroPendencias } from '@/app/api/encontro/[numeroEncontro]/pendencias/get-pendencias'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CircleUserRound, MessageSquare } from 'lucide-react'
import { EncontristaPending } from './EncontristaPending'

export interface TioExternaProps {
  carro: CarroPendencias
}

export function TioExterna({ carro }: TioExternaProps) {
  const obsColor = carro.observacao ? 'text-zinc-700' : 'text-zinc-400'

  const externaColor = carro.responsavelExterna
    ? 'text-zinc-700'
    : 'text-zinc-400'

  return (
    <div className="col-span-1 p-4">
      <Card className="flex flex-col gap-4 text-zinc-700 shadow-lg">
        <CardTitle className={cn('rounded-t-lg bg-primary/20')}>
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-2 ">
              <h2>
                {carro.motorista.nome}{' '}
                {carro.carona && <span>e {carro.carona.nome} </span>}
              </h2>
            </div>
            <div className="flex gap-4 text-sm">
              <Tooltip>
                <TooltipTrigger disabled={carro.observacao === ''}>
                  <MessageSquare className={cn('h-4 w-4', obsColor)} />
                </TooltipTrigger>
                <TooltipContent className="w-72 text-center">
                  {carro.observacao ? (
                    <span>{carro.observacao}</span>
                  ) : (
                    <span className="text-zinc-400">Não tem observação</span>
                  )}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger disabled={carro.responsavelExterna === ''}>
                  <CircleUserRound className={cn('h-4 w-4', externaColor)} />
                </TooltipTrigger>
                <TooltipContent className="w-auto text-center">
                  {carro.responsavelExterna ? (
                    <span>{carro.responsavelExterna}</span>
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
            {carro.encontristas &&
              carro.encontristas.map((encontrista) => {
                return (
                  <EncontristaPending
                    key={encontrista.id}
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
