/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `pessoas` table. All the data in the column will be lost.
  - You are about to drop the `carro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `circulo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `encontreiro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `encontrista` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `encontro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `local` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carro" DROP CONSTRAINT "carro_id_carona_fkey";

-- DropForeignKey
ALTER TABLE "carro" DROP CONSTRAINT "carro_id_motorista_fkey";

-- DropForeignKey
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_id_carro_fkey";

-- DropForeignKey
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_id_encontro_fkey";

-- DropForeignKey
ALTER TABLE "circulo" DROP CONSTRAINT "circulo_id_cor_circulo_fkey";

-- DropForeignKey
ALTER TABLE "circulo" DROP CONSTRAINT "circulo_id_encontro_fkey";

-- DropForeignKey
ALTER TABLE "circulo" DROP CONSTRAINT "circulo_id_tio_aparente_fkey";

-- DropForeignKey
ALTER TABLE "circulo" DROP CONSTRAINT "circulo_id_tio_secreto_fkey";

-- DropForeignKey
ALTER TABLE "encontreiro" DROP CONSTRAINT "encontreiro_id_circulo_fkey";

-- DropForeignKey
ALTER TABLE "encontreiro" DROP CONSTRAINT "encontreiro_id_encontro_fkey";

-- DropForeignKey
ALTER TABLE "encontreiro" DROP CONSTRAINT "encontreiro_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "encontreiro" DROP CONSTRAINT "encontreiro_id_tamanho_camisa_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_bairro_encontro_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_moracom_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_paissep_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_religiao_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_status_fkey";

-- DropForeignKey
ALTER TABLE "encontro" DROP CONSTRAINT "encontro_id_local_fkey";

-- DropForeignKey
ALTER TABLE "local" DROP CONSTRAINT "local_endereco_cep_fkey";

-- DropForeignKey
ALTER TABLE "pessoas" DROP CONSTRAINT "pessoas_endereco_cep_fkey";

-- AlterTable
ALTER TABLE "pessoas" DROP COLUMN "avatar_url",
ALTER COLUMN "modified_at" DROP DEFAULT;

-- DropTable
DROP TABLE "carro";

-- DropTable
DROP TABLE "circulo";

-- DropTable
DROP TABLE "encontreiro";

-- DropTable
DROP TABLE "encontrista";

-- DropTable
DROP TABLE "encontro";

-- DropTable
DROP TABLE "endereco";

-- DropTable
DROP TABLE "local";

-- CreateTable
CREATE TABLE "encontristas" (
    "id_pessoa" TEXT NOT NULL,
    "id_status" TEXT NOT NULL,
    "id_religiao" TEXT NOT NULL,
    "is_autofill" TEXT NOT NULL,
    "end_numero" TEXT NOT NULL,
    "end_complemento" TEXT NOT NULL,
    "id_bairro_encontro" TEXT NOT NULL,
    "id_moracom" TEXT NOT NULL,
    "id_paissep" TEXT NOT NULL,
    "movimento_anterior" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "nome_contato1" TEXT NOT NULL,
    "tel_contato1" TEXT NOT NULL,
    "parentesco_contato1" TEXT NOT NULL,
    "nome_contato2" TEXT,
    "tel_contato2" TEXT,
    "parentesco_contato2" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "encontreiros" (
    "id_pessoa" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "apelido" TEXT,
    "instagram" TEXT NOT NULL,
    "restricao_alimentar" TEXT,
    "id_tamanho_camisa" TEXT NOT NULL,
    "id_encontro" TEXT NOT NULL,
    "id_circulo" TEXT
);

-- CreateTable
CREATE TABLE "encontros" (
    "id" TEXT NOT NULL,
    "numero_encontro" INTEGER NOT NULL,
    "data_inicio" TEXT NOT NULL,
    "data_tema" TEXT NOT NULL,
    "id_local" TEXT NOT NULL,
    "tema_espiritual" TEXT NOT NULL,
    "tema_fantasia" TEXT NOT NULL,
    "numero_circulos" INTEGER NOT NULL,

    CONSTRAINT "encontros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circulos" (
    "id" TEXT NOT NULL,
    "id_cor_circulo" INTEGER NOT NULL,
    "id_tio_aparente" TEXT NOT NULL,
    "id_tio_secreto" TEXT NOT NULL,
    "numero_encontristas" INTEGER NOT NULL,
    "id_encontro" TEXT NOT NULL,

    CONSTRAINT "circulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("cep")
);

-- CreateTable
CREATE TABLE "locais" (
    "id" TEXT NOT NULL,
    "endereco_cep" TEXT NOT NULL,
    "nome_local" TEXT NOT NULL,
    "numero_local" TEXT NOT NULL,

    CONSTRAINT "locais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carros" (
    "id" TEXT NOT NULL,
    "id_motorista" TEXT NOT NULL,
    "id_carona" TEXT,
    "modelo_carro" TEXT NOT NULL,
    "placa_carro" TEXT NOT NULL,
    "lugares_carro" INTEGER NOT NULL,
    "observacao_motorista" TEXT NOT NULL,

    CONSTRAINT "carros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "user_email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider","provider_account_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "session_token" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "encontristas_id_pessoa_key" ON "encontristas"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "encontreiros_id_pessoa_key" ON "encontreiros"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "encontros_numero_encontro_key" ON "encontros"("numero_encontro");

-- CreateIndex
CREATE UNIQUE INDEX "encontros_data_inicio_key" ON "encontros"("data_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "encontros_data_tema_key" ON "encontros"("data_tema");

-- CreateIndex
CREATE UNIQUE INDEX "circulos_id_tio_aparente_key" ON "circulos"("id_tio_aparente");

-- CreateIndex
CREATE UNIQUE INDEX "circulos_id_tio_secreto_key" ON "circulos"("id_tio_secreto");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_cep_key" ON "enderecos"("cep");

-- CreateIndex
CREATE UNIQUE INDEX "carros_id_motorista_key" ON "carros"("id_motorista");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- AddForeignKey
ALTER TABLE "pessoas" ADD CONSTRAINT "pessoas_endereco_cep_fkey" FOREIGN KEY ("endereco_cep") REFERENCES "enderecos"("cep") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "domainStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_religiao_fkey" FOREIGN KEY ("id_religiao") REFERENCES "domainReligiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_bairro_encontro_fkey" FOREIGN KEY ("id_bairro_encontro") REFERENCES "domainBairroEncontro"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_moracom_fkey" FOREIGN KEY ("id_moracom") REFERENCES "domainMoraCom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_paissep_fkey" FOREIGN KEY ("id_paissep") REFERENCES "domainStatusPais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_tamanho_camisa_fkey" FOREIGN KEY ("id_tamanho_camisa") REFERENCES "domainTamanhoCamisa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_circulo_fkey" FOREIGN KEY ("id_circulo") REFERENCES "circulos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontros" ADD CONSTRAINT "encontros_id_local_fkey" FOREIGN KEY ("id_local") REFERENCES "locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_cor_circulo_fkey" FOREIGN KEY ("id_cor_circulo") REFERENCES "domainCorCirculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_tio_aparente_fkey" FOREIGN KEY ("id_tio_aparente") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_tio_secreto_fkey" FOREIGN KEY ("id_tio_secreto") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locais" ADD CONSTRAINT "locais_endereco_cep_fkey" FOREIGN KEY ("endereco_cep") REFERENCES "enderecos"("cep") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_id_motorista_fkey" FOREIGN KEY ("id_motorista") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_id_carona_fkey" FOREIGN KEY ("id_carona") REFERENCES "pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_carro_fkey" FOREIGN KEY ("id_carro") REFERENCES "carros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
