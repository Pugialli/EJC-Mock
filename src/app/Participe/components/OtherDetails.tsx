import { MultiStep } from '@/components/MultiStep'

export function OtherDetails() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <span className="text-nowrap text-2xl font-bold">Outros</span>
        <MultiStep size={5} currentStep={5} />
      </div>
    </div>
  )
}
