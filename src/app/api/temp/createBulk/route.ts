import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { stringToDate } from '@/utils/string-to-date'
import type { Encontreiro, Encontrista, Pessoa } from '@prisma/client'
import encontreiro from './encontreiro.json'
import encontrista from './encontristas.json'
import pessoa from './pessoa.json'

const data = [
  {
    index: 52,
  },
  {
    index: 65,
  },
  {
    index: 81,
  },
  {
    index: 91,
  },
  {
    index: 80,
  },
  {
    index: 115,
  },
  {
    index: 119,
  },
  {
    index: 138,
  },
  {
    index: 139,
  },
  {
    index: 165,
  },
  {
    index: 168,
  },
  {
    index: 186,
  },
  {
    index: 246,
  },
  {
    index: 257,
  },
  {
    index: 255,
  },
  {
    index: 259,
  },
  {
    index: 274,
  },
  {
    index: 283,
  },
  {
    index: 280,
  },
  {
    index: 281,
  },
  {
    index: 279,
  },
  {
    index: 276,
  },
  {
    index: 293,
  },
  {
    index: 289,
  },
  {
    index: 332,
  },
  {
    index: 333,
  },
  {
    index: 311,
  },
  {
    index: 313,
  },
  {
    index: 309,
  },
  {
    index: 312,
  },
  {
    index: 341,
  },
  {
    index: 349,
  },
  {
    index: 354,
  },
  {
    index: 364,
  },
  {
    index: 362,
  },
  {
    index: 345,
  },
  {
    index: 340,
  },
  {
    index: 343,
  },
  {
    index: 347,
  },
  {
    index: 350,
  },
  {
    index: 379,
  },
  {
    index: 348,
  },
  {
    index: 355,
  },
  {
    index: 366,
  },
  {
    index: 391,
  },
  {
    index: 399,
  },
  {
    index: 392,
  },
  {
    index: 412,
  },
  {
    index: 384,
  },
  {
    index: 411,
  },
  {
    index: 385,
  },
  {
    index: 386,
  },
  {
    index: 387,
  },
  {
    index: 388,
  },
  {
    index: 389,
  },
  {
    index: 383,
  },
  {
    index: 393,
  },
  {
    index: 410,
  },
  {
    index: 344,
  },
  {
    index: 390,
  },
  {
    index: 402,
  },
  {
    index: 398,
  },
  {
    index: 414,
  },
  {
    index: 430,
  },
  {
    index: 424,
  },
  {
    index: 431,
  },
  {
    index: 432,
  },
  {
    index: 418,
  },
  {
    index: 428,
  },
  {
    index: 413,
  },
  {
    index: 434,
  },
  {
    index: 435,
  },
  {
    index: 436,
  },
  {
    index: 415,
  },
  {
    index: 447,
  },
  {
    index: 449,
  },
  {
    index: 450,
  },
  {
    index: 452,
  },
  {
    index: 453,
  },
  {
    index: 454,
  },
  {
    index: 455,
  },
  {
    index: 456,
  },
  {
    index: 457,
  },
  {
    index: 459,
  },
  {
    index: 460,
  },
  {
    index: 461,
  },
  {
    index: 462,
  },
  {
    index: 464,
  },
  {
    index: 466,
  },
  {
    index: 467,
  },
  {
    index: 468,
  },
  {
    index: 469,
  },
  {
    index: 470,
  },
  {
    index: 471,
  },
  {
    index: 472,
  },
  {
    index: 473,
  },
  {
    index: 474,
  },
  {
    index: 476,
  },
  {
    index: 477,
  },
  {
    index: 480,
  },
  {
    index: 481,
  },
  {
    index: 482,
  },
  {
    index: 451,
  },
  {
    index: 483,
  },
  {
    index: 485,
  },
  {
    index: 486,
  },
  {
    index: 487,
  },
  {
    index: 488,
  },
  {
    index: 490,
  },
  {
    index: 448,
  },
  {
    index: 491,
  },
  {
    index: 492,
  },
  {
    index: 494,
  },
  {
    index: 495,
  },
  {
    index: 496,
  },
  {
    index: 497,
  },
  {
    index: 498,
  },
  {
    index: 499,
  },
  {
    index: 500,
  },
  {
    index: 501,
  },
  {
    index: 502,
  },
  {
    index: 503,
  },
  {
    index: 504,
  },
  {
    index: 505,
  },
  {
    index: 506,
  },
  {
    index: 507,
  },
  {
    index: 508,
  },
  {
    index: 509,
  },
  {
    index: 510,
  },
  {
    index: 493,
  },
  {
    index: 511,
  },
  {
    index: 513,
  },
  {
    index: 515,
  },
  {
    index: 517,
  },
  {
    index: 518,
  },
  {
    index: 519,
  },
  {
    index: 520,
  },
  {
    index: 522,
  },
  {
    index: 523,
  },
  {
    index: 524,
  },
  {
    index: 525,
  },
  {
    index: 521,
  },
]

interface BairroEncontroProps {
  bairroDuranteOEncontro: string
  idPessoa: string
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
  let encontristasCriados = 0

  await prisma.endereco.createMany({
    data: [
      {
        cep: '21321-803',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Praça Seca',
        rua: 'Rua Cândido Benício',
      },
      {
        cep: '22470-050',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Jardim Botânico',
      },
      {
        cep: '21235-330',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Colégio',
        rua: 'Rua Barros Saião',
      },
      {
        cep: '22451-545',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Rocinha',
        rua: 'Travessa Agenor José Rodrigues Pereira',
      },
      {
        cep: '20260-142',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Haddock Lobo',
      },
      {
        cep: '22460-030',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Pacheco Leão',
      },
      {
        cep: '20715-310',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho Novo',
        rua: 'Rua Araújo Leitão',
      },
      {
        cep: '22743-670',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Freguesia (Jacarepaguá)',
        rua: 'Rua Geminiano Gois',
      },
      {
        cep: '20540-260',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua Sá Viana',
      },
      {
        cep: '22280-080',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Botafogo',
        rua: 'Rua Assis Bueno',
      },
      {
        cep: '22460-903',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Lópes Quintas',
      },
      {
        cep: '22220-060',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Flamengo',
        rua: 'Rua Machado de Assis',
      },
      {
        cep: '21012-160',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Cordovil',
        rua: 'Rua Bom Jardim',
      },
      {
        cep: '20540-132',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vila Isabel',
        rua: 'Rua Pereira Nunes',
      },
      {
        cep: '20220-283',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Santo Cristo',
        rua: 'Rua Pedro Alves',
      },
      {
        cep: '22770-290',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Freguesia (Jacarepaguá)',
        rua: 'Rua Cabo Geraldo Calderaro',
      },
      {
        cep: '20550-030',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Marquês de Valença',
      },
      {
        cep: '20511-190',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Antônio Basílio',
      },
      {
        cep: '21331-500',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Bento Ribeiro',
        rua: 'Rua Ismênia',
      },
      {
        cep: '20561-000',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua Canavieiras',
      },
      {
        cep: '20765-630',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Inhaúma',
        rua: 'Travessa Automóvel Clube',
      },
      {
        cep: '20715-080',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho Novo',
        rua: 'Rua Quinta do Sol',
      },
      {
        cep: '21220-290',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vicente de Carvalho',
        rua: 'Rua Bernardo Taveira',
      },
      {
        cep: '22620-330',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Barra da Tijuca',
        rua: 'Rua General Raulino de Oliveira',
      },
      {
        cep: '22610-210',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'São Conrado',
        rua: 'Estrada da Canoa',
      },
      {
        cep: '21046-220',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Maré',
        rua: 'Via C-10 (Vl Pinheiro)',
      },
      {
        cep: '22221-030',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Catete',
        rua: 'Rua Tavares Bastos',
      },
      {
        cep: '20730-440',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho de Dentro',
        rua: 'Rua Venâncio Ribeiro',
      },
      {
        cep: '20561-250',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua Campinas',
      },
      {
        cep: '20921-180',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'São Cristóvão',
        rua: 'Rua Santo Antônio',
      },
      {
        cep: '20551-060',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vila Isabel',
        rua: 'Rua Conselheiro Autran',
      },
      {
        cep: '22790-714',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Recreio dos Bandeirantes',
        rua: 'Avenida Salvador Allende',
      },
      {
        cep: '20710-300',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Lins de Vasconcelos',
        rua: 'Rua Cabuçu',
      },
      {
        cep: '20230-060',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Centro',
        rua: 'Rua dos Arcos',
      },
      {
        cep: '22775-024',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jacarepaguá',
        rua: 'Avenida Ator José Wilker',
      },
      {
        cep: '24050-165',
        estado: 'RJ',
        cidade: 'Niterói',
        bairro: 'Ilha da Conceição',
        rua: 'Rua Vereador Ekio José Alves',
      },
      {
        cep: '25880-000',
        estado: 'RJ',
        cidade: 'Sapucaia',
        bairro: '',
        rua: '',
      },
      {
        cep: '20950-410',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho Novo',
        rua: 'Rua Eduardo Raboeira',
      },
      {
        cep: '20715-240',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho Novo',
        rua: 'Rua Alcino Chavantes',
      },
      {
        cep: '31565-150',
        estado: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Santa Branca',
        rua: 'Rua Montese',
      },
      {
        cep: '21050-670',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Higienópolis',
        rua: 'Rua Rodolfo Galvão',
      },
      {
        cep: '20540-330',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua José Vicente',
      },
      {
        cep: '22071-100',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Rua Sá Ferreira',
      },
      {
        cep: '22461-030',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Itaipava',
      },
      {
        cep: '20770-240',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Todos os Santos',
        rua: 'Rua José Bonifácio',
      },
      {
        cep: '26551-071',
        estado: 'RJ',
        cidade: 'Mesquita',
        bairro: 'Cruzeiro do Sul',
        rua: 'Rua Egídio',
      },
      {
        cep: '20560-095',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vila Isabel',
        rua: 'Rua Teodoro da Silva',
      },
      {
        cep: '21031-770',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Ramos',
        rua: 'Rua Sargento Ferreira',
      },
      {
        cep: '23575-275',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Santa Cruz',
        rua: 'Estrada dos Palmares',
      },
      {
        cep: '21040-016',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Ramos',
        rua: 'Avenida dos Campeões',
      },
      {
        cep: '21031-790',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Ramos',
        rua: 'Rua André Pinto',
      },
      {
        cep: '21040-080',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Ramos',
        rua: 'Rua Romero Zander',
      },
      {
        cep: '21040-112',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Bonsucesso',
        rua: 'Avenida Teixeira de Castro',
      },
      {
        cep: '20520-050',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Conde de Bonfim',
      },
      {
        cep: '22031-100',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Rua Euclides da Rocha',
      },
      {
        cep: '20510-360',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Andaraí',
        rua: 'Rua Ernesto de Souza',
      },
      {
        cep: '20530-620',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Abreu Lacerda',
      },
      {
        cep: '22260-000',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Botafogo',
        rua: 'Rua São Clemente',
      },
      {
        cep: '22460-100',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Peri',
      },
      {
        cep: '22780-070',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jacarepaguá',
        rua: 'Estrada de Camorim',
      },
      {
        cep: '20270-060',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Praça da Bandeira',
        rua: 'Rua Barão de Iguatemi',
      },
      {
        cep: '22460-010',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Lópes Quintas',
      },
      {
        cep: '22753-005',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Itanhangá',
        rua: 'Estrada do Itanhangá',
      },
      {
        cep: '20271-060',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Professor Gabizo',
      },
      {
        cep: '21380-210',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Quintino Bocaiúva',
        rua: 'Rua Vital',
      },
      {
        cep: '20520-120',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Alexandre de Gusmão',
      },
      {
        cep: '25270-080',
        estado: 'RJ',
        cidade: 'Duque de Caxias',
        bairro: 'Jardim Rotsen',
        rua: 'Rua Onze',
      },
      {
        cep: '20921-440',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'São Cristóvão',
        rua: 'Campo São Cristóvão',
      },
      {
        cep: '20940-040',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Mangueira',
        rua: 'Parque Quinta da Boa Vista',
      },
      {
        cep: '22250-040',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Botafogo',
        rua: 'Praia Botafogo',
      },
      {
        cep: '22451-264',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Gávea',
        rua: 'Estrada da Gávea',
      },
      {
        cep: '20270-243',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Afonso Pena',
      },
      {
        cep: '20560-160',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua José do Patrocínio',
      },
      {
        cep: '20260-210',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Engenheiro Adel',
      },
      {
        cep: '20550-155',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Maracanã',
        rua: 'Rua Santa Luísa',
      },
      {
        cep: '20950-150',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Riachuelo',
        rua: 'Rua Alice Figueiredo',
      },
      {
        cep: '22061-070',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Travessa Maria Amélia',
      },
      {
        cep: '22071-060',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Rua Saint Roman',
      },
      {
        cep: '20251-250',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Catumbi',
        rua: 'Rua Eliseu Visconti',
      },
      {
        cep: '20530-420',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua São Miguel',
      },
      {
        cep: '22753-053',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Itanhangá',
        rua: 'Avenida Engenheiro Souza Filho',
      },
      {
        cep: '23092-649',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Campo Grande',
        rua: 'Rua Nicola Albano',
      },
      {
        cep: '22460-110',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Ingles de Sousa',
      },
      {
        cep: '20540-341',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua Barão do Bom Retiro',
      },
      {
        cep: '20541-180',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Andaraí',
        rua: 'Rua Dona Amélia',
      },
      {
        cep: '22763-550',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Cidade de Deus',
        rua: 'Praça da Bíblia',
      },
      {
        cep: '23020-722',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Guaratiba',
        rua: 'Rua Wilma Vilena Barcelos',
      },
      {
        cep: '22231-070',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Laranjeiras',
        rua: 'Rua Marechal Bento Manuel',
      },
      {
        cep: '20950-390',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho Novo',
        rua: 'Rua Álvaro',
      },
      {
        cep: '20710-210',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Engenho Novo',
        rua: 'Rua Caimbé',
      },
      {
        cep: '20561-206',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua Borda do Mato',
      },
      {
        cep: '22775-051',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jacarepaguá',
        rua: 'Rua Franz Weissman',
      },
      {
        cep: '20270-002',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Maracanã',
        rua: 'Rua Mariz e Barros',
      },
      {
        cep: '24715-271',
        estado: 'RJ',
        cidade: 'São Gonçalo',
        bairro: 'Jardim Catarina',
        rua: 'Rua Cardeal Roncali',
      },
      {
        cep: '20550-220',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vila Isabel',
        rua: 'Rua Jorge Rudge',
      },
      {
        cep: '20510-130',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Maria Amália',
      },
      {
        cep: '22753-480',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Anil',
        rua: 'Caminho Cavaco',
      },
      {
        cep: '22261-003',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Humaitá',
        rua: 'Rua do Humaitá',
      },
      {
        cep: '20560-080',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vila Isabel',
        rua: 'Rua Barão de Cotegipe',
      },
      {
        cep: '23097-710',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Campo Grande',
        rua: 'Estrada Sete Riachos',
      },
      {
        cep: '22740-360',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Pechincha',
        rua: 'Estrada do Tindiba',
      },
      {
        cep: '22461-160',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Araucaria',
      },
      {
        cep: '20541-280',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Andaraí',
        rua: 'Rua Ferreira Pontes',
      },
      {
        cep: '20521-160',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Desembargador Izidro',
      },
      {
        cep: '20250-001',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Estácio',
        rua: 'Rua Maia Lacerda',
      },
      {
        cep: '23087-070',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Campo Grande',
        rua: 'Rua Breno Pessoa',
      },
      {
        cep: '20511-310',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Radmacker',
      },
      {
        cep: '20251-061',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Rio Comprido',
        rua: 'Rua Barão de Petrópolis',
      },
      {
        cep: '20511-001',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Avenida Maracanã',
      },
      {
        cep: '22610-002',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'São Conrado',
        rua: 'Estrada da Gávea',
      },
      {
        cep: '20520-040',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua Rego Lópes',
      },
      {
        cep: '20541-100',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Vila Isabel',
        rua: 'Rua Maxwell',
      },
      {
        cep: '22451-262',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Gávea',
        rua: 'Estrada da Gávea',
      },
      {
        cep: '20550-010',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua São Francisco Xavier',
      },
      {
        cep: '23035-384',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Guaratiba',
        rua: 'Rua Roberto Cabral',
      },
      {
        cep: '22230-061',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Flamengo',
        rua: 'Rua Marquês de Abrantes',
      },
      {
        cep: '20550-013',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Maracanã',
        rua: 'Rua São Francisco Xavier',
      },
      {
        cep: '22780-290',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jacarepaguá',
        rua: 'Rua Hugo Thompson Nogueira',
      },
      {
        cep: '22080-030',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Rua Joaquim Nabuco',
      },
      {
        cep: '20541-330',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Grajaú',
        rua: 'Rua Rosa e Silva',
      },
      {
        cep: '20550-012',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Tijuca',
        rua: 'Rua São Francisco Xavier',
      },
      {
        cep: '20541-170',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Andaraí',
        rua: 'Rua Leopoldo',
      },
      {
        cep: '20785-020',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Cachambi',
        rua: 'Rua Americana',
      },
      {
        cep: '22790-850',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Recreio dos Bandeirantes',
        rua: 'Rua Alberto Cavalcanti',
      },
      {
        cep: '22765-680',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Gardênia Azul',
        rua: 'Rua Arapoca',
      },
      {
        cep: '21310-010',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Madureira',
        rua: 'Travessa Carlos Xavier',
      },
      {
        cep: '22715-440',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Taquara',
        rua: 'Rua Desembargador Omar Dutra',
      },
    ],
  })

  const encontro = await prisma.encontro.findFirst({
    where: {
      numeroEncontro: 71,
    },
  })

  data.map(async (data) => {
    const thisPessoa: Pessoa = pessoa[data.index]
    const thisEncontrista: Encontrista = encontrista[data.index]
    const thisEncontreiro: Encontreiro = encontreiro[data.index]
    // console.log(thisPessoa)

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
      idPessoa: thisPessoa.id,
    })

    await prisma.$transaction([
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
          idEncontro: encontro!.id,
        },
      }),
    ])

    encontristasCriados++
  })

  return NextResponse.json({ encontristasCriados })
}
