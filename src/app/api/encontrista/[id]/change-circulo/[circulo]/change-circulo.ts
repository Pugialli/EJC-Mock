import { prisma } from '@/lib/prisma'

export interface changeCirculoRouteProps {
  id: string
  circulo: string
}
export async function changeCirculo({ id, circulo }: changeCirculoRouteProps) {
  const newCirculo = await prisma.circulo.findUnique({
    where: {
      id: circulo,
    },
  })

  const newCirculoId = newCirculo ? newCirculo.id : null

  return await prisma.encontreiro.update({
    select: {
      idPessoa: true,
      idCirculo: true,
    },
    data: {
      idCirculo: newCirculoId,
    },
    where: {
      idPessoa: id,
    },
  })
}
