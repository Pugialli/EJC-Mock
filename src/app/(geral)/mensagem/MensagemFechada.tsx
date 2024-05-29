import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function MensagemFechada() {
  return (
    <Card className="flex flex-col items-center gap-8 p-8 text-zinc-700 lg:w-100">
      <CardHeader className="flex flex-col gap-2 p-0 text-center">
        <CardTitle className="text-3xl font-bold text-zinc-700">
          Mensagem
        </CardTitle>
        <CardDescription className="text-sm text-zinc-500">
          No momento não estamos aceitando novas mensagens. Caso tenha mensagens
          entre em contato com nossa equipe de externa.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
