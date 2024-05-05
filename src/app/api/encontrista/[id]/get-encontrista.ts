import { prisma } from '@/lib/prisma'
import type {
  Value_MoraCom as enumMoraCom,
  Value_Religiao as enumReligiao,
  Value_Status as enumStatus,
  Value_StatusPais as enumStatusPais,
  Value_TamanhoCamisa as enumTamanhoCamisa,
} from '@prisma/client'

export type EncontristaData = {
  id: string
  createdAt: Date
  pessoa: {
    nome: string
    sobrenome: string
    apelido: string | null
    celular: string
    telefone: string | null
    email: string
    idStatus: enumStatus
    idReligiao: enumReligiao
    isAutofill: boolean
    movimentoAnterior: string | null
    observacao: string | null
    nascimento: string
    instagram: string | null
    restricaoAlimentar: string | null
    idTamanhoCamisa: enumTamanhoCamisa | null
  }
  endereco: {
    cep: string
    estado: string
    cidade: string
    bairro: string
    rua: string
    numero: string
    complemento: string
    idBairroEncontro: string
  }
  familia: {
    idMoracom: enumMoraCom
    idStatusPais: enumStatusPais
    nomeContato1: string
    telContato1: string
    parentescoContato1: string
    nomeContato2: string | null
    telContato2: string | null
    parentescoContato2: string | null
  }
  indicacao: {
    indicadoPorNome: string | null
    indicadoPorApelido: string | null
    indicadoPorTel: string | null
    indicadoPorEmail: string | null
  }
}

export async function getEncontrista(id: string) {
  const encontrista = await prisma.pessoa.findFirst({
    select: {
      id: true,
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
      encontrista: {
        select: {
          idStatus: true,
          idReligiao: true,
          isAutofill: true,
          endNumero: true,
          endComplemento: true,
          idBairroEncontro: true,
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
      encontreiro: {
        select: {
          nascimento: true,
          instagram: true,
          restricaoAlimentar: true,
          idTamanhoCamisa: true,
        },
      },
    },
    where: {
      encontrista: {
        idPessoa: id,
      },
    },
  })

  if (!encontrista) {
    return null
  }
  const encontristaResponse: EncontristaData = {
    id: encontrista.id,
    createdAt: encontrista.createdAt,
    pessoa: {
      nome: encontrista.nome,
      sobrenome: encontrista.sobrenome,
      apelido: encontrista.apelido,
      celular: encontrista.celular,
      telefone: encontrista.telefone,
      email: encontrista.email,
      idStatus: encontrista.encontrista!.idStatus,
      idReligiao: encontrista.encontrista!.idReligiao,
      isAutofill: encontrista.encontrista!.isAutofill,
      movimentoAnterior: encontrista.encontrista!.movimentoAnterior,
      observacao: encontrista.encontrista!.observacao,
      nascimento: encontrista.encontreiro!.nascimento,
      instagram: encontrista.encontreiro!.instagram,
      restricaoAlimentar: encontrista.encontreiro!.restricaoAlimentar,
      idTamanhoCamisa: encontrista.encontreiro!.idTamanhoCamisa,
    },
    endereco: {
      cep: encontrista.endereco.cep,
      estado: encontrista.endereco.estado,
      cidade: encontrista.endereco.cidade,
      bairro: encontrista.endereco.bairro,
      rua: encontrista.endereco.rua,
      numero: encontrista.encontrista!.endNumero,
      complemento: encontrista.encontrista!.endComplemento,
      idBairroEncontro: encontrista.encontrista!.idBairroEncontro,
    },
    familia: {
      idMoracom: encontrista.encontrista!.idMoracom,
      idStatusPais: encontrista.encontrista!.idStatusPais,
      nomeContato1: encontrista.encontrista!.nomeContato1,
      telContato1: encontrista.encontrista!.telContato1,
      parentescoContato1: encontrista.encontrista!.parentescoContato1,
      nomeContato2: encontrista.encontrista!.nomeContato2,
      telContato2: encontrista.encontrista!.telContato2,
      parentescoContato2: encontrista.encontrista!.parentescoContato2,
    },
    indicacao: {
      indicadoPorNome: encontrista.encontrista!.indicadoPorNome,
      indicadoPorApelido: encontrista.encontrista!.indicadoPorApelido,
      indicadoPorTel: encontrista.encontrista!.indicadoPorTel,
      indicadoPorEmail: encontrista.encontrista!.indicadoPorEmail,
    },
  }

  return encontristaResponse
}
