import { prisma } from '@/lib/prisma'

export interface deleteEquipeMontagemProps {
  idEncontreiro: string
}

export async function deleteEquipeMontagem({
  idEncontreiro,
}: deleteEquipeMontagemProps) {
  const encontreiroExists = await prisma.equipeMontagem.findFirst({
    where: {
      idEncontreiro,
    },
  })

  const equipeInfo =
    encontreiroExists &&
    (await prisma.equipeMontagem.delete({
      where: {
        idEncontreiro,
      },
    }))

  return equipeInfo
}
