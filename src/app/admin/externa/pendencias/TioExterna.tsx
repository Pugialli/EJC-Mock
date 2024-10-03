import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleUserRound, MessageSquare } from "lucide-react"
import { EncontristaPending } from "./EncontristaPending"


export interface TioExterna {
  nome: string
  tipo: 'Motorista' | 'Carona'
}

interface Carro {
  id: string
  numeroCarro: number
  motorista: TioExterna
  carona?: TioExterna
  bairro: string
  zona: string | null
  lugaresCarro: number
  observacoes: string
  externa: string
}


interface EncontristaCarro {
  id: string
  carroId: string
  nome: string
  bairro: string
  rua: string
  endNumero: number | null
  endComplemento: string | null
  zona: string | null
  corCirculo: string | null
}

export interface TioExternaProps {
  carro: Carro
  encontristas: EncontristaCarro[]
}


function compareName(a: EncontristaCarro, b: EncontristaCarro) {
  if (a.nome < b.nome) {
    return -1
  }
  if (a.nome > b.nome) {
    return 1
  }
  return 0
}

export function TioExterna(
  // {carro, encontristas}: TioExternaProps
) {

  // const encontristasFromThisCarro = encontristas
  //   .filter((encontrista) => encontrista.carroId === carro.id)
  //   .sort(compareName)

  const obsColor =
    // carro.observacoes    ? 'text-zinc-700'    :
    'text-zinc-400'

  const externaColor =
    // carro.externa    ? 'text-zinc-700'    : 
    'text-zinc-400'

  return (
    <div className="p-4 col-span-1">
      <Card
        className="flex flex-col gap-4 text-zinc-700 shadow-lg"
      >
        <CardTitle className={cn('rounded-t-lg bg-primary/20')}>
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-2 ">
              <h2>
                João Paulo e Amanda
                {/* {carro.motorista.nome}{' '}
                {carro.carona && (
                  <span>e {carro.carona.nome} </span>
                )} */}
              </h2>
            </div>
            <div className="flex gap-4 text-sm">
              <MessageSquare className={cn('h-4 w-4', obsColor)} />
              {/* <Tooltip>
                <TooltipTrigger disabled={carro.observacoes === ''}>
                  <MessageSquare className={cn('h-4 w-4', obsColor)} />
                </TooltipTrigger>
                <TooltipContent className="w-72 text-center">
                  {carro.observacoes ? (
                    <span>{carro.observacoes}</span>
                  ) : (
                    <span className="text-zinc-400">Não tem observação</span>
                  )}
                </TooltipContent>
              </Tooltip> */}
              <CircleUserRound className={cn('h-4 w-4', externaColor)} />
              {/* <Tooltip>
                <TooltipTrigger disabled={carro.externa === ''}>
                  <CircleUserRound className={cn('h-4 w-4', externaColor)} />
                </TooltipTrigger>
                <TooltipContent className="w-auto text-center">
                  {carro.externa ? (
                    <span>{carro.externa}</span>
                  ) : (
                    <span className="text-zinc-400">
                      Não tem responsável ainda
                    </span>
                  )}
                </TooltipContent>
              </Tooltip> */}
            </div>
          </div>
        </CardTitle>
        <CardContent>
          <div className="flex flex-col gap-4">
            <EncontristaPending />
            <EncontristaPending />
            <EncontristaPending />

            {/* {encontristasFromThisCarro &&
              encontristasFromThisCarro.map((encontrista) => {
                return (
                  <EncontristaPending />
                )
              })} */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}