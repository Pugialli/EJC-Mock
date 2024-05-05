import { prisma } from '@/lib/prisma'
import { stringToDate } from '@/utils/string-to-date'

export type EncontroProps = {
  numeroEncontro: number
  dataInicio: string
  dataTema: string
  numeroCirculos: number
  idLocal: string
}

export async function createEncontro({
  numeroEncontro,
  dataInicio,
  dataTema,
  idLocal,
  numeroCirculos,
}: EncontroProps) {
  const dataInicioDate = stringToDate(dataInicio)
  const dataTemaDate = stringToDate(dataTema)

  const encontro = await prisma.encontro.create({
    data: {
      numeroEncontro,
      dataInicio: dataInicioDate,
      dataTema: dataTemaDate,
      numeroCirculos,
      idLocal,
    },
  })

  return encontro
}
