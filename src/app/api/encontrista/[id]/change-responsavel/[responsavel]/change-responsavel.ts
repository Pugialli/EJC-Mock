import { prisma } from '@/lib/prisma'

export interface changeResponsavelRouteProps {
  id: string
  responsavel: string
}
export async function changeResponsavel({
  id,
  responsavel,
}: changeResponsavelRouteProps) {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      dataInicio: 'desc',
    },
  })

  return await prisma.responsavelExterna
    .update({
      data: {
        idExterna: responsavel,
      },
      where: {
        idEncontrista: id,
      },
    })
    .catch(async () => {
      if (encontro) {
        return await prisma.responsavelExterna.create({
          data: {
            idExterna: responsavel,
            idEncontrista: id,
            idEncontro: encontro.id,
          },
        })
      }
    })
}
