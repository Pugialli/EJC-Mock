import { NewCarContextProvider } from '@/context/NewCarroContext'
import { NewCarroForm } from './(form)/NewCarroForm'

export default async function CriarCarro() {
  return (
    <NewCarContextProvider>
      <NewCarroForm />
    </NewCarContextProvider>
  )
}
