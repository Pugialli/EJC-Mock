/*
  Warnings:

  - You are about to drop the column `enderecoCep` on the `pessoas` table. All the data in the column will be lost.
  - Added the required column `endereco_cep` to the `pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pessoas" DROP CONSTRAINT "pessoas_enderecoCep_fkey";

-- AlterTable
ALTER TABLE "pessoas" DROP COLUMN "enderecoCep",
ADD COLUMN     "endereco_cep" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "encontreiro" (
    "id_pessoa" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "apelido" TEXT,
    "instagram" TEXT NOT NULL,
    "senha" TEXT,
    "restricao_alimentar" TEXT,
    "id_tamanho_camisa" TEXT NOT NULL,
    "id_encontro" TEXT NOT NULL,
    "id_circulo" TEXT
);

-- CreateTable
CREATE TABLE "encontro" (
    "id" TEXT NOT NULL,
    "numero_encontro" INTEGER NOT NULL,
    "data_inicio" TEXT NOT NULL,
    "data_tema" TEXT NOT NULL,
    "id_local" TEXT NOT NULL,
    "tema_espiritual" TEXT NOT NULL,
    "tema_fantasia" TEXT NOT NULL,
    "numero_circulos" INTEGER NOT NULL,

    CONSTRAINT "encontro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circulo" (
    "id" TEXT NOT NULL,
    "id_cor_circulo" TEXT NOT NULL,
    "id_tio_aparente" TEXT NOT NULL,
    "id_tio_secreto" TEXT NOT NULL,
    "numero_encontristas" INTEGER NOT NULL,
    "id_encontro" TEXT NOT NULL,

    CONSTRAINT "circulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local" (
    "id" TEXT NOT NULL,
    "endereco_cep" TEXT NOT NULL,
    "nome_local" TEXT NOT NULL,
    "numero_local" TEXT NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carro" (
    "id" TEXT NOT NULL,
    "id_motorista" TEXT NOT NULL,
    "id_carona" TEXT,
    "modelo_carro" TEXT NOT NULL,
    "placa_carro" TEXT NOT NULL,
    "lugares_carro" INTEGER NOT NULL,
    "observacao_motorista" TEXT NOT NULL,

    CONSTRAINT "carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carro_encontro" (
    "id" TEXT NOT NULL,
    "id_carro" TEXT NOT NULL,
    "id_encontrista" TEXT NOT NULL,
    "id_encontro" TEXT NOT NULL,

    CONSTRAINT "carro_encontro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainTamanhoCamisa" (
    "id" TEXT NOT NULL,
    "tamanho_camisa" TEXT NOT NULL,

    CONSTRAINT "domainTamanhoCamisa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainCorCirculo" (
    "id" TEXT NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "domainCorCirculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "encontreiro_id_pessoa_key" ON "encontreiro"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "encontro_numero_encontro_key" ON "encontro"("numero_encontro");

-- CreateIndex
CREATE UNIQUE INDEX "encontro_data_inicio_key" ON "encontro"("data_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "encontro_data_tema_key" ON "encontro"("data_tema");

-- CreateIndex
CREATE UNIQUE INDEX "circulo_id_tio_aparente_key" ON "circulo"("id_tio_aparente");

-- CreateIndex
CREATE UNIQUE INDEX "circulo_id_tio_secreto_key" ON "circulo"("id_tio_secreto");

-- CreateIndex
CREATE UNIQUE INDEX "carro_id_motorista_key" ON "carro"("id_motorista");

-- AddForeignKey
ALTER TABLE "pessoas" ADD CONSTRAINT "pessoas_endereco_cep_fkey" FOREIGN KEY ("endereco_cep") REFERENCES "endereco"("cep") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiro" ADD CONSTRAINT "encontreiro_id_tamanho_camisa_fkey" FOREIGN KEY ("id_tamanho_camisa") REFERENCES "domainTamanhoCamisa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiro" ADD CONSTRAINT "encontreiro_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiro" ADD CONSTRAINT "encontreiro_id_circulo_fkey" FOREIGN KEY ("id_circulo") REFERENCES "circulo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontro" ADD CONSTRAINT "encontro_id_local_fkey" FOREIGN KEY ("id_local") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulo" ADD CONSTRAINT "circulo_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulo" ADD CONSTRAINT "circulo_id_cor_circulo_fkey" FOREIGN KEY ("id_cor_circulo") REFERENCES "domainCorCirculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulo" ADD CONSTRAINT "circulo_id_tio_aparente_fkey" FOREIGN KEY ("id_tio_aparente") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulo" ADD CONSTRAINT "circulo_id_tio_secreto_fkey" FOREIGN KEY ("id_tio_secreto") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_endereco_cep_fkey" FOREIGN KEY ("endereco_cep") REFERENCES "endereco"("cep") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro" ADD CONSTRAINT "carro_id_motorista_fkey" FOREIGN KEY ("id_motorista") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro" ADD CONSTRAINT "carro_id_carona_fkey" FOREIGN KEY ("id_carona") REFERENCES "pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_carro_fkey" FOREIGN KEY ("id_carro") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_encontrista_fkey" FOREIGN KEY ("id_encontrista") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
