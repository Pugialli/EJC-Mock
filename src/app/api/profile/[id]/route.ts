import { NextResponse } from 'next/server'
import { getProfile } from './get-profile'

interface EncontristaProps {
  id: string
}

export async function GET(
  request: Request,
  context: { params: EncontristaProps },
) {
  const profile = await getProfile(context.params.id)

  return NextResponse.json(profile)
}
