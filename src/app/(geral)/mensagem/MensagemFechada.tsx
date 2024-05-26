import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function MensagemFechada() {
  return (
    <Card className="flex flex-col items-center gap-8 p-8 text-zinc-700 lg:w-auto">
      <CardHeader className="flex flex-col gap-2 p-0 text-center">
        <CardTitle className="text-3xl font-bold text-zinc-700">
          Mensagem
        </CardTitle>
        <CardDescription className="text-sm text-zinc-500">
          Nossa equipe de externa já está finalizando a impressão das cartas.
          Caso ainda tenha alguma mesagem imprima e leve diretamente na sala da
          externa.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
