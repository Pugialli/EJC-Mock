import {
  AddressFormData,
  FamilyFormData,
  NominationFormData,
  OtherFormData,
  PersonalFormData,
} from '@/context/CreateEncontristaContext'
import { prisma } from '@/lib/prisma'
import { createEndereco } from '../endereco/create-endereco'

export interface CreateEncontristaProps {
  personal: PersonalFormData
  address: AddressFormData
  family: FamilyFormData
  nomination: NominationFormData
  other: OtherFormData
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

export async function createEncontrista({
  personal,
  address,
  family,
  nomination,
  other,
}: CreateEncontristaProps) {
  const enderecoProps = {
    cep: address.cep,
    bairro: address.bairro,
    cidade: address.cidade,
    estado: address.estado,
    rua: address.rua,
  }

  const endereco = await createEndereco(enderecoProps)

  const pessoa = await prisma.pessoa.create({
    data: {
      nome: personal.nome,
      sobrenome: personal.sobrenome,
      apelido: personal.apelido,
      enderecoCep: endereco.cep,
      celular: personal.celular,
      telefone: personal.telefone,
      email: personal.email,
    },
  })

  if (!pessoa) {
    return null
  }

  const bairroEncontro = await getBairroEncontro(address)

  const resultEncontrista = await prisma.$transaction([
    prisma.encontrista.create({
      data: {
        idPessoa: pessoa.id,
        idStatus: 'ligar',
        idReligiao: personal.religiao,
        isAutofill: personal.paraVoce === 'sim',
        endNumero: address.numero,
        endComplemento: address.complemento,
        idBairroEncontro: bairroEncontro,
        idMoracom: family.moraCom,
        idStatusPais: family.statusPais,
        movimentoAnterior: other.nomeMovimento,
        observacao: other.observacoes,
        nomeContato1: family.nomeFamiliar,
        telContato1: family.telFamiliar,
        parentescoContato1: family.parentescoFamiliar,
        nomeContato2: family.nomeFamiliar2,
        telContato2: family.telFamiliar2,
        parentescoContato2: family.parentescoFamiliar2,
        indicadoPorNome: nomination.indicadoPorNome,
        indicadoPorApelido: nomination.indicadoApelido,
        indicadoPorTel: nomination.indicadoTelefone,
        indicadoPorEmail: nomination.indicadoEmail,
      },
    }),
    prisma.encontreiro.create({
      data: {
        idPessoa: pessoa.id,
        nascimento: personal.dataNascimento,
        instagram: personal.instagram,
        restricaoAlimentar: other.restricoesAlimentares,
        idTamanhoCamisa: other.tamanhoCamisa,
      },
    }),
  ])

  if (!resultEncontrista) {
    prisma.pessoa.delete({
      where: {
        id: pessoa.id,
      },
    })
    return null
  }

  return pessoa
}
