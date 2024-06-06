import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface DepoimentoItemProps {
  text: string
  sourcePicture: string
  name: string
  encontro: string
  since: string
}

export function DepoimentoItem({
  text,
  sourcePicture,
  name,
  encontro,
  since,
}: DepoimentoItemProps) {
  const avatarFallback = name.split(' ')[0][0] + name.split(' ')[1][0]
  return (
    <div className="flex h-96 w-auto flex-col items-center gap-10 rounded-2xl p-8 lg:w-96">
      <p className="min-h-36 items-center text-lg font-normal text-zinc-200">
        {`"${text}"`}
      </p>
      <div className="flex w-full flex-col justify-center gap-4">
        <div className="flex w-full justify-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={sourcePicture} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h5 className="text-xl font-semibold text-violet-100">{name}</h5>
          <p className="text-base font-normal text-violet-200">
            {encontro}ºEJC - Membro desde {since}
          </p>
        </div>
      </div>
    </div>
  )
}
