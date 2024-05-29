import { prisma } from '@/lib/prisma'

export interface CardEncontristaResponse {
  id: string
  nome: string
  nascimento: string
  bairro: string
  rua: string
  endNumero: number
  endComplemento: string
  zona: string | null
  bairroEncontro: string
  idCirculo: string | null
  corCirculo: string | null
  idCarro: string | null
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
      endereco: {
        select: {
          bairro: true,
          rua: true,
        },
      },
      encontrista: {
        select: {
          bairroEncontro: true,
          endNumero: true,
          endComplemento: true,
          idCarroEncontro: true,
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
        bairroEncontro: encontrista.encontrista!.bairroEncontro.bairro,
        zona: encontrista.encontrista?.bairroEncontro.zona || null,
        rua: encontrista.endereco.rua,
        endNumero: encontrista.encontrista!.endNumero,
        endComplemento: encontrista.encontrista!.endComplemento,
        idCirculo: encontrista.encontreiro!.idCirculo,
        corCirculo: encontrista.encontreiro!.circulo?.corCirculo.cor || null,
        idCarro: encontrista.encontrista?.idCarroEncontro || null,
      }
    },
  )

  return response
}
