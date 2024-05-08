import { Search, SearchX } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { SearchInput } from '@/components/ui/search-input'
import { SelectItem } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

const encontristaFiltersSchema = z.object({
  encontristaName: z.string().optional(),
  encontristaStatus: z.string().optional(),
})

type encontristaFiltersFormInput = z.infer<typeof encontristaFiltersSchema>

export function EncontristaTableFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchedEncontristaName = searchParams.get('encontristaName')
  const searchedEncontristaStatus = searchParams.get('encontristaStatus')

  const form = useForm<encontristaFiltersFormInput>({
    resolver: zodResolver(encontristaFiltersSchema),
    defaultValues: {
      encontristaName: searchedEncontristaName ?? '',
      encontristaStatus: searchedEncontristaStatus ?? 'all',
    },
  })

  const { handleSubmit, control, reset } = form

  async function handleFilter({
    encontristaName,
    encontristaStatus,
  }: encontristaFiltersFormInput) {
    const newSearch = new URLSearchParams()

    if (encontristaName) {
      newSearch.append('encontristaName', encontristaName)
    } else {
      newSearch.delete('encontristaName')
    }

    if (encontristaStatus) {
      newSearch.append('encontristaStatus', encontristaStatus)
    } else {
      newSearch.delete('encontristaStatus')
    }

    newSearch.append('page', '1')

    router.push(`${pathname}?${newSearch.toString()}`)
  }

  function handleClearFilters() {
    const newSearch = new URLSearchParams()
    newSearch.delete('encontristaName')
    newSearch.delete('encontristaStatus')
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
        <FormField
          control={control}
          name="encontristaName"
          render={({ field }) => (
            <SearchInput placeholder="Nome do encontrista..." {...field} />
          )}
        />
        <FormField
          control={control}
          name="encontristaStatus"
          defaultValue="all"
          render={({ field }) => {
            return (
              <div className="w-96 py-2">
                <SelectGroupInput onChange={field.onChange} value={field.value}>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="confirmado">Confirmados</SelectItem>
                  <SelectItem value="desistiu">Desistiu</SelectItem>
                  <SelectItem value="ligar">Ligar</SelectItem>
                  <SelectItem value="lista_espera">Lista de Espera</SelectItem>
                  <SelectItem value="nao_atende">Não atende</SelectItem>
                  <SelectItem value="prox_encontro">
                    Próximo Encontrão
                  </SelectItem>
                  <SelectItem value="vai_pensar">Vai Pensar</SelectItem>
                </SelectGroupInput>
              </div>
            )
          }}
        />

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
      </form>
    </Form>
  )
}
