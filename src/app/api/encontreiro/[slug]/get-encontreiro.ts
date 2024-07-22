import { prisma } from '@/lib/prisma'
import type { DisponibilidadePre } from '@prisma/client'

export type EncontreiroMontagemData = {
  id: string
  nome: string
  slug: string
  apelido: string | null
  bairro: string
  avatarUrl?: string
  numeroEncontro?: number
  corCirculo?: string
  obsBanda?: string
  disponibilidade?: DisponibilidadePre
  obs?: string
  preferencias: { posicao: number; equipe: string }[] | []
  equipeEncontro:
    | { encontro: number; equipe: string; coordenou: boolean }[]
    | []
}

export async function getEncontreiroMontagem(slug: string) {
  const encontreiro = await prisma.pessoa.findFirst({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      slug: true,
      apelido: true,
      endereco: {
        select: {
          bairro: true,
        },
      },
      avatarUrl: true,
      encontreiro: {
        select: {
          disponibilidade: true,
          obsBanda: true,
          observacoes: true,
          equipeEncontro: {
            select: {
              encontro: {
                select: {
                  numeroEncontro: true,
                },
              },
              coordenou: true,
              equipe: {
                select: {
                  equipeLabel: true,
                },
              },
            },
          },
          listaPreferencia: {
            select: {
              primeiraOpcao: true,
              segundaOpcao: true,
              terceiraOpcao: true,
            },
          },
          encontro: {
            select: {
              numeroEncontro: true,
            },
          },
          circulo: {
            select: {
              corCirculo: {
                select: {
                  cor: true,
                },
              },
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

  const preferencias =
    encontreiro.encontreiro && encontreiro.encontreiro.listaPreferencia
      ? [
          {
            posicao: 1,
            equipe: encontreiro.encontreiro.listaPreferencia.primeiraOpcao
              ? encontreiro.encontreiro.listaPreferencia.primeiraOpcao
                  .equipeLabel
              : '',
          },
          {
            posicao: 2,
            equipe: encontreiro.encontreiro.listaPreferencia.segundaOpcao
              ? encontreiro.encontreiro.listaPreferencia.segundaOpcao
                  .equipeLabel
              : '',
          },
          {
            posicao: 3,
            equipe: encontreiro.encontreiro.listaPreferencia.terceiraOpcao
              ? encontreiro.encontreiro.listaPreferencia.terceiraOpcao
                  .equipeLabel
              : '',
          },
        ]
      : []

  const equipeEncontro = encontreiro.encontreiro
    ? encontreiro.encontreiro.equipeEncontro.map((equipe) => {
        return {
          encontro: equipe.encontro.numeroEncontro,
          equipe: equipe.equipe.equipeLabel,
          coordenou: equipe.coordenou,
        }
      })
    : []

  const equipeEncontroOrdenado = equipeEncontro.sort(
    (a, b) => b.encontro - a.encontro,
  )

  const encontreiroMontagemResponse: EncontreiroMontagemData = {
    id: encontreiro.id,
    nome: encontreiro.nome + ' ' + encontreiro.sobrenome,
    slug: encontreiro.slug,
    apelido: encontreiro.apelido,
    bairro: encontreiro.endereco.bairro,
    avatarUrl: encontreiro.avatarUrl ? encontreiro.avatarUrl : undefined,
    numeroEncontro: encontreiro.encontreiro?.encontro?.numeroEncontro
      ? encontreiro.encontreiro?.encontro?.numeroEncontro
      : undefined,
    corCirculo: encontreiro.encontreiro?.circulo?.corCirculo.cor,
    disponibilidade:
      encontreiro.encontreiro && encontreiro.encontreiro.disponibilidade
        ? encontreiro.encontreiro.disponibilidade
        : undefined,
    obs:
      encontreiro.encontreiro && encontreiro.encontreiro.observacoes
        ? encontreiro.encontreiro.observacoes
        : undefined,
    obsBanda:
      encontreiro.encontreiro && encontreiro.encontreiro.obsBanda
        ? encontreiro.encontreiro.obsBanda
        : undefined,
    preferencias,
    equipeEncontro: equipeEncontroOrdenado,
  }

  return encontreiroMontagemResponse
}
