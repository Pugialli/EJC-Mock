import { NextResponse } from 'next/server'
import { changeCartaStatus } from './change-carta-status'

export async function PATCH() {
  const status = await changeCartaStatus()

  return NextResponse.json(status)
}
