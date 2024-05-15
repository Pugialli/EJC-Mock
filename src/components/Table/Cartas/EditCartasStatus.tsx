import type { EncontristaIdentification } from '@/app/api/encontrista/identification/[slug]/get-identification'
import type { Carta } from '@/app/api/export/carta/[slug]/get-encontrista-cartas'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Mails } from 'lucide-react'
import { Button } from '../../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { CheckCartasVirtuaisDialog } from './CheckCartasVirtuaisDialog'

interface EditCartasStatusProps {
  cartas: Carta[]
  encontrista: EncontristaIdentification
}

export function EditCartasStatus({
  cartas,
  encontrista,
}: EditCartasStatusProps) {
  const hasCartas = cartas.length === 0

  return (
    <Tooltip>
      <Dialog>
        <TooltipTrigger>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 disabled:cursor-auto disabled:opacity-20"
              disabled={hasCartas}
            >
              <Mails className="h-4 w-4 text-tertiary" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <DialogContent className="h-4/5 w-4/5 overflow-y-scroll scroll-smooth p-8 lg:w-screen">
          <CheckCartasVirtuaisDialog
            cartas={cartas}
            encontrista={encontrista}
          />
        </DialogContent>
      </Dialog>

      <TooltipContent className="w-32 text-center">
        Editar cartas impressas
      </TooltipContent>
    </Tooltip>
  )
}
