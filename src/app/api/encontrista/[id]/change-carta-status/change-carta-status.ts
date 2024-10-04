import { prisma } from '@/lib/prisma'

export interface changeEncontristaCartaStatusProps {
  id: string
  status: boolean
}

export async function changeEncontristaCartaStatus({
  id,
  status,
}: changeEncontristaCartaStatusProps) {
  return await prisma.encontrista.update({
    data: {
      cartasOk: status,
    },
    select: {
      idPessoa: true,
      cartasOk: true,
    },
    where: {
      idPessoa: id,
    },
  })
}
