import { NextResponse, type NextRequest } from 'next/server'
import { createLocal, type LocalProps } from './create-local'

export async function POST(request: NextRequest) {
  const requestedData: LocalProps = await request.json()

  const encontro = await createLocal(requestedData)

  return NextResponse.json(encontro, { status: 201 })
}
