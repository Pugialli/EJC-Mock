import { NextRequest, NextResponse } from 'next/server'
import { createPessoa, type PessoaProps } from './create-pessoa'

export async function POST(request: NextRequest) {
  const requestedData: PessoaProps = await request.json()

  const pessoa = await createPessoa(requestedData)

  return NextResponse.json(pessoa, { status: 201 })
}
