'use client'

import { Card } from '@/components/ui/card'
import { AddressDetails } from './components/AddressDetails'
import { FamilyDetails } from './components/FamilyDetails'
import { InitialForm } from './components/InitialForm'
import { NominationDetails } from './components/NominationDetails'
import { OtherDetails } from './components/OtherDetails'
import { PersonalDetails } from './components/PersonalDetails'
import { SuccessForm } from './components/SuccessForm'

import { useState } from 'react'

export function Participe() {
  const [step, setStep] = useState(0)
  const dateEJC = new Date(2024, 4, 24)

  function forwardStep() {
    setStep((state) => state + 1)
  }

  function previousStep() {
    setStep((state) => state - 1)
  }

  // function resetStep() {
  //   setStep(0)
  // }

  function renderStep() {
    switch (step) {
      case 0:
        return <InitialForm date={dateEJC} forward={forwardStep} />
      case 1:
        return <PersonalDetails forward={forwardStep} previous={previousStep} />
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
        return <InitialForm date={dateEJC} forward={forwardStep} />
    }
  }
  return (
    <div className="flex h-auto items-center justify-center bg-primary pb-24 pt-24">
      <Card className="flex w-card flex-col items-center gap-5 p-8 text-zinc-700 ">
        {renderStep()}
        {/* <CardFooter className="w-full p-0">
          {step === 6 ? (
            <Button className="w-full " onClick={resetStep}>
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
        </CardFooter> */}
      </Card>
    </div>
  )
}
