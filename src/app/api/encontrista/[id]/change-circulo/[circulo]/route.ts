import { NextResponse } from 'next/server'
import { changeCirculo, type changeCirculoRouteProps } from './change-circulo'

export async function PATCH(
  request: Request,
  context: { params: changeCirculoRouteProps },
) {
  const updated = await changeCirculo(context.params)

  if (!updated) {
    return NextResponse.json({ status: 400 })
  }

  const infoPatched = {
    id: updated.idPessoa,
    circulo: updated.idCirculo,
  }

  return NextResponse.json(infoPatched, { status: 201 })
}
