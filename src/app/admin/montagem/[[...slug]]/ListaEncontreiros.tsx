import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CardEncontreiroAtivo } from './CardEncontreiroAtivo'

const encontreirosAtivos = [
  {
    slug: 'joaopugialli-56',
    avatarURL:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
    nome: 'João Paulo Pugialli',
    encontro: '56',
    equipe: 'nao_participara',
  },
  {
    slug: 'camilanboecker-66',
    avatarURL:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900086/people/444_t2tpkh.jpg',
    nome: 'Camila Nogaroli',
    encontro: '66',
    equipe: '',
  },
  {
    slug: 'hugo-galvao-rj-66',
    avatarURL:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900068/people/442_ygbvrr.jpg',
    nome: 'Hugo Santos',
    encontro: '66',
    equipe: 'ordem',
  },
  {
    slug: 'kevin-maycon-ke-60',
    avatarURL:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900068/people/319_oiufat.jpg',
    nome: 'Kevin Maycon',
    encontro: '64',
    equipe: '',
  },
  {
    slug: 'lucas-zirretta-66',
    avatarURL:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900074/people/314_tsbp7a.jpg',
    nome: 'Lucas Zirretta',
    encontro: '66',
    equipe: 'banda',
  },
  {
    slug: 'osvaldolopees1997-63',
    avatarURL:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/v1713900077/people/441_vhpjpk.jpg',
    nome: 'Osvaldo Lopes (Divo)',
    encontro: '63',
    equipe: 'teatro',
  },
  {
    slug: 'joaopugialli-7',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-8',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-9',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-10',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-11',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-12',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-13',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-14',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-15',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-16',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-17',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-18',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-19',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
  {
    slug: 'joaopugialli-20',
    avatarURL: '',
    nome: 'Fulano',
    encontro: '45',
    equipe: '',
  },
]

interface ListaEncontreirosProps {
  activeCard: string
}

export function ListaEncontreiros({ activeCard }: ListaEncontreirosProps) {
  return (
    <div className="p-4">
      <Card className="flex flex-col gap-8 p-4 text-zinc-700 shadow-lg">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold">Encontreiros</h2>
          <span className="font-medium">3/20</span>
        </div>

        <ScrollArea className="lg:h-[46rem]">
          <div className="flex flex-col gap-4 pl-8 pr-4">
            {encontreirosAtivos.map((encontreiro) => {
              const selected = encontreiro.slug === activeCard
              return (
                <CardEncontreiroAtivo
                  key={encontreiro.slug}
                  encontreiro={encontreiro}
                  isSelected={selected}
                />
              )
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}
