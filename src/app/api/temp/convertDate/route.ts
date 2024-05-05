import { stringToDate } from '@/utils/string-to-date'
import { NextResponse } from 'next/server'

export async function GET() {
  const date = await stringToDate('24/05/2022 22:45')

  return NextResponse.json(date, { status: 201 })
}
