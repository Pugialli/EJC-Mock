import { prisma } from '@/lib/prisma'

export interface EncontristaIdentification {
  id: string
  slug: string
  nome: string
  sobrenome: string
  email: string
}

export async function getIdentification(slug: string) {
  return await prisma.pessoa.findUnique({
    select: {
      id: true,
      slug: true,
      nome: true,
      sobrenome: true,
      email: true,
    },
    where: {
      slug,
    },
  })
}
