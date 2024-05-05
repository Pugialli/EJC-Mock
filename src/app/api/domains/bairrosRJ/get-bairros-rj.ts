import { prisma } from '@/lib/prisma'

export type BairrosRJ = {
  value: string
  bairro: string
  zona: string
}

export async function getBairrosRJ() {
  const bairrosRJ: BairrosRJ[] = await prisma.domainBairroEncontro.findMany({
    select: {
      value: true,
      bairro: true,
      zona: true,
    },
  })

  return bairrosRJ
}
