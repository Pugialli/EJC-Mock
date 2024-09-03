import { prisma } from '@/lib/prisma'

export interface changeCarroRouteProps {
  id: string
  carro: string
}

export async function changeCarro({ id, carro }: changeCarroRouteProps) {
  const carroEncontroId = carro === '0' ? null : carro

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
      idCarroEncontro: carroEncontroId,
    },
    where: {
      idPessoa: id,
    },
  })
}
