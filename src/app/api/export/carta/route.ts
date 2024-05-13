import { formatDate } from 'date-fns'
import type { NextRequest } from 'next/server'
import { useReactToPrint } from 'react-to-print'

export async function GET(request: NextRequest) {
  const date = formatDate(new Date(), 'dd_MM_yyyy_HH_mm')

  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Cartas de ${values.idEncontrista}`,
    bodyClass: 'p-16', // some padding
  })

  try {
    const cartas = await getAllCartas()

    return new Response(cartas, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="encontristas_${date}.xlsx"`,
        'Content-Type': 'application/vnd.ms-excel',
      },
    })
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      return new Response(e.message, {
        status: 400,
      })
    }
  }
}
