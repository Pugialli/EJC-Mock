import { prisma } from '@/lib/prisma'
import type { Value_Status as valueStatus } from '@prisma/client'

export interface changeStatusRouteProps {
  id: string
  status: valueStatus
}
export async function changeStatus({ id, status }: changeStatusRouteProps) {
  return await prisma.encontrista.update({
    data: {
      idStatus: status,
    },
    where: {
      idPessoa: id,
    },
  })
}
