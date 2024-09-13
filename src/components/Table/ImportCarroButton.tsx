'use client'
import type { ImportCarroProps } from '@/app/api/carro/import-carro/import-carro'
import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { CircleArrowOutUpRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface ImportProps {
  idCarro: string
  observacao: string | null
}

export function ImportCarroButton({ idCarro, observacao }: ImportProps) {
  const [isImporting, setIsImporting] = useState(false)
  const queryClient = useQueryClient()

  async function handleCopyCarro(data: ImportCarroProps) {
    setIsImporting(true)
    const result = await api.post('carro/import-carro', {
      idCarro: data.idCarro,
      observacao: data.observacao,
    })
    if (result.status === 201) {
      await queryClient.refetchQueries()
      toast.success('Carro importado.')
      setIsImporting(false)
    } else {
      setIsImporting(false)
      toast.error('Ouve um erro ao importar este carro.')
    }
  }
  return (
    <Button
      variant="ghost"
      className="p-0 disabled:cursor-wait"
      disabled={isImporting}
      onClick={() =>
        handleCopyCarro({
          idCarro,
          observacao,
        })
      }
    >
      <CircleArrowOutUpRight className="h-4 w-4 text-blue-400 hover:text-blue-500" />
    </Button>
  )
}
