import { NextResponse } from 'next/server'
import { getCirculos } from './get-circulos'

export async function GET() {
  const circulos = await getCirculos()

  return NextResponse.json(circulos)
}
