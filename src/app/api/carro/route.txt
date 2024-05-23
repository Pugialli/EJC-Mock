import { NextResponse } from 'next/server'
import { getCarros } from './get-carros'

export async function GET() {
  const carros = await getCarros()

  return NextResponse.json(carros)
}
