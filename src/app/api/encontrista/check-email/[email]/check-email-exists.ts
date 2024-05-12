import { prisma } from '@/lib/prisma'

export async function checkEmailExists(email: string) {
  const result = await prisma.pessoa.findUnique({
    select: {
      id: true,
      email: true,
      encontrista: {
        select: {
          idStatus: true,
        },
      },
    },
    where: {
      email,
    },
  })

  if (!result) {
    return false
  }

  if (result.encontrista?.idStatus === 'delete') {
    await prisma.pessoa.delete({
      where: {
        id: result.id,
      },
    })
  }

  return true
}
