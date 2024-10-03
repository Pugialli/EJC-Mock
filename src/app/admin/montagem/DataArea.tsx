'use client'

import type { EncontreiroSummary } from '@/app/api/montagem/summary/[encontro]/get-encontreiros-summary'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CardEncontreiro } from './(montagemComponents)/CardEncontreiro'
import { ListaEncontreiros } from './(montagemComponents)/ListaEncontreiros'

async function getSummary() {
  const cartas = await api.get(`montagem/summary/72`)

  return cartas.data as EncontreiroSummary
}

export function DataArea() {
  const { data: encontreirosSummary } = useQuery<EncontreiroSummary>({
    queryKey: ['encontreiroSummary'],
    queryFn: async () => await getSummary(),
  })

  const [activeSlug, setActiveSlug] = useState('')

  return (
    <>
      <div className="col-span-9 lg:col-span-6">
        <CardEncontreiro slug={activeSlug} />
      </div>
      <div className="col-span-9 lg:col-span-3">
        <ListaEncontreiros
          encontreirosSummary={encontreirosSummary}
          activeCard={activeSlug}
          setSlug={setActiveSlug}
        />
      </div>
    </>
  )
}
