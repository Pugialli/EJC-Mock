import { NextResponse } from 'next/server'
import { getCurrentEncontro } from './get-current-encontro'

export async function GET() {
  const encontro = await getCurrentEncontro()

  return NextResponse.json(encontro)
}
