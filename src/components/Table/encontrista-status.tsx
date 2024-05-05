import { zodResolver } from '@hookform/resolvers/zod'
import type { Value_Status as valueStatus } from '@prisma/client'
import {
  ArrowRightFromLine,
  Check,
  CheckCheck,
  Clock,
  MessageCircleMore,
  Phone,
  PhoneOff,
  X,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItemIcon, type SelectItemIconProps } from './select-item-icon'

interface EncontristaStatusProps {
  status: valueStatus
  idEncontrista: string
}

const encontristaStatusSchema = z.object({
  statusValue: z.string(),
})

type encontristaStatusFormInput = z.infer<typeof encontristaStatusSchema>

const statusData: SelectItemIconProps[] = [
  {
    color: 'text-green-600',
    icon: CheckCheck,
    label: 'Confirmado',
    value: 'confirmado',
  },
  {
    color: 'text-green-600',
    icon: Check,
    label: 'Confirmado sem sexta',
    value: 'confirmado_sem_sexta',
  },
  {
    color: 'text-red-600',
    icon: X,
    label: 'Desistiu',
    value: 'desistiu',
  },
  {
    color: 'text-violet-600',
    icon: Phone,
    label: 'Ligar',
    value: 'ligar',
  },
  {
    color: 'text-amber-400',
    icon: Clock,
    label: 'Lista de espera',
    value: 'lista_espera',
  },
  {
    color: 'text-red-600',
    icon: PhoneOff,
    label: 'Não atende',
    value: 'nao_atende',
  },
  {
    color: 'text-amber-400',
    icon: ArrowRightFromLine,
    label: 'Próximo encontrão',
    value: 'prox_encontro',
  },
  {
    color: 'text-violet-600',
    icon: MessageCircleMore,
    label: 'Vai pensar',
    value: 'vai_pensar',
  },
]

export function EncontristaStatus({
  status,
  idEncontrista,
}: EncontristaStatusProps) {
  const form = useForm<encontristaStatusFormInput>({
    resolver: zodResolver(encontristaStatusSchema),
  })

  function changeStatus(selectData: encontristaStatusFormInput) {
    console.log(selectData.statusValue, idEncontrista)
  }

  return (
    <Form {...form}>
      <form
        // onSubmit={handleSubmit(handleFilter)}
        onChange={form.handleSubmit(changeStatus)}
        className="flex  items-center gap-2"
      >
        <FormField
          control={form.control}
          name="statusValue"
          defaultValue={status}
          render={({ field }) => {
            return (
              <div className="w-full">
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="houtline-none text-xs">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusData.map((statusItem) => {
                        return (
                          <SelectItemIcon
                            key={statusItem.value}
                            color={statusItem.color}
                            icon={statusItem.icon}
                            label={statusItem.label}
                            value={statusItem.value}
                          />
                        )
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
            )
          }}
        />
      </form>
      {/* <span
        role="status"
        aria-label={encontristaStatusMap[status].value}
        className={cn('h-2 w-2 rounded-full', encontristaStatusMap[status])}
      />
      <span className="text-muted-foreground font-medium">
        {encontristaStatusMap[status].value}
      </span> */}
    </Form>
  )
}
