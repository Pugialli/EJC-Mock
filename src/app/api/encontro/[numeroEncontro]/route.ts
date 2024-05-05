import { NextResponse } from 'next/server'
import { getEncontro } from './get-encontro'

interface EncontroProps {
  numeroEncontro: string
}

export async function GET(
  request: Request,
  context: { params: EncontroProps },
) {
  const encontro = await getEncontro(Number(context.params.numeroEncontro))

  return NextResponse.json(encontro)
}
