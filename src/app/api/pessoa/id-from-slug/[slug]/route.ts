import { NextResponse } from 'next/server'
import { getIdFromSlug } from './get-id-from-slug'

interface EncontristaProps {
  slug: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaProps },
) {
  const pessoa = await getIdFromSlug(context.params.slug)

  if (!pessoa) {
    return NextResponse.json('')
  }

  return NextResponse.json(pessoa.id)
}
