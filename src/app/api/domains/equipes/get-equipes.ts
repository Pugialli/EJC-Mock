import { prisma } from '@/lib/prisma'

export type Equipes = {
  equipeValue: string
  equipeLabel: string
}

export async function getEquipes() {
  const equipes: Equipes[] = await prisma.domainEquipes.findMany({
    select: {
      equipeValue: true,
      equipeLabel: true,
    },
  })

  return equipes
}
