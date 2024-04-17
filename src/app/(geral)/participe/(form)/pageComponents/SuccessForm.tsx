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
import { Check } from 'lucide-react'
import { useContext } from 'react'
import { useWizard } from 'react-use-wizard'

async function getEncontro(number: number) {
  const response: EncontroData = await api
    .get(`http://localhost:3000/api/encontro?encontro=${number}`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}
export function SuccessForm() {
  const { clearForm } = useContext(CreateEncontristaContext)
  const { goToStep } = useWizard()

  const { data: encontro } = useQuery<EncontroData>({
    queryFn: async () => await getEncontro(71),
    queryKey: ['encontro'],
  })

  function resetForm() {
    clearForm()
    goToStep(1)
  }

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
        {encontro ? (
          <>
            <p>
              Agora é só esperar a ligação de nossa equipe para confirmar sua
              participação nos dias:
            </p>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {`${stringToDate(encontro.data_inicio).getDate()}, ${stringToDate(encontro.data_inicio).getDate() + 1} e ${stringToDate(encontro.data_inicio).getDate() + 2} de ${toProper(getMonthBR(stringToDate(encontro.data_inicio)))}`}
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
        <Button className="w-full" onClick={resetForm}>
          Voltar ao site
        </Button>
      </CardFooter>
    </>
  )
}
