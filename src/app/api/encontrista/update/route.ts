import type { EditFormDataInput } from '@/app/admin/externa/[id]/edit/EditEncontristaForm'
import { NextResponse, type NextRequest } from 'next/server'
import { updateEncontrista } from './update-encontrista'

export async function PUT(request: NextRequest) {
  const formData: EditFormDataInput = await request.json()

  const updated = await updateEncontrista(formData)

  if (!updated) {
    return NextResponse.json({ status: 400 })
  }

  const encontristaUpdated = {
    id: updated[0].id,
    email: updated[0].email,
  }

  return NextResponse.json(encontristaUpdated, { status: 201 })
}
