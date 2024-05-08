import type { MoraCom } from '@/app/api/domains/mora_com/get-mora-com'
import type { Religiao } from '@/app/api/domains/religiao/get-religiao'
import type { StatusPais } from '@/app/api/domains/status_pais/get-status-pais'
import type { TamanhoCamisa } from '@/app/api/domains/tamanho_camisa/get-tamanho-camisa'
import type { SelectArray } from '@/components/Form/SelectInput/SelectItem'
import { api } from '@/lib/axios'

export async function getReligioes() {
  const response: Religiao[] = await api
    .get('domains/religiao')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.religiao, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

export async function getBairros() {
  const response = await api
    .get('domains/bairrosRJ')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export async function getMoraCom() {
  const response: MoraCom[] = await api
    .get('domains/mora_com')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.moraCom, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

export async function getStatusPais() {
  const response: StatusPais[] = await api
    .get('domains/status_pais')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.statusPais, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

export async function getTamanhoCamisa() {
  const response: TamanhoCamisa[] = await api
    .get('domains/tamanho_camisa')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = {
      label: item.tamanhoCamisa,
      value: item.id,
    }

    selectData.push(selectItem)
  })

  return selectData
}
