/*
  Warnings:

  - You are about to drop the `bairroEncontro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moraCom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paisSeparados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `relacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `religiao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_bairro_encontro_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_moracom_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_paissep_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_religiao_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_status_fkey";

-- DropTable
DROP TABLE "bairroEncontro";

-- DropTable
DROP TABLE "moraCom";

-- DropTable
DROP TABLE "paisSeparados";

-- DropTable
DROP TABLE "relacao";

-- DropTable
DROP TABLE "religiao";

-- DropTable
DROP TABLE "status";

-- CreateTable
CREATE TABLE "domainStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "domainStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainReligiao" (
    "id" TEXT NOT NULL,
    "religiao" TEXT NOT NULL,

    CONSTRAINT "domainReligiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainBairroEncontro" (
    "id" TEXT NOT NULL,
    "nome_bairro" TEXT NOT NULL,

    CONSTRAINT "domainBairroEncontro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainMoraCom" (
    "id" TEXT NOT NULL,
    "mora_com" TEXT NOT NULL,

    CONSTRAINT "domainMoraCom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainPaisSeparados" (
    "id" TEXT NOT NULL,
    "status_pais" TEXT NOT NULL,

    CONSTRAINT "domainPaisSeparados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domainRelacao" (
    "id" TEXT NOT NULL,
    "relacao" TEXT NOT NULL,

    CONSTRAINT "domainRelacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "domainStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_religiao_fkey" FOREIGN KEY ("id_religiao") REFERENCES "domainReligiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_bairro_encontro_fkey" FOREIGN KEY ("id_bairro_encontro") REFERENCES "domainBairroEncontro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_moracom_fkey" FOREIGN KEY ("id_moracom") REFERENCES "domainMoraCom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_paissep_fkey" FOREIGN KEY ("id_paissep") REFERENCES "domainPaisSeparados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
