import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface DeleteProps {
  idEncontrista: string
  nomeEncontrista: string
}

export async function softDelete(encontristaId: string) {
  return await api.patch(`/encontrista/${encontristaId}/delete`)
}

export function DeleteDialog({ idEncontrista, nomeEncontrista }: DeleteProps) {
  const queryClient = useQueryClient()

  async function handleDelete() {
    await softDelete(idEncontrista)
    queryClient.refetchQueries()
  }
  return (
    <DialogContent className="w-80">
      <DialogHeader className="flex flex-col gap-2">
        <DialogTitle>Atenção!</DialogTitle>
        <DialogDescription className="flex flex-col gap-4">
          <span>
            Tem certeza que deseja deletar a conta de{' '}
            <span className="font-bold">{nomeEncontrista}</span>?
          </span>
          <div className="flex w-full justify-between">
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleDelete} variant="destructive">
                Deletar
              </Button>
            </DialogClose>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}
