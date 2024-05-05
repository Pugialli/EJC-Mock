import { NextResponse } from 'next/server'
import { getBairrosRJ } from './get-bairros-rj'

export async function GET() {
  const bairrosRJ = await getBairrosRJ()

  return NextResponse.json(bairrosRJ)
}
