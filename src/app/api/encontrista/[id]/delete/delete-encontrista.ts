import { prisma } from '@/lib/prisma'

export async function deleteEncontrista(id: string) {
  return await prisma.pessoa.delete({
    where: {
      id,
    },
  })
}
