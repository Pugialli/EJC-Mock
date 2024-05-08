import { NextResponse } from 'next/server'
import {
  changeResponsavel,
  type changeResponsavelRouteProps,
} from './change-responsavel'

export async function PATCH(
  request: Request,
  context: { params: changeResponsavelRouteProps },
) {
  const updated = await changeResponsavel(context.params)

  if (!updated) {
    return NextResponse.json({ status: 400 })
  }

  const infoPatched = {
    id: updated.idEncontrista,
    responsavel: updated.idExterna,
  }

  return NextResponse.json(infoPatched, { status: 201 })
}
