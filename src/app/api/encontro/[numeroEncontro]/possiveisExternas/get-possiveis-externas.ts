import { prisma } from '@/lib/prisma'

export type PossiveisTiosExterna = {
  id: string
  nome: string
  encontro?: string
  role: string
}

export async function getPossiveisExternas() {
  const pessoasExterna = await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      role: true,
      encontreiro: {
        select: {
          encontro: {
            select: {
              numeroEncontro: true,
            },
          },
        },
      },
    },
    where: {
      NOT: {
        OR: [{ role: 'ENCONTRISTA' }, { role: 'TIOSECRETO' }],
      },
    },
    orderBy: {
      nome: 'asc',
    },
  })

  const tiosExterna = await Promise.all(
    pessoasExterna.map(async (pessoaExterna) => {
      if (pessoaExterna.encontreiro && pessoaExterna.encontreiro.encontro) {
        return {
          id: pessoaExterna.id,
          nome: pessoaExterna.nome + ' ' + pessoaExterna.sobrenome,
          encontro: pessoaExterna.encontreiro.encontro.numeroEncontro,
          role: pessoaExterna.role,
        }
      } else {
        return {
          id: pessoaExterna.id,
          nome: pessoaExterna.nome + ' ' + pessoaExterna.sobrenome,
          role: pessoaExterna.role,
        }
      }
    }),
  )

  return tiosExterna
}
