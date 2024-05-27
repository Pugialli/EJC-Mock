import { NextResponse, type NextRequest } from 'next/server'
import {
  changeCartaStatus,
  type changeCartaStatusProps,
} from './change-carta-status'

export async function PATCH(request: NextRequest) {
  const statusData: changeCartaStatusProps = await request.json()

  const status = await changeCartaStatus(statusData)

  if (!status) {
    return NextResponse.json({ status: 400 })
  }

  return NextResponse.json(status, { status: 201 })
}
