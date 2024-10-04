import { Skeleton } from '@/components/ui/skeleton'

export function PendenciasSkeleton() {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 px-4">
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="col-span-1 px-4">
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  )
}
