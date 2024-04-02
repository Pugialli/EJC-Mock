import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getMonthBR } from '@/utils/get-month-locale'
import { toProper } from '@/utils/to-proper'
import { Check } from 'lucide-react'

export interface SuccessFormProps {
  date: Date
  reset: () => void
}

export function SuccessForm({ date, reset }: SuccessFormProps) {
  const month = toProper(getMonthBR(date))
  const isDateSet = true

  return (
    <>
      <CardHeader className="flex w-full flex-col items-center gap-6 pb-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-zinc-50">
          <Check className="h-9 w-9 p-1" />
        </div>
        <CardTitle className="text-2xl font-bold text-zinc-700">
          Inscrição concluída!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pb-0 text-center text-lg">
        {isDateSet ? (
          <>
            <p>
              Agora é só esperar a ligação de nossa equipe para confirmar sua
              participação nos dias:
            </p>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {`${date.getDate()}, ${date.getDate() + 1} e ${date.getDate() + 2} de ${month}`}
            </p>
            <p>Nos vemos lá!</p>
          </>
        ) : (
          <p>
            Agora é só esperar a ligação de nossa equipe para confirmar sua
            participação e a data do encontro.
          </p>
        )}
      </CardContent>
      <CardFooter className="w-full p-0">
        <Button className="w-full" onClick={reset}>
          Voltar ao site
        </Button>
      </CardFooter>
    </>
  )
}
