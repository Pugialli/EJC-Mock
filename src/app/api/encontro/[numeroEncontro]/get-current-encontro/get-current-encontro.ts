import { prisma } from '@/lib/prisma'

export async function getCurrentEncontro() {
  return await prisma.encontro.findFirst({
    orderBy: {
      numeroEncontro: 'desc',
    },
  })
}
