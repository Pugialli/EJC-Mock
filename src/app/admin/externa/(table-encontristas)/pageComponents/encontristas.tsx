import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { EncontristaSummary } from '@/app/api/encontrista/get-encontristas-summary'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { EncontristaTableFilters } from './encontristas-table-filters'
import { EncontristaTableRow } from './encontristas-table-row'
import { EncontristaTableSkeleton } from './encontristas-table-skeleton'

async function getEncontrista(pageIndex: number) {
  const response = await api
    .get(`/encontrista?page=${pageIndex}`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export function EncontristasTable() {
  const searchParams = useSearchParams()

  // const orderId = searchParams.get('orderId')
  // const customerName = searchParams.get('customerName')
  // const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  // const { data: result, isLoading: isLoadingEncontrista } = useQuery<
  //   Encontrista[]
  // >({
  //   queryKey: ['encontristas'],
  //   queryFn: () => getEncontrista(),
  // })

  const { data: result, isLoading: isLoadingEncontrista } =
    useQuery<EncontristaSummary>({
      queryKey: ['encontristas', pageIndex],
      queryFn: () => getEncontrista(pageIndex),
      // {
      // pageIndex
      // orderId,
      // customerName,
      // status: status === 'all' ? null : status,
      // }
    })

  // function handlePaginate(pageIndex: number) {
  //   setSearchParams((state) => {
  //     state.set('page', (pageIndex + 1).toString())

  //     return state
  //   })
  // }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl bg-transparent py-1">
        <div className="space-y-2.5">
          <EncontristaTableFilters />

          <div className="rounded-xl border bg-zinc-100/50 shadow-2xl">
            <Table className="text-xs">
              <TableHeader>
                <TableRow className="px-2">
                  <TableHead className="w-7 text-nowrap rounded-tl-xl pl-4 lg:w-[73px]">
                    Inscrito em
                  </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead className="w-7 lg:w-[178px]">Status</TableHead>
                  <TableHead>Bairro</TableHead>
                  <TableHead>Celular</TableHead>
                  <TableHead className="w-7 lg:w-[178px]">
                    Responsável
                  </TableHead>
                  <TableHead className="w-7 rounded-tr-xl lg:w-16">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-transparent">
                {isLoadingEncontrista && <EncontristaTableSkeleton />}
                {result &&
                  result.encontristas.map((encontrista) => {
                    return (
                      <EncontristaTableRow
                        key={encontrista.id}
                        encontrista={encontrista}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
          {/* 
          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )} */}
        </div>
      </div>
    </>
  )
}
