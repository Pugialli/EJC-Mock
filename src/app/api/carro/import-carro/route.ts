import { NextResponse, type NextRequest } from 'next/server'

import { importCarro, type ImportCarroProps } from './import-carro'

export async function POST(request: NextRequest) {
  const formData: ImportCarroProps = await request.json()

  const carro = await importCarro(formData)

  return NextResponse.json(carro, { status: 201 })
}
