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
import { textEllipsis } from '@/utils/ellipsis-text'
import { DialogContent } from '@radix-ui/react-dialog'
import { formatDate } from 'date-fns'
import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog'
import { CartaCheckbox } from './CartaCheckbox'

interface CheckCartasVirtuaisDialogProps {
  cartas: Carta[]
  encontrista: EncontristaIdentification
}

export function CheckCartasVirtuaisDialog({
  cartas,
  encontrista,
}: CheckCartasVirtuaisDialogProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Cartas Virtuais de {encontrista.nome} {encontrista.sobrenome}
        </DialogTitle>
        <DialogDescription>
          Marque as cartas que já foram impressas e adicionadas ao saco de
          choro.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        {/* <div className="relative max-h-96 overflow-y-auto"> */}
        <Table className="text-xs">
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>Enviada</TableHead>
              <TableHead>De</TableHead>
              <TableHead>Conteudo</TableHead>
              <TableHead className="text-center">Impressa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartas.map((carta) => {
              const dataEnvio = formatDate(
                new Date(carta.createdAt),
                'dd/MM/yy',
              )
              return (
                <TableRow key={carta.id}>
                  <TableCell>{dataEnvio}</TableCell>
                  <TableCell>{carta.de}</TableCell>
                  <TableCell className="text-nowrap">
                    {textEllipsis(carta.conteudo, 15)}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <CartaCheckbox
                      id={carta.id}
                      slug={encontrista.slug}
                      status={carta.isPrinted}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {/* </div> */}
      </DialogContent>
      {/* <DialogFooter>
        <Button type="submit" disabled={isUpdating}>
          Salvar
        </Button>
      </DialogFooter> */}
    </>
  )
}
