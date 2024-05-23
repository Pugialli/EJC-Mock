import { prisma } from '@/lib/prisma'

export type MembroExterna = {
  id: string
  name: string
  avatarUrl: string
  avatarFallback: string
}

export async function getEquipeExterna() {
  const equipeExterna: MembroExterna[] = []

  const response = await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      avatarUrl: true,
    },
    where: {
      role: 'EXTERNA',
    },
  })

  await response.map((membro) => {
    const membroExterna: MembroExterna = {
      id: membro.id,
      name: membro.nome,
      avatarUrl: membro.avatarUrl ? membro.avatarUrl : '',
      avatarFallback: membro.nome[0],
    }
    return equipeExterna.push(membroExterna)
  })

  return equipeExterna
}
