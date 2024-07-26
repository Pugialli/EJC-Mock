import { prisma } from '@/lib/prisma'

export interface changeEquipeProps {
  idEncontreiro: string
  valueEquipe: string
  coordenando: boolean
}

export async function alocateEquipeMontagem({
  idEncontreiro,
  valueEquipe,
  coordenando,
}: changeEquipeProps) {
  const encontreiroExists = await prisma.equipeMontagem.findFirst({
    where: {
      idEncontreiro,
    },
  })

  const equipeInfo = encontreiroExists
    ? await prisma.equipeMontagem.update({
        data: {
          valueEquipe,
          coordenando,
        },
        where: {
          idEncontreiro,
        },
      })
    : await prisma.equipeMontagem.create({
        data: {
          idEncontreiro,
          valueEquipe,
          coordenando,
        },
      })

  return equipeInfo
}
