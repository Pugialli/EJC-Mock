import { NextResponse } from 'next/server'

import { getCarrosSummary } from './get-carros-summary'

// export async function POST(request: NextRequest) {
//   const formData: CreateEncontristaProps = await request.json()

//   const pessoa = await createEncontrista(formData)

//   return NextResponse.json(pessoa, { status: 201 })
// }

export interface searchParams {
  page: number
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)

  const pageParams = requestUrl.searchParams.get('page')
  const motoristaName = requestUrl.searchParams.get('name')
  const ultimoEncontro = requestUrl.searchParams.get('encontro')
  const responsavelExterna = requestUrl.searchParams.get('idExterna')
  const orderByField = requestUrl.searchParams.get('orderByField')
  const orderDirection = requestUrl.searchParams.get('orderDirection')

  const page = pageParams ? Number(pageParams) : 1

  const carros = await getCarrosSummary({
    page,
    responsavelExterna,
    motoristaName,
    ultimoEncontro,
    orderByField,
    orderDirection,
  })

  // const encontristas = await getAllEncontristasSummary()

  return NextResponse.json(carros, { status: 201 })
}
