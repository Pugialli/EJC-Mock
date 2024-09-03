// eslint-disable-next-line prettier/prettier
import { prisma } from '@/lib/prisma';
// eslint-disable-next-line prettier/prettier
import { type Value_Status as enumStatus, type Prisma } from '@prisma/client';

// Campos válidos para ordenação
export const validOrderFields = [
  'createdAt',
  'nome',
  'celular',
  'dataNasc',
  'idStatus',
  'bairro',
] as const

// Mapeamento de campos para suas respectivas relações
const fieldMappings: Record<
  string,
  { relation?: string; nestedRelation?: string }
> = {
  idStatus: { relation: 'encontrista' },
  bairro: { relation: 'encontrista', nestedRelation: 'enderecoEncontro' },
  dataNasc: { relation: 'encontreiro' },
}

type OrderByField = (typeof validOrderFields)[number]

export type EncontristaSummaryData = {
  id: string
  createdAt: Date
  nome: string
  sobrenome: string
  dataNasc: Date | null
  idStatus: enumStatus
  bairroEncontro: string
  celular: string
  idExterna: string | null
  observacoes: string | null
  obsExternaLocalizacao: string | null
  obsExternaSaude: string | null
  obsExternaConhecidos: string | null
  obsExternaOutros: string | null
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
  const direction =
    orderDirection === 'asc' || orderDirection === 'desc'
      ? orderDirection
      : 'asc'

  if (orderByField && validOrderFields.includes(orderByField as OrderByField)) {
    const mapping = fieldMappings[orderByField] || {}

    if (orderByField === 'nome') {
      // Ordenação específica para nome e sobrenome
      orderBy.push({ nome: direction }, { sobrenome: direction })
    } else if (mapping.relation) {
      // Ordenação para campos mapeados
      const orderObject = mapping.nestedRelation
        ? {
            [mapping.relation]: {
              [mapping.nestedRelation]: { [orderByField]: direction },
            },
          }
        : { [mapping.relation]: { [orderByField]: direction } }
      orderBy.push(orderObject)
    } else {
      // Ordenação padrão
      orderBy.push({ [orderByField]: direction })
    }
  } else {
    // Ordenação padrão por 'createdAt' se o campo for inválido
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
          obsExternaLocalizacao: true,
          obsExternaSaude: true,
          obsExternaConhecidos: true,
          obsExternaOutros: true,
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
          dataNasc: true,
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
      dataNasc: Date | null
    } | null
    encontrista: {
      idStatus: enumStatus
      observacao: string | null
      obsExternaLocalizacao: string | null
      obsExternaSaude: string | null
      obsExternaConhecidos: string | null
      obsExternaOutros: string | null
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
      dataNasc: encontrista.encontreiro?.dataNasc || null,
      bairroEncontro:
        encontrista.encontrista?.enderecoEncontro?.bairro || 'N/A',
      idExterna,
      observacoes: encontrista.encontrista?.observacao || null,
      obsExternaLocalizacao:
        encontrista.encontrista?.obsExternaLocalizacao || null,
      obsExternaSaude: encontrista.encontrista?.obsExternaSaude || null,
      obsExternaConhecidos:
        encontrista.encontrista?.obsExternaConhecidos || null,
      obsExternaOutros: encontrista.encontrista?.obsExternaOutros || null,
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

  const encontristasResponse = transformToEncontristaSummaryData(encontristas)

  const response: EncontristaSummary = {
    totalCount: totalEncontrista,
    pageIndex: page + 1,
    perPage,
    encontristas: encontristasResponse,
  }

  return response
}
