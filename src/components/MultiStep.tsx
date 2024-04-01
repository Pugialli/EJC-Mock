import { Check } from 'lucide-react'

interface MultiStepProps {
  size: number
  currentStep: number
}

interface StepProps {
  content: string
  currentStep: number
  index: number
}
function Step({ content, currentStep, index }: StepProps) {
  if (index === currentStep) {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-700 text-zinc-50">
        <span>{content}</span>
      </div>
    )
  } else if (index < currentStep) {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400 text-zinc-50">
        <Check className="p-1" />
      </div>
    )
  } else {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-400 text-zinc-400">
        <span>{content}</span>
      </div>
    )
  }
}

export function MultiStep({ size, currentStep }: MultiStepProps) {
  return (
    <div className="flex w-72 items-center">
      {Array.from({ length: size }).map((_, i) => {
        const isFirst = i === 0
        if (isFirst) {
          return (
            <div key={i} className="flex items-center">
              <Step
                content={(i + 1).toString()}
                currentStep={currentStep}
                index={i + 1}
              />
            </div>
          )
        } else {
          return (
            <div key={i} className="flex w-3/12 items-center">
              <div className="h-1 flex-1 rounded-full bg-zinc-200 p-0" />
              <Step
                content={(i + 1).toString()}
                currentStep={currentStep}
                index={i + 1}
              />
            </div>
          )
        }
      })}
    </div>
  )
}
