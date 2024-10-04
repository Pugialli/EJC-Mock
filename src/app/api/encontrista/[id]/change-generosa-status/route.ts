import { NextResponse, type NextRequest } from 'next/server'
import {
  changeGenerosaStatus,
  type changeGenerosaStatusProps,
} from './change-generosa-status'

export async function PATCH(request: NextRequest) {
  const patchData: changeGenerosaStatusProps = await request.json()

  const status = await changeGenerosaStatus(patchData)

  if (!status) {
    return NextResponse.json({ status: 400 })
  }

  return NextResponse.json(status, { status: 201 })
}
