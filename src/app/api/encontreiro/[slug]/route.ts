import { NextResponse } from 'next/server'
import { getEncontreiroMontagem } from './get-encontreiro'

interface EncontristaProps {
  slug: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaProps },
) {
  const encontreiro = await getEncontreiroMontagem(context.params.slug)

  return NextResponse.json(encontreiro)
}
