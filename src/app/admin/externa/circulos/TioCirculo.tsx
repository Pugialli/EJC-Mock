import type { TioCirculoType } from '@/app/api/encontro/[numeroEncontro]/circulos/get-circulos'
import { Separator } from '@/components/ui/separator'
import { textEllipsis } from '@/utils/ellipsis-text'
import { getAge } from '@/utils/get-age'
import { stringToDate } from '@/utils/string-to-date'
import { Calendar, Crown } from 'lucide-react'

export interface TioCirculoProps {
  data: TioCirculoType
}

export function TioCirculo({ data }: TioCirculoProps) {
  const { nome, nascimento, tipo } = data
  const idade = getAge(stringToDate(nascimento))
  return (
    <div className="w-full">
      <h1>{textEllipsis(nome, 25)}</h1>
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
