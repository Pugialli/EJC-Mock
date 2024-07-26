'use client'

import { useState } from 'react'
import { CardEncontreiro } from './(montagemComponents)/CardEncontreiro'
import { ListaEncontreiros } from './(montagemComponents)/ListaEncontreiros'

export function DataArea() {
  const [activeSlug, setActiveSlug] = useState('adailton-jose-ismart-67')
  return (
    <>
      <div className="col-span-9 lg:col-span-6">
        <CardEncontreiro slug={activeSlug} />
      </div>
      <div className="col-span-9 lg:col-span-3">
        <ListaEncontreiros activeCard={activeSlug} setSlug={setActiveSlug} />
      </div>
    </>
  )
}
