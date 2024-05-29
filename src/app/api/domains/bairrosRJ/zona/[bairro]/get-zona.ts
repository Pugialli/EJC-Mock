import { prisma } from '@/lib/prisma'

export interface BairroResponse {
  bairro: string
  zona: string
}

export async function getZona(bairroName: string) {
  const bairro = await prisma.domainBairroEncontro.findFirst({
    select: {
      bairro: true,
      zona: true,
    },
    where: {
      bairro: bairroName,
    },
  })

  return bairro as BairroResponse
}
