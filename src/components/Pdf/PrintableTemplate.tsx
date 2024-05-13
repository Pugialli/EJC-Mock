import type { CartaProps } from '../../app/api/carta/create-carta'
import { CartaPageTemplate } from './CartaPageTemplate'

export function PrintableTemplate(values: CartaProps) {
  return (
    <div className="h-0 overflow-hidden">
      <div className="w-full">
        <CartaPageTemplate data={values} />
      </div>
    </div>
  )
}
