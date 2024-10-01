import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CirculoForm } from './CirculoForm'

export function CirculosForm() {
  return (
    <Card className="w-full px-3 pt-6 text-zinc-700">
      <div className="px-4 pb-8">
        <h3 className="text-2xl font-bold text-tertiary">Montagem dos tios</h3>
        <span className="text-base font-normal text-zinc-500">
          Adicione quem são os tios de cada círculo ou desabilite algum dos
          círculos
        </span>
      </div>

      <CardContent className="w-full">
        <CirculoForm label="Amarelo" idCirculo="amarelo" />
        <Separator className="mb-4 mt-6" />
        <CirculoForm label="Azul" idCirculo="azul" />
        <Separator className="mb-4 mt-6" />
        <CirculoForm label="Laranja" idCirculo="laranja" />
        <Separator className="mb-4 mt-6" />
        <CirculoForm label="Verde" idCirculo="verde" />
        <Separator className="mb-4 mt-6" />
        <CirculoForm label="Vermelho" idCirculo="vermelho" />
      </CardContent>
    </Card>
  )
}
