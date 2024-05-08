'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { BarChart4, Download, Plus } from 'lucide-react'
import Link from 'next/link'
import { EncontristasTable } from './(table-encontristas)/pageComponents/encontristas'

export default function Externa() {
  return (
    <div className="w-ful h-full">
      <div className="pb-4">
        <div className="flex items-center justify-between pb-8">
          <div className="">
            <h1 className="text-2xl font-bold text-tertiary">Encontrista</h1>
            <span className="text-base font-normal text-zinc-500">
              Lista de todos os encontristas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-tertiary" />
                <span>Gerar PDF</span>
              </div>
            </Button>
            <Link href="/">
              <Button>
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Novo Encontrista</span>
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
            <AccordionContent>Aqui entram os Gráficos</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <EncontristasTable />
    </div>
  )
}
