import { prisma } from '@/lib/prisma'
import type { updateCartaVirtualRouteProps } from './route'

export async function updateCartaPrinted({
  id,
  cartaStatus,
}: updateCartaVirtualRouteProps) {
  return await prisma.carta.update({
    data: {
      isPrinted: cartaStatus,
    },
    where: {
      id,
    },
  })
}
