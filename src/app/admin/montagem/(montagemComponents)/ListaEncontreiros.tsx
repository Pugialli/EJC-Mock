import type { EncontreiroSummary } from '@/app/api/montagem/summary/[encontro]/get-encontreiros-summary'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { CardEncontreiroAtivo } from './CardEncontreiroAtivo'

interface ListaEncontreirosProps {
  encontreirosSummary: EncontreiroSummary | undefined
  activeCard: string
  setSlug: (slug: string) => void
}

export function ListaEncontreiros({
  encontreirosSummary,
  activeCard,
  setSlug,
}: ListaEncontreirosProps) {
  return (
    <div className="p-4">
      <Card className="flex flex-col gap-8 p-4 text-zinc-700 shadow-lg">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold">Encontreiros</h2>
          <span className="font-medium">
            {encontreirosSummary && (
              <span>
                {encontreirosSummary.totalAlocado}/{' '}
                {encontreirosSummary.totalAtivo}
              </span>
            )}
          </span>
        </div>

        {encontreirosSummary === undefined ? (
          <Skeleton className="h-[46rem] w-60" />
        ) : (
          <ScrollArea className="lg:h-[46rem]">
            <div className="flex flex-col gap-4 pl-8 pr-4">
              {encontreirosSummary &&
                encontreirosSummary.encontreiro.map((encontreiro) => {
                  const selected = encontreiro.slug === activeCard
                  return (
                    <CardEncontreiroAtivo
                      key={encontreiro.slug}
                      encontreiro={encontreiro}
                      isSelected={selected}
                      setSlug={setSlug}
                    />
                  )
                })}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  )
}
