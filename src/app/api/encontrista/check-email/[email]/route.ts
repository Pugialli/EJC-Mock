import { NextResponse } from 'next/server'
import { checkEmailExists } from './check-email-exists'

interface CheckEmailProps {
  email: string
}

export async function GET(
  request: Request,
  context: { params: CheckEmailProps },
) {
  const emailExists = await checkEmailExists(context.params.email)

  return NextResponse.json(emailExists)
}
