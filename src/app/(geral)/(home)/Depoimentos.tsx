import { TestimonialsSlider } from '@/components/Testimonials/TestimonialsSlider'
import type { ReactNode } from 'react'
import { DepoimentoItem } from './(pageComponents)/DepoimentoItem'

const depoimentosContent: ReactNode[] = [
  <DepoimentoItem
    key={0}
    text="O EJC mudou minha vida porque eu conheci o Globar, e agora eu como pastel de nutella diariamente."
    sourcePicture=""
    name="Antônio Alves"
    encontro="55"
    since="2014"
  />,
  <DepoimentoItem
    key={1}
    text="O EJC me trouxe amigos que vou levar para a vida inteira, além de experiências incríveis também! Sou muito grata ao movimento <3"
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900085/people/225_iytfia.jpg"
    name="Andressa Correa"
    encontro="62"
    since="2016"
  />,
  <DepoimentoItem
    key={2}
    text="O EJC mudou minha vida porque eu conheci o Antônio que me apresentou o Globar, e agora eu como pastel de nutella diariamente."
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg"
    name="João Paulo Pugialli"
    encontro="56"
    since="2014"
  />,
  <DepoimentoItem
    key={3}
    text="O EJC mudou minha vida porque eu me apaixonei pelo João Paulo que me apresentou o Globar, e agora eu como pastel de nutella diariamente."
    sourcePicture=""
    name="Amanda Padilha"
    encontro="56"
    since="2014"
  />,
]

export function Depoimentos() {
  return (
    <section className="flex flex-col items-center px-10 py-16 lg:px-20 lg:py-32">
      <h2 className="w-9/10 text-center text-lg font-bold text-white lg:w-2/5 lg:text-4xl">
        Um movimento que muda vidas há mais de{' '}
        <span className="text-secondary">30 anos</span>
      </h2>
      <TestimonialsSlider
        content={depoimentosContent}
        autoSlide
        autoSlideInterval={10000}
      />
    </section>
  )
}
