import { prisma } from '@/lib/prisma'

export type EncontristaConfirmadosData = {
  id: string
  nome: string
  sobrenome: string
}

export async function getEncontristasConfirmados() {
  // const numeroEncontro = 71

  return await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
    },
    where: {
      encontrista: {
        OR: [{ idStatus: 'confirmado' }, { idStatus: 'confirmado_sem_sexta' }],
      },
      // encontreiro: {
      //   encontro: {
      //     numeroEncontro,
      //   },
      // },
    },
    orderBy: {
      nome: 'asc',
    },
  })
}
