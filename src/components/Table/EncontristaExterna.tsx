import type { EncontristaSummary } from '@/app/api/encontrista/get-encontristas-summary'
import type { MembroExterna } from '@/app/api/encontro/[numeroEncontro]/externa/get-equipe-externa'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItemAvatar } from './SelectItemAvatar'

interface EncontristaExternaProps {
  idExterna: string | null
  idEncontrista: string
  equipe: MembroExterna[] | undefined
}

interface EncontristaResponsavelProps {
  encontristaId: string
  responsavelId: string
}

export async function changeResponsavel({
  encontristaId,
  responsavelId,
}: EncontristaResponsavelProps) {
  await api.patch(
    `encontrista/${encontristaId}/change-responsavel/${responsavelId}`,
  )
}

const encontristaResponsavelSchema = z.object({
  idResponsavel: z.string(),
})

type encontristaResponsavelFormInput = z.infer<
  typeof encontristaResponsavelSchema
>

export function EncontristaExterna({
  idExterna,
  idEncontrista,
  equipe,
}: EncontristaExternaProps) {
  const form = useForm<encontristaResponsavelFormInput>({
    resolver: zodResolver(encontristaResponsavelSchema),
  })

  const queryClient = useQueryClient()

  function updateEncontristaStatusOnCache(
    encontristaId: string,
    idResponsavel: string,
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
            return { ...encontrista, idExterna: idResponsavel }
          }
          return encontrista
        }),
      })
    })
  }

  const { mutateAsync: responsavelEncontristaFn } = useMutation({
    mutationFn: changeResponsavel,
    onSuccess: (_, { encontristaId, responsavelId }) => {
      updateEncontristaStatusOnCache(encontristaId, responsavelId)
    },
  })

  function handleChangeResponsavel(
    selectData: encontristaResponsavelFormInput,
  ) {
    responsavelEncontristaFn({
      encontristaId: idEncontrista,
      responsavelId: selectData.idResponsavel,
    })
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(handleChangeResponsavel)}
        className="flex items-center gap-2"
      >
        <FormField
          control={form.control}
          name="idResponsavel"
          defaultValue={idExterna || ''}
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
                      {equipe &&
                        equipe.map((membroExterna) => {
                          return (
                            <SelectItemAvatar
                              key={membroExterna.id}
                              name={membroExterna.name}
                              id={membroExterna.id}
                              avatarFallback={membroExterna.avatarFallback}
                              avatarUrl={membroExterna.avatarUrl}
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
