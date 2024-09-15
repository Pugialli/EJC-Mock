import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export type CarroData = {
  numeroCarro: number
  observacao: string | null
  encontro: {
    id: string
    numeroEncontro: number
  }
  carro: {
    id: string
    modeloCarro: string
    placaCarro: string
    lugaresCarro: number
    observacaoMotorista: string
    pessoaMotorista: {
      id: string
      role: Role
      nome: string
      sobrenome: string
      celular: string
      telefone: string | null
      email: string
      endereco: {
        cep: string
        bairro: string
        rua: string
      }
      endNumero: number
    }
    pessoaCarona: {
      id: string
      role: Role
      nome: string
      sobrenome: string
      celular: string
      telefone: string | null
      email: string
      endereco: {
        cep: string
        bairro: string
        rua: string
      }
      endNumero: number
    } | null
  }
}

export interface GetCarroProps {
  carro: string
  encontro: string
}

export async function getCarro({ carro, encontro }: GetCarroProps) {
  const numeroEncontro = isNaN(Number(encontro)) ? -1 : Number(encontro)
  const encontroFound = await prisma.encontro.findFirst({
    where: {
      numeroEncontro,
    },
  })

  if (!encontroFound) return null

  const carroFound = await prisma.carroEncontro.findUnique({
    select: {
      numeroCarro: true,
      observacao: true,
      encontro: {
        select: {
          id: true,
          numeroEncontro: true,
        },
      },
      carro: {
        select: {
          id: true,
          pessoaMotorista: {
            select: {
              id: true,
              role: true,
              nome: true,
              sobrenome: true,
              celular: true,
              telefone: true,
              email: true,
              endereco: {
                select: {
                  cep: true,
                  bairro: true,
                  rua: true,
                },
              },
              enderecoNumero: true,
            },
          },
          pessoaCarona: {
            select: {
              id: true,
              role: true,
              nome: true,
              sobrenome: true,
              celular: true,
              telefone: true,
              email: true,
              endereco: {
                select: {
                  cep: true,
                  bairro: true,
                  rua: true,
                },
              },
              enderecoNumero: true,
            },
          },
          modeloCarro: true,
          placaCarro: true,
          lugaresCarro: true,
          observacaoMotorista: true,
        },
      },
    },
    where: {
      idCarro_idEncontro: {
        idCarro: carro,
        idEncontro: encontroFound.id,
      },
    },
  })

  if (!carroFound) {
    return null
  }

  return carroFound
}
