import type { BairroResponse } from '@/app/api/domains/bairrosRJ/zona/[bairro]/get-zona'
import { api } from '@/lib/axios'
import { prisma } from '@/lib/prisma'

export interface CardEncontristaResponse {
  id: string
  nome: string
  nascimento: string
  bairro: string
  rua: string
  endNumero: number | null
  endComplemento: string | null
  zona: string | null
  idCirculo: string | null
  corCirculo: string | null
  idCarro: string | null
}

export async function getConfirmadosCard() {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      numeroEncontro: 'desc',
    },
  })

  if (!encontro) {
    return null
  }
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
      encontrista: {
        select: {
          enderecoEncontro: {
            select: {
              bairro: true,
              rua: true,
            },
          },
          endNumEncontro: true,
          endComplementoEncontro: true,
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
      encontreiro: {
        encontro: {
          id: encontro.id,
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  })

  const response: CardEncontristaResponse[] = await Promise.all(
    encontristas.map(async (encontrista) => {
      const fetchedZona: BairroResponse = await api
        .get(
          `/domains/bairrosRJ/zona/${encontrista.encontrista?.enderecoEncontro?.bairro}`,
        )
        .then((res) => res.data)

      return {
        id: encontrista.id,
        nome: `${encontrista.nome} ${encontrista.sobrenome}`,
        nascimento: encontrista.encontreiro!.nascimento,
        bairro: encontrista.encontrista?.enderecoEncontro?.bairro || 'N/A',
        zona: fetchedZona.zona || null,
        rua: encontrista.encontrista?.enderecoEncontro?.rua || 'N/A',
        endNumero: encontrista.encontrista!.endNumEncontro,
        endComplemento: encontrista.encontrista!.endComplementoEncontro,
        idCirculo: encontrista.encontreiro!.idCirculo,
        corCirculo: encontrista.encontreiro!.circulo?.corCirculo.cor || null,
        idCarro: encontrista.encontrista?.idCarroEncontro || null,
      }
    }),
  )

  return response
}
