import { NextResponse } from 'next/server'
import { getTiosCirculo } from './get-tios-circulo'

export async function GET() {
  const tiosCirculo = await getTiosCirculo()

  return NextResponse.json(tiosCirculo)
}
