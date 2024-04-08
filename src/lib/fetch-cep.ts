export interface CEPResponse {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export async function getCEPData(cep: string) {
  const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)

  if (!res.ok) {
    return undefined
  }

  return res
}
