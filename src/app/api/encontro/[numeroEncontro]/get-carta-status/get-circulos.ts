import { prisma } from '@/lib/prisma'

export async function getCartaStatus() {
  const encontro = await prisma.encontro.findFirst({
    select: {
      isReceivingCartas: true,
    },
    orderBy: {
      numeroEncontro: 'desc',
    },
  })
  if (!encontro) {
    return false
  }
  return encontro.isReceivingCartas
}
