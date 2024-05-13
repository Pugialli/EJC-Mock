import { Download } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface PrintCartasEncontrista {
  encontristaSlug: string
}

export function PrintCartasEncontrista({
  encontristaSlug,
}: PrintCartasEncontrista) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link href={`/admin/externa/cartas/${encontristaSlug}`} target="_blank">
          <Button variant="ghost" className="p-0">
            <Download className="h-4 w-4 text-tertiary" />
          </Button>
        </Link>
        <TooltipContent className="w-32 text-center">
          Baixar cartas virtuais
        </TooltipContent>
      </TooltipTrigger>
    </Tooltip>
    // <div>
    //   <Button
    //     onClick={() => {
    //       handlePrint()
    //     }}
    //     className="flex gap-2 py-6"
    //   >
    //     <FileTextIcon className="size-4" /> Gerar PDF
    //   </Button>
    //   <PrintableTemplate values={values} />
    // </div>
  )
}
