import { Separator } from '@/components/ui/separator'
import { Calendar, Crown } from 'lucide-react'

export interface TioCirculoProps {
  nome: string
  idade: string
  tipo: 'Aparente' | 'Secreto'
}

export function TioCirculo({ nome, idade, tipo }: TioCirculoProps) {
  return (
    <div>
      <h1>{nome}</h1>
      <Separator />
      <div className="flex flex-col justify-between p-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar className="h-4 w-4" />
          <span>{idade} anos</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Crown className="h-4 w-4" />
          <span>Tio {tipo}</span>
        </div>
      </div>
    </div>
  )
}
