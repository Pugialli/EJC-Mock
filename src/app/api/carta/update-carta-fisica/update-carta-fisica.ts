import { prisma } from '@/lib/prisma'
import type { updateCartaFisicaRouteProps } from './route'

export async function updateCartaFisica({
  id,
  cartasFisicas,
}: updateCartaFisicaRouteProps) {
  return await prisma.encontrista.update({
    data: {
      cartasFisicas,
    },
    where: {
      idPessoa: id,
    },
  })
}
