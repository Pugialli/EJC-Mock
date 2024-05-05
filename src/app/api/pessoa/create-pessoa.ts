import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export interface PessoaProps {
  nome: string
  sobrenome: string
  enderecoCep: string
  celular: string
  email: string
  telefone?: string
  password?: string
  avatarUrl?: string
}

export async function createPessoa({
  nome,
  sobrenome,
  enderecoCep,
  celular,
  email,
  telefone,
  password,
  avatarUrl,
}: PessoaProps) {
  const saltedPassword = password ? await hash(password, 8) : ''

  const pessoa = await prisma.pessoa.create({
    data: {
      nome,
      sobrenome,
      email,
      celular,
      telefone,
      enderecoCep,
      avatarUrl,
      password: saltedPassword,
    },
  })

  return pessoa
}
