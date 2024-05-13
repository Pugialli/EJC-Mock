import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const requestedData = await request.json()

  console.log(requestedData)
  // const encontro = await createEncontro(requestedData)
  // return NextResponse.json(encontro, { status: 201 })
}
