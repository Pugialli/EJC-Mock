import { prisma } from '@/lib/prisma'

export interface EncontristaIdentification {
  id: string
  corCirculo: string | null
  slug: string
  nome: string
  sobrenome: string
  email: string
}

export async function getIdentification(slug: string) {
  const encontrista = await prisma.pessoa.findUnique({
    select: {
      id: true,
      slug: true,
      nome: true,
      sobrenome: true,
      email: true,
      encontreiro: {
        select: {
          circulo: {
            select: {
              corCirculo: {
                select: {
                  cor: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      slug,
    },
  })

  if (!encontrista) {
    return null
  }

  const corCirculo = encontrista.encontreiro?.circulo?.corCirculo.cor

  const response: EncontristaIdentification = {
    id: encontrista.id,
    email: encontrista.email,
    nome: encontrista.nome,
    slug: encontrista.slug,
    sobrenome: encontrista.sobrenome,
    corCirculo: corCirculo || null,
  }

  return response
}
