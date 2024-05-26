import { NextResponse } from 'next/server'
import { getCartaStatus } from './get-circulos'

export async function GET() {
  const status = await getCartaStatus()

  return NextResponse.json(status)
}
