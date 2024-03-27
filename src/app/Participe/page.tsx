'use client'

import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { AddressDetails } from './components/AddressDetails'
import { FamilyDetails } from './components/FamilyDetails'
import { InitialForm } from './components/InitialForm'
import { NominationDetails } from './components/NominationDetails'
import { OtherDetails } from './components/OtherDetails'
import { PersonalDetails } from './components/PersonalDetails'
import { SuccessForm } from './components/SuccessForm'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const participeFormScheme = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras e hifens',
    }),
})

type ParticipeFormData = z.infer<typeof participeFormScheme>

export function Participe() {
  const [step, setStep] = useState(0)
  const dateEJC = new Date(2024, 4, 24)

  const { handleSubmit } = useForm<ParticipeFormData>({
    resolver: zodResolver(participeFormScheme),
  })

  function handleSendForm(data: ParticipeFormData) {
    setStep(6)
    console.log(data)
  }

  function forwardStep() {
    setStep((state) => state + 1)
  }

  function previousStep() {
    setStep((state) => state - 1)
  }

  function resetStep() {
    setStep(0)
  }

  function renderStep() {
    switch (step) {
      case 0:
        return <InitialForm date={dateEJC} />
      case 1:
        return <PersonalDetails />
      case 2:
        return <AddressDetails />
      case 3:
        return <FamilyDetails />
      case 4:
        return <NominationDetails />
      case 5:
        return <OtherDetails />
      case 6:
        return <SuccessForm date={dateEJC} />
      default:
        return <InitialForm date={dateEJC} />
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Card className="flex w-1/2 flex-col items-center gap-5 p-6 text-center text-zinc-700">
        <form id="participeForm" onSubmit={handleSubmit(handleSendForm)}>
          {renderStep()}
          <CardFooter className="w-full">
            {step === 6 ? (
              <Button className="w-full" onClick={resetStep}>
                Voltar ao site
              </Button>
            ) : step === 0 ? (
              <Button className="w-full" onClick={forwardStep}>
                Vamos!
              </Button>
            ) : step !== 5 ? (
              <div className="flex w-full justify-between">
                <Button variant="outline" onClick={previousStep}>
                  Voltar
                </Button>
                <Button onClick={forwardStep}>Avançar</Button>
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <Button variant="outline" onClick={previousStep}>
                  Voltar
                </Button>
                <Button type="submit">Finalizar</Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
