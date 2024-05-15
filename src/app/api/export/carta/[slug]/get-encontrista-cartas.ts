import { prisma } from '@/lib/prisma'

export interface Carta {
  de: string
  para: string
  conteudo: string
  isPrinted: boolean
}

export async function getEncontristaCartas(slug: string) {
  return await prisma.carta.findMany({
    select: {
      de: true,
      para: true,
      conteudo: true,
      isPrinted: true,
    },
    where: {
      slugEncontrista: slug,
    },
  })
}
