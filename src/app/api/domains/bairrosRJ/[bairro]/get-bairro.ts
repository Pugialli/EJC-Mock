import { prisma } from '@/lib/prisma'
import type { BairrosRJ } from '../get-bairros-rj'

export async function getBairro(value: string) {
  const bairro: BairrosRJ | null = await prisma.domainBairroEncontro.findFirst({
    select: {
      value: true,
      bairro: true,
      zona: true,
    },
    where: {
      value,
    },
  })

  return bairro
}
