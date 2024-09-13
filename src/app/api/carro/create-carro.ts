import type { CarFormData, PersonFormData } from '@/context/NewCarroContext'
import { prisma } from '@/lib/prisma'
import { createSlugForTioExterna } from '@/utils/create-slug'
import { getCurrentEncontro } from '../encontro/[numeroEncontro]/get-current-encontro/get-current-encontro'
import { getNextCarroEncontro } from '../encontro/[numeroEncontro]/get-next-carro-encontro/get-next-carro-encontro'
import { createEndereco } from '../endereco/create-endereco'

export interface CreateCarroProps {
  carro: CarFormData
  motorista: PersonFormData
  carona?: PersonFormData
}

export async function createCarro({
  carro,
  motorista,
  carona,
}: CreateCarroProps) {
  const encontro = await getCurrentEncontro()

  if (!encontro) return null

  let idMotorista = motorista.id

  const numeroEncontro = encontro.numeroEncontro

  const searchedMotorista = await prisma.pessoa.findUnique({
    where: {
      id: motorista.id,
    },
  })

  if (!searchedMotorista) {
    const searchedEnderecoMotorista = await prisma.endereco.findUnique({
      where: {
        cep: motorista.enderecoCep,
      },
    })

    if (!searchedEnderecoMotorista) {
      const motoristaEnderecoProps = {
        cep: motorista.enderecoCep,
        bairro: motorista.bairro,
        cidade: motorista.cidade,
        estado: motorista.estado,
        rua: motorista.rua,
      }
      await createEndereco(motoristaEnderecoProps)
    }

    const motoristaSlug = createSlugForTioExterna(
      motorista.email,
      numeroEncontro,
    )

    const motoristaPessoa = await prisma.pessoa.create({
      data: {
        nome: motorista.nome,
        sobrenome: motorista.sobrenome,
        apelido: motorista.apelido,
        enderecoCep: motorista.enderecoCep,
        celular: motorista.celular,
        telefone: motorista.telefone,
        email: motorista.email,
        enderecoNumero: motorista.enderecoNumero,
        slug: motoristaSlug,
        role: 'TIOEXTERNA',
      },
    })
    if (!motoristaPessoa) {
      return null
    }
    idMotorista = motoristaPessoa.id
  }

  const carroCreated = await prisma.carro.create({
    data: {
      lugaresCarro: carro.lugaresCarro,
      modeloCarro: carro.modeloCarro,
      observacaoMotorista: motorista.observacaoMotorista,
      placaCarro: carro.placaCarro.toUpperCase(),
      idMotorista,
    },
  })

  if (carona && carona.nome !== '') {
    const searchedCarona = await prisma.pessoa.findUnique({
      where: {
        id: carona.id,
      },
    })

    if (!searchedCarona) {
      const searchedEnderecoCarona = await prisma.endereco.findUnique({
        where: {
          cep: carona.enderecoCep,
        },
      })

      if (!searchedEnderecoCarona) {
        const caronaEnderecoProps = {
          cep: carona.enderecoCep,
          bairro: carona.bairro,
          cidade: carona.cidade,
          estado: carona.estado,
          rua: carona.rua,
        }
        await createEndereco(caronaEnderecoProps)
      }
      const caronaSlug = createSlugForTioExterna(carona.email, numeroEncontro)

      const caronaPessoa = await prisma.pessoa.create({
        data: {
          nome: carona.nome,
          sobrenome: carona.sobrenome,
          apelido: carona.apelido,
          enderecoCep: carona.enderecoCep,
          celular: carona.celular,
          telefone: carona.telefone,
          enderecoNumero: carona.enderecoNumero,
          email: carona.email,
          slug: caronaSlug,
          role: 'TIOEXTERNA',
        },
      })
      if (!caronaPessoa) {
        return null
      }
      await prisma.carro.update({
        data: {
          idCarona: caronaPessoa.id,
        },
        where: {
          id: carroCreated.id,
        },
      })
    }
  }

  if (!carroCreated) return null

  const numeroCarro = await getNextCarroEncontro()

  const carroEncontro = await prisma.carroEncontro.create({
    data: {
      numeroCarro,
      idCarro: carroCreated.id,
      idEncontro: encontro.id,
      observacao: carro.observacaoExterna,
    },
  })

  return carroEncontro
}
