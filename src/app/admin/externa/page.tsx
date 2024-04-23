'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { BarChart4, Download, Filter, Plus } from 'lucide-react'
import Link from 'next/link'

export default function Externa() {
  return (
    <div className="w-ful h-full">
      <div>
        <div className="pb-8">
          <h1 className="text-2xl font-bold text-tertiary">Encontrista</h1>
          <p className="text-base font-normal text-zinc-500">
            Lista de todos os encontristas
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput placeholder="Buscar por..." />
          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-tertiary" />
                <span>Gerar PDF</span>
              </div>
            </Button>
            <Button variant="secondary">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-tertiary" />
                <span>Filtros</span>
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
          <AccordionItem value="graficos">
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
      <p className="w-full bg-secondary text-white">Tabela</p>
    </div>
  )
}
