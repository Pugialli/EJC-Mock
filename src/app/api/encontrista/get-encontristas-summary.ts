import { prisma } from '@/lib/prisma'
import type { Value_Status as enumStatus } from '@prisma/client'

export type EncontristaSummaryData = {
  id: string
  createdAt: Date
  nome: string
  sobrenome: string
  nascimento: string
  idStatus: enumStatus
  idBairroEncontro: string
  celular: string
  idExterna: string | null
  observacoes: string | null
}

export type EncontristaSummary = {
  pageIndex: number
  totalCount: number
  perPage: number
  encontristas: EncontristaSummaryData[]
}

type getEncontristasSummaryProps = {
  page: number
}

export async function getEncontristasSummary({
  page,
}: getEncontristasSummaryProps) {
  const perPage = 25

  const skipData = page * perPage

  const encontristasResponse: EncontristaSummaryData[] = []

  const encontro = await prisma.encontro.findFirst({
    where: {
      numeroEncontro: 71,
    },
  })

  const totalEncontrista = await prisma.pessoa.count({
    where: {
      encontreiro: {
        idEncontro: encontro!.id,
      },
    },
  })

  const encontristas = await prisma.pessoa.findMany({
    skip: skipData,
    take: perPage,
    select: {
      id: true,
      createdAt: true,
      nome: true,
      sobrenome: true,
      celular: true,
      encontrista: {
        select: {
          idStatus: true,
          idBairroEncontro: true,
          observacao: true,
        },
      },
      encontreiro: {
        select: {
          nascimento: true,
        },
      },
      responsavelExterna: {
        select: {
          idExterna: true,
        },
      },
    },
    where: {
      encontreiro: {
        idEncontro: encontro!.id,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  if (!encontristas) {
    return null
  }

  encontristas.map((encontrista) => {
    const encontristaResponse: EncontristaSummaryData = {
      id: encontrista.id,
      createdAt: encontrista.createdAt,
      nome: encontrista.nome,
      sobrenome: encontrista.sobrenome,
      celular: encontrista.celular,
      idStatus: encontrista.encontrista!.idStatus,
      nascimento: encontrista.encontreiro!.nascimento,
      idBairroEncontro: encontrista.encontrista!.idBairroEncontro,
      idExterna: null,
      observacoes: encontrista.encontrista!.observacao,
    }
    encontristasResponse.push(encontristaResponse)
    return encontristaResponse
  })

  const response: EncontristaSummary = {
    totalCount: totalEncontrista,
    pageIndex: page + 1,
    perPage,
    encontristas: encontristasResponse,
  }

  return response
}
