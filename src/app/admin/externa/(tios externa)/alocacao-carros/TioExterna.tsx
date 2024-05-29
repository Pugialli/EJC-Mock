import { textEllipsis } from '@/utils/ellipsis-text'
import { Armchair, CarFront } from 'lucide-react'

export interface TioExternaProps {
  nome: string
  tipo: 'Motorista' | 'Carona'
}

export function TioExterna({ nome, tipo }: TioExternaProps) {
  return (
    <div className="flex w-full gap-2">
      {tipo === 'Motorista' ? (
        <CarFront className="h-4 w-4" />
      ) : (
        <Armchair className="h-4 w-4" />
      )}
      <span className="text-sm">{textEllipsis(nome, 25)}</span>
    </div>
  )
}
