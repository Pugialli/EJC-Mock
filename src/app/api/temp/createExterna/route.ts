import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import type { Value_TamanhoCamisa as valueTamanhoCamisa } from '@prisma/client'
import { hash } from 'bcryptjs'
import externa from './externa.json'

const data = [
  {
    index: 1,
  },
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
]

interface Externa {
  nome: string
  sobrenome: string
  apelido: string
  enderecoCep: string
  celular: string
  email: string
  password: string
  avatarUrl: string
  nascimento: string
  instagram: string
  restricaoAlimentar: string
  idTamanhoCamisa: valueTamanhoCamisa
}

async function createEquipeExterna() {
  const created = await Promise.all(
    data.map(async (data): Promise<number> => {
      const thisPessoa: Externa = externa[data.index]
      // console.log(thisPessoa)
      const saltedPassword = await hash(thisPessoa.password!, 8)

      const pessoa = await prisma.pessoa.create({
        data: {
          nome: thisPessoa.nome,
          sobrenome: thisPessoa.sobrenome,
          apelido: thisPessoa.apelido,
          enderecoCep: thisPessoa.enderecoCep,
          celular: thisPessoa.celular,
          email: thisPessoa.email,
          password: saltedPassword,
          avatarUrl: thisPessoa.avatarUrl,
          role: 'EXTERNA',
        },
      })

      await prisma.encontreiro.create({
        data: {
          idPessoa: pessoa.id,
          nascimento: thisPessoa.nascimento,
          instagram: thisPessoa.instagram,
          restricaoAlimentar: thisPessoa.restricaoAlimentar,
          idTamanhoCamisa: thisPessoa.idTamanhoCamisa,
        },
      })
      return 1
    }),
  )

  return created.length
}

export async function GET() {
  await prisma.endereco.createMany({
    data: [
      {
        cep: '22271-080',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Humaitá',
        rua: 'Rua Macedo Sobrinho',
      },
      {
        cep: '22780-230',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jacarepaguá',
        rua: 'Rua Carmo do Cajuru',
      },
      {
        cep: '22451-264',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Gávea',
        rua: 'Estrada da Gávea',
      },
    ],
  })

  const externaCriado = await createEquipeExterna()

  return NextResponse.json({ externaCriado })
}
