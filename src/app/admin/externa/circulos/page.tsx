import { Button } from '@/components/ui/button'
import { Download, Puzzle } from 'lucide-react'
import { Circulos } from './Circulos'
import { ListaConfirmadosSemCirculo } from './ListaConfirmados'

export default function MontagemCirculos() {
  return (
    <div className="w-ful h-full">
      <div className="pb-4">
        <div className="flex items-center justify-between gap-8 pb-8">
          <div className="">
            <h1 className="text-2xl font-bold text-tertiary">
              Montagem de Círculos
            </h1>
            <span className="text-base font-normal text-zinc-500">
              Montagem dos círculos e distribuição dos encontristas
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            {/* <Button>
            <div className="flex items-center justify-center gap-2 lg:w-40">
              <Plus className="h-4 w-4" />
              <span className="hidden lg:flex">Nova Carta</span>
            </div>
          </Button> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-9">
        <div className="col-span-9 flex justify-center gap-2 lg:col-span-6">
          <Button>
            <div className="flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              <span className="flex">Baixar lista dos círculos</span>
            </div>
          </Button>
          <Button>
            <div className="flex items-center justify-center gap-2">
              <Puzzle className="h-4 w-4" />
              <span className="flex">Sugerir Organização</span>
            </div>
          </Button>
        </div>
        <div className="col-span-6">
          <Circulos />
        </div>
        <div className="col-span-3">
          <ListaConfirmadosSemCirculo />
        </div>
      </div>
    </div>
  )
}
