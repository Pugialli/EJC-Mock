'use client'

import { Card } from '@/components/ui/card'

import { CreateEncontristaContext } from '@/context/CreateEncontristaContext'
import { useContext } from 'react'
import { AddressDetails } from './pageComponents/AddressDetails'
import { FamilyDetails } from './pageComponents/FamilyDetails'
import { InitialForm } from './pageComponents/InitialForm'
import { NominationDetails } from './pageComponents/NominationDetails'
import { OtherDetails } from './pageComponents/OtherDetails'
import { PersonalDetails } from './pageComponents/PersonalDetails'
import { SuccessForm } from './pageComponents/SuccessForm'

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
