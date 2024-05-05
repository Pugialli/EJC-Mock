import { NextResponse } from 'next/server'
import { getStatus } from './get-status'

export async function GET() {
  const status = await getStatus()

  return NextResponse.json(status)
}
