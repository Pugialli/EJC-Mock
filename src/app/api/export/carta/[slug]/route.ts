import { NextResponse } from 'next/server'
import { getEncontristaCartas } from './get-encontrista-cartas'

interface EncontristaCartaProps {
  slug: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaCartaProps },
) {
  const encontristaCartas = await getEncontristaCartas(context.params.slug)

  return NextResponse.json(encontristaCartas, { status: 200 })
}
