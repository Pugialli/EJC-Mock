import { NextResponse } from 'next/server'
import { getCarro, type GetCarroProps } from './get-carro'

export async function GET(
  request: Request,
  context: { params: GetCarroProps },
) {
  const carro = await getCarro(context.params)

  return NextResponse.json(carro)
}
