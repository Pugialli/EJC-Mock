import { prisma } from '@/lib/prisma'
import { getCurrentEncontro } from '../../encontro/[numeroEncontro]/get-current-encontro/get-current-encontro'
import { getNextCarroEncontro } from '../../encontro/[numeroEncontro]/get-next-carro-encontro/get-next-carro-encontro'

export interface ImportCarroProps {
  idCarro: string
  observacao: string | null
}

export async function importCarro({ idCarro, observacao }: ImportCarroProps) {
  const encontro = await getCurrentEncontro()
  if (!encontro) return null

  const lastCarroAdded = await getNextCarroEncontro()

  if (!lastCarroAdded) return null

  return await prisma.carroEncontro.create({
    data: {
      numeroCarro: lastCarroAdded,
      idCarro,
      observacao,
      idEncontro: encontro.id,
    },
  })
}
