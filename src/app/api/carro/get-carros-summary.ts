// eslint-disable-next-line prettier/prettier
import { prisma } from '@/lib/prisma';
// eslint-disable-next-line prettier/prettier
import { type Prisma } from '@prisma/client';

// Campos válidos para ordenação
export const validOrderFields = [
  'ultimaExterna',
  'nomeMotorista',
  'placa',
  'modelo',
  'vagas',
] as const

// Mapeamento de campos para suas respectivas relações
const fieldMappings: Record<
  string,
  { relation?: string; nestedRelation?: string }
> = {
  placa: { relation: 'carro' },
  modelo: { relation: 'carro' },
  nomeMotorista: { relation: 'carro', nestedRelation: 'pessoaMotorista' },
  vagas: { relation: 'carro' },
  ultimaExterna: { relation: 'encontro' },
}

type OrderByField = (typeof validOrderFields)[number]

export type CarroSummaryData = {
  id: string
  ultimaExterna: number
  nomeMotorista: string
  contatoMotorista: string
  slug: string
  placa: string
  modelo: string
  vagas: number
  idExterna: string | null
  obsMotorista: string | null
  obsExterna: string | null
  bairro: string
}

export type CarrosSummary = {
  pageIndex: number
  totalCount: number
  perPage: number
  carros: CarroSummaryData[]
}

type GetCarrosSummaryProps = {
  page: number
  responsavelExterna: string | null
  motoristaName: string | null
  ultimoEncontro: string | null

  orderByField: string | null
  orderDirection: string | null
}

type GetCarrosProps = {
  page: number
  perPage: number
  responsavelExterna: string | null
  motoristaName: string | null
  ultimoEncontro: string | null

  orderByField: string | null
  orderDirection: string | null
}

type GetTotalCarrosProps = {
  responsavelExterna: string | null
  motoristaName: string | null
  ultimoEncontro: string | null
}

async function getCarros({
  page,
  perPage,
  responsavelExterna,
  motoristaName,
  ultimoEncontro,
  orderByField,
  orderDirection,
}: GetCarrosProps) {
  const skipData = page * perPage

  const nameParts = motoristaName ? motoristaName.split(' ') : []

  const nameFilter: Prisma.PessoaWhereInput = motoristaName
    ? {
        OR: nameParts.flatMap((part) => [
          { nome: { contains: part, mode: 'insensitive' } },
          { sobrenome: { contains: part, mode: 'insensitive' } },
        ]),
      }
    : {}

  const ultimoEncontroFilter: Prisma.EncontroWhereInput =
    ultimoEncontro && !isNaN(Number(ultimoEncontro))
      ? { numeroEncontro: Number(ultimoEncontro) }
      : {}

  const responsavelExternaFilter: Prisma.CarroEncontroWhereInput =
    responsavelExterna ? { idExterna: responsavelExterna } : {}

  const orderBy: Prisma.CarroEncontroOrderByWithRelationInput[] = []
  const direction =
    orderDirection === 'asc' || orderDirection === 'desc'
      ? orderDirection
      : 'asc'

  if (orderByField && validOrderFields.includes(orderByField as OrderByField)) {
    const mapping = fieldMappings[orderByField] || {}

    if (orderByField === 'nomeMotorista') {
      // Ordenação específica para nome e sobrenome
      orderBy.push({
        carro: {
          pessoaMotorista: {
            nome: direction,
            sobrenome: direction,
          },
        },
      })
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
    // Ordenação padrão por 'numeroEncontro' se o campo for inválido
    orderBy.push({ encontro: { numeroEncontro: 'desc' } })
  }

  return await prisma.carroEncontro.findMany({
    skip: skipData,
    take: perPage,
    distinct: ['idCarro'],

    select: {
      idCarro: true,
      idExterna: true,
      observacao: true,
      encontro: {
        select: {
          numeroEncontro: true,
        },
      },
      carro: {
        select: {
          placaCarro: true,
          modeloCarro: true,
          lugaresCarro: true,
          observacaoMotorista: true,
          pessoaMotorista: {
            select: {
              nome: true,
              sobrenome: true,
              apelido: true,
              celular: true,
              slug: true,
              endereco: {
                select: {
                  bairro: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      ...responsavelExternaFilter,
      carro: {
        pessoaMotorista: {
          ...nameFilter,
        },
      },
      encontro: {
        ...ultimoEncontroFilter,
      },
    },
    orderBy,
  })
}

async function getTotal({
  responsavelExterna,
  motoristaName,
  ultimoEncontro,
}: GetTotalCarrosProps) {
  const nameParts = motoristaName ? motoristaName.split(' ') : []

  const nameFilter: Prisma.PessoaWhereInput = motoristaName
    ? {
        OR: nameParts.flatMap((part) => [
          { nome: { contains: part, mode: 'insensitive' } },
          { sobrenome: { contains: part, mode: 'insensitive' } },
        ]),
      }
    : {}

  const ultimoEncontroFilter: Prisma.EncontroWhereInput =
    ultimoEncontro && !isNaN(Number(ultimoEncontro))
      ? { numeroEncontro: Number(ultimoEncontro) }
      : {}

  const responsavelExternaFilter: Prisma.CarroEncontroWhereInput =
    responsavelExterna ? { idExterna: responsavelExterna } : {}

  const totalCarros = await prisma.carroEncontro.findMany({
    distinct: ['idCarro'],
    where: {
      ...responsavelExternaFilter,
      carro: {
        pessoaMotorista: {
          ...nameFilter,
        },
      },
      encontro: {
        ...ultimoEncontroFilter,
      },
    },
  })

  return totalCarros.length
}

function transformToCarroSummaryData(
  carros: {
    idExterna: string | null
    idCarro: string
    observacao: string | null
    carro: {
      modeloCarro: string
      placaCarro: string
      lugaresCarro: number
      observacaoMotorista: string
      pessoaMotorista: {
        nome: string
        sobrenome: string
        apelido: string | null
        celular: string
        slug: string
        endereco: {
          bairro: string
        }
      }
    }
    encontro: {
      numeroEncontro: number
    } | null
  }[],
): CarroSummaryData[] {
  return carros.map((carro) => {
    return {
      id: carro.idCarro,
      ultimaExterna: carro.encontro?.numeroEncontro || 0,
      nomeMotorista:
        carro.carro.pessoaMotorista.nome +
        ' ' +
        carro.carro.pessoaMotorista.sobrenome,
      contatoMotorista: carro.carro.pessoaMotorista.celular,
      slug: carro.carro.pessoaMotorista.slug,
      placa: carro.carro.placaCarro,
      modelo: carro.carro.modeloCarro,
      vagas: carro.carro.lugaresCarro,
      idExterna: carro.idExterna,
      obsMotorista: carro.carro.observacaoMotorista,
      obsExterna: carro.observacao,
      bairro: carro.carro.pessoaMotorista.endereco.bairro,
    }
  })
}

export async function getCarrosSummary({
  page,
  responsavelExterna,
  motoristaName,
  ultimoEncontro,
  orderByField,
  orderDirection,
}: GetCarrosSummaryProps) {
  const perPage = 25

  const totalCarros = await getTotal({
    responsavelExterna,
    motoristaName,
    ultimoEncontro,
  })

  const carros = await getCarros({
    page,
    perPage,
    responsavelExterna,
    motoristaName,
    ultimoEncontro,
    orderByField,
    orderDirection,
  })

  if (!carros) {
    return null
  }

  const carrosResponse = transformToCarroSummaryData(carros)

  const response: CarrosSummary = {
    totalCount: totalCarros,
    pageIndex: page + 1,
    perPage,
    carros: carrosResponse,
  }

  return response
}
