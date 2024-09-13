import { NextResponse } from 'next/server'
import { getTioExterna } from './get-tio-externa'

interface TioExternaProps {
  id: string
}

export async function GET(
  request: Request,
  context: { params: TioExternaProps },
) {
  const encontrista = await getTioExterna(context.params.id)

  return NextResponse.json(encontrista)
}
