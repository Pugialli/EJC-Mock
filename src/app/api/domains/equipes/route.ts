import { NextResponse } from 'next/server'
import { getEquipes } from './get-equipes'

export async function GET() {
  const equipes = await getEquipes()

  return NextResponse.json(equipes)
}
