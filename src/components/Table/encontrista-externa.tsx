import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface EncontristaExternaProps {
  idResponsavel: string
}

function getResponsavel(idResponsavel: string) {
  console.log(idResponsavel)
  return {
    avatar_url:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
    nome: 'João Paulo',
  }
}

export function EncontristaExterna({ idResponsavel }: EncontristaExternaProps) {
  const responsavel = getResponsavel(idResponsavel)
  return (
    <div className="flex items-center gap-2">
      {responsavel && (
        <>
          <Avatar className="h-9 w-9">
            <AvatarImage src={responsavel.avatar_url} />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground font-medium">
            {responsavel.nome}
          </span>
        </>
      )}
    </div>
  )
}
