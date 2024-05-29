import { NextResponse } from 'next/server'
import { getZona } from './get-zona'

interface BairroProps {
  bairro: string
}

export async function GET(request: Request, context: { params: BairroProps }) {
  const bairroZona = await getZona(context.params.bairro)

  return NextResponse.json(bairroZona)
}
