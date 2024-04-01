import { MultiStep } from '@/components/MultiStep'

export function AddressDetails() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <span className="text-nowrap text-2xl font-bold">Endereço</span>
        <MultiStep size={5} currentStep={2} />
      </div>
    </div>
  )
}
