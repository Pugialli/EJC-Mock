import {
  AddressFormData,
  FamilyFormData,
  NominationFormData,
  OtherFormData,
  PersonalFormData,
} from '@/context/CreateEncontristaContext'
import { prisma } from '@/lib/prisma'
import { createSlugForEncontrista } from '@/utils/create-slug'
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
  const encontro = await prisma.encontro.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const numeroEncontro = encontro ? encontro.numeroEncontro : 0

  const enderecoProps = {
    cep: address.cep,
    bairro: address.bairro,
    cidade: address.cidade,
    estado: address.estado,
    rua: address.rua,
  }

  const endereco = await createEndereco(enderecoProps)

  const encontristaSlug = createSlugForEncontrista(
    personal.email,
    numeroEncontro,
  )

  const pessoa = await prisma.pessoa.create({
    data: {
      nome: personal.nome,
      sobrenome: personal.sobrenome,
      apelido: personal.apelido,
      enderecoCep: endereco.cep,
      celular: personal.celular,
      telefone: personal.telefone,
      email: personal.email,
      slug: encontristaSlug,
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
        endNumero: Number(address.numero),
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
        idEncontro: encontro ? encontro.id : null,
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
