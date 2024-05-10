import { prisma } from '@/lib/prisma'

export async function checkEmailExists(email: string) {
  const result = await prisma.pessoa.findUnique({
    select: {
      id: true,
      email: true,
    },
    where: {
      email,
    },
  })

  if (!result) {
    return false
  }
  return true
}
