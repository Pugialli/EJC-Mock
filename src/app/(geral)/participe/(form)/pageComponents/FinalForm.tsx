import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateEncontristaContext } from '@/context/CreateEncontristaContext'
import { getMonthBR } from '@/utils/get-month-locale'
import { toProper } from '@/utils/to-proper'
import { Check, X } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { useWizard } from 'react-use-wizard'

interface FinalFormProps {
  dataEncontro: Date | null
}
function SuccessCreation({ dataEncontro }: FinalFormProps) {
  return (
    <>
      <CardHeader className="flex w-full flex-col items-center gap-6 py-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-zinc-50">
          <Check className="h-9 w-9 p-1" />
        </div>
        <CardTitle className="text-2xl font-bold text-zinc-700">
          Inscrição concluída!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 px-3 text-lg">
        {dataEncontro ? (
          <>
            <p>
              Agora é só esperar a ligação de nossa equipe para confirmar sua
              participação nos dias:
            </p>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {`${dataEncontro.getDate()}, ${dataEncontro.getDate() + 1} e ${dataEncontro.getDate() + 2} de ${toProper(getMonthBR(dataEncontro))}`}
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
    </>
  )
}

function FailCreation() {
  return (
    <>
      <CardHeader className="flex w-full flex-col items-center gap-6 py-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-zinc-50">
          <X className="h-9 w-9 p-1" />
        </div>
        <CardTitle className="text-2xl font-bold text-zinc-700">
          Houve um erro ao criar sua inscrição!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 px-3 text-lg">
        <p>
          Pedimos perdão mas tivemos um erro ao cadastrar sua inscrição. Pedimos
          que comunique quem te convidou para o encontro ou tente novamente mais
          tarde.
        </p>
      </CardContent>
    </>
  )
}

function SendingCreation() {
  return (
    <>
      <CardHeader className="flex w-full flex-col items-center gap-6 py-0">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-8 w-[470px]" />
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 px-3 py-2 text-lg">
        <Skeleton className="h-20 w-[520px]" />
      </CardContent>
    </>
  )
}

export function FinalForm({ dataEncontro }: FinalFormProps) {
  const { clearForm, userCreated, createNewEncontrista } = useContext(
    CreateEncontristaContext,
  )
  const { goToStep } = useWizard()

  function resetForm() {
    clearForm()
    goToStep(1)
  }

  useEffect(() => {
    createNewEncontrista()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-center">
      {userCreated === 'created' && (
        <SuccessCreation dataEncontro={dataEncontro} />
      )}
      {userCreated === 'error' && <FailCreation />}
      {userCreated === 'not sent' && <SendingCreation />}
      <CardFooter className="w-full px-3 py-0">
        <Button
          className="w-full"
          disabled={userCreated === 'not sent'}
          onClick={resetForm}
        >
          Voltar ao site
        </Button>
      </CardFooter>
    </div>
  )
}
