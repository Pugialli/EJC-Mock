import { NextResponse, type NextRequest } from 'next/server'
import {
  changeFamiliaStatus,
  type changeFamiliaStatusProps,
} from './change-familia-status'

export async function PATCH(request: NextRequest) {
  const patchData: changeFamiliaStatusProps = await request.json()

  const status = await changeFamiliaStatus(patchData)

  if (!status) {
    return NextResponse.json({ status: 400 })
  }

  return NextResponse.json(status, { status: 201 })
}
