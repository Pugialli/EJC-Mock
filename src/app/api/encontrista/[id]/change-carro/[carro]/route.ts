import { NextResponse } from 'next/server'
import { changeCarro, type changeCarroRouteProps } from './change-carro'

export async function PATCH(
  request: Request,
  context: { params: changeCarroRouteProps },
) {
  const updated = await changeCarro(context.params)

  if (!updated) {
    return NextResponse.json({ status: 400 })
  }

  const infoPatched = {
    id: updated.idPessoa,
    idCarroEncontro: updated.carroEncontro?.id,
  }

  return NextResponse.json(infoPatched, { status: 201 })
}
