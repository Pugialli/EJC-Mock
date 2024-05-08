import type { EditFormDataInput } from '@/app/admin/externa/[id]/edit/EditEncontristaForm'
import { updateEndereco } from '@/app/api/endereco/[cep]/update/update-endereco'
import { prisma } from '@/lib/prisma'

async function getBairroEncontro(bairro: string) {
  const bairroID = await prisma.domainBairroEncontro.findFirst({
    where: {
      bairro,
    },
  })

  if (!bairroID) {
    return 'nao_encontrado'
  }

  return bairroID.value
}

export async function updateEncontrista(data: EditFormDataInput) {
  const enderecoProps = {
    cep: data.cep,
    bairro: data.bairro,
    rua: data.rua,
  }

  await updateEndereco(enderecoProps)

  const bairroValue = await getBairroEncontro(data.bairro)

  return await prisma.$transaction([
    prisma.pessoa.update({
      data: {
        nome: data.nome,
        sobrenome: data.sobrenome,
        apelido: data.apelido,
        enderecoCep: data.cep,
        celular: data.celular,
        telefone: data.telefone,
        email: data.email,
      },
      where: {
        id: data.id,
      },
    }),

    prisma.encontrista.update({
      data: {
        idReligiao: data.religiao,
        isAutofill: data.paraVoce === 'sim',
        endNumero: data.numero,
        endComplemento: data.complemento,
        idBairroEncontro: bairroValue,
        idMoracom: data.moraCom,
        idStatusPais: data.statusPais,
        movimentoAnterior: data.nomeMovimento,
        observacao: data.observacoes,
        nomeContato1: data.nomeFamiliar,
        telContato1: data.telFamiliar,
        parentescoContato1: data.parentescoFamiliar,
        nomeContato2: data.nomeFamiliar2,
        telContato2: data.telFamiliar2,
        parentescoContato2: data.parentescoFamiliar2,
        indicadoPorNome: data.indicadoPorNome,
        indicadoPorApelido: data.indicadoApelido,
        indicadoPorTel: data.indicadoTelefone,
        indicadoPorEmail: data.indicadoEmail,
      },
      where: {
        idPessoa: data.id,
      },
    }),

    prisma.encontreiro.update({
      data: {
        nascimento: data.dataNascimento,
        instagram: data.instagram,
        restricaoAlimentar: data.restricoesAlimentares,
        idTamanhoCamisa: data.tamanhoCamisa,
      },
      where: {
        idPessoa: data.id,
      },
    }),
  ])
}
