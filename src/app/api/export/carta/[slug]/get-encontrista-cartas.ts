import { prisma } from '@/lib/prisma'

export async function getEncontristaCartas(slug: string) {
  return await prisma.carta.findMany({
    select: {
      de: true,
      para: true,
      conteudo: true,
      pessoa: {
        select: {
          nome: true,
          sobrenome: true,
        },
      },
    },
    where: {
      slugEncontrista: slug,
    },
  })
}
