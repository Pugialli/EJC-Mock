import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type MoraComData = {
  id: string
  mora_com: string
}

export async function GET() {
  const moraCom = await prisma.domainMoraCom.findMany()

  return NextResponse.json(moraCom)
}
