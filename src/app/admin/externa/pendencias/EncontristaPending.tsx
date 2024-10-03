import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSign, Mails, Users } from "lucide-react";

export interface EncontristaProps { }

export function EncontristaPending(props: EncontristaProps) {
  type Cores = {
    label: string
    value: string
  }

  const coresMap: Cores[] = [
    { label: 'Amarelo', value: 'bg-yellow-400 text-yellow-400' },
    { label: 'Azul', value: 'bg-blue-400 text-blue-400' },
    { label: 'Laranja', value: 'bg-orange-400 text-orange-400' },
    { label: 'Verde', value: 'bg-emerald-400 text-emerald-400' },
    { label: 'Vermelho', value: 'bg-red-400 text-red-400' },
    { label: 'Undefined', value: 'bg-zinc-400 text-zinc-400' },
  ]
  const cor =
    // encontrista.corCirculo !== null
    //   ? coresMap.filter((cor) => cor.label === encontrista.corCirculo)
    //   : 
    coresMap.filter((cor) => cor.label === 'Undefined')

  return (
    <Card className="bg-primary/5 border-0">
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center gap-2">
          <div className={cn('h-4 w-4 rounded-md', cor[0].value)} />
          <span>João Paulo Pugialli</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-tertiary border rounded-full p-2">
            <Users className={cn('h-4 w-4')} />
          </div>
          <div className="border-tertiary border rounded-full p-2">
            <DollarSign className={cn('h-4 w-4')} />
          </div>
          <div className="border-tertiary border rounded-full p-2">
            <Mails className={cn('h-4 w-4')} />
          </div>
        </div>
      </div>
    </Card>
  )
}