import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

interface PessoaProps {
  nome: string
  sobrenome: string
  endereco_cep: string
  celular: string
  email: string
  telefone?: string
  password?: string
  avatar_url?: string
}

export async function POST(request: NextRequest) {
  const requestedData: PessoaProps = await request.json()

  const saltedPassword = requestedData.password
    ? await hash(requestedData.password, 8)
    : ''

  const user = await prisma.pessoa.create({
    data: {
      nome: requestedData.nome,
      sobrenome: requestedData.sobrenome,
      email: requestedData.email,
      celular: requestedData.celular,
      endereco_cep: requestedData.endereco_cep,
      avatar_url: requestedData.avatar_url,
      password: saltedPassword,
    },
  })

  return NextResponse.json(user, { status: 201 })
}
