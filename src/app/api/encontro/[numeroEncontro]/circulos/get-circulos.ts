import { prisma } from '@/lib/prisma'

export interface TioCirculoType {
  nome: string
  nascimento: string
  tipo: 'Aparente' | 'Secreto'
}

export interface CirculoEncontro {
  id: string
  idCorCirculo: number
  tioAparente: TioCirculoType | undefined
  tioSecreto: TioCirculoType | undefined
}

export interface CirculosResponse {
  order: number
  circulos: CirculoEncontro[]
}

export async function getCirculos() {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (!encontro) {
    return null
  }
  const circulos = await prisma.circulo.findMany({
    select: {
      id: true,
      idCorCirculo: true,
      tioAparente: {
        select: {
          nome: true,
          apelido: true,
          encontreiro: {
            select: {
              nascimento: true,
            },
          },
        },
      },
      tioSecreto: {
        select: {
          nome: true,
          apelido: true,
          encontreiro: {
            select: {
              nascimento: true,
            },
          },
        },
      },
    },
    where: {
      idEncontro: encontro.id,
    },
  })

  const infoCirculos: CirculoEncontro[] = circulos.map((circulo) => {
    return {
      id: circulo.id,
      idCorCirculo: circulo.idCorCirculo,
      tioAparente: circulo.tioAparente
        ? {
            nome: circulo.tioAparente.apelido
              ? circulo.tioAparente.apelido
              : circulo.tioAparente.nome,
            nascimento: circulo.tioAparente.encontreiro!.nascimento,
            tipo: 'Aparente',
          }
        : undefined,
      tioSecreto: circulo.tioSecreto
        ? {
            nome: circulo.tioSecreto.apelido
              ? circulo.tioSecreto.apelido
              : circulo.tioSecreto.nome,
            nascimento: circulo.tioSecreto.encontreiro!.nascimento,
            tipo: 'Secreto',
          }
        : undefined,
    }
  })

  const response: CirculosResponse = {
    order: encontro.ordemCirculos,
    circulos: infoCirculos,
  }

  return response
}
