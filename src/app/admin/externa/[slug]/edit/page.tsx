import type { EncontristaData } from '@/app/api/encontrista/[id]/get-encontrista'
import { EditEncontristaForm } from './EditEncontristaForm'

async function getEncontrista(slug: string) {
  const id = await fetch(
    `${process.env.NEXTAUTH_URL}/api/pessoa/id-from-slug/${slug}`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  const encontrista = await fetch(
    `${process.env.NEXTAUTH_URL}/api/encontrista/${id}`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  return encontrista
}

export default async function EditEncontrista({
  params,
}: {
  params: { slug: string }
}) {
  const encontrista: EncontristaData = await getEncontrista(params.slug)

  return <EditEncontristaForm data={encontrista} />
}
