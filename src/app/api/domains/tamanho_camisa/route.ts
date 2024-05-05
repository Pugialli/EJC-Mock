import { NextResponse } from 'next/server'
import { getTamanhoCamisa } from './get-tamanho-camisa'

export async function GET() {
  const tamanhoCamisa = await getTamanhoCamisa()

  return NextResponse.json(tamanhoCamisa)
}
