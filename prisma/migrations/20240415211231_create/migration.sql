/*
  Warnings:

  - You are about to drop the column `cep` on the `pessoas` table. All the data in the column will be lost.
  - Added the required column `enderecoCep` to the `pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoas" DROP COLUMN "cep",
ADD COLUMN     "enderecoCep" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "endereco" (
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("cep")
);

-- CreateTable
CREATE TABLE "encontrista" (
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
    "id_contato1" TEXT NOT NULL,
    "nome_contato2" TEXT NOT NULL,
    "tel_contato2" TEXT NOT NULL,
    "id_contato2" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "religiao" (
    "id" TEXT NOT NULL,
    "religiao" TEXT NOT NULL,

    CONSTRAINT "religiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bairroEncontro" (
    "id" TEXT NOT NULL,
    "nome_bairro" TEXT NOT NULL,

    CONSTRAINT "bairroEncontro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moraCom" (
    "id" TEXT NOT NULL,
    "mora_com" TEXT NOT NULL,

    CONSTRAINT "moraCom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paisSeparados" (
    "id" TEXT NOT NULL,
    "status_pais" TEXT NOT NULL,

    CONSTRAINT "paisSeparados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relacao" (
    "id" TEXT NOT NULL,
    "relacao" TEXT NOT NULL,

    CONSTRAINT "relacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "encontrista_id_pessoa_key" ON "encontrista"("id_pessoa");

-- AddForeignKey
ALTER TABLE "pessoas" ADD CONSTRAINT "pessoas_enderecoCep_fkey" FOREIGN KEY ("enderecoCep") REFERENCES "endereco"("cep") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_religiao_fkey" FOREIGN KEY ("id_religiao") REFERENCES "religiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_bairro_encontro_fkey" FOREIGN KEY ("id_bairro_encontro") REFERENCES "bairroEncontro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_moracom_fkey" FOREIGN KEY ("id_moracom") REFERENCES "moraCom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_paissep_fkey" FOREIGN KEY ("id_paissep") REFERENCES "paisSeparados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
