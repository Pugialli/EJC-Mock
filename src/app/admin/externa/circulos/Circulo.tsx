import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CardEncontrista, type CardEncontristaInfo } from './CardEncontristas'
import { TioCirculo, type TioCirculoProps } from './TioCirculo'

interface Circulo {
  idCor: number
  aparente?: TioCirculoProps
  secreto?: TioCirculoProps
  encontristas?: CardEncontristaInfo[]
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

export function Circulo({ idCor, aparente, secreto, encontristas }: Circulo) {
  const cor = coresMap.filter((cor) => cor.index === idCor)[0]

  return (
    <div className="p-4">
      <Card className="flex flex-col gap-4 text-zinc-700 shadow-lg">
        <CardTitle className={cn('rounded-t-lg', cor.color)}>
          <div className="p-4">
            <h2>{cor.label}</h2>
          </div>
        </CardTitle>
        <CardContent>
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            {aparente && (
              <TioCirculo nome="João Paulo" idade="31" tipo="Aparente" />
            )}
            {secreto && (
              <TioCirculo nome="Patricia Marques" idade="29" tipo="Secreto" />
            )}
          </div>
          <div className="flex flex-col gap-4">
            {encontristas &&
              encontristas.map((encontrista) => {
                return (
                  <CardEncontrista
                    key={encontrista.id}
                    nome={encontrista.nome}
                    idade={encontrista.idade}
                    bairro={encontrista.bairro}
                  />
                )
              })}

            <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-violet-700 bg-violet-200/80">
              Adicione um encontrista aqui
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
