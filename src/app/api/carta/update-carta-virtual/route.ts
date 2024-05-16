import { NextResponse } from 'next/server'
import { updateCartaPrinted } from './update-carta-printed'

export interface updateCartaVirtualRouteProps {
  id: string
  cartaStatus: boolean
}

export async function PATCH(request: Request) {
  const data: updateCartaVirtualRouteProps = await request.json()

  const updated = await updateCartaPrinted(data)

  const infoPatched = {
    id: updated.id,
    cartaStatus: updated.isPrinted,
  }

  return NextResponse.json(infoPatched, { status: 201 })
}
