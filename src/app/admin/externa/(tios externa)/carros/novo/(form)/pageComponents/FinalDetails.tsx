import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { NewCarContext } from '@/context/NewCarroContext'
import { Check, X } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { useWizard } from 'react-use-wizard'

function SuccessCreation() {
  return (
    <>
      <CardHeader className="flex w-full flex-col items-center gap-6 py-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-zinc-50">
          <Check className="h-9 w-9 p-1" />
        </div>
        <CardTitle className="text-2xl font-bold text-zinc-700">
          Carro cadastrado!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 px-3 text-lg">
        <p>O carro já está disponível para alocação de encontristas.</p>
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
          Houve um erro ao cadastrar seu carro.
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3 px-3 text-lg">
        <p>Tente novamente ou entre em contato com o administrador.</p>
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

export function FinalDetails() {
  const { clearForm, carCreated, createNewCarro } = useContext(NewCarContext)
  const { goToStep, activeStep } = useWizard()

  function resetForm() {
    clearForm()
    goToStep(0)
  }

  useEffect(() => {
    createNewCarro()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  return (
    <div className="text-center">
      {carCreated === 'created' && <SuccessCreation />}
      {carCreated === 'error' && <FailCreation />}
      {carCreated === 'not sent' ||
        (carCreated === 'sending' && <SendingCreation />)}
      <CardFooter className="w-full px-3 py-0">
        <Button
          className="w-full"
          disabled={carCreated === 'not sent'}
          onClick={resetForm}
        >
          Voltar ao site
        </Button>
      </CardFooter>
    </div>
  )
}
