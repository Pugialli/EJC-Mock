import { api } from '@/lib/axios'

export async function checkPessoa(email: string) {
  const response = await api.get(`encontrista/check-email/${email}`)

  return response.data
}

export async function checkCarro(placa: string) {
  const response = await api.get(`carro/check-placa/${placa}`)

  return response.data
}
