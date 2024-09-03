import type { EditFormDataInput } from '@/app/admin/externa/[slug]/edit/EditEncontristaForm'
import { NextResponse, type NextRequest } from 'next/server'
import { updateEncontrista } from './update-encontrista'

export async function PUT(request: NextRequest) {
  const formData: EditFormDataInput = await request.json()

  const updated = await updateEncontrista(formData)

  if (!updated) {
    return NextResponse.json({ status: 400 })
  }

  const encontristaUpdated = {
    id: updated.id,
    email: updated.email,
  }

  return NextResponse.json(encontristaUpdated, { status: 201 })
}
