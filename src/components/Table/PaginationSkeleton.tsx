import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

export function PaginationSkeleton() {
  return (
    <TableRow>
      <TableCell colSpan={4} className="rounded-bl-xl">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell colSpan={4} className="rounded-br-xl">
        <Skeleton className="h-4 w-full" />
      </TableCell>
    </TableRow>
  )
}
