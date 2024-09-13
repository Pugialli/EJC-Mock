import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useState, type Dispatch, type SetStateAction } from 'react'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

interface DeleteProps {
  idCarro: string
  nomeMotorista: string
  placaCarro: string
  openFn: Dispatch<SetStateAction<boolean>>
}

export async function carroDelete(carroId: string) {
  // await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000))

  return await api.delete(`carro/${carroId}/delete`)
}

export function DeleteCarroDialog({
  idCarro,
  nomeMotorista,
  placaCarro,
  openFn,
}: DeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  async function handleDelete() {
    setIsDeleting(true)
    await carroDelete(idCarro).then(async () => {
      await queryClient.refetchQueries()
      setIsDeleting(false)
    })
  }
  return (
    <AlertDialogContent className="w-80">
      <AlertDialogHeader className="flex flex-col gap-2">
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-4">
          <span>
            Tem certeza que deseja deletar o carro ({placaCarro}) de{' '}
            <span className="font-bold">{nomeMotorista}</span>?
          </span>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="disabled:cursor-wait disabled:opacity-50"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            className="disabled:cursor-wait disabled:opacity-50"
            onClick={(event) => {
              handleDelete().then(() => openFn(false))
              event.preventDefault()
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}
