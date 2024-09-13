import { prisma } from '@/lib/prisma'
import { getCEPData, type CEPResponse } from '@/utils/fetch-cep'
import { createEndereco } from '../../endereco/create-endereco'

export type LocalProps = {
  enderecoCep: string
  nomeLocal: string
  numeroLocal: string
}

export async function createLocal({
  enderecoCep,
  nomeLocal,
  numeroLocal,
}: LocalProps) {
  const res = await getCEPData(enderecoCep)
  if (!res) {
    return null
  }
  const fetchedEndereco: CEPResponse = await res.json()
  if (!fetchedEndereco) {
    return null
  }

  const enderecoProps = {
    cep: enderecoCep,
    bairro: fetchedEndereco.neighborhood,
    cidade: fetchedEndereco.city,
    estado: fetchedEndereco.state,
    rua: fetchedEndereco.street,
  }

  const endereco = await createEndereco(enderecoProps)

  const encontro = await prisma.local.create({
    data: {
      enderecoCep: endereco.cep,
      nomeLocal,
      numeroLocal,
    },
  })

  return encontro
}
