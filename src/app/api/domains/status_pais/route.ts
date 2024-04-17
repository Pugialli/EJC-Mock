import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type StatusPaisData = {
  id: string
  status_pais: string
}

export async function GET() {
  const statusPais = await prisma.domainStatusPais.findMany()

  return NextResponse.json(statusPais)
}
