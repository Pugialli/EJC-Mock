import { prisma } from '@/lib/prisma'

export interface MensagemProps {
  idEncontrista: string
  para: string
  de: string
  conteudo: string
}

export async function createMessage({
  idEncontrista,
  conteudo,
  de,
  para,
}: MensagemProps) {
  const encontrista = await prisma.pessoa.findUnique({
    select: {
      role: true,
    },
    where: {
      id: idEncontrista,
    },
  })

  const isSecreto = encontrista?.role === 'TIOSECRETO'

  if (isSecreto) {
    return true
  }

  return await prisma.carta.create({
    data: {
      idEncontrista,
      de,
      para,
      conteudo,
    },
  })
}
