import { NextRequest, NextResponse } from 'next/server'

export type StatusPaisData = {
  id: string
  status_pais: string
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const nome = formData.get('nome')
  const apelido = formData.get('apelido')

  console.log(formData)

  return NextResponse.json({ nome, apelido })
}
