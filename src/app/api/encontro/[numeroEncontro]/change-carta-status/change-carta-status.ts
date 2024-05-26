import { prisma } from '@/lib/prisma'

export async function changeCartaStatus() {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (!encontro) {
    return null
  }
  return await prisma.encontro.update({
    data: {
      isReceivingCartas: !encontro.isReceivingCartas,
    },
    where: {
      id: encontro.id,
    },
  })
}
