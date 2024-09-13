import { NextResponse } from 'next/server'
import { checkPlacaExists } from './check-placa-exists'

interface CheckPlacaProps {
  placa: string
}

export async function GET(
  request: Request,
  context: { params: CheckPlacaProps },
) {
  const placa = context.params.placa.toUpperCase()

  const placaExists = await checkPlacaExists(placa)

  return NextResponse.json(placaExists)
}
