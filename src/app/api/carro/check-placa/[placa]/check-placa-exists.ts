import { prisma } from '@/lib/prisma'

export interface CheckPlacaResponse {
  result: string | false
}

export async function checkPlacaExists(placa: string) {
  const result = await prisma.carro.findFirst({
    select: {
      pessoaMotorista: {
        select: {
          nome: true,
          sobrenome: true,
        },
      },
    },
    where: {
      placaCarro: placa,
    },
  })

  if (!result) {
    return false
  }

  return result.pessoaMotorista.nome + ' ' + result.pessoaMotorista.sobrenome
}
