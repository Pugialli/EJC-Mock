import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

export interface PaginationSkeletonProps {
  totalCol: number
}

export function PaginationSkeleton({ totalCol }: PaginationSkeletonProps) {
  const spanLeft = totalCol / 2
  const spanRight = totalCol / 2 + (totalCol % 2)

  return (
    <TableRow>
      <TableCell colSpan={spanLeft} className="rounded-bl-xl">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell colSpan={spanRight} className="rounded-br-xl">
        <Skeleton className="h-4 w-full" />
      </TableCell>
    </TableRow>
  )
}
