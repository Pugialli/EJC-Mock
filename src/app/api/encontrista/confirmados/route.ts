import { NextResponse } from 'next/server'
import { getEncontristasConfirmados } from './get-encontristas-confirmados'

export async function GET() {
  const encontristas = await getEncontristasConfirmados()

  return NextResponse.json(encontristas, { status: 201 })
}
