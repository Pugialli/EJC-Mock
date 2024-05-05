import { prisma } from '@/lib/prisma'
import type { Value_Religiao as valueReligiao } from '@prisma/client'

export type Religiao = {
  id: valueReligiao
  religiao: string
}

export async function getReligiao() {
  const religiao: Religiao[] = await prisma.domainReligiao.findMany({
    select: {
      id: true,
      religiao: true,
    },
  })

  return religiao
}
