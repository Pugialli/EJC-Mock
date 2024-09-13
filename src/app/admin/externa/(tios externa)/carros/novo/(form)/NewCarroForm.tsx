'use client'

import { Card } from '@/components/ui/card'
import { Wizard } from 'react-use-wizard'

import { CarDetails } from './pageComponents/CarDetails'
import { CaronaDetails } from './pageComponents/CaronaDetails'
import { FinalDetails } from './pageComponents/FinalDetails'
import { MotoristaDetails } from './pageComponents/MotoristaDetails'

export function NewCarroForm() {
  return (
    <div className="flex items-center justify-center py-8">
      <Card className="flex flex-col items-center gap-5 px-0 py-8 text-zinc-700 lg:w-full lg:px-8 ">
        <Wizard startIndex={0}>
          <CarDetails />
          <MotoristaDetails />
          <CaronaDetails />
          <FinalDetails />
        </Wizard>
      </Card>
    </div>
  )
}
