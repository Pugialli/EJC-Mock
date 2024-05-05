import { NextResponse } from 'next/server'
import { getEncontrista } from './get-encontrista'

interface EncontristaProps {
  id: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaProps },
) {
  const encontrista = await getEncontrista(context.params.id)

  return NextResponse.json(encontrista)
}
