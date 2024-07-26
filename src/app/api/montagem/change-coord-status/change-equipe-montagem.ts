import { prisma } from '@/lib/prisma'

export interface changeCoordStatusProps {
  idEncontreiro: string
  coordenando: boolean
}

export async function changeCoordStatus({
  idEncontreiro,
  coordenando,
}: changeCoordStatusProps) {
  const encontreiroExists = await prisma.equipeMontagem.findFirst({
    where: {
      idEncontreiro,
    },
  })

  const equipeInfo =
    encontreiroExists &&
    (await prisma.equipeMontagem.update({
      data: {
        coordenando,
      },
      where: {
        idEncontreiro,
      },
    }))

  return equipeInfo
}
