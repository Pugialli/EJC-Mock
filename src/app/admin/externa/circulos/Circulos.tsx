import type { CirculoEncontro } from '@/app/api/encontro/[numeroEncontro]/circulos/get-circulos'
import type { SortableEncontrista } from './CardEncontristas'
import { Circulo, type CirculoDroppable } from './Circulo'

interface CirculosProps {
  circulos: CirculoEncontro[]
  encontristas: SortableEncontrista[]
}

export function Circulos({ circulos, encontristas }: CirculosProps) {
  const encontroCirculos = circulos.filter(
    (circulo) => circulo.idCorCirculo !== 0,
  )
  return (
    <div className="grid grid-cols-2">
      {encontroCirculos.map((circulo) => {
        const droppableCirculo: CirculoDroppable = {
          id: circulo.id,
          circuloInfo: {
            idCor: circulo.idCorCirculo,
            aparente: circulo.tioAparente,
            secreto: circulo.tioSecreto,
          },
        }
        return (
          <div key={circulo.id} className="col-span-2 lg:col-span-1">
            <Circulo circulo={droppableCirculo} encontristas={encontristas} />
          </div>
        )
      })}
    </div>
  )
}
