import { prisma } from '@/lib/prisma'

export interface changeGenerosaStatusProps {
  id: string
  status: boolean
}

export async function changeGenerosaStatus({
  id,
  status,
}: changeGenerosaStatusProps) {
  return await prisma.encontrista.update({
    data: {
      generosaOk: status,
    },
    select: {
      idPessoa: true,
      generosaOk: true,
    },
    where: {
      idPessoa: id,
    },
  })
}
