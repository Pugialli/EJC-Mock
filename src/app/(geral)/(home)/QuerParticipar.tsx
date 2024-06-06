import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function QuerParticipar() {
  return (
    <div className="bg-white px-4 py-16 lg:px-20 lg:py-32">
      <div className="flex flex-col gap-6 text-tertiary lg:w-5/12 lg:gap-8">
        <h2 className="text-3xl font-extrabold lg:text-5xl">
          Curtiu e quer fazer parte do EJC?
        </h2>
        <span className="text-base lg:text-lg">
          Clique para participar e venha viver uma experiência inesquecível com
          a gente.
        </span>
        <Link href="/participe" className="pt-4">
          <Button className="text-base font-medium lg:text-lg">
            Quero Participar
          </Button>
        </Link>
      </div>
    </div>
  )
}
