import { prisma } from '@/lib/prisma'

export type EncontreiroEquipeMontagem = {
  id: string
  equipeMontagem: {
    valueEquipe: string
    coordenando: boolean
  } | null
}

export async function getEncontreiroEquipeMontagem(slug: string) {
  const encontreiro = await prisma.pessoa.findFirst({
    select: {
      id: true,
      encontreiro: {
        select: {
          equipeMontagem: {
            select: {
              coordenando: true,
              valueEquipe: true,
            },
          },
        },
      },
    },
    where: {
      slug,
    },
  })

  if (!encontreiro) {
    return null
  }

  const encontreiroMontagemResponse: EncontreiroEquipeMontagem = {
    id: encontreiro.id,
    equipeMontagem:
      encontreiro.encontreiro && encontreiro.encontreiro.equipeMontagem,
  }

  return encontreiroMontagemResponse
}
