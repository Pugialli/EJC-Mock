import { prisma } from '@/lib/prisma'

export interface CardEncontristaResponse {
  id: string
  nome: string
  nascimento: string
  bairro: string
  idCirculo: string | null
}

export async function getConfirmadosCard() {
  const encontristas = await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      encontreiro: {
        select: {
          nascimento: true,
          idCirculo: true,
        },
      },
      endereco: {
        select: {
          bairro: true,
        },
      },
    },
    where: {
      OR: [
        {
          encontrista: {
            OR: [
              { idStatus: 'confirmado' },
              { idStatus: 'confirmado_sem_sexta' },
            ],
          },
        },
      ],
    },
    orderBy: {
      nome: 'asc',
    },
  })

  const response: CardEncontristaResponse[] = encontristas.map(
    (encontrista) => {
      return {
        id: encontrista.id,
        nome: `${encontrista.nome} ${encontrista.sobrenome}`,
        nascimento: encontrista.encontreiro!.nascimento,
        bairro: encontrista.endereco.bairro,
        idCirculo: encontrista.encontreiro!.idCirculo,
      }
    },
  )

  return response
}
