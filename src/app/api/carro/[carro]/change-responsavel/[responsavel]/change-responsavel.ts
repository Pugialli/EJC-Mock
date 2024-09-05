import { prisma } from '@/lib/prisma'

export interface changeResponsavelCarroRouteProps {
  carro: string
  responsavel: string
}
export async function changeResponsavelCarro({
  carro,
  responsavel,
}: changeResponsavelCarroRouteProps) {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      dataInicio: 'desc',
    },
  })

  if (!encontro) return null

  return await prisma.carroEncontro.update({
    data: {
      idExterna: responsavel,
    },
    where: {
      idCarro_idEncontro: {
        idCarro: carro,
        idEncontro: encontro.id,
      },
    },
  })
}
