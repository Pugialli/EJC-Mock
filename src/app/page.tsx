'use client'

import { CreateEncontristaContextProvider } from '@/context/CreateEncontristaContext'
import { Participe } from './Participe/page'

export default function Home() {
  return (
    <CreateEncontristaContextProvider>
      <Participe />
    </CreateEncontristaContextProvider>
  )
}
