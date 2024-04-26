import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { EncontristaTableFilters } from './encontristas-table-filters'
import { Encontrista, EncontristaTableRow } from './encontristas-table-row'
import { EncontristaTableSkeleton } from './encontristas-table-skeleton'

async function getEncontrista() {
  const response = await api
    .get('encontrista')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export function EncontristasTable() {
  // const [searchParams, setSearchParams] = useSearchParams()

  // const orderId = searchParams.get('orderId')
  // const customerName = searchParams.get('customerName')
  // const status = searchParams.get('status')

  // const pageIndex = z.coerce
  //   .number()
  //   .transform((page) => page - 1)
  //   .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingEncontrista } = useQuery<
    Encontrista[]
  >({
    queryKey: ['encontristas'],
    queryFn: () => getEncontrista(),
  })

  // const { data: result, isLoading: isLoadingOrders } = useQuery({
  //   queryKey: ['encontristas', pageIndex, orderId, customerName, status],
  //   queryFn: () => getEncontrista(),
  //   {
  //   pageIndex,
  //   orderId,
  //   customerName,
  //   status: status === 'all' ? null : status,
  // }
  // })

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-7 rounded-tl-xl lg:w-14">
                    Inscrito
                  </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-7 lg:w-14">Status</TableHead>
                  <TableHead className="w-7 lg:w-14">Bairro</TableHead>
                  <TableHead className="w-7 lg:w-14">Celular</TableHead>
                  <TableHead className="w-7 lg:w-14">Responsável</TableHead>
                  <TableHead className="w-7 lg:w-20">Observações</TableHead>
                  <TableHead className="w-7 rounded-tr-xl lg:w-14">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-transparent">
                {isLoadingEncontrista && <EncontristaTableSkeleton />}
                {result &&
                  result.map((encontrista) => {
                    return (
                      <EncontristaTableRow
                        key={encontrista.id_pessoa}
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
