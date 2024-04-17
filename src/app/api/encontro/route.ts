import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export type EncontroData = {
  numero_encontro: number
  data_inicio: string
  data_tema: string
  tema_espiritual: string
  tema_fantasia: string
  numero_circulos: number
  local: {
    nome_local: string
    numero_local: string
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const numero = Number(searchParams.get('encontro'))

  const encontro = await prisma.encontro.findUnique({
    include: {
      Local: true,
    },
    where: {
      numero_encontro: numero,
    },
  })

  return NextResponse.json(encontro)
}
