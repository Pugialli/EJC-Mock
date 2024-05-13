import { prisma } from '@/lib/prisma'

export type EncontristaConfirmadosData = {
  slug: string
  nome: string
  sobrenome: string
}

export async function getConfirmados() {
  // const numeroEncontro = 71

  return await prisma.pessoa.findMany({
    select: {
      slug: true,
      nome: true,
      sobrenome: true,
    },
    where: {
      OR: [
        {
          encontrista: {
            OR: [
              { idStatus: 'confirmado' },
              { idStatus: 'confirmado_sem_sexta' },
            ],
          },
        },
        { role: 'TIOSECRETO' },
      ],

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
