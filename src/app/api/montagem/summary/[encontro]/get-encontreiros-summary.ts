import { prisma } from '@/lib/prisma'

export type EncontreiroSummaryData = {
  id: string
  nomeCompleto: string
  apelido: string | null
  avatarUrl: string | null
  slug: string
  numeroEncontro?: number
  equipeMontagem?: string
  coordenador: boolean
}

export type EncontreiroSummary = {
  totalAtivo: number
  totalAlocado: number
  encontreiro: EncontreiroSummaryData[]
}

async function getEncontreiros() {
  return await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      apelido: true,
      avatarUrl: true,
      slug: true,
      encontreiro: {
        select: {
          equipeMontagem: {
            select: {
              valueEquipe: true,
              coordenando: true,
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
      encontreiro: {
        NOT: { statusMontagem: 'INATIVO' },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  })
}

async function getTotalAtivos() {
  return await prisma.encontreiro.count({
    where: {
      NOT: { statusMontagem: 'INATIVO' },
    },
  })
}

async function getTotalAlocados() {
  return await prisma.equipeMontagem.count()
}

export async function getEncontreirosSummary() {
  const encontreirosResponse: EncontreiroSummaryData[] = []

  const totalAtivos = await getTotalAtivos()

  const totalAlocados = await getTotalAlocados()

  const encontreiros = await getEncontreiros()

  if (!encontreiros) {
    return null
  }

  await Promise.all(
    encontreiros.map(async (encontreiro) => {
      const encontreiroResponse: EncontreiroSummaryData = {
        id: encontreiro.id,
        nomeCompleto: encontreiro.nome + ' ' + encontreiro.sobrenome,
        apelido: encontreiro.apelido,
        avatarUrl: encontreiro.avatarUrl,
        slug: encontreiro.slug,
        numeroEncontro: encontreiro.encontreiro?.encontro?.numeroEncontro,
        equipeMontagem: encontreiro.encontreiro?.equipeMontagem?.valueEquipe,
        coordenador:
          encontreiro.encontreiro?.equipeMontagem?.coordenando || false,
      }
      encontreirosResponse.push(encontreiroResponse)
      return encontreiroResponse
    }),
  )
  const response: EncontreiroSummary = {
    totalAtivo: totalAtivos,
    totalAlocado: totalAlocados,
    encontreiro: encontreirosResponse,
  }

  return response
}
