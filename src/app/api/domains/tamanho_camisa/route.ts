import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type TamanhoCamisaData = {
  id: string
  tamanho_camisa: string
}

export async function GET() {
  const tamanhoCamisa = await prisma.domainTamanhoCamisa.findMany()

  return NextResponse.json(tamanhoCamisa)
}
