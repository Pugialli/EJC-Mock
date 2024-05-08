import { NextResponse } from 'next/server'
import { deleteEncontrista } from './delete-encontrista'
import { softDeleteEncontrista } from './soft-delete-encontrista'

interface EncontristaProps {
  id: string
}

export async function PATCH(
  request: Request,
  context: { params: EncontristaProps },
) {
  const deleted = await softDeleteEncontrista(context.params.id)

  return NextResponse.json(deleted)
}

export async function DELETE(
  request: Request,
  context: { params: EncontristaProps },
) {
  const encontrista = await deleteEncontrista(context.params.id)

  return NextResponse.json(encontrista)
}
