import { TestimonialsSlider } from '@/components/Testimonials/TestimonialsSlider'
import type { ReactNode } from 'react'
import { DepoimentoItem } from './(pageComponents)/DepoimentoItem'

// const depoimentosContent: ReactNode[] = [
//   <DepoimentoItem
//     key={0}
//     text="O EJC me trouxe amigos que vou levar para a vida inteira, além de experiências incríveis também! Sou muito grata ao movimento <3"
//     sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900085/people/225_iytfia.jpg"
//     name="Andressa Correa"
//     encontro="62"
//     since="2017"
//   />,
//   <DepoimentoItem
//     key={1}
//     text="O EJC mudou minha vida porque eu conheci o Globar, e agora eu como pastel de nutella diariamente."
//     sourcePicture=""
//     name="Antônio Alves"
//     encontro="55"
//     since="2014"
//   />,
//   <DepoimentoItem
//     key={2}
//     text="O EJC mudou minha vida porque eu conheci o Antônio que me apresentou o Globar, e agora eu como pastel de nutella diariamente."
//     sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg"
//     name="João Paulo Pugialli"
//     encontro="56"
//     since="2014"
//   />,
//   <DepoimentoItem
//     key={3}
//     text="O EJC mudou minha vida porque eu me apaixonei pelo João Paulo que me apresentou o Globar, e agora eu como pastel de nutella diariamente."
//     sourcePicture=""
//     name="Amanda Padilha"
//     encontro="56"
//     since="2014"
//   />,
// ]

const depoimentosContent: ReactNode[] = [
  <DepoimentoItem
    key={0}
    text="O EJC me trouxe amigos que vou levar para a vida inteira, além de experiências incríveis também! Sou muito grata ao movimento <3"
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900085/people/225_iytfia.jpg"
    name="Andressa Correa"
    encontro="62"
    since="2017"
  />,
  <DepoimentoItem
    key={1}
    text="O EJC mudou minha vida porque conheci pessoas incríveis que me aproximam de Deus e com quem posso dividir a vida fora da igreja também!"
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1717706265/people/Lua_uxogfp.jpg"
    name="Luana Vidal"
    encontro="62"
    since="2016"
  />,
  <DepoimentoItem
    key={2}
    text="Ele foi o meu sorriso o meu amor e a minha vida!"
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1717705923/people/margaret_jwg1n3.jpg"
    name="Ana Margaret Pereira"
    encontro="2"
    since="1987"
  />,
  <DepoimentoItem
    key={3}
    text="O EJC mudou a minha vida, pois trouxe a minha fé de volta e me deu uma linda família! Esse movimento salva vidas."
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900074/people/314_tsbp7a.jpg"
    name="Lucas Zirretta"
    encontro="66"
    since="2019"
  />,
  <DepoimentoItem
    key={4}
    text="O EJC fez mudar a minha perspectiva de vida! Fora que pude conhecer pessoas maravilhosas das quais, hoje em dia, não consigo viver sem!"
    sourcePicture="https://res.cloudinary.com/ejc-nsdp/image/upload/v1717705874/people/barbara_hwu223.jpg"
    name="Bárbara Paiva"
    encontro="62"
    since="2017"
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
