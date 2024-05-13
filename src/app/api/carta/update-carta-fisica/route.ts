import { NextResponse } from 'next/server'
import { updateCartaFisica } from './update-carta-fisica'

export interface updateCartaFisicaRouteProps {
  id: string
  cartasFisicas: number
}

export async function PATCH(request: Request) {
  const data: updateCartaFisicaRouteProps = await request.json()

  const updated = await updateCartaFisica(data)

  const infoPatched = {
    id: updated.idPessoa,
    cartasFisicas: updated.cartasFisicas,
  }

  return NextResponse.json(infoPatched, { status: 201 })
}
