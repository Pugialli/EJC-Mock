import { NextResponse } from 'next/server'
import { getReligiao } from './get-religiao'

export async function GET() {
  const religiao = await getReligiao()

  return NextResponse.json(religiao)
}
