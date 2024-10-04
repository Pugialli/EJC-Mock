import { NextResponse, type NextRequest } from 'next/server'
import {
  changeEncontristaCartaStatus,
  type changeEncontristaCartaStatusProps,
} from './change-carta-status'

export async function PATCH(request: NextRequest) {
  const patchData: changeEncontristaCartaStatusProps = await request.json()

  const status = await changeEncontristaCartaStatus(patchData)

  if (!status) {
    return NextResponse.json({ status: 400 })
  }

  return NextResponse.json(status, { status: 201 })
}
