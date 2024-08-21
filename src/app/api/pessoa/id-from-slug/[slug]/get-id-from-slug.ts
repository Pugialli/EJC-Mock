import { prisma } from '@/lib/prisma'

export async function getIdFromSlug(slug: string) {
  const pessoa = await prisma.pessoa.findUnique({
    select: {
      id: true,
    },
    where: {
      slug,
    },
  })

  if (!pessoa) {
    return null
  }

  return pessoa
}
