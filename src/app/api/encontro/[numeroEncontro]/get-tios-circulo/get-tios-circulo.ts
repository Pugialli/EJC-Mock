import { prisma } from '@/lib/prisma'

export type TiosCirculo = {
  id: string
  nome: string
  encontro?: string
  role: string
}

export async function getTiosCirculo() {
  const pessoasTios = await prisma.equipeMontagem.findMany({
    select: {
      encontreiro: {
        select: {
          pessoa: {
            select: {
              id: true,
              nome: true,
              sobrenome: true,
              role: true,
            },
          },
          encontro: {
            select: {
              numeroEncontro: true,
            },
          },
        },
      },
    },
    where: {
      OR: [
        { valueEquipe: 'tio_circulo' },
        { valueEquipe: 'tio_aparente' },
        { valueEquipe: 'tio_secreto' },
      ],
    },
  })

  const tiosCirculo = await Promise.all(
    pessoasTios.map(async (pessoaTio) => {
      return {
        id: pessoaTio.encontreiro.pessoa.id,
        nome:
          pessoaTio.encontreiro.pessoa.nome +
          ' ' +
          pessoaTio.encontreiro.pessoa.sobrenome,
        encontro: pessoaTio.encontreiro.encontro!.numeroEncontro,
        role: pessoaTio.encontreiro.pessoa.role,
      }
    }),
  )

  tiosCirculo.sort((a, b) => a.nome.localeCompare(b.nome))

  return tiosCirculo
}
