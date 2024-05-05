import { prisma } from '@/lib/prisma'

export type EncontroData = {
  numeroEncontro: number
  dataInicio: string
  dataTema: string
  temaEspiritual: string
  temaFantasia: string
  numeroCirculos: number
  local: {
    nomeLocal: string
    numeroLocal: string
  }
}

export async function getEncontro(numeroEncontro: number) {
  const encontro = await prisma.encontro.findUnique({
    select: {
      numeroEncontro: true,
      dataInicio: true,
      dataTema: true,
      temaEspiritual: true,
      temaFantasia: true,
      numeroCirculos: true,
      local: {
        select: {
          nomeLocal: true,
          numeroLocal: true,
        },
      },
    },
    where: {
      numeroEncontro,
    },
  })

  return encontro
}
