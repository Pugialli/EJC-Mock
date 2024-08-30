import { prisma } from '@/lib/prisma'
import { type Value_Status as enumStatus, type Prisma } from '@prisma/client'

// interface getEncontristasResponse {
//   id: string
//   createdAt: Date
//   nome: string
//   sobrenome: string
//   celular: string
//   slug: string
//   encontrista: {
//     idStatus: enumStatus
//     observacao: string
//     responsavelExterna: {
//       idExterna: string
//     }
//     enderecoEncontro: {
//       bairro: string
//     }
//   }
//   encontreiro: {
//     nascimento: string
//   }
// }

export const validOrderFields = [
  'createdAt',
  'nome',
  'celular',
  'nascimento',
  'idStatus',
  'bairro',
] as const

const encontristaOrderFields = ['idStatus'] as const

const enderecoOrderFields = ['bairro'] as const

const encontreiroOrderFields = ['nascimento'] as const

export type EncontristaSummaryData = {
  id: string
  createdAt: Date
  nome: string
  sobrenome: string
  nascimento: string
  idStatus: enumStatus
  bairroEncontro: string
  celular: string
  idExterna: string | null
  observacoes: string | null
  slug: string
}

export type EncontristaSummary = {
  pageIndex: number
  totalCount: number
  perPage: number
  encontristas: EncontristaSummaryData[]
}

type GetEncontristasSummaryProps = {
  page: number
  responsavelExterna: string | null
  encontristaName: string | null
  encontristaStatus: enumStatus | null

  orderByField: string | null
  orderDirection: string | null
}

type getEncontristasProps = {
  page: number
  perPage: number
  responsavelExterna: string | null
  encontristaName: string | null
  encontristaStatus: enumStatus | null

  orderByField: string | null
  orderDirection: string | null
}

type getTotalEncontristasProps = {
  responsavelExterna: string | null
  encontristaName: string | null
  encontristaStatus: enumStatus | null
}

async function getEncontristas({
  page,
  perPage,
  responsavelExterna,
  encontristaName,
  encontristaStatus,
  orderByField,
  orderDirection,
}: getEncontristasProps) {
  const skipData = page * perPage

  const nameParts = encontristaName ? encontristaName.split(' ') : []

  const nameFilter: Prisma.PessoaWhereInput = encontristaName
    ? {
        OR: nameParts.flatMap((part) => [
          { nome: { contains: part, mode: 'insensitive' } },
          { sobrenome: { contains: part, mode: 'insensitive' } },
        ]),
      }
    : {}

  const statusFilter: Prisma.EncontristaWhereInput = encontristaStatus
    ? {
        idStatus:
          encontristaStatus === 'confirmado' ||
          encontristaStatus === 'confirmado_sem_sexta'
            ? { in: ['confirmado', 'confirmado_sem_sexta'] }
            : { equals: encontristaStatus },
      }
    : { NOT: { idStatus: 'delete' } }

  const responsavelExternaFilter: Prisma.EncontristaWhereInput =
    responsavelExterna
      ? { responsavelExterna: { idExterna: responsavelExterna } }
      : {}

  const orderBy: Prisma.PessoaOrderByWithRelationInput[] = []

  if (
    orderByField &&
    validOrderFields.some((field) => field === orderByField)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (encontristaOrderFields.includes(orderByField as any)) {
      // If orderByField is in encontristaOrderFields, apply ordering in 'encontrista'
      orderBy.push({
        encontrista: {
          [orderByField]: orderDirection || 'asc',
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (encontreiroOrderFields.includes(orderByField as any)) {
      // If orderByField is in encontristaOrderFields, apply ordering in 'encontrista'
      orderBy.push({
        encontreiro: {
          [orderByField]: orderDirection || 'asc',
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (enderecoOrderFields.includes(orderByField as any)) {
      // If orderByField is in encontristaOrderFields, apply ordering in 'encontrista'
      orderBy.push({
        encontrista: {
          enderecoEncontro: {
            [orderByField]: orderDirection || 'asc',
          },
        },
      })
    } else {
      // Default ordering in 'pessoa'
      orderBy.push({
        [orderByField]: orderDirection || 'asc',
      })
    }
  } else {
    // Default ordering by 'createdAt' if orderByField is invalid
    orderBy.push({ createdAt: 'asc' })
  }

  return await prisma.pessoa.findMany({
    skip: skipData,
    take: perPage,
    select: {
      id: true,
      createdAt: true,
      nome: true,
      sobrenome: true,
      celular: true,
      slug: true,
      encontrista: {
        select: {
          idStatus: true,
          observacao: true,
          responsavelExterna: {
            select: {
              idExterna: true,
            },
          },
          enderecoEncontro: {
            select: {
              bairro: true,
            },
          },
        },
      },
      encontreiro: {
        select: {
          nascimento: true,
        },
      },
    },
    where: {
      role: 'ENCONTRISTA',
      ...nameFilter,
      encontrista: {
        ...statusFilter,
        ...responsavelExternaFilter,
      },
    },
    orderBy,
  })
}

async function getTotal({
  responsavelExterna,
  encontristaName,
  encontristaStatus,
}: getTotalEncontristasProps) {
  if (responsavelExterna) {
    if (encontristaName) {
      if (encontristaStatus) {
        if (encontristaStatus === 'confirmado') {
          return await prisma.pessoa.count({
            where: {
              role: 'ENCONTRISTA',
              OR: [
                { nome: { contains: encontristaName } },
                { sobrenome: { contains: encontristaName } },
              ],
              encontrista: {
                OR: [
                  { idStatus: 'confirmado' },
                  { idStatus: 'confirmado_sem_sexta' },
                ],
                responsavelExterna: {
                  idExterna: responsavelExterna,
                },
              },
            },
          })
        } else {
          return await prisma.pessoa.count({
            where: {
              role: 'ENCONTRISTA',
              OR: [
                { nome: { contains: encontristaName } },
                { sobrenome: { contains: encontristaName } },
              ],
              encontrista: {
                idStatus: encontristaStatus,
                responsavelExterna: {
                  idExterna: responsavelExterna,
                },
              },
            },
          })
        }
      } else {
        return await prisma.pessoa.count({
          where: {
            role: 'ENCONTRISTA',
            OR: [
              { nome: { contains: encontristaName } },
              { sobrenome: { contains: encontristaName } },
            ],
            encontrista: {
              NOT: { idStatus: 'delete' },
              responsavelExterna: {
                idExterna: responsavelExterna,
              },
            },
          },
        })
      }
    } else {
      if (encontristaStatus) {
        if (encontristaStatus === 'confirmado') {
          return await prisma.pessoa.count({
            where: {
              role: 'ENCONTRISTA',
              encontrista: {
                OR: [
                  { idStatus: 'confirmado' },
                  { idStatus: 'confirmado_sem_sexta' },
                ],
                responsavelExterna: {
                  idExterna: responsavelExterna,
                },
              },
            },
          })
        } else {
          return await prisma.pessoa.count({
            where: {
              role: 'ENCONTRISTA',
              encontrista: {
                idStatus: encontristaStatus,
                responsavelExterna: {
                  idExterna: responsavelExterna,
                },
              },
            },
          })
        }
      } else {
        return await prisma.pessoa.count({
          where: {
            role: 'ENCONTRISTA',
            encontrista: {
              NOT: { idStatus: 'delete' },
              responsavelExterna: {
                idExterna: responsavelExterna,
              },
            },
          },
        })
      }
    }
  }

  if (encontristaName) {
    if (encontristaStatus) {
      if (encontristaStatus === 'confirmado') {
        return await prisma.pessoa.count({
          where: {
            role: 'ENCONTRISTA',
            OR: [
              { nome: { contains: encontristaName } },
              { sobrenome: { contains: encontristaName } },
            ],
            encontrista: {
              OR: [
                { idStatus: 'confirmado' },
                { idStatus: 'confirmado_sem_sexta' },
              ],
            },
          },
        })
      } else {
        return await prisma.pessoa.count({
          where: {
            role: 'ENCONTRISTA',
            OR: [
              { nome: { contains: encontristaName } },
              { sobrenome: { contains: encontristaName } },
            ],
            encontrista: {
              idStatus: encontristaStatus,
            },
          },
        })
      }
    } else {
      return await prisma.pessoa.count({
        where: {
          role: 'ENCONTRISTA',
          OR: [
            { nome: { contains: encontristaName } },
            { sobrenome: { contains: encontristaName } },
          ],
          encontrista: {
            NOT: { idStatus: 'delete' },
          },
        },
      })
    }
  }

  if (encontristaStatus) {
    if (encontristaStatus === 'confirmado') {
      return await prisma.pessoa.count({
        where: {
          role: 'ENCONTRISTA',
          encontrista: {
            OR: [
              { idStatus: 'confirmado' },
              { idStatus: 'confirmado_sem_sexta' },
            ],
          },
        },
      })
    } else {
      return await prisma.pessoa.count({
        where: {
          role: 'ENCONTRISTA',
          encontrista: {
            idStatus: encontristaStatus,
          },
        },
      })
    }
  }

  return await prisma.pessoa.count({
    where: {
      role: 'ENCONTRISTA',
      encontrista: {
        NOT: { idStatus: 'delete' },
      },
    },
  })
}

function transformToEncontristaSummaryData(
  encontristas: {
    id: string
    nome: string
    sobrenome: string
    celular: string
    slug: string
    createdAt: Date
    encontreiro: {
      nascimento: string
    } | null
    encontrista: {
      idStatus: enumStatus
      observacao: string | null
      enderecoEncontro: {
        bairro: string
      } | null
      responsavelExterna: {
        idExterna: string
      } | null
    } | null
  }[],
): EncontristaSummaryData[] {
  return encontristas.map((encontrista) => {
    const idExterna = encontrista.encontrista?.responsavelExterna
      ? encontrista.encontrista.responsavelExterna.idExterna
      : null

    return {
      id: encontrista.id,
      createdAt: encontrista.createdAt,
      nome: encontrista.nome,
      sobrenome: encontrista.sobrenome,
      celular: encontrista.celular,
      idStatus: encontrista.encontrista?.idStatus || 'lista_espera',
      nascimento: encontrista.encontreiro?.nascimento || '',
      bairroEncontro:
        encontrista.encontrista?.enderecoEncontro?.bairro || 'N/A',
      idExterna,
      observacoes: encontrista.encontrista?.observacao || null,
      slug: encontrista.slug,
    }
  })
}

export async function getEncontristasSummary({
  page,
  responsavelExterna,
  encontristaName,
  encontristaStatus,
  orderByField,
  orderDirection,
}: GetEncontristasSummaryProps) {
  const perPage = 25

  const totalEncontrista = await getTotal({
    responsavelExterna,
    encontristaName,
    encontristaStatus,
  })

  const encontristas = await getEncontristas({
    page,
    perPage,
    responsavelExterna,
    encontristaName,
    encontristaStatus,
    orderByField,
    orderDirection,
  })

  if (!encontristas) {
    return null
  }

  // await Promise.all(
  //   encontristas.map(async (encontrista) => {
  //     const idExterna = encontrista.encontrista!.responsavelExterna
  //       ? encontrista.encontrista!.responsavelExterna.idExterna
  //       : null

  //     const encontristaResponse: EncontristaSummaryData = {
  //       id: encontrista.id,
  //       createdAt: encontrista.createdAt,
  //       nome: encontrista.nome,
  //       sobrenome: encontrista.sobrenome,
  //       celular: encontrista.celular,
  //       idStatus: encontrista.encontrista!.idStatus,
  //       nascimento: encontrista.encontreiro!.nascimento,
  //       bairroEncontro:
  //         encontrista.encontrista!.enderecoEncontro?.bairro || 'N/A',
  //       idExterna,
  //       observacoes: encontrista.encontrista!.observacao,
  //       slug: encontrista.slug,
  //     }
  //     encontristasResponse.push(encontristaResponse)
  //     return encontristaResponse
  //   }),
  // )

  const encontristasResponse = transformToEncontristaSummaryData(encontristas)

  const response: EncontristaSummary = {
    totalCount: totalEncontrista,
    pageIndex: page + 1,
    perPage,
    encontristas: encontristasResponse,
  }

  return response
}
