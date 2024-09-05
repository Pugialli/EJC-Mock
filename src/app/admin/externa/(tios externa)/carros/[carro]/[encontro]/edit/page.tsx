import type {
  CarroData,
  GetCarroProps,
} from '@/app/api/carro/[carro]/[encontro]/get-carro'
import { EditCarroForm } from './EditCarroForm'

async function getCarro({ carro, encontro }: GetCarroProps) {
  const carroFound = await fetch(
    `${process.env.NEXTAUTH_URL}/api/carro/${carro}/${encontro}`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  return carroFound
}

export default async function EditCarro({ params }: { params: GetCarroProps }) {
  const carro: CarroData = await getCarro(params)

  return <EditCarroForm data={carro} />
}
