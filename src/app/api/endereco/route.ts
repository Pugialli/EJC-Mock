import { NextRequest, NextResponse } from 'next/server'
import { createEndereco, type EnderecoProps } from './create-endereco'

export async function POST(request: NextRequest) {
  const requestedData: EnderecoProps = await request.json()

  const endereco = await createEndereco(requestedData)

  return NextResponse.json(endereco, { status: 201 })
}
