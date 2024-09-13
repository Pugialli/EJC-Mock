import { api } from '@/lib/axios'

export async function getTioExternaData(id: string) {
  const pessoa = id
    ? await api.get(`pessoa/tio-externa/${id}`).then((res) => res.data)
    : undefined

  return pessoa
}
