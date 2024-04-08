'use client'

import { Card } from '@/components/ui/card'

import { CreateEncontristaContext } from '@/context/CreateEncontristaContext'
import { useContext } from 'react'
import { AddressDetails } from './components/AddressDetails'
import { FamilyDetails } from './components/FamilyDetails'
import { InitialForm } from './components/InitialForm'
import { NominationDetails } from './components/NominationDetails'
import { OtherDetails } from './components/OtherDetails'
import { PersonalDetails } from './components/PersonalDetails'
import { SuccessForm } from './components/SuccessForm'

export default function ParticipeForm() {
  const { step } = useContext(CreateEncontristaContext)

  function renderStep() {
    switch (step) {
      case 0:
        return <InitialForm />
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
        return <SuccessForm />
      default:
        return <InitialForm />
    }
  }

  return (
    <div className="flex h-auto items-center justify-center bg-primary pb-32 pt-24">
      <Card className="flex w-card flex-col items-center gap-5 p-8 text-zinc-700 ">
        {renderStep()}
      </Card>
    </div>
  )
}
