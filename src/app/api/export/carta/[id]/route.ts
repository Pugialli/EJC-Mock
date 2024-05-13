import { NextResponse } from 'next/server'
import { getEncontristaCartas } from './get-encontrista-cartas'

interface EncontristaCartaProps {
  id: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaCartaProps },
) {
  const encontristaCartas = await getEncontristaCartas(context.params.id)

  return NextResponse.json(encontristaCartas)
}
