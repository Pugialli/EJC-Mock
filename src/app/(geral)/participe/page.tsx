import { EncontroData } from '@/app/api/encontro/route'
import { CreateEncontristaContextProvider } from '@/context/CreateEncontristaContext'
import { ParticipeForm } from './(form)/ParticipeForm'

async function fetchDataEncontro() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/encontro?encontro=71`,
  )
  if (response.ok) {
    const data: EncontroData = await response.json()
    return new Date(data.data_inicio)
  }

  return null
}

export default async function Participe() {
  const dataEncontro: Date | null = await fetchDataEncontro()

  return (
    <CreateEncontristaContextProvider>
      <ParticipeForm dataInicio={dataEncontro} />
    </CreateEncontristaContextProvider>
  )
}
