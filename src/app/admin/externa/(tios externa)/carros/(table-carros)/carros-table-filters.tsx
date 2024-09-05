import { Search, SearchX } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { getEquipeExterna } from '@/app/api/encontro/[numeroEncontro]/externa/get-equipe-externa'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import { SelectItem } from '@/components/Form/SelectInput/SelectItem'
import type { SelectItemAvatarProps } from '@/components/Table/SelectItemAvatar'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { SearchInput } from '@/components/ui/search-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

const carrosFiltersSchema = z.object({
  motoristaName: z.string().optional(),
  ultimoEncontro: z.string().optional(),
  responsavelExterna: z.string().optional(),
})

type carrosFiltersFormInput = z.infer<typeof carrosFiltersSchema>

export function CarrosTableFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchedMotoristaName = searchParams.get('motoristaName')
  const searchedUltimoEncontro = searchParams.get('ultimoEncontro')
  const searchedResponsavelExterna = searchParams.get('responsavelExterna')

  const form = useForm<carrosFiltersFormInput>({
    resolver: zodResolver(carrosFiltersSchema),
    defaultValues: {
      motoristaName: searchedMotoristaName ?? '',
      ultimoEncontro: searchedUltimoEncontro ?? 'all',
      responsavelExterna: searchedResponsavelExterna ?? 'all',
    },
  })

  const { handleSubmit, control, reset } = form

  const { data: equipeExterna } = useQuery<SelectItemAvatarProps[]>({
    queryFn: async () => await getEquipeExterna(),
    queryKey: ['equipeExterna'],
  })

  async function handleFilter({
    motoristaName,
    ultimoEncontro,
    responsavelExterna,
  }: carrosFiltersFormInput) {
    const newSearch = new URLSearchParams()

    if (motoristaName) {
      newSearch.append('motoristaName', motoristaName.toString())
    } else {
      newSearch.delete('motoristaName')
    }

    if (ultimoEncontro && ultimoEncontro !== 'all') {
      newSearch.append('ultimoEncontro', ultimoEncontro.toString())
    } else {
      newSearch.delete('ultimoEncontro')
    }

    if (responsavelExterna && responsavelExterna !== 'all') {
      newSearch.append('responsavelExterna', responsavelExterna)
    } else {
      newSearch.delete('responsavelExterna')
    }

    newSearch.append('page', '1')

    router.push(`${pathname}?${newSearch.toString()}`)
  }

  function handleClearFilters() {
    const newSearch = new URLSearchParams()
    newSearch.delete('motoristaName')
    newSearch.delete('ultimoEncontro')
    newSearch.delete('responsavelExterna')
    newSearch.append('page', '1')
    reset()
    router.push(`${pathname}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center gap-2"
      >
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center">
          <FormField
            control={control}
            name="motoristaName"
            render={({ field }) => (
              <SearchInput
                className="h-5 w-fit"
                placeholder="Nome do motorista..."
                {...field}
              />
            )}
          />
          <FormField
            control={control}
            name="ultimoEncontro"
            defaultValue="all"
            render={({ field }) => {
              return (
                <div className="lg:w-96">
                  <SelectGroupInput
                    onChange={field.onChange}
                    value={field.value}
                  >
                    <SelectItem value="all" text="Todos encontros" />
                    <SelectItem value="72" text="72" />
                    <SelectItem value="71" text="71" />
                    <SelectItem value="70" text="70" />
                  </SelectGroupInput>
                </div>
              )
            }}
          />

          <FormField
            control={control}
            name="responsavelExterna"
            defaultValue="all"
            render={({ field }) => {
              return (
                <div className="lg:w-100">
                  <SelectGroupInput
                    onChange={field.onChange}
                    value={field.value}
                  >
                    <SelectItem
                      key="all"
                      value="all"
                      text="Todos Responsáveis"
                    />
                    {equipeExterna &&
                      equipeExterna.map((membroExterna) => {
                        return (
                          <SelectItem
                            key={membroExterna.id}
                            value={membroExterna.id}
                            text={membroExterna.name}
                          />
                        )
                      })}
                  </SelectGroupInput>
                </div>
              )
            }}
          />
          <div className="flex justify-between gap-2 py-2 lg:w-96 ">
            <Button type="submit" variant="secondary">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
            <Button
              onClick={handleClearFilters}
              type="button"
              variant="destructive"
            >
              <SearchX className="mr-2 h-4 w-4" />
              Limpar busca
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
