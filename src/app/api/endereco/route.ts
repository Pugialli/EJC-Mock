import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface EnderecoProps {
  cep: string
  bairro: string
  cidade: string
  estado: string
  rua: string
}

export async function POST(request: NextRequest) {
  const requestedData: EnderecoProps = await request.json()

  const endereco = await prisma.endereco.create({
    data: {
      cep: requestedData.cep,
      bairro: requestedData.bairro,
      cidade: requestedData.cidade,
      estado: requestedData.estado,
      rua: requestedData.rua,
    },
  })

  return NextResponse.json(endereco, { status: 201 })
}
