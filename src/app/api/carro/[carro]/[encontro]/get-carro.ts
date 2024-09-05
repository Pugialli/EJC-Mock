import { prisma } from '@/lib/prisma'

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
      nome: string
      sobrenome: string
      celular: string
      telefone: string | null
      email: string
      enderecoCep: string
    }
    pessoaCarona: {
      id: string
      nome: string
      sobrenome: string
      celular: string
      telefone: string | null
      email: string
      enderecoCep: string
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
              nome: true,
              sobrenome: true,
              celular: true,
              telefone: true,
              email: true,
              enderecoCep: true,
            },
          },
          pessoaCarona: {
            select: {
              id: true,
              nome: true,
              sobrenome: true,
              celular: true,
              telefone: true,
              email: true,
              enderecoCep: true,
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
