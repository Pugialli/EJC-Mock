import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, Car, MessageSquare } from 'lucide-react'

export interface CardEncontristaInfo {
  id: string
  nome: string
  idade: string
  bairro: string
}

export interface CardEncontristaProps {
  nome: string
  idade: string
  bairro: string
}

export function CardEncontrista({ nome, idade, bairro }: CardEncontristaProps) {
  return (
    <Card className="p-2">
      <div className="flex items-center justify-between px-2 py-3">
        <span>{nome}</span>
        <MessageSquare className="h-4 w-4 text-zinc-400" />
      </div>
      <Separator />
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar className="h-4 w-4" />
          <span>{idade} anos</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Car className="h-4 w-4" />
          <span>{bairro}</span>
        </div>
      </div>
    </Card>
  )
}
