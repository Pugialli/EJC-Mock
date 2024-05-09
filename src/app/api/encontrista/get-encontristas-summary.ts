import { prisma } from '@/lib/prisma'
import { type Value_Status as enumStatus } from '@prisma/client'
import type { BairrosRJ } from '../domains/bairrosRJ/get-bairros-rj'

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
}

export type EncontristaSummary = {
  pageIndex: number
  totalCount: number
  perPage: number
  encontristas: EncontristaSummaryData[]
}

type getEncontristasSummaryProps = {
  page: number
  responsavelExterna: string | null
  encontristaName: string | null
  encontristaStatus: enumStatus | null
}

type getEncontritasProps = {
  page: number
  perPage: number
  responsavelExterna: string | null
  encontristaName: string | null
  encontristaStatus: enumStatus | null
}

type getTotalEncontristasProps = {
  responsavelExterna: string | null
  encontristaName: string | null
  encontristaStatus: enumStatus | null
}

async function getEncontritas({
  page,
  perPage,
  responsavelExterna,
  encontristaName,
  encontristaStatus,
}: getEncontritasProps) {
  const skipData = page * perPage

  if (responsavelExterna) {
    if (encontristaName) {
      if (encontristaStatus) {
        if (encontristaStatus === 'confirmado') {
          return await prisma.pessoa.findMany({
            skip: skipData,
            take: perPage,
            select: {
              id: true,
              createdAt: true,
              nome: true,
              sobrenome: true,
              celular: true,
              encontrista: {
                select: {
                  idStatus: true,
                  idBairroEncontro: true,
                  observacao: true,
                  responsavelExterna: {
                    select: {
                      idExterna: true,
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
            orderBy: {
              createdAt: 'asc',
            },
          })
        } else {
          return await prisma.pessoa.findMany({
            skip: skipData,
            take: perPage,
            select: {
              id: true,
              createdAt: true,
              nome: true,
              sobrenome: true,
              celular: true,
              encontrista: {
                select: {
                  idStatus: true,
                  idBairroEncontro: true,
                  observacao: true,
                  responsavelExterna: {
                    select: {
                      idExterna: true,
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
            orderBy: {
              createdAt: 'asc',
            },
          })
        }
      } else {
        return await prisma.pessoa.findMany({
          skip: skipData,
          take: perPage,
          select: {
            id: true,
            createdAt: true,
            nome: true,
            sobrenome: true,
            celular: true,
            encontrista: {
              select: {
                idStatus: true,
                idBairroEncontro: true,
                observacao: true,
                responsavelExterna: {
                  select: {
                    idExterna: true,
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
          orderBy: {
            createdAt: 'asc',
          },
        })
      }
    } else {
      if (encontristaStatus) {
        if (encontristaStatus === 'confirmado') {
          return await prisma.pessoa.findMany({
            skip: skipData,
            take: perPage,
            select: {
              id: true,
              createdAt: true,
              nome: true,
              sobrenome: true,
              celular: true,
              encontrista: {
                select: {
                  idStatus: true,
                  idBairroEncontro: true,
                  observacao: true,
                  responsavelExterna: {
                    select: {
                      idExterna: true,
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
            orderBy: {
              createdAt: 'asc',
            },
          })
        } else {
          return await prisma.pessoa.findMany({
            skip: skipData,
            take: perPage,
            select: {
              id: true,
              createdAt: true,
              nome: true,
              sobrenome: true,
              celular: true,
              encontrista: {
                select: {
                  idStatus: true,
                  idBairroEncontro: true,
                  observacao: true,
                  responsavelExterna: {
                    select: {
                      idExterna: true,
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
              encontrista: {
                idStatus: encontristaStatus,
                responsavelExterna: {
                  idExterna: responsavelExterna,
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          })
        }
      } else {
        return await prisma.pessoa.findMany({
          skip: skipData,
          take: perPage,
          select: {
            id: true,
            createdAt: true,
            nome: true,
            sobrenome: true,
            celular: true,
            encontrista: {
              select: {
                idStatus: true,
                idBairroEncontro: true,
                observacao: true,
                responsavelExterna: {
                  select: {
                    idExterna: true,
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
            encontrista: {
              NOT: { idStatus: 'delete' },
              responsavelExterna: {
                idExterna: responsavelExterna,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
      }
    }
  }

  if (encontristaName) {
    if (encontristaStatus) {
      if (encontristaStatus === 'confirmado') {
        return await prisma.pessoa.findMany({
          skip: skipData,
          take: perPage,
          select: {
            id: true,
            createdAt: true,
            nome: true,
            sobrenome: true,
            celular: true,
            encontrista: {
              select: {
                idStatus: true,
                idBairroEncontro: true,
                observacao: true,
                responsavelExterna: {
                  select: {
                    idExterna: true,
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
          orderBy: {
            createdAt: 'asc',
          },
        })
      } else {
        return await prisma.pessoa.findMany({
          skip: skipData,
          take: perPage,
          select: {
            id: true,
            createdAt: true,
            nome: true,
            sobrenome: true,
            celular: true,
            encontrista: {
              select: {
                idStatus: true,
                idBairroEncontro: true,
                observacao: true,
                responsavelExterna: {
                  select: {
                    idExterna: true,
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
            OR: [
              { nome: { contains: encontristaName } },
              { sobrenome: { contains: encontristaName } },
            ],
            encontrista: {
              idStatus: encontristaStatus,
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
      }
    } else {
      return await prisma.pessoa.findMany({
        skip: skipData,
        take: perPage,
        select: {
          id: true,
          createdAt: true,
          nome: true,
          sobrenome: true,
          celular: true,
          encontrista: {
            select: {
              idStatus: true,
              idBairroEncontro: true,
              observacao: true,
              responsavelExterna: {
                select: {
                  idExterna: true,
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
          OR: [
            { nome: { contains: encontristaName } },
            { sobrenome: { contains: encontristaName } },
          ],
          encontrista: {
            NOT: { idStatus: 'delete' },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    }
  }

  if (encontristaStatus) {
    if (encontristaStatus === 'confirmado') {
      return await prisma.pessoa.findMany({
        skip: skipData,
        take: perPage,
        select: {
          id: true,
          createdAt: true,
          nome: true,
          sobrenome: true,
          celular: true,
          encontrista: {
            select: {
              idStatus: true,
              idBairroEncontro: true,
              observacao: true,
              responsavelExterna: {
                select: {
                  idExterna: true,
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
          encontrista: {
            OR: [
              { idStatus: 'confirmado' },
              { idStatus: 'confirmado_sem_sexta' },
            ],
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    } else {
      return await prisma.pessoa.findMany({
        skip: skipData,
        take: perPage,
        select: {
          id: true,
          createdAt: true,
          nome: true,
          sobrenome: true,
          celular: true,
          encontrista: {
            select: {
              idStatus: true,
              idBairroEncontro: true,
              observacao: true,
              responsavelExterna: {
                select: {
                  idExterna: true,
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
          encontrista: {
            idStatus: encontristaStatus,
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    }
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
      encontrista: {
        select: {
          idStatus: true,
          idBairroEncontro: true,
          observacao: true,
          responsavelExterna: {
            select: {
              idExterna: true,
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
      encontrista: {
        NOT: { idStatus: 'delete' },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
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

export async function getEncontristasSummary({
  page,
  responsavelExterna,
  encontristaName,
  encontristaStatus,
}: getEncontristasSummaryProps) {
  const encontristasResponse: EncontristaSummaryData[] = []
  const perPage = 25

  const totalEncontrista = await getTotal({
    responsavelExterna,
    encontristaName,
    encontristaStatus,
  })

  const encontristas = await getEncontritas({
    page,
    perPage,
    responsavelExterna,
    encontristaName,
    encontristaStatus,
  })

  if (!encontristas) {
    return null
  }

  await Promise.all(
    encontristas.map(async (encontrista) => {
      const idExterna = encontrista.encontrista!.responsavelExterna
        ? encontrista.encontrista!.responsavelExterna.idExterna
        : null

      const bairroRes = await fetch(
        `${process.env.NEXTAUTH_URL}/api/domains/bairrosRJ/${encontrista.encontrista!.idBairroEncontro}`,
      )
      const bairro: BairrosRJ = await bairroRes.json()

      const encontristaResponse: EncontristaSummaryData = {
        id: encontrista.id,
        createdAt: encontrista.createdAt,
        nome: encontrista.nome,
        sobrenome: encontrista.sobrenome,
        celular: encontrista.celular,
        idStatus: encontrista.encontrista!.idStatus,
        nascimento: encontrista.encontreiro!.nascimento,
        bairroEncontro: bairro.bairro,
        idExterna,
        observacoes: encontrista.encontrista!.observacao,
      }
      encontristasResponse.push(encontristaResponse)
      return encontristaResponse
    }),
  )
  const response: EncontristaSummary = {
    totalCount: totalEncontrista,
    pageIndex: page + 1,
    perPage,
    encontristas: encontristasResponse,
  }

  return response
}
