import { NextResponse } from 'next/server'
import { getIdentification } from './get-identification'

interface EncontristaSumaryProps {
  slug: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaSumaryProps },
) {
  const encontrista = await getIdentification(context.params.slug)

  return NextResponse.json(encontrista)
}
