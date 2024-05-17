import { Card } from '@/components/ui/card'
import { CardEncontrista, type CardEncontristaInfo } from './CardEncontristas'

export function ListaConfirmadosSemCirculo() {
  const encontristas: CardEncontristaInfo[] = [
    {
      id: '1',
      nome: 'Amanda Roberta',
      idade: '23',
      bairro: 'Copacabana',
    },
    {
      id: '2',
      nome: 'João Paulo Pugialli',
      idade: '31',
      bairro: 'Botafogo',
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
    <div className="p-4">
      <Card className="flex flex-col gap-8 p-4 text-zinc-700 shadow-lg">
        <h2 className="text-xl font-bold">Encontristas sem Círculo</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded bg-violet-100 p-2">
            <h2 className="text-xl font-bold">Total de Encontristas</h2>
            <span className="font-medium">12</span>
          </div>
          {encontristas.map((encontrista) => {
            return (
              <CardEncontrista
                key={encontrista.id}
                nome={encontrista.nome}
                idade={encontrista.idade}
                bairro={encontrista.bairro}
              />
            )
          })}
        </div>
      </Card>
    </div>
  )
}
