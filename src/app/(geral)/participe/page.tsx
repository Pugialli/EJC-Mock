'use client'

import { CreateEncontristaContextProvider } from '@/context/CreateEncontristaContext'
import { ParticipeForm } from './(form)/ParticipeForm'

export default function Participe() {
  return (
    <CreateEncontristaContextProvider>
      <ParticipeForm />
    </CreateEncontristaContextProvider>
  )
}
