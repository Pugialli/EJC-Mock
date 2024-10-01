import type { TiosCirculo } from '@/app/api/encontro/[numeroEncontro]/get-tios-circulo/get-tios-circulo'
import type { SelectArray } from '@/components/Form/SelectInput/SelectItem'
import { api } from '@/lib/axios'

export async function getSelectTios() {
  const response: TiosCirculo[] = await api
    .get('encontro/1/get-tios-circulo')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.nome, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}
