import { NextResponse } from 'next/server'
import { getStatusPais } from './get-status-pais'

export async function GET() {
  const statusPais = await getStatusPais()

  return NextResponse.json(statusPais)
}
