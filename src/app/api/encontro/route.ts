import { NextResponse, type NextRequest } from 'next/server'
import { createEncontro, type EncontroProps } from './create-encontro'

export async function POST(request: NextRequest) {
  const requestedData: EncontroProps = await request.json()

  const encontro = await createEncontro(requestedData)

  return NextResponse.json(encontro, { status: 201 })
}
