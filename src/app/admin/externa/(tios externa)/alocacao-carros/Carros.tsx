import type { CarroFromEncontro } from '@/app/api/encontro/[numeroEncontro]/carros/get-carros'
import { CarroEmpty } from '../../CarroEmpty'
import type { SortableEncontristaCarro } from './CardEncontristasCarro'
import { Carro, type CarroDroppable } from './Carro'

interface CarrosProps {
  carros: CarroFromEncontro[]
  encontristas: SortableEncontristaCarro[]
}

export function Carros({ carros, encontristas }: CarrosProps) {
  return (
    <div className="grid grid-cols-2">
      {carros.length === 0 && <CarroEmpty />}
      {carros.map((carro) => {
        const droppableCarro: CarroDroppable = {
          id: carro.id,
          carroInfo: {
            motorista: carro.motorista,
            carona: carro.carona,
            bairro: carro.bairro,
            zona: carro.zona,
            numeroCarro: carro.numero,
            lugaresCarro: carro.lugaresCarro,
            observacoes: carro.observacao,
            externa: carro.responsavelExterna,
          },
        }
        const encontristasCarro = encontristas.filter(
          (encontrista) => encontrista.carroId === droppableCarro.id,
        )
        return (
          <div key={carro.id} className="col-span-2 lg:col-span-1">
            <Carro carro={droppableCarro} encontristas={encontristasCarro} />
          </div>
        )
      })}
    </div>
  )
}
