import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json(null, { status: 204 })
  }

  const personFound = await prisma.pessoa.findFirst({
    where: {
      email,
    },
  })

  if (!personFound) {
    return NextResponse.json(null, { status: 204 })
  }

  return NextResponse.json(personFound, { status: 208 })
}
