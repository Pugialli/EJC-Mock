import { NextResponse } from 'next/server'
import { getConfirmadosCard } from './get-confirmados-card'

export async function GET() {
  const encontristas = await getConfirmadosCard()

  return NextResponse.json(encontristas, { status: 201 })
}
