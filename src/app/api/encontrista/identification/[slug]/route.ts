import { NextResponse } from 'next/server'
import { getIdentification } from './get-identification'

interface EncontristaSumaryProps {
  slug: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaSumaryProps },
) {
  console.log(`Slug na rota: ${context.params.slug}`)

  const encontrista = await getIdentification(context.params.slug)

  return NextResponse.json(encontrista)
}
