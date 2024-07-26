import { NextResponse } from 'next/server'
import { getEncontreiroEquipeMontagem } from './get-equipe'

interface EncontristaProps {
  slug: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaProps },
) {
  const encontreiro = await getEncontreiroEquipeMontagem(context.params.slug)

  return NextResponse.json(encontreiro)
}
