import { prisma } from '@/lib/prisma'

export interface ExternaInfo {
  nome: string
  avatarUrl: string | null
}

export async function getPreviousExternaInfo(idExterna: string) {
  const pessoa = await prisma.pessoa.findUnique({
    select: {
      nome: true,
      avatarUrl: true,
    },
    where: {
      id: idExterna,
    },
  })

  if (!pessoa) {
    return null
  }

  return pessoa
}
