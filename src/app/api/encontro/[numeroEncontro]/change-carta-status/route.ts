import { NextResponse } from 'next/server'
import { changeCartaStatus } from './change-carta-status'

export async function GET() {
  const status = await changeCartaStatus()

  return NextResponse.json(status)
}
