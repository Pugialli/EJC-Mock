import { prisma } from '@/lib/prisma'

export interface Carta {
  id: string
  de: string
  para: string
  conteudo: string
  isPrinted: boolean
  createdAt: Date
}

export async function getEncontristaCartas(slug: string) {
  return await prisma.carta.findMany({
    select: {
      createdAt: true,
      id: true,
      de: true,
      para: true,
      conteudo: true,
      isPrinted: true,
    },
    where: {
      slugEncontrista: slug,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
