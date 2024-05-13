import { NextResponse, type NextRequest } from 'next/server'
import { createCarta, type CartaProps } from './create-carta'
import { getMensagensSummary } from './get-cartas-sumary'

export async function POST(request: NextRequest) {
  const requestedData: CartaProps = await request.json()

  const carta = await createCarta(requestedData)
  if (!carta) {
    return NextResponse.json({ status: 400 })
  }
  return NextResponse.json(carta, { status: 201 })
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)

  const pageParams = requestUrl.searchParams.get('page')
  const encontristaName = requestUrl.searchParams.get('name')

  const page = pageParams ? Number(pageParams) : 1

  const encontristas = await getMensagensSummary({
    page,
    encontristaName,
  })

  return NextResponse.json(encontristas, { status: 201 })
}
