import { loginData } from '@/app/(geral)/login/page'
import { UserCookieData } from '@/context/AuthContext'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data: loginData = await request.json()
  const userExists = await prisma.pessoa.findUnique({
    include: {
      encontreiro: {
        select: {
          senha: true,
        },
      },
    },
    where: {
      email: data.email,
      encontreiro: {
        some: {
          senha: data.password,
        },
      },
    },
  })

  if (!userExists) {
    console.log('Usuário não encontrado')
    return NextResponse.json('Usuário não encontrado', { status: 204 })
  }
  const user: UserCookieData = {
    name: userExists.nome,
    email: userExists.email,
    avatar: userExists.avatar_url,
  }

  return NextResponse.json(user, { status: 200 })
}
