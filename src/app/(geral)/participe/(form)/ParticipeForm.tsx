'use client'

import { Card } from '@/components/ui/card'
import { Wizard } from 'react-use-wizard'
import { AddressDetails } from './pageComponents/AddressDetails'
import { FamilyDetails } from './pageComponents/FamilyDetails'
import { InitialForm } from './pageComponents/InitialForm'
import { NominationDetails } from './pageComponents/NominationDetails'
import { OtherDetails } from './pageComponents/OtherDetails'
import { PersonalDetails } from './pageComponents/PersonalDetails'
import { SuccessForm } from './pageComponents/SuccessForm'

export function ParticipeForm() {
  return (
    <div className="flex h-auto items-center justify-center bg-primary pb-32 pt-24">
      <Card className="flex w-card flex-col items-center gap-5 p-8 text-zinc-700 ">
        <Wizard>
          <InitialForm />
          <PersonalDetails />
          <AddressDetails />
          <FamilyDetails />
          <NominationDetails />
          <OtherDetails />
          <SuccessForm />
        </Wizard>
      </Card>
    </div>
  )
}
