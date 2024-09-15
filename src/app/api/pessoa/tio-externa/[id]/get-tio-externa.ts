import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export type TioDeExternaData = {
  id: string
  role: Role
  nome: string
  sobrenome: string
  apelido: string
  celular: string
  telefone: string
  email: string
  enderecoNumero: number
  endereco: {
    cep: string
    bairro: string
    rua: string
  }
}

export async function getTioExterna(id: string) {
  return await prisma.pessoa.findFirst({
    select: {
      id: true,
      role: true,
      nome: true,
      sobrenome: true,
      apelido: true,
      celular: true,
      telefone: true,
      email: true,
      endereco: {
        select: {
          bairro: true,
          cep: true,
          rua: true,
        },
      },
      enderecoNumero: true,
    },
    where: {
      id,
    },
  })
}
