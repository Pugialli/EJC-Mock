import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { stringToDate } from '@/utils/string-to-date'
import type { Encontreiro, Encontrista } from '@prisma/client'
import encontreiro from './encontreiro.json'
import encontrista from './encontristas.json'
import pessoa from './pessoa.json'

// const data = [
//   { index: 52 },
//   { index: 65 },
//   { index: 80 },
//   { index: 81 },
//   { index: 91 },
//   { index: 115 },
//   { index: 119 },
//   { index: 138 },
//   { index: 139 },
//   { index: 165 },
//   { index: 168 },
//   { index: 186 },
//   { index: 246 },
//   { index: 255 },
//   { index: 257 },
//   { index: 259 },
//   { index: 274 },
//   { index: 276 },
//   { index: 279 },
//   { index: 280 },
//   { index: 281 },
//   { index: 283 },
//   { index: 289 },
//   { index: 293 },
//   { index: 309 },
//   { index: 311 },
//   { index: 312 },
//   { index: 313 },
//   { index: 332 },
//   { index: 333 },
//   { index: 340 },
//   { index: 341 },
//   { index: 343 },
//   { index: 344 },
//   { index: 345 },
//   { index: 347 },
//   { index: 348 },
//   { index: 349 },
//   { index: 350 },
//   { index: 354 },
//   { index: 355 },
//   { index: 362 },
//   { index: 364 },
//   { index: 366 },
//   { index: 379 },
//   { index: 383 },
//   { index: 384 },
//   { index: 385 },
//   { index: 386 },
//   { index: 387 },
//   { index: 388 },
//   { index: 389 },
//   { index: 390 },
//   { index: 391 },
//   { index: 392 },
//   { index: 393 },
//   { index: 398 },
//   { index: 399 },
//   { index: 402 },
//   { index: 410 },
//   { index: 411 },
//   { index: 412 },
//   { index: 413 },
//   { index: 414 },
//   { index: 415 },
//   { index: 418 },
//   { index: 424 },
//   { index: 428 },
//   { index: 430 },
//   { index: 431 },
//   { index: 432 },
//   { index: 434 },
//   { index: 435 },
//   { index: 436 },
//   { index: 447 },
//   { index: 448 },
//   { index: 449 },
//   { index: 450 },
//   { index: 451 },
//   { index: 452 },
//   { index: 453 },
//   { index: 454 },
//   { index: 455 },
//   { index: 456 },
//   { index: 457 },
//   { index: 459 },
//   { index: 460 },
//   { index: 461 },
//   { index: 462 },
//   { index: 464 },
//   { index: 466 },
//   { index: 467 },
//   { index: 468 },
//   { index: 469 },
//   { index: 470 },
//   { index: 471 },
//   { index: 472 },
//   { index: 473 },
//   { index: 474 },
//   { index: 476 },
//   { index: 477 },
//   { index: 480 },
//   { index: 481 },
//   { index: 482 },
//   { index: 483 },
//   { index: 485 },
//   { index: 486 },
//   { index: 487 },
//   { index: 488 },
//   { index: 490 },
//   { index: 491 },
//   { index: 492 },
//   { index: 493 },
//   { index: 494 },
//   { index: 495 },
//   { index: 496 },
//   { index: 497 },
//   { index: 498 },
//   { index: 499 },
//   { index: 500 },
//   { index: 501 },
//   { index: 502 },
//   { index: 503 },
//   { index: 504 },
//   { index: 505 },
//   { index: 506 },
//   { index: 507 },
//   { index: 508 },
//   { index: 509 },
//   { index: 510 },
//   { index: 511 },
//   { index: 513 },
//   { index: 515 },
//   { index: 517 },
//   { index: 518 },
//   { index: 519 },
//   { index: 520 },
//   { index: 521 },
//   { index: 522 },
//   { index: 523 },
//   { index: 524 },
//   { index: 525 },
//   { index: 526 },
//   { index: 527 },
//   { index: 528 },
//   { index: 529 },
//   { index: 530 },
//   { index: 531 },
//   { index: 532 },
//   { index: 533 },
//   { index: 534 },
//   { index: 535 },
//   { index: 536 },
//   { index: 537 },
//   { index: 538 },
//   { index: 539 },
//   { index: 540 },
//   { index: 541 },
//   { index: 542 },
//   { index: 543 },
//   { index: 544 },
//   { index: 545 },
// ]
const data = [{ index: 412 }]

const externaMap = {
  Andressa: '9a1a7374-6b2d-4313-b2cc-7dfe392c62c5',
  Catarina: '7b9d9cd8-3f8c-4bb9-85f2-94bb8787ca8b',
  Esther: '4ab28daf-273b-40b1-b5b4-b376deb1772b',
  Fernanda: 'd6e9f59f-14af-4bc3-b80c-88b1bd76d2f3',
  JP: '',
}

const thisEncontro = 'a036142e-1fc7-4045-91fb-88d440636512'

interface BairroEncontroProps {
  bairroDuranteOEncontro: string
  idPessoa: string
}

interface jsonPessoa {
  nome: string
  sobrenome: string
  apelido: string
  enderecoCep: string
  celular: string
  telefone: string
  email: string
  created_at: string
  externa: 'Andressa' | 'Catarina' | 'Esther' | 'Fernanda' | 'JP'
}

async function createEncontristas() {
  const created = await Promise.all(
    data.map(async (data): Promise<number> => {
      const thisPessoa: jsonPessoa = pessoa[data.index]
      const thisEncontrista: Encontrista = encontrista[data.index]
      const thisEncontreiro: Encontreiro = encontreiro[data.index]

      // console.log(thisPessoa)
      // console.log(thisEncontrista)
      // console.log(thisEncontreiro)

      const createdDate = stringToDate(String(thisPessoa.created_at))

      const createdPerson = await prisma.pessoa.create({
        data: {
          nome: thisPessoa.nome,
          sobrenome: thisPessoa.sobrenome,
          apelido: thisPessoa.apelido,
          enderecoCep: thisPessoa.enderecoCep,
          celular: thisPessoa.celular,
          telefone: thisPessoa.telefone,
          email: thisPessoa.email,
          createdAt: createdDate,
        },
      })

      const bairroEncontro = await getBairroEncontro({
        bairroDuranteOEncontro: thisEncontrista.idBairroEncontro,
        idPessoa: createdPerson.id,
      })

      await prisma
        .$transaction([
          prisma.encontrista.create({
            data: {
              idPessoa: createdPerson.id,
              idStatus: thisEncontrista.idStatus,
              idReligiao: thisEncontrista.idReligiao,
              isAutofill: String(thisEncontrista.isAutofill) === 'sim',
              endNumero: thisEncontrista.endNumero,
              endComplemento: thisEncontrista.endComplemento,
              idBairroEncontro: bairroEncontro,
              idMoracom: thisEncontrista.idMoracom,
              idStatusPais: thisEncontrista.idStatusPais,
              movimentoAnterior: thisEncontrista.movimentoAnterior,
              observacao: thisEncontrista.observacao,
              nomeContato1: thisEncontrista.nomeContato1,
              telContato1: thisEncontrista.telContato1,
              parentescoContato1: thisEncontrista.parentescoContato1,
              nomeContato2: thisEncontrista.nomeContato2,
              telContato2: thisEncontrista.telContato2,
              parentescoContato2: thisEncontrista.parentescoContato2,
              indicadoPorNome: thisEncontrista.indicadoPorNome,
              indicadoPorApelido: thisEncontrista.indicadoPorApelido,
              indicadoPorTel: thisEncontrista.indicadoPorTel,
              indicadoPorEmail: thisEncontrista.indicadoPorEmail,
              createdAt: createdDate,
            },
          }),
          prisma.encontreiro.create({
            data: {
              idPessoa: createdPerson.id,
              nascimento: thisEncontreiro.nascimento,
              instagram: thisEncontreiro.instagram,
              restricaoAlimentar: thisEncontreiro.restricaoAlimentar,
              idTamanhoCamisa: thisEncontreiro.idTamanhoCamisa,
            },
          }),
        ])
        .then(async (element) => {
          if (thisPessoa.externa !== 'JP') {
            await prisma.responsavelExterna.create({
              data: {
                idEncontrista: element[0].idPessoa,
                idExterna: externaMap[thisPessoa.externa],
                idEncontro: thisEncontro,
              },
            })
          }
        })
        .catch((err) => err)

      return 1
    }),
  )

  return created.length
}

async function getBairroEncontro({
  bairroDuranteOEncontro,
  idPessoa,
}: BairroEncontroProps) {
  if (bairroDuranteOEncontro !== '') return bairroDuranteOEncontro

  const bairroName = await prisma.pessoa.findFirst({
    select: {
      endereco: {
        select: {
          bairro: true,
        },
      },
    },
    where: {
      id: idPessoa,
    },
  })

  if (!bairroName) {
    return 'nao_encontrado'
  }

  const bairroValue = await prisma.domainBairroEncontro.findFirst({
    select: {
      value: true,
    },
    where: {
      bairro: bairroName.endereco.bairro,
    },
  })

  if (!bairroValue) {
    return 'nao_encontrado'
  }

  return bairroValue.value
}

export async function GET() {
  const encontristasCriados = await createEncontristas()

  return NextResponse.json({ encontristasCriados })
}
