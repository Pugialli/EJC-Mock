import { NextResponse } from 'next/server'
import { getPendencias } from './get-pendencias'

export async function GET() {
  const pendencias = await getPendencias()

  return NextResponse.json(pendencias)
}
