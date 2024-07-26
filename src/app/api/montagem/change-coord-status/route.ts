import { NextResponse, type NextRequest } from 'next/server'
import {
  changeCoordStatus,
  type changeCoordStatusProps,
} from './change-equipe-montagem'

export async function PATCH(request: NextRequest) {
  const updatedData: changeCoordStatusProps = await request.json()

  const equipeInfo = await changeCoordStatus(updatedData)

  if (!equipeInfo) {
    return NextResponse.json({ status: 400 })
  }

  return NextResponse.json(equipeInfo, { status: 201 })
}
