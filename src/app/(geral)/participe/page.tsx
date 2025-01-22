import type { EncontroData } from '@/app/api/encontro/[numeroEncontro]/get-encontro'
import { CreateEncontristaContextProvider } from '@/context/CreateEncontristaContext'
import { ParticipeForm } from './(form)/ParticipeForm'

async function fetchDataEncontro() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/encontro/72`)
    if (response.ok) {
      const data: EncontroData = await response.json()
      const date = new Date(data.dataInicio.split('T')[0])
      const fixedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
      )
      return fixedDate
    }
    return null
  } catch (error) {
    console.error('Failed to fetch dataEncontro:', error)
    return null
  }
}

export default async function Participe() {
  const dataEncontro: Date | null = await fetchDataEncontro()

  return (
    <CreateEncontristaContextProvider>
      <ParticipeForm dataInicio={dataEncontro} />
    </CreateEncontristaContextProvider>
  )
}
