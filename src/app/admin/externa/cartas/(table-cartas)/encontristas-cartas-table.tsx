import type {
  CartaSummary,
  CartaSummaryData,
} from '@/app/api/carta/get-cartas-sumary'
import { EmptyTableRow } from '@/components/Table/EmptyTableRow'
import { Pagination } from '@/components/Table/Pagination'
import { PaginationSkeleton } from '@/components/Table/PaginationSkeleton'
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { compareAsc } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { EncontristaCartasTableFilters } from './encontristas-cartas-table-filters'
import { EncontristaCartasTableRow } from './encontristas-cartas-table-row'
import { EncontristaCartasTableSkeleton } from './encontristas-cartas-table-skeleton'

interface SearchProps {
  pageIndex: number
  encontristaName: string | null
}

function compareDate(a: CartaSummaryData, b: CartaSummaryData) {
  return compareAsc(a.nome, b.nome)
}

async function getCartas({ pageIndex, encontristaName }: SearchProps) {
  const nameSearch = encontristaName ? `name=${encontristaName}&` : ''

  const path = `carta?${nameSearch}page=${pageIndex}`

  const response: CartaSummary = await api
    .get(path)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  response.encontristas.sort(compareDate)
  return response
}

export function EncontristasCartasTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const encontristaName = searchParams.get('encontristaName')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: cartaSumary, isLoading: isLoadingEncontrista } =
    useQuery<CartaSummary>({
      queryKey: ['cartasSumary', { pageIndex, encontristaName }],
      queryFn: () => getCartas({ pageIndex, encontristaName }),
    })

  function handlePaginate(pageIndex: number) {
    const newSearch = new URLSearchParams()
    if (encontristaName)
      newSearch.append('encontristaName', encontristaName.toString())

    newSearch.append('page', (pageIndex + 1).toString())
    router.push(`${pathname}?${newSearch}`)
  }

  return (
    <>
      <div className="flex flex-col gap-4 py-1">
        <EncontristaCartasTableFilters />
        <div className="bg-transparent">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="px-2">
                <TableHead className="w-7 rounded-tl-xl lg:w-80">
                  Nome
                </TableHead>
                <TableHead className="w-32 text-center">
                  Cartas físicas
                </TableHead>
                <TableHead className="w-48 text-center">
                  Cartas virtuais impressas
                </TableHead>
                <TableHead className="w-36 text-center">
                  Total de Cartas
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-7 lg:w-[178px]">
                  Tio de Externa
                </TableHead>
                <TableHead className="w-7 rounded-tr-xl text-center">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-transparent">
              {isLoadingEncontrista && <EncontristaCartasTableSkeleton />}
              {cartaSumary &&
                cartaSumary.encontristas.map((encontrista) => {
                  return (
                    <EncontristaCartasTableRow
                      key={encontrista.slug}
                      encontristaCartas={encontrista}
                    />
                  )
                })}
              {cartaSumary &&
                cartaSumary.encontristas.length !== 0 &&
                cartaSumary.encontristas.map((encontrista) => {
                  return (
                    <EncontristaCartasTableRow
                      key={encontrista.slug}
                      encontristaCartas={encontrista}
                    />
                  )
                })}
              {cartaSumary && cartaSumary.encontristas.length === 0 && (
                <EmptyTableRow
                  colspan={7}
                  content="Sem encontristas cadastrados neste encontro"
                />
              )}
            </TableBody>
            <TableFooter>
              {isLoadingEncontrista && <PaginationSkeleton totalCol={7} />}
              {cartaSumary && (
                <Pagination
                  pageIndex={cartaSumary.pageIndex}
                  totalCount={cartaSumary.totalCount}
                  perPage={cartaSumary.perPage}
                  onPageChange={handlePaginate}
                  totalCol={7}
                />
              )}
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  )
}
