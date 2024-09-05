import { prisma } from '@/lib/prisma'

export async function deleteCarro(carro: string) {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      dataInicio: 'desc',
    },
  })

  if (!encontro) return null

  return await prisma.carroEncontro.delete({
    where: {
      idCarro_idEncontro: {
        idCarro: carro,
        idEncontro: encontro.id,
      },
    },
  })
}
