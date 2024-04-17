import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type ReligiaoData = {
  id: string
  religiao: string
}

export async function GET() {
  const religioes = await prisma.domainReligiao.findMany()

  return NextResponse.json(religioes)
}
