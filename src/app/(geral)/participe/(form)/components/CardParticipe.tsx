import { MultiStep } from '@/components/MultiStep'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { ReactNode } from 'react'
import { useWizard } from 'react-use-wizard'

interface CardParticipeProps {
  children: ReactNode
  title: string
  isSubmitting: boolean
}

export function CardParticipe({
  children,
  title,
  isSubmitting,
}: CardParticipeProps) {
  const { previousStep, activeStep, stepCount } = useWizard()

  return (
    <>
      <CardContent className="w-full px-3 py-0">
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold lg:text-nowrap">{title}</span>
          <MultiStep size={stepCount - 2} currentStep={activeStep} />
        </div>
        <div className="flex flex-col gap-10 px-0 py-10 text-lg lg:gap-14 lg:py-14">
          {children}
        </div>
      </CardContent>
      <CardFooter className="w-full px-3 py-0">
        <div className="flex w-full justify-between">
          <Button variant="outline" onClick={previousStep}>
            Voltar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Avançar
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
