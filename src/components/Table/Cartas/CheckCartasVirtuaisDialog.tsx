'use client'

import type { EncontristaIdentification } from '@/app/api/encontrista/identification/[slug]/get-identification'
import type { Carta } from '@/app/api/export/carta/[slug]/get-encontrista-cartas'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { textEllipsis } from '@/utils/ellipsis-text'
import { Button } from '../../ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'

interface CheckCartasVirtuaisDialogProps {
  cartas: Carta[]
  encontrista: EncontristaIdentification
}

export async function changeCartaStatus(cartaId: string) {
  // await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000))

  return await api.patch(`/carta/${cartaId}`)
}

export function CheckCartasVirtuaisDialog({
  cartas,
  encontrista,
}: CheckCartasVirtuaisDialogProps) {
  // const [isUpdating, setIsUpdating] = useState(false)

  // async function handleUpdateStatus(idCarta: string) {
  //   setIsUpdating(true)
  //   await changeCartaStatus(idCarta)
  //   setIsUpdating(false)
  // }

  console.log(encontrista)

  return (
    <>
      <DialogHeader>
        <DialogTitle>Cartas Virtuais de João Paulo</DialogTitle>
        <DialogDescription>
          Marque as cartas que já foram impressas e adicionadas aos sacos de
          choro.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Enviada</TableHead>
              <TableHead>De</TableHead>
              <TableHead>Conteudo</TableHead>
              <TableHead>Impressa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartas.map((carta, index) => (
              <TableRow key={index}>
                <TableCell>12/05/2024</TableCell>
                <TableCell>{carta.de}</TableCell>
                <TableCell className="text-nowrap">
                  {textEllipsis(carta.conteudo, 20)}
                </TableCell>
                <TableCell>{carta.isPrinted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogFooter>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </>
  )
}
