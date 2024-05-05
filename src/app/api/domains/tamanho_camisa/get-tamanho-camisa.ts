import { prisma } from '@/lib/prisma'
import type { Value_TamanhoCamisa as valueTamanhoCamisa } from '@prisma/client'

export type TamanhoCamisa = {
  id: valueTamanhoCamisa
  tamanhoCamisa: string
}

export async function getTamanhoCamisa() {
  const tamanhoCamisa: TamanhoCamisa[] =
    await prisma.domainTamanhoCamisa.findMany({
      select: {
        id: true,
        tamanhoCamisa: true,
      },
    })

  return tamanhoCamisa
}
