import { MultiStep } from '@/components/MultiStep'

export function FamilyDetails() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <span className="text-nowrap text-2xl font-bold">Família</span>
        <MultiStep size={5} currentStep={3} />
      </div>
    </div>
  )
}
