import type { EncontristaData } from '@/app/api/encontrista/[id]/get-encontrista'
import { EditEncontristaForm } from './EditEncontristaForm'

async function getEncontrista(id: string) {
  const encontrista = await fetch(
    `${process.env.NEXTAUTH_URL}/api/encontrista/${id}`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  return encontrista
}
export default async function EditEncontrista({
  params,
}: {
  params: { id: string }
}) {
  const encontrista: EncontristaData = await getEncontrista(params.id)

  return <EditEncontristaForm data={encontrista} />
}
