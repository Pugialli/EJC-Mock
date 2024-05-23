import { prisma } from '@/lib/prisma'
import type { Value_Status as valueStatus } from '@prisma/client'

export interface changeStatusRouteProps {
  id: string
  status: valueStatus
}
export async function changeStatus({ id, status }: changeStatusRouteProps) {
  if (status !== 'confirmado' && status !== 'confirmado_sem_sexta') {
    await prisma.encontreiro.update({
      data: {
        idCirculo: null,
      },
      where: {
        idPessoa: id,
      },
    })
  }
  return await prisma.encontrista.update({
    data: {
      idStatus: status,
    },
    where: {
      idPessoa: id,
    },
  })
}
