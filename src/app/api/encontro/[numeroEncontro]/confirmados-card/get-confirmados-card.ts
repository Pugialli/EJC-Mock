import {
  getZona,
  type BairroResponse,
} from '@/app/api/domains/bairrosRJ/zona/[bairro]/get-zona'
import { prisma } from '@/lib/prisma'
import { getCurrentEncontro } from '../get-current-encontro/get-current-encontro'

export interface CardEncontristaResponse {
  id: string
  nome: string
  dataNasc: Date
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
  const encontro = await getCurrentEncontro()

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
          dataNasc: true,
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
      const fetchedZona: BairroResponse | null =
        encontrista.encontrista && encontrista.encontrista.enderecoEncontro
          ? await getZona(encontrista.encontrista.enderecoEncontro.bairro)
          : null

      return {
        id: encontrista.id,
        nome: `${encontrista.nome} ${encontrista.sobrenome}`,
        dataNasc: encontrista.encontreiro!.dataNasc,
        bairro: encontrista.encontrista?.enderecoEncontro?.bairro || 'N/A',
        zona: fetchedZona ? fetchedZona.zona : null,
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
