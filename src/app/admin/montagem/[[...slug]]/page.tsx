import { CardEncontreiro } from './CardEncontreiro'
import { ListaEncontreiros } from './ListaEncontreiros'

export default function Montagem({ params }: { params: { slug: string } }) {
  const activeSlug = params.slug ? params.slug.toString() : ''
  return (
    <div className="grid grid-cols-9 p-4">
      <div className="col-span-9 lg:col-span-6">
        <CardEncontreiro slug={activeSlug} />
      </div>
      <div className="col-span-9 lg:col-span-3">
        <ListaEncontreiros activeCard={activeSlug} />
      </div>
    </div>
  )
}
