import { prisma } from '@/lib/prisma'

export type TioDeExternaData = {
  id: string
  nome: string
  sobrenome: string
  apelido: string
  celular: string
  telefone: string
  email: string
  enderecoCep: string
  enderecoNumero: number
}

export async function getTioExterna(id: string) {
  return await prisma.pessoa.findFirst({
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      apelido: true,
      celular: true,
      telefone: true,
      email: true,
      enderecoCep: true,
      enderecoNumero: true,
    },
    where: {
      id,
    },
  })
}
