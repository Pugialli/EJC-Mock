import { NextResponse } from 'next/server'
import { getMoraCom } from './get-mora-com'

export async function GET() {
  const moraCom = await getMoraCom()

  return NextResponse.json(moraCom)
}
