import { NextResponse } from 'next/server'
import { getAllCartas } from './get-all-cartas'

export async function GET() {
  const cartas = await getAllCartas()

  return NextResponse.json(cartas)
}
