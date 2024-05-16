import { Search, SearchX } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { SearchInput } from '@/components/ui/search-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

const encontristaFiltersSchema = z.object({
  encontristaName: z.string().optional(),
  cartaStatus: z.string().optional(),
})

type encontristaFiltersFormInput = z.infer<typeof encontristaFiltersSchema>

export function EncontristaCartasTableFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchedEncontristaName = searchParams.get('encontristaName')
  const searchedCartaStatus = searchParams.get('cartaStatus')

  const form = useForm<encontristaFiltersFormInput>({
    resolver: zodResolver(encontristaFiltersSchema),
    defaultValues: {
      encontristaName: searchedEncontristaName ?? '',
      cartaStatus: searchedCartaStatus ?? 'all',
    },
  })

  const { handleSubmit, control, reset } = form

  async function handleFilter({
    encontristaName,
    cartaStatus,
  }: encontristaFiltersFormInput) {
    const newSearch = new URLSearchParams()

    if (encontristaName) {
      newSearch.append('encontristaName', encontristaName)
    } else {
      newSearch.delete('encontristaName')
    }

    if (cartaStatus && cartaStatus !== 'all') {
      newSearch.append('encontristaStatus', cartaStatus)
    } else {
      newSearch.delete('encontristaStatus')
    }

    newSearch.append('page', '1')

    router.push(`${pathname}?${newSearch.toString()}`)
  }

  function handleClearFilters() {
    const newSearch = new URLSearchParams()
    newSearch.delete('encontristaName')
    newSearch.delete('cartaStatus')
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
            name="encontristaName"
            render={({ field }) => (
              <SearchInput
                className="h-5 w-fit"
                placeholder="Nome do encontrista..."
                {...field}
              />
            )}
          />
          {/* <FormField
            control={control}
            name="cartaStatus"
            defaultValue="all"
            render={({ field }) => {
              return (
                <div className="lg:w-96">
                  <SelectGroupInput
                    onChange={field.onChange}
                    value={field.value}
                    disabled={true}
                  >
                    <SelectItem value="all" text="Todos status" />
                    <SelectItem value="cartas_ok" text="Cartas Ok" />
                    <SelectItem
                      value="precisa_cartas"
                      text="Precisa de cartas"
                    />
                    <SelectItem value="sem_cartas" text="Sem cartas" />
                  </SelectGroupInput>
                </div>
              )
            }}
          /> */}

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
