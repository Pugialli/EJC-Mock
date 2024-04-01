import { MultiStep } from '@/components/MultiStep'

export function NominationDetails() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <span className="text-nowrap text-2xl font-bold">Indicado por</span>
        <MultiStep size={5} currentStep={4} />
      </div>
    </div>
  )
}
