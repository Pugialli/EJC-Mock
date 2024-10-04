import { prisma } from '@/lib/prisma'

export interface changeFamiliaStatusProps {
  id: string
  status: boolean
}

export async function changeFamiliaStatus({
  id,
  status,
}: changeFamiliaStatusProps) {
  return await prisma.encontrista.update({
    data: {
      familiaOk: status,
    },
    select: {
      idPessoa: true,
      familiaOk: true,
    },
    where: {
      idPessoa: id,
    },
  })
}
