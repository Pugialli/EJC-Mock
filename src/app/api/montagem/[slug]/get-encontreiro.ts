import { prisma } from '@/lib/prisma'
import type { DisponibilidadePre, StatusEncontreiro } from '@prisma/client'

export type EncontreiroMontagemData = {
  id: string
  nome: string
  instagram: string | null
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
  statusMontagem: StatusEncontreiro | null
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
          instagram: true,
          disponibilidade: true,
          obsBanda: true,
          observacoes: true,
          statusMontagem: true,
          equipeMontagem: {
            select: {
              coordenando: true,
              valueEquipe: true,
            },
          },
          listaPreferencias: {
            select: {
              posicao: true,
              equipe: {
                select: {
                  equipeLabel: true,
                },
              },
            },
          },
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
    encontreiro.encontreiro && encontreiro.encontreiro.listaPreferencias
      ? encontreiro.encontreiro.listaPreferencias.map((preferencia) => {
          return {
            posicao: preferencia.posicao,
            equipe: preferencia.equipe.equipeLabel,
          }
        })
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
    instagram: encontreiro.encontreiro && encontreiro.encontreiro.instagram,
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
    statusMontagem:
      encontreiro.encontreiro && encontreiro.encontreiro.statusMontagem,
  }

  return encontreiroMontagemResponse
}
