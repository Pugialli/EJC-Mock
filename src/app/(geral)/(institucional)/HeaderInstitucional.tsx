import espiritualidade from '@/assets/Espiritualidade.png'
import movimento from '@/assets/Movimento.png'
import paroquia from '@/assets/Paroquia.png'
import Image from 'next/image'
import type { ReactNode } from 'react'

export interface HeaderInstitucionalProps {
  title: string
  children: ReactNode
}

export function HeaderInstitucional({
  title,
  children,
}: HeaderInstitucionalProps) {
  return (
    <div className="-mt-56 flex justify-center lg:-mt-institucional">
      <div
        className="flex w-full flex-col gap-8 text-center lg:w-1/2 lg:gap-16
      "
      >
        <h1 className="text-3xl font-extrabold text-violet-50 lg:text-5xl">
          {title}
        </h1>
        {title === 'Espiritualidade' ? (
          <Image
            src={espiritualidade}
            alt="Igreja com barcos de papel e velas indo ao altar"
          />
        ) : title === 'O Movimento' ? (
          <Image
            src={movimento}
            alt="Jovens depois da finalização de um de nossos Encontrões"
          />
        ) : (
          <Image src={paroquia} alt="Igreja pelo lado de fora" />
        )}
        <div className="flex flex-col gap-8 text-pretty px-6 text-start text-base lg:px-20 lg:text-xl">
          {children}
        </div>
      </div>
    </div>
  )
}
