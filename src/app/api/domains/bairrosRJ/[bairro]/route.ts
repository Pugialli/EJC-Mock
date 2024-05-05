import { NextResponse } from 'next/server'
import { getBairro } from './get-bairro'

interface BairroProps {
  bairro: string
}

export async function GET(request: Request, context: { params: BairroProps }) {
  const bairro = await getBairro(context.params.bairro)

  return NextResponse.json(bairro)
}
