'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { BarChart4, Plus } from 'lucide-react'
import Link from 'next/link'
import { EncontristasCartasTable } from '../(table-encontristas)/pageComponents/cartas/encontristas-cartas-table'

export default function Cartas() {
  return (
    <div className="w-ful h-full">
      <div className="pb-4">
        <div className="flex items-center justify-between pb-8">
          <div className="">
            <h1 className="text-2xl font-bold text-tertiary">
              Controle de Cartas
            </h1>
            <span className="text-base font-normal text-zinc-500">
              Controle do total de cartas dos encontristas, e acesso ao link de
              envio de cartas
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <Link href="/mensagem" target="_blank">
              <Button>
                <div className="flex items-center justify-center gap-2 lg:w-40">
                  <Plus className="h-4 w-4" />
                  <span className="hidden lg:flex">Nova Carta</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="graficos"
            className="rounded-xl border-none bg-white px-4"
          >
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <BarChart4 className="h-6 w-6 text-zinc-700" />
                <span className="font-bold text-zinc-700">Gráficos</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Em breve teremos os Gráficos aqui
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <EncontristasCartasTable />
    </div>
  )
}
