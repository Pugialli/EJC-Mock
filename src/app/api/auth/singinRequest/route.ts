import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { User } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface LoginProps {
  email: string
  password: string
}

interface AuthResponse {
  user: User
  token: string
}

export async function POST(request: NextRequest) {
  const credendials: LoginProps = await request.json()

  const userExists = await prisma.pessoa.findUnique({
    where: {
      email: credendials.email,
    },
  })

  if (!userExists) {
    return NextResponse.json('', { status: 404, statusText: 'User not found' })
  }

  const passwordCorrect = userExists.password
    ? await compare(credendials.password, userExists.password)
    : false

  if (!passwordCorrect) {
    return NextResponse.json('', {
      status: 401,
      statusText: 'User or password incorrect',
    })
  }

  const user: User = {
    name: userExists.nome,
    surname: userExists.sobrenome,
    email: userExists.email,
    id: userExists.id,
    avatar_url: userExists.avatar_url ? userExists.avatar_url : undefined,
  }
  const response: AuthResponse = {
    user,
    token: '@ejcnsdp', // CRIAR O TOKEN
  }

  return NextResponse.json(response, { status: 200 })
}
