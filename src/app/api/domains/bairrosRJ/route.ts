import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type BairrosRJ = {
  id: number
  value: string
  bairro: string
  zona: string
}

export async function GET() {
  const bairrosRJ = await prisma.domainBairroEncontro.findMany()

  return NextResponse.json(bairrosRJ)
}
