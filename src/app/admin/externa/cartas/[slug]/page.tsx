import type { CartaProps } from '@/app/api/carta/create-carta'
import type { EncontristaIdentification } from '@/app/api/encontrista/identification/[slug]/get-identification'
import { CartaPageTemplate } from '@/components/Pdf/CartaPageTemplate'
import { Separator } from '@/components/ui/separator'

async function getCartasEncontrista(slug: string) {
  const cartas = await fetch(
    `${process.env.NEXTAUTH_URL}/api/export/carta/${slug}`,
    { cache: 'no-store' },
  ).then(async (res) => await res.json())

  return cartas
}

async function getEncontristaShortData(slug: string) {
  const encontrista = await fetch(
    `${process.env.NEXTAUTH_URL}/api/encontrista/identification/${slug}`,
  ).then(async (res) => await res.json())

  return encontrista
}

export default async function CartasEncontristas({
  params,
}: {
  params: { slug: string }
}) {
  const encontristaData: EncontristaIdentification =
    await getEncontristaShortData(params.slug)
  const encontristaCarta: CartaProps[] = await getCartasEncontrista(params.slug)

  return (
    <div>
      <span className="fixed right-1 top-1">
        {encontristaData.nome} {encontristaData.sobrenome} - Amarelo
      </span>
      <div className="flex flex-col p-16">
        {encontristaCarta.map((carta, index) => {
          return (
            <div key={index}>
              <CartaPageTemplate
                key={index}
                de={carta.de}
                para={carta.para}
                conteudo={carta.conteudo}
              />
              {index + 1 < encontristaCarta.length && (
                <Separator className="my-8" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
