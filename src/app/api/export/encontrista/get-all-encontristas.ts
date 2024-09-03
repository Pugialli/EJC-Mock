import { prisma } from '@/lib/prisma'

export async function getAllEncontristas() {
  const encontristas = await prisma.pessoa.findMany({
    select: {
      createdAt: true,
      nome: true,
      sobrenome: true,
      apelido: true,
      celular: true,
      telefone: true,
      email: true,
      endereco: {
        select: {
          cep: true,
          estado: true,
          cidade: true,
          bairro: true,
          rua: true,
        },
      },
      encontreiro: {
        select: {
          dataNasc: true,
          instagram: true,
          restricaoAlimentar: true,
          idTamanhoCamisa: true,
        },
      },
      encontrista: {
        select: {
          idStatus: true,
          idReligiao: true,
          isAutofill: true,
          endNumero: true,
          endComplemento: true,
          idMoracom: true,
          idStatusPais: true,
          movimentoAnterior: true,
          observacao: true,
          nomeContato1: true,
          telContato1: true,
          parentescoContato1: true,
          nomeContato2: true,
          telContato2: true,
          parentescoContato2: true,
          indicadoPorNome: true,
          indicadoPorApelido: true,
          indicadoPorTel: true,
          indicadoPorEmail: true,
        },
      },
    },
    where: {
      role: 'ENCONTRISTA',
      encontrista: {
        NOT: {
          OR: [{ idStatus: 'delete' }, { idStatus: 'desistiu' }],
        },
      },
    },
  })

  const parsedData = encontristas.map((encontrista) => {
    return {
      createdAt: encontrista.createdAt,
      nome: encontrista.nome,
      sobrenome: encontrista.sobrenome,
      apelido: encontrista.apelido,
      celular: encontrista.celular,
      telefone: encontrista.telefone,
      email: encontrista.email,
      cep: encontrista.endereco.cep,
      estado: encontrista.endereco.estado,
      cidade: encontrista.endereco.cidade,
      bairro: encontrista.endereco.bairro,
      rua: encontrista.endereco.rua,
      dataNasc: encontrista.encontreiro!.dataNasc,
      instagram: encontrista.encontreiro?.instagram,
      restricaoAlimentar: encontrista.encontreiro?.restricaoAlimentar,
      idTamanhoCamisa: encontrista.encontreiro?.idTamanhoCamisa,
      idStatus: encontrista.encontrista?.idStatus,
      idReligiao: encontrista.encontrista?.idReligiao,
      isAutofill: encontrista.encontrista?.isAutofill,
      endNumero: encontrista.encontrista?.endNumero,
      endComplemento: encontrista.encontrista?.endComplemento,
      idMoracom: encontrista.encontrista?.idMoracom,
      idStatusPais: encontrista.encontrista?.idStatusPais,
      movimentoAnterior: encontrista.encontrista?.movimentoAnterior,
      observacao: encontrista.encontrista?.observacao,
      nomeContato1: encontrista.encontrista?.nomeContato1,
      telContato1: encontrista.encontrista?.telContato1,
      parentescoContato1: encontrista.encontrista?.parentescoContato1,
      nomeContato2: encontrista.encontrista?.nomeContato2,
      telContato2: encontrista.encontrista?.telContato2,
      parentescoContato2: encontrista.encontrista?.parentescoContato2,
      indicadoPorNome: encontrista.encontrista?.indicadoPorNome,
      indicadoPorApelido: encontrista.encontrista?.indicadoPorApelido,
      indicadoPorTel: encontrista.encontrista?.indicadoPorTel,
      indicadoPorEmail: encontrista.encontrista?.indicadoPorEmail,
    }
  })
  return parsedData
}
