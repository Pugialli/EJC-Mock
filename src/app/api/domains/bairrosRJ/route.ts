import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export type BairrosRJ = {
  id: number
  value: string
  bairro: string
  zona: string
}

export async function GET(request: NextRequest) {
  const bairroValue = request.nextUrl.searchParams.get('bairro')

  if (bairroValue) {
    const bairrosRJ = await prisma.domainBairroEncontro.findFirst({
      where: {
        value: bairroValue,
      },
    })
    return NextResponse.json(bairrosRJ)
  }

  const bairrosRJ = await prisma.domainBairroEncontro.findMany()

  return NextResponse.json(bairrosRJ)
}
