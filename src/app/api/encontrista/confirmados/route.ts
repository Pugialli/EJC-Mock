import { NextResponse } from 'next/server'
import { getConfirmados } from './get-confirmados'

export async function GET() {
  const encontristas = await getConfirmados()

  return NextResponse.json(encontristas, { status: 201 })
}
