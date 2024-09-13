import { NextResponse } from 'next/server'
import { getPossiveisExternas } from './get-possiveis-externas'

export async function GET() {
  const tiosExterna = await getPossiveisExternas()

  return NextResponse.json(tiosExterna)
}
