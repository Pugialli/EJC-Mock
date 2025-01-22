import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()

export function stringToDate(string: string) {
  const correctedString =
    string.split('/')[1] +
    '/' +
    string.split('/')[0] +
    '/' +
    string.split('/')[2]

  const date = new Date(correctedString)

  return date
}

async function main() {
  const status = await prisma.domainStatus.createMany({
    data: [
      { id: 'confirmado', status: 'Confirmado' },
      { id: 'confirmado_sem_sexta', status: 'Confirmado sem sexta' },
      { id: 'desistiu', status: 'Desistiu' },
      { id: 'ligar', status: 'Ligar' },
      { id: 'lista_espera', status: 'Lista de Espera' },
      { id: 'nao_atende', status: 'Não Atende' },
      { id: 'prox_encontro', status: 'Próximo Encontrão' },
      { id: 'vai_pensar', status: 'Vai Pensar' },
      { id: 'delete', status: 'Deletado' },
    ],
  })
  const religioes = await prisma.domainReligiao.createMany({
    data: [
      { id: 'catolica', religiao: 'Católica' },
      { id: 'evangelica', religiao: 'Evangélica' },
      { id: 'espirita', religiao: 'Espírita' },
      { id: 'matriz_africana', religiao: 'Religião de matriz afro-brasileira' },
      { id: 'judaica', religiao: 'Judaica' },
      { id: 'nao_tenho', religiao: 'Não tenho religião' },
      { id: 'outra', religiao: 'Outra' },
    ],
  })
  const bairrosRJ = await prisma.domainBairroEncontro.createMany({
    data: [
      {
        id: 0,
        value: 'nao_encontrado',
        bairro: 'Não Encontrado',
        zona: 'nenhuma',
      },
      {
        id: 82,
        value: 'abolicao',
        bairro: 'Abolição',
        zona: 'norte',
      },
      {
        id: 122,
        value: 'acari',
        bairro: 'Acari',
        zona: 'norte',
      },
      {
        id: 83,
        value: 'agua_santa',
        bairro: 'Água Santa',
        zona: 'norte',
      },
      {
        id: 75,
        value: 'alto_boa_vista',
        bairro: 'Alto da Boa Vista',
        zona: 'norte',
      },
      {
        id: 123,
        value: 'anchieta',
        bairro: 'Anchieta',
        zona: 'norte',
      },
      {
        id: 76,
        value: 'andarai',
        bairro: 'Andaraí',
        zona: 'norte',
      },
      {
        id: 35,
        value: 'anil',
        bairro: 'Anil',
        zona: 'oeste',
      },
      {
        id: 104,
        value: 'bancarios',
        bairro: 'Bancários',
        zona: 'norte',
      },
      {
        id: 54,
        value: 'bangu',
        bairro: 'Bangu',
        zona: 'oeste',
      },
      {
        id: 36,
        value: 'barra_tijuca',
        bairro: 'Barra da Tijuca',
        zona: 'oeste',
      },
      {
        id: 65,
        value: 'barra_guaratiba',
        bairro: 'Barra de Guaratiba',
        zona: 'oeste',
      },
      {
        id: 124,
        value: 'barros_filho',
        bairro: 'Barros Filho',
        zona: 'norte',
      },
      {
        id: 2,
        value: 'benfica',
        bairro: 'Benfica',
        zona: 'central',
      },
      {
        id: 125,
        value: 'bento_ribeiro',
        bairro: 'Bento Ribeiro',
        zona: 'norte',
      },
      {
        id: 103,
        value: 'bonsucesso',
        bairro: 'Bonsucesso',
        zona: 'norte',
      },
      {
        id: 18,
        value: 'botafogo',
        bairro: 'Botafogo',
        zona: 'sul',
      },
      {
        id: 126,
        value: 'bras_pina',
        bairro: 'Brás de Pina',
        zona: 'norte',
      },
      {
        id: 84,
        value: 'cachambi',
        bairro: 'Cachambi',
        zona: 'norte',
      },
      {
        id: 105,
        value: 'cacuia',
        bairro: 'Cacuia',
        zona: 'norte',
      },
      {
        id: 3,
        value: 'caju',
        bairro: 'Caju',
        zona: 'central',
      },
      {
        id: 37,
        value: 'camorim',
        bairro: 'Camorim',
        zona: 'oeste',
      },
      {
        id: 127,
        value: 'campinho',
        bairro: 'Campinho',
        zona: 'norte',
      },
      {
        id: 66,
        value: 'campo_grande',
        bairro: 'Campo Grande',
        zona: 'oeste',
      },
      {
        id: 129,
        value: 'cascadura',
        bairro: 'Cascadura',
        zona: 'norte',
      },
      {
        id: 19,
        value: 'catete',
        bairro: 'Catete',
        zona: 'sul',
      },
      {
        id: 4,
        value: 'catumbi',
        bairro: 'Catumbi',
        zona: 'central',
      },
      {
        id: 128,
        value: 'cavalcanti',
        bairro: 'Cavalcanti',
        zona: 'norte',
      },
      {
        id: 5,
        value: 'centro',
        bairro: 'Centro',
        zona: 'central',
      },
      {
        id: 38,
        value: 'cidade_de_deus',
        bairro: 'Cidade de Deus',
        zona: 'oeste',
      },
      {
        id: 6,
        value: 'cidade_nova',
        bairro: 'Cidade Nova',
        zona: 'central',
      },
      {
        id: 106,
        value: 'cidade_universitaria',
        bairro: 'Cidade Universitária',
        zona: 'norte',
      },
      {
        id: 107,
        value: 'cocota',
        bairro: 'Cocotá',
        zona: 'norte',
      },
      {
        id: 130,
        value: 'coelho_neto',
        bairro: 'Coelho Neto',
        zona: 'norte',
      },
      {
        id: 131,
        value: 'colegio',
        bairro: 'Colégio',
        zona: 'norte',
      },
      {
        id: 132,
        value: 'complexo_alemao',
        bairro: 'Complexo do Alemão',
        zona: 'norte',
      },
      {
        id: 20,
        value: 'copacabana',
        bairro: 'Copacabana',
        zona: 'sul',
      },
      {
        id: 133,
        value: 'cordovil',
        bairro: 'Cordovil',
        zona: 'norte',
      },
      {
        id: 21,
        value: 'cosme_velho',
        bairro: 'Cosme Velho',
        zona: 'sul',
      },
      {
        id: 67,
        value: 'cosmos',
        bairro: 'Cosmos',
        zona: 'oeste',
      },
      {
        id: 134,
        value: 'costa_barros',
        bairro: 'Costa Barros',
        zona: 'norte',
      },
      {
        id: 39,
        value: 'curicica',
        bairro: 'Curicica',
        zona: 'oeste',
      },
      {
        id: 85,
        value: 'del_castilho',
        bairro: 'Del Castilho',
        zona: 'norte',
      },
      {
        id: 55,
        value: 'deodoro',
        bairro: 'Deodoro',
        zona: 'oeste',
      },
      {
        id: 86,
        value: 'encantado',
        bairro: 'Encantado',
        zona: 'norte',
      },
      {
        id: 135,
        value: 'engenheiro_leal',
        bairro: 'Engenheiro Leal',
        zona: 'norte',
      },
      {
        id: 136,
        value: 'engenho_rainha',
        bairro: 'Engenho da Rainha',
        zona: 'norte',
      },
      {
        id: 87,
        value: 'engenho_dentro',
        bairro: 'Engenho de Dentro',
        zona: 'norte',
      },
      {
        id: 88,
        value: 'engenho_novo',
        bairro: 'Engenho Novo',
        zona: 'norte',
      },
      {
        id: 7,
        value: 'estacio',
        bairro: 'Estácio',
        zona: 'central',
      },
      {
        id: 22,
        value: 'flamengo',
        bairro: 'Flamengo',
        zona: 'sul',
      },
      {
        id: 108,
        value: 'freguesia',
        bairro: 'Freguesia',
        zona: 'norte',
      },
      {
        id: 40,
        value: 'freguesia_jacarepagua',
        bairro: 'Freguesia de Jacarepaguá',
        zona: 'oeste',
      },
      {
        id: 109,
        value: 'galeao',
        bairro: 'Galeão',
        zona: 'norte',
      },
      {
        id: 8,
        value: 'gamboa',
        bairro: 'Gamboa',
        zona: 'central',
      },
      {
        id: 41,
        value: 'gardenia_azul',
        bairro: 'Gardênia Azul',
        zona: 'oeste',
      },
      {
        id: 23,
        value: 'gavea',
        bairro: 'Gávea',
        zona: 'sul',
      },
      {
        id: 56,
        value: 'gericino',
        bairro: 'Gericinó',
        zona: 'oeste',
      },
      {
        id: 9,
        value: 'gloria',
        bairro: 'Glória',
        zona: 'central',
      },
      {
        id: 77,
        value: 'grajau',
        bairro: 'Grajaú',
        zona: 'norte',
      },
      {
        id: 42,
        value: 'grumari',
        bairro: 'Grumari',
        zona: 'oeste',
      },
      {
        id: 137,
        value: 'guadalupe',
        bairro: 'Guadalupe',
        zona: 'norte',
      },
      {
        id: 68,
        value: 'guaratiba',
        bairro: 'Guaratiba',
        zona: 'oeste',
      },
      {
        id: 89,
        value: 'higienopolis',
        bairro: 'Higienópolis',
        zona: 'norte',
      },
      {
        id: 138,
        value: 'honorio_gurgel',
        bairro: 'Honório Gurgel',
        zona: 'norte',
      },
      {
        id: 24,
        value: 'humaita',
        bairro: 'Humaitá',
        zona: 'sul',
      },
      {
        id: 139,
        value: 'inhauma',
        bairro: 'Inhaúma',
        zona: 'norte',
      },
      {
        id: 69,
        value: 'inhoaiba',
        bairro: 'Inhoaíba',
        zona: 'oeste',
      },
      {
        id: 25,
        value: 'ipanema',
        bairro: 'Ipanema',
        zona: 'sul',
      },
      {
        id: 140,
        value: 'iraja',
        bairro: 'Irajá',
        zona: 'norte',
      },
      {
        id: 43,
        value: 'itanhanga',
        bairro: 'Itanhangá',
        zona: 'oeste',
      },
      {
        id: 90,
        value: 'jacare',
        bairro: 'Jacaré',
        zona: 'norte',
      },
      {
        id: 44,
        value: 'jacarepagua',
        bairro: 'Jacarepaguá',
        zona: 'oeste',
      },
      {
        id: 91,
        value: 'jacarezinho',
        bairro: 'Jacarezinho',
        zona: 'norte',
      },
      {
        id: 141,
        value: 'jardim_america',
        bairro: 'Jardim América',
        zona: 'norte',
      },
      {
        id: 26,
        value: 'jardim_botanico',
        bairro: 'Jardim Botânico',
        zona: 'sul',
      },
      {
        id: 110,
        value: 'jardim_carioca',
        bairro: 'Jardim Carioca',
        zona: 'norte',
      },
      {
        id: 111,
        value: 'jardim_guanabara',
        bairro: 'Jardim Guanabara',
        zona: 'norte',
      },
      {
        id: 57,
        value: 'jardim_sulacap',
        bairro: 'Jardim Sulacap',
        zona: 'oeste',
      },
      {
        id: 45,
        value: 'joa',
        bairro: 'Joá',
        zona: 'oeste',
      },
      {
        id: 27,
        value: 'lagoa',
        bairro: 'Lagoa',
        zona: 'sul',
      },
      {
        id: 10,
        value: 'lapa',
        bairro: 'Lapa',
        zona: 'central',
      },
      {
        id: 28,
        value: 'laranjeiras',
        bairro: 'Laranjeiras',
        zona: 'sul',
      },
      {
        id: 29,
        value: 'leblon',
        bairro: 'Leblon',
        zona: 'sul',
      },
      {
        id: 30,
        value: 'leme',
        bairro: 'Leme',
        zona: 'sul',
      },
      {
        id: 92,
        value: 'lins_vasconcelos',
        bairro: 'Lins de Vasconcelos',
        zona: 'norte',
      },
      {
        id: 142,
        value: 'madureira',
        bairro: 'Madureira',
        zona: 'norte',
      },
      {
        id: 58,
        value: 'magalhaes_bastos',
        bairro: 'Magalhães Bastos',
        zona: 'oeste',
      },
      {
        id: 11,
        value: 'mangueira',
        bairro: 'Mangueira',
        zona: 'central',
      },
      {
        id: 93,
        value: 'manguinhos',
        bairro: 'Manguinhos',
        zona: 'norte',
      },
      {
        id: 78,
        value: 'maracana',
        bairro: 'Maracanã',
        zona: 'norte',
      },
      {
        id: 112,
        value: 'mare',
        bairro: 'Maré',
        zona: 'norte',
      },
      {
        id: 143,
        value: 'marechal_hermes',
        bairro: 'Marechal Hermes',
        zona: 'norte',
      },
      {
        id: 94,
        value: 'maria_graca',
        bairro: 'Maria da Graça',
        zona: 'norte',
      },
      {
        id: 95,
        value: 'meier',
        bairro: 'Méier',
        zona: 'norte',
      },
      {
        id: 113,
        value: 'monero',
        bairro: 'Moneró',
        zona: 'norte',
      },
      {
        id: 114,
        value: 'olaria',
        bairro: 'Olaria',
        zona: 'norte',
      },
      {
        id: 144,
        value: 'oswaldo_cruz',
        bairro: 'Oswaldo Cruz',
        zona: 'norte',
      },
      {
        id: 70,
        value: 'paciencia',
        bairro: 'Paciência',
        zona: 'oeste',
      },
      {
        id: 59,
        value: 'padre_miguel',
        bairro: 'Padre Miguel',
        zona: 'oeste',
      },
      {
        id: 12,
        value: 'paqueta',
        bairro: 'Paquetá',
        zona: 'central',
      },
      {
        id: 145,
        value: 'parada_lucas',
        bairro: 'Parada de Lucas',
        zona: 'norte',
      },
      {
        id: 146,
        value: 'parque_anchieta',
        bairro: 'Parque Anchieta',
        zona: 'norte',
      },
      {
        id: 147,
        value: 'parque_columbia',
        bairro: 'Parque Colúmbia',
        zona: 'norte',
      },
      {
        id: 148,
        value: 'pavuna',
        bairro: 'Pavuna',
        zona: 'norte',
      },
      {
        id: 47,
        value: 'pechincha',
        bairro: 'Pechincha',
        zona: 'oeste',
      },
      {
        id: 71,
        value: 'pedra_guaratiba',
        bairro: 'Pedra de Guaratiba',
        zona: 'oeste',
      },
      {
        id: 149,
        value: 'penha',
        bairro: 'Penha',
        zona: 'norte',
      },
      {
        id: 150,
        value: 'penha_circular',
        bairro: 'Penha Circular',
        zona: 'norte',
      },
      {
        id: 96,
        value: 'piedade',
        bairro: 'Piedade',
        zona: 'norte',
      },
      {
        id: 97,
        value: 'pilares',
        bairro: 'Pilares',
        zona: 'norte',
      },
      {
        id: 115,
        value: 'pitangueiras',
        bairro: 'Pitangueiras',
        zona: 'norte',
      },
      {
        id: 116,
        value: 'portuguesa',
        bairro: 'Portuguesa',
        zona: 'norte',
      },
      {
        id: 79,
        value: 'praca_bandeira',
        bairro: 'Praça da Bandeira',
        zona: 'norte',
      },
      {
        id: 46,
        value: 'praca_seca',
        bairro: 'Praça Seca',
        zona: 'oeste',
      },
      {
        id: 117,
        value: 'praia_bandeira',
        bairro: 'Praia da Bandeira',
        zona: 'norte',
      },
      {
        id: 151,
        value: 'quintino_bocaiuva',
        bairro: 'Quintino Bocaiuva',
        zona: 'norte',
      },
      {
        id: 118,
        value: 'ramos',
        bairro: 'Ramos',
        zona: 'norte',
      },
      {
        id: 60,
        value: 'realengo',
        bairro: 'Realengo',
        zona: 'oeste',
      },
      {
        id: 48,
        value: 'recreio',
        bairro: 'Recreio dos Bandeirantes',
        zona: 'oeste',
      },
      {
        id: 98,
        value: 'riachuelo',
        bairro: 'Riachuelo',
        zona: 'norte',
      },
      {
        id: 119,
        value: 'ribeira',
        bairro: 'Ribeira',
        zona: 'norte',
      },
      {
        id: 152,
        value: 'ricardo_albuquerque',
        bairro: 'Ricardo de Albuquerque',
        zona: 'norte',
      },
      {
        id: 13,
        value: 'rio_comprido',
        bairro: 'Rio Comprido',
        zona: 'central',
      },
      {
        id: 99,
        value: 'rocha',
        bairro: 'Rocha',
        zona: 'norte',
      },
      {
        id: 153,
        value: 'rocha_miranda',
        bairro: 'Rocha Miranda',
        zona: 'norte',
      },
      {
        id: 31,
        value: 'rocinha',
        bairro: 'Rocinha',
        zona: 'sul',
      },
      {
        id: 100,
        value: 'sampaio',
        bairro: 'Sampaio',
        zona: 'norte',
      },
      {
        id: 72,
        value: 'santa_cruz',
        bairro: 'Santa Cruz',
        zona: 'oeste',
      },
      {
        id: 14,
        value: 'santa_teresa',
        bairro: 'Santa Teresa',
        zona: 'central',
      },
      {
        id: 61,
        value: 'santissimo',
        bairro: 'Santíssimo',
        zona: 'oeste',
      },
      {
        id: 15,
        value: 'santo_cristo',
        bairro: 'Santo Cristo',
        zona: 'central',
      },
      {
        id: 32,
        value: 'sao_conrado',
        bairro: 'São Conrado',
        zona: 'sul',
      },
      {
        id: 1,
        value: 'sao_cristovao',
        bairro: 'São Cristóvão',
        zona: 'central',
      },
      {
        id: 101,
        value: 'sao_francisco_xavier',
        bairro: 'São Francisco Xavier',
        zona: 'norte',
      },
      {
        id: 16,
        value: 'saude',
        bairro: 'Saúde',
        zona: 'central',
      },
      {
        id: 62,
        value: 'senador_camara',
        bairro: 'Senador Camará',
        zona: 'oeste',
      },
      {
        id: 73,
        value: 'senador_vasconcelos',
        bairro: 'Senador Vasconcelos',
        zona: 'oeste',
      },
      {
        id: 74,
        value: 'sepetiba',
        bairro: 'Sepetiba',
        zona: 'oeste',
      },
      {
        id: 49,
        value: 'tanque',
        bairro: 'Tanque',
        zona: 'oeste',
      },
      {
        id: 50,
        value: 'taquara',
        bairro: 'Taquara',
        zona: 'oeste',
      },
      {
        id: 120,
        value: 'taua',
        bairro: 'Tauá',
        zona: 'norte',
      },
      {
        id: 80,
        value: 'tijuca',
        bairro: 'Tijuca',
        zona: 'norte',
      },
      {
        id: 102,
        value: 'todos_santos',
        bairro: 'Todos os Santos',
        zona: 'norte',
      },
      {
        id: 154,
        value: 'tomas_coelho',
        bairro: 'Tomás Coelho',
        zona: 'norte',
      },
      {
        id: 155,
        value: 'turiacu',
        bairro: 'Turiaçu',
        zona: 'norte',
      },
      {
        id: 33,
        value: 'urca',
        bairro: 'Urca',
        zona: 'sul',
      },
      {
        id: 51,
        value: 'vargem_grande',
        bairro: 'Vargem Grande',
        zona: 'oeste',
      },
      {
        id: 52,
        value: 'vargem_pequena',
        bairro: 'Vargem Pequena',
        zona: 'oeste',
      },
      {
        id: 17,
        value: 'vasco_da_gama',
        bairro: 'Vasco da Gama',
        zona: 'central',
      },
      {
        id: 156,
        value: 'vaz_lobo',
        bairro: 'Vaz Lobo',
        zona: 'norte',
      },
      {
        id: 157,
        value: 'vicente_carvalho',
        bairro: 'Vicente de Carvalho',
        zona: 'norte',
      },
      {
        id: 34,
        value: 'vidigal',
        bairro: 'Vidigal',
        zona: 'sul',
      },
      {
        id: 158,
        value: 'vigario_geral',
        bairro: 'Vigário Geral',
        zona: 'norte',
      },
      {
        id: 159,
        value: 'vila_penha',
        bairro: 'Vila da Penha',
        zona: 'norte',
      },
      {
        id: 81,
        value: 'vila_isabel',
        bairro: 'Vila Isabel',
        zona: 'norte',
      },
      {
        id: 63,
        value: 'vila_kennedy',
        bairro: 'Vila Kennedy',
        zona: 'oeste',
      },
      {
        id: 160,
        value: 'vila_kosmos',
        bairro: 'Vila Kosmos',
        zona: 'norte',
      },
      {
        id: 64,
        value: 'vila_militar',
        bairro: 'Vila Militar',
        zona: 'oeste',
      },
      {
        id: 53,
        value: 'vila_valqueire',
        bairro: 'Vila Valqueire',
        zona: 'oeste',
      },
      {
        id: 161,
        value: 'vista_alegre',
        bairro: 'Vista Alegre',
        zona: 'norte',
      },
      {
        id: 121,
        value: 'zumbi',
        bairro: 'Zumbi',
        zona: 'norte',
      },
    ],
  })
  const moraCom = await prisma.domainMoraCom.createMany({
    data: [
      { id: 'sozinho', moraCom: 'Sozinho' },
      { id: 'conjuge', moraCom: 'Cônjuge' },
      { id: 'familiar', moraCom: 'Familiar' },
      { id: 'amigos', moraCom: 'Amigos' },
    ],
  })
  const statusPais = await prisma.domainStatusPais.createMany({
    data: [
      { id: 'sim', statusPais: 'Sim' },
      { id: 'nao', statusPais: 'Não' },
      { id: 'na', statusPais: 'Não se aplica' },
    ],
  })
  const tamanhosCamisa = await prisma.domainTamanhoCamisa.createMany({
    data: [
      { id: 'p', tamanhoCamisa: 'P' },
      { id: 'm', tamanhoCamisa: 'M' },
      { id: 'g', tamanhoCamisa: 'G' },
      { id: 'gg', tamanhoCamisa: 'GG' },
      { id: 'xgg', tamanhoCamisa: 'XGG' },
      { id: 'outro', tamanhoCamisa: 'Outro' },
    ],
  })
  const cores = await prisma.domainCorCirculo.createMany({
    data: [
      { cor: 'Amarelo' },
      { cor: 'Azul' },
      { cor: 'Laranja' },
      { cor: 'Verde' },
      { cor: 'Vermelho' },
    ],
  })

  const endereco = await prisma.endereco.createMany({
    data: [
      {
        cep: '22270-000',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Botafogo',
        rua: 'Rua Voluntários da Pátria',
      },
      {
        cep: '22460-012',
        estado: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Jardim Botânico',
        rua: 'Rua Lopes Quintas',
      },
    ],
  })

  const admin = await prisma.pessoa.create({
    data: {
      nome: 'João Paulo',
      sobrenome: 'Pugialli da Silva Souza',
      celular: '(21) 99719-8998',
      email: 'joaopugialli@gmail.com',
      slug: 'joaopugialli-56',
      enderecoCep: '22270-000',
      password: '$2a$08$71STWfM30xVPYaBV7jnQpOCfrmwUWbbazG0gb41FmtMJE7AZjA0ZG',
      avatarUrl:
        'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
      role: 'ADMIN',
    },
  })

  const passwordHash = await hash('test1234', 1)

  const genericAdmin = await prisma.pessoa.create({
    data: {
      nome: 'Generic',
      sobrenome: 'Administrator',
      celular: '(21) 9999-9999',
      email: 'admin@ejcmock.com',
      slug: 'admin-1',
      enderecoCep: '22270-000',
      password: passwordHash,
      avatarUrl:
        'https://imgcdn.stablediffusionweb.com/2024/9/12/269253cf-0164-4ffa-a64e-c958447c4407.jpg',
      role: 'ADMIN',
    },
  })

  const local = await prisma.local.create({
    data: {
      enderecoCep: '22460-012',
      nomeLocal: 'Paróquia Divina Providência',
      numeroLocal: '274',
    },
  })

  const inicio = stringToDate('24/05/2024')
  const tema = stringToDate('24/03/2024')

  const encontro = await prisma.encontro.create({
    data: {
      dataInicio: inicio,
      dataTema: tema,
      numeroCirculos: 5,
      numeroEncontro: 71,
      idLocal: local.id,
      temaFantasia: 'Madagascar',
      temaEspiritual: 'O amor de Cristo nos uniu.',
    },
  })

  console.log({
    status,
    religioes,
    bairrosRJ,
    moraCom,
    statusPais,
    tamanhosCamisa,
    cores,
    endereco,
    admin,
    genericAdmin,
    local,
    encontro,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
