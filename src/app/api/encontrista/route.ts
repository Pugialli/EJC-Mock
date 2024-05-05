import { NextRequest, NextResponse } from 'next/server'
import {
  createEncontrista,
  type CreateEncontristaProps,
} from './create-encontrista'
import { getEncontristasSummary } from './get-encontristas-summary'

export async function POST(request: NextRequest) {
  const formData: CreateEncontristaProps = await request.json()

  const pessoa = await createEncontrista(formData)

  return NextResponse.json(pessoa, { status: 201 })
}

export interface searchParams {
  page: number
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)

  const pageParams = requestUrl.searchParams.get('page')

  const page = pageParams ? Number(pageParams) : 1

  const encontristas = await getEncontristasSummary({ page })

  return NextResponse.json(encontristas, { status: 201 })
}
