import { prisma } from '@/lib/prisma'

export async function softDeleteEncontrista(id: string) {
  return await prisma.encontrista.update({
    select: {
      idPessoa: true,
      idStatus: true,
    },
    data: {
      idStatus: 'delete',
    },
    where: {
      idPessoa: id,
    },
  })
}
