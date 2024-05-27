import { prisma } from '@/lib/prisma'

export interface changeCartaStatusProps {
  numeroEncontro: number
  status: boolean
}

export async function changeCartaStatus({
  numeroEncontro,
  status,
}: changeCartaStatusProps) {
  return await prisma.encontro.update({
    data: {
      isReceivingCartas: status,
    },
    select: {
      numeroEncontro: true,
      isReceivingCartas: true,
    },
    where: {
      numeroEncontro,
    },
  })
}
