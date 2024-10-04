import { TiosExterna } from './TiosExterna'

export default function Pendencias() {
  return (
    <div className="h-full w-full">
      <div className="pb-4">
        <div className="flex items-center justify-between gap-8 pb-8">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-tertiary">
              Controle de Pendências
            </h1>
            <span className="text-base font-normal text-zinc-500">
              Controle das pendencias de cada carro
            </span>
          </div>
        </div>
      </div>
      <TiosExterna />
    </div>
  )
}
