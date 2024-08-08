import { prisma } from '@/lib/prisma'

export interface TioExterna {
  nome: string
  tipo: 'Motorista' | 'Carona'
}

export interface CarroFromEncontro {
  id: string
  numero: number
  lugaresCarro: number
  observacao: string
  bairro: string
  zona: string | null
  motorista: TioExterna
  carona?: TioExterna
  responsavelExterna: string
}

export async function getCarros() {
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      numeroEncontro: 'desc',
    },
  })
  if (!encontro) {
    return null
  }

  const carros = await prisma.carroEncontro.findMany({
    select: {
      id: true,
      carro: {
        select: {
          lugaresCarro: true,
          observacaoMotorista: true,
          pessoaMotorista: {
            select: {
              apelido: true,
              endereco: {
                select: {
                  bairro: true,
                },
              },
            },
          },
          pessoaCarona: {
            select: {
              apelido: true,
              endereco: {
                select: {
                  bairro: true,
                },
              },
            },
          },
        },
      },
      externa: {
        select: {
          pessoa: {
            select: {
              apelido: true,
            },
          },
        },
      },
      numeroCarro: true,
    },
    where: {
      idEncontro: encontro.id,
    },
    orderBy: {
      numeroCarro: 'asc',
    },
  })

  if (!carros) {
    return null
  }
  const carrosWithZona = await Promise.all(
    carros.map(async (carro) => {
      const zonaBairro = await prisma.domainBairroEncontro.findFirst({
        where: {
          bairro: carro.carro.pessoaMotorista.endereco.bairro,
        },
      })
      return {
        zona: zonaBairro?.zona || null,
        ...carro,
      }
    }),
  )
  const response: CarroFromEncontro[] = carrosWithZona.map((carro) => {
    const carona: TioExterna | undefined = carro.carro.pessoaCarona
      ? {
          nome: carro.carro.pessoaCarona.apelido!,
          tipo: 'Carona',
        }
      : undefined

    return {
      id: carro.id,
      numero: carro.numeroCarro,
      lugaresCarro: carro.carro.lugaresCarro,
      observacao: carro.carro.observacaoMotorista,
      bairro: carro.carro.pessoaMotorista.endereco.bairro,
      zona: carro.zona,
      motorista: {
        nome: carro.carro.pessoaMotorista.apelido!,
        tipo: 'Motorista',
      },
      carona,
      responsavelExterna: carro.externa?.pessoa?.apelido || '',
    }
  })

  return response
}
