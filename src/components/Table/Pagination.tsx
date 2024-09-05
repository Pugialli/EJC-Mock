import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { TableCell, TableRow } from '../ui/table'

export interface PaginationProps {
  pageIndex: number
  perPage: number
  totalCount: number
  totalCol: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
  totalCol,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  const firstOnPage = (pageIndex - 1) * perPage + 1
  const lastOnPage =
    pageIndex === pages
      ? firstOnPage - 1 + (totalCount % perPage)
      : firstOnPage - 1 + perPage

  const page = pageIndex - 1

  const spanLeft = totalCol / 2
  const spanRight = totalCol / 2 + (totalCol % 2)

  return (
    <TableRow>
      <TableCell colSpan={spanLeft} className="rounded-bl-xl">
        <span className="text-muted-foreground text-sm">
          {firstOnPage}-{lastOnPage} de {totalCount}
        </span>
      </TableCell>
      <TableCell colSpan={spanRight} className="rounded-br-xl">
        <div className="flex h-10 items-center justify-between">
          <Button
            onClick={() => onPageChange(page - 1)}
            variant="ghost"
            className="flex gap-1 disabled:opacity-50"
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4 text-tertiary" />
            <span className="font-medium text-tertiary">Anterior</span>
          </Button>
          {Array.from({ length: pages }).map((_, i) => {
            return (
              <Button
                key={i}
                onClick={() => onPageChange(i)}
                variant="ghost"
                className="flex gap-1"
                disabled={page === i}
              >
                {page === i ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-zinc-50">
                    <span>{i + 1}</span>
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-200 text-tertiary hover:bg-violet-100">
                    <span>{i + 1}</span>
                  </div>
                )}
              </Button>
            )
          })}

          <Button
            onClick={() => onPageChange(page + 1)}
            variant="ghost"
            className="flex gap-1 disabled:opacity-50"
            disabled={pages <= page + 1}
          >
            <span className="font-medium text-tertiary">Próximo</span>
            <ChevronRight className="h-4 w-4 text-tertiary" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
