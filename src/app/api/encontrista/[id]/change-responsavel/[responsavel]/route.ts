import { NextResponse } from 'next/server'
import {
  changeResponsavel,
  type changeResponsavelRouteProps,
} from './change-responsavel'

export async function PATCH(
  request: Request,
  context: { params: changeResponsavelRouteProps },
) {
  console.log(context.params)

  const updated = await changeResponsavel(context.params)

  const infoPatched = {
    id: updated.idEncontrista,
    responsavel: updated.idExterna,
  }

  console.log(infoPatched)
  return NextResponse.json(infoPatched, { status: 201 })
}
