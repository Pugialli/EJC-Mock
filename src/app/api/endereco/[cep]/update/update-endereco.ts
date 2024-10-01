import { prisma } from '@/lib/prisma'
import { getCEPData, type CEPResponse } from '@/utils/fetch-cep'

export interface EnderecoUpdateProps {
  cep: string
  bairro: string
  rua: string
}

export async function updateEndereco({
  cep,
  bairro,
  rua,
}: EnderecoUpdateProps) {
  const foundEndereco = await prisma.endereco.findUnique({
    where: {
      cep,
    },
  })
  if (!foundEndereco) {
    const response = await getCEPData(cep)

    if (response === undefined) {
      return null
    }

    const addressData: CEPResponse = await response.json()

    return await prisma.endereco.create({
      data: {
        cep,
        bairro,
        rua,
        cidade: addressData.city,
        estado: addressData.state,
      },
    })
  }

  return await prisma.endereco.update({
    data: {
      bairro,
      rua,
    },
    where: {
      cep,
    },
  })
}
