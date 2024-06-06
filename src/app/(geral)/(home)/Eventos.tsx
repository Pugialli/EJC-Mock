'use client'

import espiritualidade from '@/assets/AtividadeEspiritual.png'
import caridade from '@/assets/Caridade.png'
import festas from '@/assets/Festas.png'
import { Church, Heart, PartyPopper } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  CardCarouselContent,
  type CardCarouselContentProps,
} from '../../../components/Carousel/CardCarouselContent'
import {
  CardCarouselTrigger,
  type CardInfo,
} from '../../../components/Carousel/CardCarouselTrigger'

const cardsTrigger: CardInfo[] = [
  {
    title: 'Atividades Espirituais',
    content: 'Diversas atividades espirituais opcionais durante o ano todo',
    icon: Church,
  },
  {
    title: 'Ações Beneficentes',
    content:
      'Arrecadações, eventos e campanhas de caridade para famílias e instituições',
    icon: Heart,
  },
  {
    title: 'Eventos Sociais',
    content:
      'Não há encontro de jovens sem música, amigos, comida e confraternização',
    icon: PartyPopper,
  },
]

const cardsContent: CardCarouselContentProps[] = [
  {
    imageSrc: espiritualidade,
    aditionalInfo: {
      title:
        'Nosso objetivo é criar momentos para vivenciar e compartilhar nossa fé',
      content:
        'Durante o ano, realizamos diversas atividades e dinâmicas que nos ajudam a aprender e crescer espiritualmente, como: terço, adoração, retiro, novena, leitura orante e muitas outras.',
    },
  },
  {
    imageSrc: caridade,
    aditionalInfo: {
      title: 'Como dizia São Luis Orione: “Só a caridade salvará o mundo”',
      content:
        'Entendendo a importância desse lema, organizamos muitas ações durante o ano com o intuito de ser instrumentos de Deus para nossa comunidade. Realizamos bazares, torneios, arrecadações de alimentos para instituições carentes, campanhas em datas festivas e nos dedicamos para dar toda atenção e carinho aos nossos queridos idosos residentes da Casa de Betânia.',
    },
  },
  {
    imageSrc: festas,
    aditionalInfo: {
      title:
        'Como jovens, temos compromisso com a seriedade, mas também com a diversão!',
      content:
        'Ao longo do ano, nossa agenda tem vários eventos como: churrascos, peças de teatro, festas, campeonatos, viagens, arraiás e até bingo com os idosos. Não há encontro de jovens sem música, amigos, comida e confraternização.',
    },
  },
]

export function Eventos() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const updateState = () => {
      if (selectedIndex === 2) {
        setSelectedIndex(0)
      } else {
        setSelectedIndex((prevCount) => prevCount + 1)
      }
    }

    intervalRef.current = setInterval(updateState, 10000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [selectedIndex])

  function renderCard() {
    const selectedCard = cardsContent.filter(
      (_, index) => index === selectedIndex,
    )
    return (
      <CardCarouselContent
        imageSrc={selectedCard[0].imageSrc}
        aditionalInfo={selectedCard[0].aditionalInfo}
      />
    )
  }
  return (
    <section className=" bg-white">
      <div className="flex -translate-y-10 flex-col gap-8 px-8 lg:-translate-y-32 lg:px-16">
        <div className="flex justify-center gap-2 lg:gap-8">
          {cardsTrigger.map((cardTrigger, index) => {
            return (
              <CardCarouselTrigger
                key={index}
                title={cardTrigger.title}
                content={cardTrigger.content}
                icon={cardTrigger.icon}
                selectedIndex={selectedIndex}
                index={index}
                setIndex={setSelectedIndex}
              />
            )
          })}
        </div>
        <div>{renderCard()}</div>
      </div>
    </section>
  )
}
