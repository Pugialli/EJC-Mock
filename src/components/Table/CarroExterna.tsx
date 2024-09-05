'use client'

import type { CarrosSummary } from '@/app/api/carro/get-carros-summary'
import type { MembroExterna } from '@/app/api/encontro/[numeroEncontro]/externa/get-equipe-externa'
import type { ExternaInfo } from '@/app/api/pessoa/externa/[idExterna]/get-previous-externa-info'
import { api } from '@/lib/axios'
import { getInitials } from '@/utils/get-initials'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItemAvatar } from './SelectItemAvatar'

interface CarroExternaProps {
  idExterna: string | null
  idCarro: string
  equipe: MembroExterna[] | undefined
  disabled: boolean
}

interface CarroResponsavelProps {
  carroId: string
  responsavelId: string
}

export async function changeResponsavel({
  carroId,
  responsavelId,
}: CarroResponsavelProps) {
  await api.patch(`/carro/${carroId}/change-responsavel/${responsavelId}`)
}

const carroResponsavelSchema = z.object({
  idResponsavel: z.string(),
})

type carroResponsavelFormInput = z.infer<typeof carroResponsavelSchema>

async function getPreviousExterna(idExterna: string | null) {
  const res: ExternaInfo = await api
    .get(`/pessoa/externa/${idExterna}`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return res
}

export function CarroExterna({
  idExterna,
  idCarro,
  equipe,
  disabled,
}: CarroExternaProps) {
  const form = useForm<carroResponsavelFormInput>({
    resolver: zodResolver(carroResponsavelSchema),
  })

  const { data: oldExterna } = useQuery<ExternaInfo>({
    queryFn: async () => await getPreviousExterna(idExterna),
    queryKey: ['equipeExterna', idExterna],
  })

  const avatarUrl =
    oldExterna && oldExterna.avatarUrl ? oldExterna.avatarUrl : undefined
  const avatarFallback = oldExterna ? getInitials(oldExterna.nome) : null
  const nomeExterna = oldExterna ? oldExterna.nome : null

  const queryClient = useQueryClient()

  function updateEncontristaStatusOnCache(
    carroId: string,
    idResponsavel: string,
  ) {
    const carroListCache = queryClient.getQueriesData<CarrosSummary>({
      queryKey: ['carros'],
    })

    carroListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<CarrosSummary>(cacheKey, {
        ...cacheData,
        carros: cacheData.carros.map((carro) => {
          if (carro.id === carroId) {
            return { ...carro, idExterna: idResponsavel }
          }
          return carro
        }),
      })
    })
  }

  const { mutateAsync: responsavelEncontristaFn } = useMutation({
    mutationFn: changeResponsavel,
    onSuccess: (_, { carroId, responsavelId }) => {
      updateEncontristaStatusOnCache(carroId, responsavelId)
    },
  })

  function handleChangeResponsavel(selectData: carroResponsavelFormInput) {
    responsavelEncontristaFn({
      carroId: idCarro,
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
                {!disabled ? (
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
                ) : (
                  <div className="flex w-full items-center gap-2 px-8">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-zinc-300">
                        {avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-nowrap text-tertiary">
                      {nomeExterna}
                    </span>
                  </div>
                )}
              </div>
            )
          }}
        />
      </form>
    </Form>
  )
}
