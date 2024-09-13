import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type {
  EncontristaSummary,
  EncontristaSummaryData,
} from '@/app/api/encontrista/get-encontristas-summary'
import { Pagination } from '@/components/Table/Pagination'
import { PaginationSkeleton } from '@/components/Table/PaginationSkeleton'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { compareAsc } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { TiosExternaTableFilters } from './tios-externa-table-filters'
import { TiosExternaTableRow } from './tios-externa-table-row'
import { TiosExternaTableSkeleton } from './tios-externa-table-skeleton'

interface SearchProps {
  pageIndex: number
  encontristaName: string | null
  encontristaStatus: string | null
  responsavelExterna: string | null
}

function compareDate(a: EncontristaSummaryData, b: EncontristaSummaryData) {
  return compareAsc(a.createdAt, b.createdAt)
}

async function getEncontrista({
  pageIndex,
  encontristaName,
  encontristaStatus,
  responsavelExterna,
}: SearchProps) {
  const nameSearch = encontristaName ? `name=${encontristaName}&` : ''
  const statusSearch = encontristaStatus ? `status=${encontristaStatus}&` : ''
  const externaSearch = responsavelExterna
    ? `idExterna=${responsavelExterna}&`
    : ''

  const path = `encontrista?${nameSearch}${statusSearch}${externaSearch}page=${pageIndex}`

  const response: EncontristaSummary = await api
    .get(path)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  response.encontristas.sort(compareDate)
  return response
}

export function TiosExternaTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const encontristaName = searchParams.get('encontristaName')
  const encontristaStatus = searchParams.get('encontristaStatus')
  const responsavelExterna = searchParams.get('responsavelExterna')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingEncontrista } =
    useQuery<EncontristaSummary>({
      queryKey: [
        'encontristas',
        { pageIndex, encontristaName, encontristaStatus, responsavelExterna },
      ],
      queryFn: () =>
        getEncontrista({
          pageIndex,
          encontristaName,
          encontristaStatus,
          responsavelExterna,
        }),
    })

  function handlePaginate(pageIndex: number) {
    const newSearch = new URLSearchParams()
    if (encontristaName)
      newSearch.append('encontristaName', encontristaName.toString())

    if (encontristaStatus)
      newSearch.append('encontristaStatus', encontristaStatus.toString())

    if (responsavelExterna)
      newSearch.append('responsavelExterna', responsavelExterna.toString())

    newSearch.append('page', (pageIndex + 1).toString())
    router.push(`${pathname}?${newSearch}`)
  }

  return (
    <>
      <div className="flex flex-col gap-4 py-1">
        <TiosExternaTableFilters />
        <div className="bg-transparent">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="px-2">
                <TableHead className="w-7 text-nowrap rounded-tl-xl pl-4 lg:w-[73px]">
                  Última externa
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="w-7 rounded-tr-xl lg:w-16">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-transparent">
              {isLoadingEncontrista && <TiosExternaTableSkeleton />}
              {result &&
                result.encontristas.map((encontrista) => {
                  return (
                    <TiosExternaTableRow
                      key={encontrista.id}
                      encontrista={encontrista}
                    />
                  )
                })}
            </TableBody>
            <TableFooter>
              {isLoadingEncontrista && <PaginationSkeleton totalCol={8} />}
              {result && (
                <Pagination
                  pageIndex={result.pageIndex}
                  totalCount={result.totalCount}
                  perPage={result.perPage}
                  onPageChange={handlePaginate}
                  totalCol={8}
                />
              )}
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  )
}
