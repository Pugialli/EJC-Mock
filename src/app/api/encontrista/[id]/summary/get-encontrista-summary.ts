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
}

export async function getEncontristaSummary(id: string) {
  const encontrista = await prisma.pessoa.findFirst({
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
      encontrista: {
        idPessoa: id,
      },
    },
  })

  if (!encontrista) {
    return null
  }
  const encontristaResponse: EncontristaSummaryData = {
    id: encontrista.id,
    createdAt: encontrista.createdAt,
    nome: encontrista.nome,
    sobrenome: encontrista.sobrenome,
    celular: encontrista.celular,
    idStatus: encontrista.encontrista!.idStatus,
    nascimento: encontrista.encontreiro!.nascimento,
    idBairroEncontro: encontrista.encontrista!.idBairroEncontro,
    idExterna: encontrista.responsavelExterna[0].idExterna,
  }

  return encontristaResponse
}
