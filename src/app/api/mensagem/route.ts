import { NextResponse, type NextRequest } from 'next/server'
import { createMessage, type MensagemProps } from './create-message'

export async function POST(request: NextRequest) {
  const requestedData: MensagemProps = await request.json()

  const carta = await createMessage(requestedData)
  if (!carta) {
    return NextResponse.json({ status: 400 })
  }
  return NextResponse.json(carta, { status: 201 })
}
