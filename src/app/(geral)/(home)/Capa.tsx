import fotoCapa from '@/assets/Capa.png'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function Capa() {
  return (
    <section className="h-full">
      <div className="relative">
        <div className="flex flex-col gap-4 pb-28 pl-4 pt-8 lg:w-title lg:pb-72 lg:pl-16 lg:pt-32">
          <span className="text-xs font-bold text-violet-200 lg:text-2xl">
            EJC-NSDP
          </span>
          <h2 className="text-base font-extrabold text-white lg:text-5xl">
            Venha fazer parte do nosso movimento
          </h2>
          <span className="pb-6 text-sm text-violet-200 lg:text-lg">
            Seja bem-vindo ao Encontro de Jovens com Cristo da paróquia Nossa
            Senhora da Divina Providência.
          </span>
          <Link href="/participe">
            <Button className="text-xs font-medium lg:text-lg">
              Quero Participar
            </Button>
          </Link>
        </div>
        <Image
          src={fotoCapa}
          alt="Jovens do EJC"
          className="absolute bottom-0 right-0 w-2/3 md:w-2/5 lg:h-full lg:w-auto"
        />
      </div>
    </section>
  )
}
