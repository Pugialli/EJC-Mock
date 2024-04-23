import { EncontroData } from '@/app/api/encontro/route'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreateEncontristaContext } from '@/context/CreateEncontristaContext'
import { api } from '@/lib/axios'
import { getMonthBR } from '@/utils/get-month-locale'
import { stringToDate } from '@/utils/string-to-date'
import { toProper } from '@/utils/to-proper'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useWizard } from 'react-use-wizard'

async function getEncontro(number: number) {
  const response: EncontroData = await api
    .get(`/encontro?encontro=${number}`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export function InitialForm() {
  const { nextStep, handleStep, activeStep } = useWizard()

  const { updateData } = useContext(CreateEncontristaContext)

  const { data: encontro } = useQuery<EncontroData>({
    queryFn: async () => await getEncontro(71),
    queryKey: ['encontro'],
  })

  function handleForward() {
    const emptyData = undefined
    handleStep(() => {
      updateData({ data: emptyData, step: activeStep })
    })
    nextStep()
  }

  return (
    <div className="text-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Olá!</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 px-3 text-lg">
        {encontro ? (
          <>
            <p>
              Que bom te ver por aqui!
              <br />
              Nosso próximo encontrão acontecerá nos dias:
            </p>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {`${stringToDate(encontro.data_inicio).getDate()}, ${stringToDate(encontro.data_inicio).getDate() + 1} e ${stringToDate(encontro.data_inicio).getDate() + 2} de ${toProper(getMonthBR(stringToDate(encontro.data_inicio)))}`}
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
        {encontro ? (
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
      <CardFooter className="w-full px-3 py-0">
        <Button className="w-full" onClick={handleForward}>
          Vamos!
        </Button>
      </CardFooter>
    </div>
  )
}
