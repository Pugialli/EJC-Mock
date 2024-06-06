'use client'

import carro from '@/assets/Carro.png'
import onibus from '@/assets/Onibus.png'
import ape from '@/assets/Pe.png'
import { BusFront, CarFront, Footprints } from 'lucide-react'
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
    title: 'Vem de ônibus?',
    content:
      'A melhor opção é a linha 409. Mas várias linhas deixam próximo, inclusive o metrô de superfície.',
    icon: BusFront,
  },
  {
    title: 'Vem de carro?',
    content: 'Temos estacionamento dentro do colégio para os jovens!',
    icon: CarFront,
  },
  {
    title: 'Ou a pé?',
    content:
      'Estamos pertinho do Parque Jardim Botânico. Aproveite, é um ótimo passeio!',
    icon: Footprints,
  },
]

const cardsContent: CardCarouselContentProps[] = [
  {
    imageSrc: onibus,
    type: 'mapa',
  },
  {
    imageSrc: carro,
    type: 'mapa',
  },
  {
    imageSrc: ape,
    type: 'mapa',
  },
]

export function Mapa() {
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
        type={selectedCard[0].type}
      />
    )
  }
  return (
    <div className="flex flex-col justify-center gap-8 bg-white px-4 py-16 text-center lg:gap-16 lg:px-20 lg:py-32">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-extrabold lg:text-5xl">
          Bem facil de chegar!
        </h2>
        <span className="text-sm text-tertiary lg:text-xl">
          Rua Lopes Quintas, 274 - Jardim Botânico
        </span>
      </div>
      <div className="flex flex-col gap-4">
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
        <div className="">{renderCard()}</div>
      </div>
    </div>
  )
}
