import { api } from '@/lib/axios'

export async function getCurrentEncontro() {
  const encontroFound = await fetch(
    `${process.env.NEXTAUTH_URL}/api/encontro/1/get-current-encontro`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  return encontroFound
}

export async function getNextCarroEncontro() {
  try {
    const response = await api.get('encontro/1/get-next-carro-encontro')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar o próximo encontro do carro:', error)
    throw error
  }
}
