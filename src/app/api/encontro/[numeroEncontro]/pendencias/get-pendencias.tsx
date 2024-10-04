import { prisma } from '@/lib/prisma'
import { getCurrentEncontro } from '../get-current-encontro/get-current-encontro'

export interface TioExterna {
  nome: string
  tipo: 'Motorista' | 'Carona'
}

export interface EncontristaPendencias {
  id: string
  corCirculo: string | undefined
  nome: string
  cartasOk: boolean
  generosaOk: boolean
  familiaOk: boolean
}

export interface CarroPendencias {
  id: string
  motorista: TioExterna
  carona?: TioExterna
  observacao: string
  responsavelExterna: string
  encontristas: EncontristaPendencias[]
}

export async function getPendencias() {
  const encontro = await getCurrentEncontro()

  if (!encontro) return null

  const carros = await prisma.carroEncontro.findMany({
    select: {
      id: true,
      carro: {
        select: {
          observacaoMotorista: true,
          pessoaMotorista: {
            select: {
              apelido: true,
            },
          },
          pessoaCarona: {
            select: {
              apelido: true,
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
      encontrista: {
        select: {
          cartasOk: true,
          generosaOk: true,
          familiaOk: true,
          pessoa: {
            select: {
              id: true,
              nome: true,
              sobrenome: true,
              encontreiro: {
                select: {
                  circulo: {
                    select: {
                      corCirculo: {
                        select: {
                          cor: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        orderBy: {
          pessoa: {
            nome: 'asc',
          },
        },
      },
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

  const response: CarroPendencias[] = carros.map((carro) => {
    const carona: TioExterna | undefined = carro.carro.pessoaCarona
      ? {
          nome: carro.carro.pessoaCarona.apelido!,
          tipo: 'Carona',
        }
      : undefined

    const encontristas: EncontristaPendencias[] = carro.encontrista.map(
      (encontrista) => {
        return {
          id: encontrista.pessoa.id,
          corCirculo: encontrista.pessoa.encontreiro?.circulo?.corCirculo.cor,
          nome: encontrista.pessoa.nome + ' ' + encontrista.pessoa.sobrenome,
          cartasOk: encontrista.cartasOk,
          generosaOk: encontrista.generosaOk,
          familiaOk: encontrista.familiaOk,
        }
      },
    )

    return {
      id: carro.id,
      motorista: {
        nome: carro.carro.pessoaMotorista.apelido!,
        tipo: 'Motorista',
      },
      carona,
      observacao: carro.carro.observacaoMotorista,
      responsavelExterna: carro.externa?.pessoa?.apelido || '',
      encontristas,
    }
  })

  return response
}
