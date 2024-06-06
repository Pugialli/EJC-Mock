import { Card, CardContent } from '@/components/ui/card'

export interface CardDepoimentoProps {
  content: string
  name: string
  encontro: number
  year: number
  avatarUrl: string
}

export function CardDepoimento({
  content,
  name,
  encontro,
  year,
  avatarUrl,
}: CardDepoimentoProps) {
  return (
    <Card className="bg-transparent">
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <p>{content}</p>
        <span>{avatarUrl}</span>
        <span>{name}</span>
        <span>
          {encontro}º EJC - Membro desde {year}
        </span>
      </CardContent>
    </Card>
  )
}
