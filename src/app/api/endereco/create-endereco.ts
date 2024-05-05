import { prisma } from '@/lib/prisma'

export interface EnderecoProps {
  cep: string
  bairro: string
  cidade: string
  estado: string
  rua: string
}

export async function createEndereco({
  cep,
  bairro,
  cidade,
  estado,
  rua,
}: EnderecoProps) {
  const foundEndereco = await prisma.endereco.findFirst({
    where: {
      cep,
    },
  })

  if (foundEndereco) {
    return foundEndereco
  }

  const endereco = await prisma.endereco.create({
    data: {
      cep,
      bairro,
      cidade,
      estado,
      rua,
    },
  })

  return endereco
}
