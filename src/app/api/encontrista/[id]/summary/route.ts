import { NextResponse } from 'next/server'
import { getEncontristaSummary } from './get-encontrista-summary'

interface EncontristaSumaryProps {
  id: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaSumaryProps },
) {
  const encontrista = await getEncontristaSummary(context.params.id)

  return NextResponse.json(encontrista)
}
