'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { BarChart4, Plus } from 'lucide-react'
import Link from 'next/link'
import { EncontristasCartasTable } from './(table-cartas)/encontristas-cartas-table'

async function getCartasStatus() {
  const res = await api.get(`/encontro/71/get-carta-status`)
  return res.data as boolean
}

async function updateStatusCartas() {
  return await api.patch(`/encontro/71/change-carta-status`)
}

export default function Cartas() {
  const { data: statusCarta } = useQuery<boolean>({
    queryKey: ['statusCarta'],
    queryFn: async () => await getCartasStatus(),
  })

  return (
    <div className="w-ful h-full">
      <div className="pb-4">
        <div className="flex items-center justify-between gap-8 pb-8">
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
            <div className="flex items-center gap-2">
              <span className="hidden lg:flex">Estamos recebendo cartas?</span>
              {statusCarta ? (
                <Switch
                  defaultChecked={statusCarta}
                  onCheckedChange={updateStatusCartas}
                />
              ) : (
                <Skeleton className="h-8 w-12" />
              )}
            </div>
            {/* <Button>
              <div className="flex items-center justify-center gap-2 lg:w-40">
                <Plus className="h-4 w-4" />
                <span className="hidden lg:flex">Nova Carta</span>
              </div>
            </Button> */}
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
