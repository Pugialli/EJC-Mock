import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getMonthBR } from '@/utils/get-month-locale'
import { toProper } from '@/utils/to-proper'

export interface InitialFormProps {
  date: Date
  forward: () => void
}

export function InitialForm({ date, forward }: InitialFormProps) {
  const month = toProper(getMonthBR(date))

  const isDateSet = true
  return (
    <div className="text-center">
      <CardHeader className="">
        <CardTitle className="text-2xl font-bold">Olá!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-lg">
        {isDateSet ? (
          <>
            <p>
              Que bom te ver por aqui!
              <br />
              Nosso próximo encontrão acontecerá nos dias:
            </p>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {`${date.getDate()}, ${date.getDate() + 1} e ${date.getDate() + 2} de ${month}`}
            </p>
          </>
        ) : (
          <p>
            Que bom que chegou até aqui!
            <br />
            Nosso próximo encontrão ainda não tem data marcada.Mas não desanime,
            você já pode se inscrever.
          </p>
        )}
        {isDateSet ? (
          <p>
            Para realizar sua inscrição, vamos fazer algumas perguntas para te
            conhecer melhor e preparar um fim de semana inesquecível para você.
          </p>
        ) : (
          <p>
            Para isso, vamos fazer algumas perguntas para te conhecer melhor e
            preparar um fim de semana inesquecível para você.
          </p>
        )}

        <p>Vamos começar?</p>
      </CardContent>
      <CardFooter className="w-full p-0">
        <Button className="w-full" onClick={forward}>
          Vamos!
        </Button>
      </CardFooter>
    </div>
  )
}
