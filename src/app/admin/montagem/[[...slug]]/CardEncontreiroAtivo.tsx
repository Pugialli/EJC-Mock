import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'
import { X } from 'lucide-react'
import Link from 'next/link'

interface EncontreiroAtivo {
  slug: string
  avatarURL?: string
  nome: string
  encontro: string
  equipe?: string
}

interface CardEncontreiroAtivoProps {
  encontreiro: EncontreiroAtivo
  isSelected?: boolean
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
]

export function CardEncontreiroAtivo({
  encontreiro,
  isSelected = false,
}: CardEncontreiroAtivoProps) {
  const equipeColor = equipes.filter(
    (equipe) => encontreiro.equipe === equipe.value,
  )

  const equipeEncontro =
    equipeColor.length > 0 ? equipeColor[0].color : 'bg-transparent'

  return (
    <Link href={`/admin/montagem/${encontreiro.slug}`}>
      <HoverCard>
        <HoverCardTrigger>
          <Card
            className={cn(
              isSelected ? '-translate-x-8' : '',
              'flex cursor-pointer items-center justify-between gap-4 px-4 py-3 hover:bg-zinc-100',
            )}
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
              </div>
              <div className="flex items-center gap-4">
                <span>{encontreiro.nome}</span>
                <span className="text-xs text-zinc-500">
                  {encontreiro.encontro}ª EJC
                </span>
              </div>
            </div>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent
          avoidCollisions
          align="end"
          className="z-30 flex items-center justify-center"
        >
          <Avatar className="size-40">
            <AvatarImage src={encontreiro.avatarURL} />
            <AvatarFallback className="text-xl">
              {getInitials(encontreiro.nome)}
            </AvatarFallback>
          </Avatar>
        </HoverCardContent>
      </HoverCard>
    </Link>
  )
}
