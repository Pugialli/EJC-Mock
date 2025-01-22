import { TableCell, TableRow } from '@/components/ui/table'
interface EmptyTableRowProps {
  colspan: number
  content: string
}

export function EmptyTableRow({ colspan, content }: EmptyTableRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colspan}
        className="bg-primary/5 text-center text-zinc-500"
      >
        {content}
      </TableCell>
    </TableRow>
  )
}
