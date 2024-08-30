import { type Value_Status as enumStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import {
  createEncontrista,
  type CreateEncontristaProps,
} from './create-encontrista'
import {
  getEncontristasSummary,
  type EncontristaSummary,
} from './get-encontristas-summary'

export async function POST(request: NextRequest) {
  const formData: CreateEncontristaProps = await request.json()

  const pessoa = await createEncontrista(formData)

  return NextResponse.json(pessoa, { status: 201 })
}

export interface searchParams {
  page: number
}

function orderByNascimento(
  encontristas: EncontristaSummary,
  orderDirection: 'asc' | 'desc' = 'asc',
) {
  return encontristas.encontristas.sort((a, b) => {
    const dateA = new Date(a.nascimento)
    const dateB = new Date(b.nascimento)

    if (orderDirection === 'asc') {
      return dateA.getTime() - dateB.getTime() // Ordena em ordem crescente
    } else {
      return dateB.getTime() - dateA.getTime() // Ordena em ordem decrescente
    }
  })
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)

  const pageParams = requestUrl.searchParams.get('page')
  const encontristaName = requestUrl.searchParams.get('name')
  const encontristaStatusParams = requestUrl.searchParams.get('status')
  const responsavelExterna = requestUrl.searchParams.get('idExterna')
  const orderByField = requestUrl.searchParams.get('orderByField')
  const orderDirection = requestUrl.searchParams.get('orderDirection')

  const page = pageParams ? Number(pageParams) : 1

  const encontristaStatus = encontristaStatusParams
    ? (encontristaStatusParams as enumStatus)
    : null

  const encontristas = await getEncontristasSummary({
    page,
    responsavelExterna,
    encontristaName,
    encontristaStatus,
    orderByField,
    orderDirection,
  })

  if (encontristas && orderByField && orderByField === 'nascimento') {
    const orderDir = orderDirection === 'asc' ? 'asc' : 'desc'
    orderByNascimento(encontristas, orderDir)
  }

  // const encontristas = await getAllEncontristasSummary()

  return NextResponse.json(encontristas, { status: 201 })
}
