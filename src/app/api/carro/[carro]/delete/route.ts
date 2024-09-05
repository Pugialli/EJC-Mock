import { NextResponse } from 'next/server'
import { deleteCarro } from './delete-encontrista'

interface CarroProps {
  carro: string
}
export async function DELETE(
  request: Request,
  context: { params: CarroProps },
) {
  const carro = await deleteCarro(context.params.carro)

  return NextResponse.json(carro)
}
