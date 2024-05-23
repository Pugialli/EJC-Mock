import { NextResponse } from 'next/server'
import { getEquipeExterna } from './get-equipe-externa'

export async function GET() {
  const equipeExterna = await getEquipeExterna()

  return NextResponse.json(equipeExterna)
}
