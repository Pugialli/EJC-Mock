import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { CarrosSummary } from '@/app/api/carro/get-carros-summary'
import { Pagination } from '@/components/Table/Pagination'
import { PaginationSkeleton } from '@/components/Table/PaginationSkeleton'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { CarrosTableFilters } from './carros-table-filters'
import { CarrosTableRow } from './carros-table-row'
import { CarrosTableSkeleton } from './carros-table-skeleton'

interface SearchProps {
  pageIndex: number
  motoristaName: string | null
  ultimoEncontro: string | null
  responsavelExterna: string | null
}

async function getCarro({
  pageIndex,
  motoristaName,
  ultimoEncontro,
  responsavelExterna,
}: SearchProps) {
  const nameSearch = motoristaName ? `name=${motoristaName}&` : ''
  const encontroSearch = ultimoEncontro ? `encontro=${ultimoEncontro}&` : ''
  const externaSearch = responsavelExterna
    ? `idExterna=${responsavelExterna}&`
    : ''

  const path = `/carro?${nameSearch}${encontroSearch}${externaSearch}page=${pageIndex}`

  const response: CarrosSummary = await api
    .get(path)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export function CarrosTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const motoristaName = searchParams.get('motoristaName')
  const ultimoEncontro = searchParams.get('ultimoEncontro')
  const responsavelExterna = searchParams.get('responsavelExterna')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingEncontrista } =
    useQuery<CarrosSummary>({
      queryKey: [
        'carros',
        { pageIndex, motoristaName, ultimoEncontro, responsavelExterna },
      ],
      queryFn: () =>
        getCarro({
          pageIndex,
          motoristaName,
          ultimoEncontro,
          responsavelExterna,
        }),
    })

  function handlePaginate(pageIndex: number) {
    const newSearch = new URLSearchParams()
    if (motoristaName)
      newSearch.append('motoristaName', motoristaName.toString())

    if (ultimoEncontro)
      newSearch.append('ultimoEncontro', ultimoEncontro.toString())

    if (responsavelExterna)
      newSearch.append('responsavelExterna', responsavelExterna.toString())

    newSearch.append('page', (pageIndex + 1).toString())
    router.push(`${pathname}?${newSearch}`)
  }

  return (
    <>
      <div className="flex flex-col gap-4 py-1">
        <CarrosTableFilters />
        <div className="bg-transparent">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="px-2">
                <TableHead className="w-7 text-nowrap rounded-tl-xl pl-4">
                  Última externa
                </TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Vagas</TableHead>
                <TableHead className="w-7 lg:w-[178px]">Responsável</TableHead>
                <TableHead className="w-7 rounded-tr-xl lg:w-16">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-transparent">
              {isLoadingEncontrista && <CarrosTableSkeleton />}
              {result &&
                result.carros.map((carro) => {
                  return <CarrosTableRow key={carro.id} carro={carro} />
                })}
            </TableBody>
            <TableFooter>
              {isLoadingEncontrista && <PaginationSkeleton totalCol={9} />}
              {result && (
                <Pagination
                  pageIndex={result.pageIndex}
                  totalCount={result.totalCount}
                  perPage={result.perPage}
                  onPageChange={handlePaginate}
                  totalCol={9}
                />
              )}
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  )
}
