import { prisma } from '@/lib/prisma'

export async function checkEmailExists(email: string) {
  const personFound = await prisma.pessoa.findUniqueOrThrow({
    select: {
      id: true,
      email: true,
    },
    where: {
      email,
    },
  })

  return personFound
}
