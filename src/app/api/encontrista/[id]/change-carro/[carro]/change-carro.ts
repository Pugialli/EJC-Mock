import { prisma } from '@/lib/prisma'

export interface changeCarroRouteProps {
  id: string
  carro: string
}
export async function changeCarro({ id, carro }: changeCarroRouteProps) {
  return await prisma.encontrista.update({
    select: {
      idPessoa: true,
      carroEncontro: {
        select: {
          id: true,
        },
      },
    },
    data: {
      idCarroEncontro: carro,
    },
    where: {
      idPessoa: id,
    },
  })
}
