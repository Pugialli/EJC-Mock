import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export interface ProfileData {
  nome: string
  avatarUrl: string | undefined
  role: Role
  numeroEncontro: number | undefined
  corCirculo: string | undefined
}

export async function getProfile(id: string) {
  const encontreiro = await prisma.pessoa.findUnique({
    select: {
      nome: true,
      sobrenome: true,
      avatarUrl: true,
      role: true,
      encontreiro: {
        select: {
          circulo: {
            select: {
              corCirculo: {
                select: {
                  cor: true,
                },
              },
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
      id,
    },
  })
  if (!encontreiro) return null
  const profile: ProfileData = {
    nome: `${encontreiro.nome} ${encontreiro.sobrenome}`,
    avatarUrl: encontreiro.avatarUrl || undefined,
    role: encontreiro.role,
    numeroEncontro: encontreiro.encontreiro?.encontro?.numeroEncontro,
    corCirculo: encontreiro.encontreiro?.circulo?.corCirculo.cor,
  }
  return profile
}
