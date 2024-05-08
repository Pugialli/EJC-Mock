import type { EncontristaSummary } from '@/app/api/encontrista/get-encontristas-summary'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Value_Status as valueStatus } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

interface changeStatusProps {
  encontristaId: string
  status: valueStatus
}

interface EncontristaStatusProps {
  encontristaId: string
  status: valueStatus
}
export async function changeStatus({
  encontristaId,
  status,
}: changeStatusProps) {
  await api.patch(`/encontrista/${encontristaId}/change-status/${status}`)
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
  encontristaId,
  status,
}: EncontristaStatusProps) {
  const form = useForm<encontristaStatusFormInput>({
    resolver: zodResolver(encontristaStatusSchema),
  })

  const queryClient = useQueryClient()

  function updateEncontristaStatusOnCache(
    encontristaId: string,
    status: valueStatus,
  ) {
    const encontristaListCache = queryClient.getQueriesData<EncontristaSummary>(
      { queryKey: ['encontristas'] },
    )

    encontristaListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<EncontristaSummary>(cacheKey, {
        ...cacheData,
        encontristas: cacheData.encontristas.map((encontrista) => {
          if (encontrista.id === encontristaId) {
            return { ...encontrista, idStatus: status }
          }
          return encontrista
        }),
      })
    })
  }

  const { mutateAsync: statusEncontristaFn } = useMutation({
    mutationFn: changeStatus,
    onSuccess: (_, { encontristaId, status }) => {
      updateEncontristaStatusOnCache(encontristaId, status)
    },
  })

  function handleChangeStatus(selectData: encontristaStatusFormInput) {
    const status = selectData.statusValue as valueStatus
    statusEncontristaFn({ encontristaId, status })
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(handleChangeStatus)}
        className="flex items-center gap-2"
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
    </Form>
  )
}
