import type { EncontreiroSummaryData } from '@/app/api/montagem/summary/[encontro]/get-encontreiros-summary'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'
import { Crown, X } from 'lucide-react'

interface CardEncontreiroAtivoProps {
  encontreiro: EncontreiroSummaryData
  isSelected?: boolean
  setSlug: (slug: string) => void
}
const equipes = [
  {
    value: 'nao_participara',
    color: 'bg-rose-800/90',
  },
  {
    value: 'apresentacao',
    color: 'bg-amber-900/80',
  },
  {
    value: 'tio_circulo',
    color: 'bg-amber-900/80',
  },
  {
    value: 'tio_aparente',
    color: 'bg-amber-900/80',
  },
  {
    value: 'tio_secreto',
    color: 'bg-amber-900/80',
  },
  {
    value: 'boa_vontade',
    color: 'bg-amber-900/80',
  },
  { value: 'externa', color: 'bg-pink-500' },
  {
    value: 'meditacao',
    color: 'bg-pink-500',
  },
  { value: 'vigilia', color: 'bg-pink-500' },
  { value: 'compras', color: 'bg-pink-500' },
  { value: 'recepcao', color: 'bg-pink-500' },
  { value: 'banda', color: 'bg-yellow-500' },
  { value: 'cozinha', color: 'bg-blue-500' },
  { value: 'garcom', color: 'bg-green-500' },
  { value: 'liturgia', color: 'bg-red-700' },
  {
    value: 'mini',
    color: 'bg-white border border-zinc-300',
  },
  {
    value: 'ordem',
    color: 'bg-zinc-500',
  },
  {
    value: 'secretaria',
    color: 'bg-orange-500',
  },
  { value: 'teatro', color: 'bg-black' },
  { value: 'dirigente', color: 'bg-primary' },
]

export function CardEncontreiroAtivo({
  encontreiro,
  isSelected = false,
  setSlug,
}: CardEncontreiroAtivoProps) {
  const equipeColor = equipes.filter(
    (equipe) => encontreiro.equipeMontagem === equipe.value,
  )

  const equipeEncontro =
    equipeColor.length > 0 ? equipeColor[0].color : 'bg-transparent'

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card
          className={cn(
            isSelected ? '-translate-x-8' : '',
            'flex cursor-pointer items-center justify-between gap-4 px-4 py-3 hover:bg-zinc-100',
          )}
          onClick={() => {
            setSlug(encontreiro.slug)
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                equipeEncontro,
                'flex h-5 w-5 items-center justify-center rounded-full  shadow-sm',
              )}
            >
              {equipeColor.length > 0 &&
                equipeColor[0].value === 'nao_participara' && (
                  <X className="size-3 text-white" />
                )}
              {encontreiro.coordenador &&
                (encontreiro.equipeMontagem === 'mini' ? (
                  <Crown className="size-3 text-black" />
                ) : (
                  <Crown className="size-3 text-white" />
                ))}
            </div>
            <div className="flex items-center gap-4">
              {encontreiro.apelido ? (
                <span className="line-clamp-1">
                  {encontreiro.nomeCompleto.split(' ')[0]} (
                  {encontreiro.apelido})
                </span>
              ) : (
                <span className="line-clamp-1">{encontreiro.nomeCompleto}</span>
              )}
              <span className="text-xs text-zinc-500">
                {encontreiro.numeroEncontro}º EJC
              </span>
            </div>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent
        avoidCollisions
        align="end"
        className="z-30 flex flex-col items-center justify-center gap-4"
      >
        <Avatar className="size-40">
          {encontreiro.avatarUrl && <AvatarImage src={encontreiro.avatarUrl} />}
          <AvatarFallback className="text-xl">
            {getInitials(encontreiro.nomeCompleto)}
          </AvatarFallback>
        </Avatar>
        <span className="text-center">{encontreiro.nomeCompleto}</span>
      </HoverCardContent>
    </HoverCard>
  )
}
