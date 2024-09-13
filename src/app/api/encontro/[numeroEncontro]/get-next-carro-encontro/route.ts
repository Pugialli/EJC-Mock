import { NextResponse } from 'next/server'
import { getNextCarroEncontro } from './get-next-carro-encontro'

export async function GET() {
  const numeroCarro = await getNextCarroEncontro()

  return NextResponse.json(numeroCarro)
}
