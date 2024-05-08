import { prisma } from '@/lib/prisma'

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
