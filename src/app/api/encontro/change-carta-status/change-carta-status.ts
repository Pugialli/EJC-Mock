import { prisma } from '@/lib/prisma'

export interface changeCartaStatusProps {
  status: boolean
}

export async function changeCartaStatus({ status }: changeCartaStatusProps) {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      numeroEncontro: 'desc',
    },
  })

  if (!encontro) return null

  return await prisma.encontro.update({
    data: {
      isReceivingCartas: status,
    },
    select: {
      numeroEncontro: true,
      isReceivingCartas: true,
    },
    where: {
      id: encontro.id,
    },
  })
}
