import type {
  CarroData,
  GetCarroProps,
} from '@/app/api/carro/[carro]/[encontro]/get-carro'
import type { EncontroData } from '@/app/api/encontro/[numeroEncontro]/get-encontro'
import { getCurrentEncontro } from '@/utils/fetch-this-encontro'
import { EditCarroForm } from './EditCarroForm'

async function getCarro({ carro, encontro }: GetCarroProps) {
  const carroFound = await fetch(
    `${process.env.NEXTAUTH_URL}/api/carro/${carro}/${encontro}`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  return carroFound
}

export default async function EditCarro({ params }: { params: GetCarroProps }) {
  const currentEncontro: EncontroData = await getCurrentEncontro()

  const carro: CarroData = await getCarro(params)

  const isFromThisEncontro = currentEncontro
    ? Number(params.encontro) === currentEncontro.numeroEncontro
    : false

  return <EditCarroForm data={carro} disabled={!isFromThisEncontro} />
}
