import type { EditFormDataInput } from '@/app/admin/externa/[slug]/edit/EditEncontristaForm'
import { updateEndereco } from '@/app/api/endereco/[cep]/update/update-endereco'
import { prisma } from '@/lib/prisma'
import { stringToDate } from '@/utils/string-to-date'

export async function updateEncontrista(data: EditFormDataInput) {
  const foundUser = await prisma.pessoa.findUnique({
    where: {
      id: data.id,
    },
  })

  if (!foundUser) {
    return null
  }

  const enderecoProps = {
    cep: data.cep,
    bairro: data.bairro,
    rua: data.rua,
  }

  const enderecoEncontroProps = {
    cep: data.cepEncontro,
    bairro: data.bairroEncontro,
    rua: data.ruaEncontro,
  }

  await updateEndereco(enderecoProps)
  await updateEndereco(enderecoEncontroProps)

  const dataNascimento = stringToDate(data.dataNascimento)

  return await prisma.pessoa.update({
    where: { id: foundUser.id },
    data: {
      nome: data.nome,
      sobrenome: data.sobrenome,
      apelido: data.apelido,
      enderecoCep: data.cep,
      celular: data.celular,
      telefone: data.telefone,
      email: data.email,
      encontrista: {
        update: {
          idReligiao: data.religiao,
          isAutofill: data.paraVoce === 'sim',
          endNumero: data.numero,
          endComplemento: data.complemento,
          cepEncontro: data.cepEncontro,
          endNumEncontro: data.numeroEncontro,
          endComplementoEncontro: data.complementoEncontro,
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
          obsExternaLocalizacao: data.obsExternaLocalizacao,
          obsExternaSaude: data.obsExternaSaude,
          obsExternaConhecidos: data.obsExternaConhecidos,
          obsExternaOutros: data.obsExternaOutros,
        },
      },
      encontreiro: {
        update: {
          dataNasc: dataNascimento,
          instagram: data.instagram,
          restricaoAlimentar: data.restricoesAlimentares,
          idTamanhoCamisa: data.tamanhoCamisa,
        },
      },
    },
  })
}
