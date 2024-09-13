import { prisma } from '@/lib/prisma'
import { getCurrentEncontro } from '../get-current-encontro/get-current-encontro'

export async function getNextCarroEncontro() {
  const encontro = await getCurrentEncontro()

  if (!encontro) return 1

  const lastCarroAdded = await prisma.carroEncontro.findFirst({
    where: {
      idEncontro: encontro.id,
    },
    orderBy: {
      numeroCarro: 'desc',
    },
  })

  const numeroCarro = lastCarroAdded ? lastCarroAdded.numeroCarro + 1 : 1

  return numeroCarro
}
