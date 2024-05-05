import { prisma } from '@/lib/prisma'
import type { Value_Status as valueStatus } from '@prisma/client'

export type Status = {
  id: valueStatus
  status: string
}

export async function getStatus() {
  const status: Status[] = await prisma.domainStatus.findMany({
    select: {
      id: true,
      status: true,
    },
  })

  return status
}
