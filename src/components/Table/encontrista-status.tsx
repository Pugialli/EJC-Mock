import { cn } from '@/lib/utils'

export type EncontristaStatus =
  | 'confirmado'
  | 'confirmado_sem_sexta'
  | 'desistiu'
  | 'ligar'
  | 'lista_espera'
  | 'nao_atende'
  | 'prox_encontro'
  | 'vai_pensar'

interface EncontristaStatusProps {
  status: EncontristaStatus
}

type EncontristaStatusInfo = {
  value: string
  color: string
}

export const encontristaStatusMap: Record<
  EncontristaStatus,
  EncontristaStatusInfo
> = {
  confirmado: { value: 'Confirmado', color: 'bg-slate-500' },
  confirmado_sem_sexta: {
    value: 'Confirmado sem sexta',
    color: 'bg-slate-500',
  },
  desistiu: { value: 'Desistiu', color: 'bg-slate-500' },
  ligar: { value: 'Ligar', color: 'bg-slate-500' },
  lista_espera: { value: 'Lista de Espera', color: 'bg-slate-500' },
  nao_atende: { value: 'Não Atende', color: 'bg-slate-500' },
  prox_encontro: { value: 'Próximo Encontrão', color: 'bg-slate-500' },
  vai_pensar: { value: 'Vai Pensar', color: 'bg-slate-500' },
}

export function EncontristaStatus({ status }: EncontristaStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status && (
        <>
          <span
            role="status"
            aria-label={encontristaStatusMap[status].value}
            className={cn(
              'h-2 w-2 rounded-full',
              encontristaStatusMap[status].color,
            )}
          />
          <span className="text-muted-foreground font-medium">
            {encontristaStatusMap[status].value}
          </span>
        </>
      )}
    </div>
  )
}
