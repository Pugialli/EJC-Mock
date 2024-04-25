import {
  AddressFormData,
  FamilyFormData,
  NominationFormData,
  OtherFormData,
  PersonalFormData,
} from '@/context/CreateEncontristaContext'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export interface CreateEncontristaData {
  personal: PersonalFormData
  address: AddressFormData
  family: FamilyFormData
  nomination: NominationFormData
  other: OtherFormData
}

async function createCEP(addressData: AddressFormData) {
  const foundEndereco = await prisma.endereco.findFirst({
    where: {
      cep: addressData.cep,
    },
  })

  if (foundEndereco) {
    return foundEndereco
  }
  const endereco = await prisma.endereco.create({
    data: {
      cep: addressData.cep,
      bairro: addressData.bairro,
      cidade: addressData.cidade,
      estado: addressData.estado,
      rua: addressData.rua,
    },
  })
  return endereco
}

async function getBairroEncontro(addressData: AddressFormData) {
  if (addressData.bairroDuranteOEncontro !== undefined)
    return addressData.bairroDuranteOEncontro

  const bairroID = await prisma.domainBairroEncontro.findFirst({
    where: {
      bairro: addressData.bairro,
    },
  })

  if (!bairroID) {
    return 'jardim_botanico'
  }

  return bairroID.value
}

export async function POST(request: NextRequest) {
  const {
    personal,
    address,
    family,
    nomination,
    other,
  }: CreateEncontristaData = await request.json()

  const endereco = await createCEP(address)

  if (!endereco) {
    return NextResponse.json('Erro ao criar o endereço', { status: 500 })
  }

  const pessoa = await prisma.pessoa.create({
    data: {
      nome: personal.nome,
      sobrenome: personal.sobrenome,
      apelido: personal.apelido,
      endereco_cep: endereco.cep,
      celular: personal.celular,
      telefone: personal.telefone,
      email: personal.email,
    },
  })

  if (!pessoa) {
    return NextResponse.json('Erro ao criar a pessoa', { status: 500 })
  }

  const bairroEncontro = await getBairroEncontro(address)

  const encontrista = await prisma.encontrista.create({
    data: {
      id_pessoa: pessoa.id,
      id_status: 'ligar',
      id_religiao: personal.religiao,
      is_autofill: personal.paraVoce === 'sim',
      end_numero: address.numero,
      end_complemento: address.complemento,
      id_bairro_encontro: bairroEncontro,
      id_moracom: family.moraCom,
      id_statusPais: family.statusPais,
      movimento_anterior: other.nomeMovimento,
      observacao: other.observacoes,
      nome_contato1: family.nomeFamiliar,
      tel_contato1: family.telFamiliar,
      parentesco_contato1: family.parentescoFamiliar,
      nome_contato2: family.nomeFamiliar2,
      tel_contato2: family.telFamiliar2,
      parentesco_contato2: family.parentescoFamiliar2,
      indicado_por_nome: nomination.indicadoPorNome,
      indicado_por_apelido: nomination.indicadoApelido,
      indicado_por_tel: nomination.indicadoTelefone,
      indicado_por_email: nomination.indicadoEmail,
    },
  })

  if (!encontrista) {
    prisma.pessoa.delete({
      where: {
        id: pessoa.id,
      },
    })
    return NextResponse.json('Erro ao criar o encontrista', { status: 500 })
  }

  const encontreiro = await prisma.encontreiro.create({
    data: {
      id_pessoa: pessoa.id,
      nascimento: personal.dataNascimento,
      instagram: personal.instagram,
      restricao_alimentar: other.restricoesAlimentares,
      id_tamanho_camisa: other.tamanhoCamisa,
    },
  })

  if (!encontreiro) {
    prisma.pessoa.delete({
      where: {
        id: pessoa.id,
      },
    })
    prisma.encontrista.delete({
      where: {
        id_pessoa: encontrista.id_pessoa,
      },
    })
    return NextResponse.json('Erro ao criar o encontreiro', { status: 500 })
  }

  return NextResponse.json(pessoa, { status: 201 })
}
