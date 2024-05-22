import { prisma } from '@/lib/prisma'

// Nome
// Apelido
// Encontrão
// Telefone
// Bairro
// Instagram

export async function getCirculos() {
  const encontristas = await prisma.pessoa.findMany({
    select: {
      nome: true,
      sobrenome: true,
      apelido: true,
      celular: true,
      endereco: {
        select: {
          bairro: true,
        },
      },
      encontreiro: {
        select: {
          instagram: true,
          encontro: {
            select: {
              numeroEncontro: true,
            },
          },
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
    where: {
      role: 'ENCONTRISTA',
      encontrista: {
        OR: [{ idStatus: 'confirmado' }, { idStatus: 'confirmado_sem_sexta' }],
      },
    },
  })

  const parsedData = encontristas.map((encontrista) => {
    return {
      nome: `${encontrista.nome} ${encontrista.sobrenome} `,
      apelido: encontrista.apelido,
      encontrao: encontrista.encontreiro?.encontro?.numeroEncontro || null,
      celular: encontrista.celular,
      bairro: encontrista.endereco.bairro,
      instagram: encontrista.encontreiro?.instagram || null,
      circulo: encontrista.encontreiro?.circulo?.corCirculo.cor || null,
    }
  })

  return parsedData
}
