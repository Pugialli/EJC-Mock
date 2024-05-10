'use client'

import { Card } from '@/components/ui/card'
import { Wizard } from 'react-use-wizard'
import { AddressDetails } from './pageComponents/AddressDetails'
import { FamilyDetails } from './pageComponents/FamilyDetails'
import { FinalForm } from './pageComponents/FinalForm'
import { InitialForm } from './pageComponents/InitialForm'
import { NominationDetails } from './pageComponents/NominationDetails'
import { OtherDetails } from './pageComponents/OtherDetails'
import { PersonalDetails } from './pageComponents/PersonalDetails'

interface ParticipeFormProps {
  dataInicio: Date | null
}

export function ParticipeForm({ dataInicio }: ParticipeFormProps) {
  return (
    <div className="flex items-center justify-center pb-32 pt-24">
      <Card className="flex w-11/12 flex-col items-center gap-5 px-0 py-8 text-zinc-700 lg:w-card lg:px-8 ">
        <Wizard startIndex={0}>
          <InitialForm dataEncontro={dataInicio} />
          <PersonalDetails />
          <AddressDetails />
          <FamilyDetails />
          <NominationDetails />
          <OtherDetails />
          <FinalForm dataEncontro={dataInicio} />
        </Wizard>
      </Card>
    </div>
  )
}
