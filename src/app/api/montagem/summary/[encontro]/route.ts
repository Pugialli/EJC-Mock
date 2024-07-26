import { NextResponse } from 'next/server'
import { getEncontreirosSummary } from './get-encontreiros-summary'

export async function GET() {
  const encontreiros = await getEncontreirosSummary()

  return NextResponse.json(encontreiros)
}
