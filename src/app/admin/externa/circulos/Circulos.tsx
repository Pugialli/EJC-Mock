import type { CardEncontristaInfo } from './CardEncontristas'
import { Circulo } from './Circulo'
import type { TioCirculoProps } from './TioCirculo'

export function Circulos() {
  const idCores = [1, 2, 4, 3, 5]
  const aparente: TioCirculoProps = {
    nome: 'João Paulo Pugialli',
    idade: '31',
    tipo: 'Aparente',
  }

  const secreto: TioCirculoProps = {
    nome: 'Patricia Marques',
    idade: '28',
    tipo: 'Secreto',
  }

  const encontristas: CardEncontristaInfo[] = [
    {
      id: '1',
      nome: 'Amanda Roberta',
      idade: '23',
      bairro: 'Copacabana',
    },
    {
      id: '3',
      nome: 'Alexandre Alves',
      idade: '18',
      bairro: 'Vila da Penha',
    },
    {
      id: '4',
      nome: 'Maia [Adicionar]',
      idade: '20',
      bairro: 'Jardim Botânico',
    },
  ]

  return (
    <div className="grid grid-cols-2">
      {idCores.map((idCor) => {
        return (
          <div key={idCor} className="col-span-2 lg:col-span-1">
            <Circulo
              idCor={idCor}
              aparente={aparente}
              secreto={secreto}
              encontristas={encontristas}
            />
          </div>
        )
      })}
    </div>
  )
}
