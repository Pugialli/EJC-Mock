/*
  Warnings:

  - You are about to drop the column `createdAt` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `accounts` table. All the data in the column will be lost.
  - The `id_tamanho_camisa` column on the `encontreiros` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `domainBairroEncontro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domainCorCirculo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domainMoraCom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domainReligiao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domainStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domainStatusPais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domainTamanhoCamisa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_status` on the `encontristas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_religiao` on the `encontristas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_moracom` on the `encontristas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_statusPais` on the `encontristas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Value_Status" AS ENUM ('confirmado', 'confirmado_sem_sexta', 'desistiu', 'ligar', 'lista_espera', 'nao_atende', 'prox_encontro', 'vai_pensar');

-- CreateEnum
CREATE TYPE "Value_Religiao" AS ENUM ('catolica', 'evangelica', 'espirita', 'matriz_africana', 'judaica', 'nao_tenho', 'outra');

-- CreateEnum
CREATE TYPE "Value_MoraCom" AS ENUM ('sozinho', 'conjuge', 'familiar');

-- CreateEnum
CREATE TYPE "Value_StatusPais" AS ENUM ('sim', 'nao', 'na');

-- CreateEnum
CREATE TYPE "Value_TamanhoCamisa" AS ENUM ('p', 'm', 'g', 'gg', 'xgg', 'outro');

-- DropForeignKey
ALTER TABLE "circulos" DROP CONSTRAINT "circulos_id_cor_circulo_fkey";

-- DropForeignKey
ALTER TABLE "encontreiros" DROP CONSTRAINT "encontreiros_id_tamanho_camisa_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_bairro_encontro_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_moracom_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_religiao_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_statusPais_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_status_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "encontreiros" DROP COLUMN "id_tamanho_camisa",
ADD COLUMN     "id_tamanho_camisa" "Value_TamanhoCamisa";

-- AlterTable
ALTER TABLE "encontristas" DROP COLUMN "id_status",
ADD COLUMN     "id_status" "Value_Status" NOT NULL,
DROP COLUMN "id_religiao",
ADD COLUMN     "id_religiao" "Value_Religiao" NOT NULL,
DROP COLUMN "id_moracom",
ADD COLUMN     "id_moracom" "Value_MoraCom" NOT NULL,
DROP COLUMN "id_statusPais",
ADD COLUMN     "id_statusPais" "Value_StatusPais" NOT NULL;

-- AlterTable
ALTER TABLE "encontros" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "domainBairroEncontro";

-- DropTable
DROP TABLE "domainCorCirculo";

-- DropTable
DROP TABLE "domainMoraCom";

-- DropTable
DROP TABLE "domainReligiao";

-- DropTable
DROP TABLE "domainStatus";

-- DropTable
DROP TABLE "domainStatusPais";

-- DropTable
DROP TABLE "domainTamanhoCamisa";

-- CreateTable
CREATE TABLE "@status" (
    "id" "Value_Status" NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "@status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@religiao" (
    "id" "Value_Religiao" NOT NULL,
    "religiao" TEXT NOT NULL,

    CONSTRAINT "@religiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@bairro_encontro" (
    "id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "zona" TEXT NOT NULL,

    CONSTRAINT "@bairro_encontro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@mora_com" (
    "id" "Value_MoraCom" NOT NULL,
    "mora_com" TEXT NOT NULL,

    CONSTRAINT "@mora_com_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@status_pais" (
    "id" "Value_StatusPais" NOT NULL,
    "status_pais" TEXT NOT NULL,

    CONSTRAINT "@status_pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@tamanho_camisa" (
    "id" "Value_TamanhoCamisa" NOT NULL,
    "tamanho_camisa" TEXT NOT NULL,

    CONSTRAINT "@tamanho_camisa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@cor_circulo" (
    "id" SERIAL NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "@cor_circulo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "@status_id_key" ON "@status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "@status_status_key" ON "@status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "@religiao_id_key" ON "@religiao"("id");

-- CreateIndex
CREATE UNIQUE INDEX "@religiao_religiao_key" ON "@religiao"("religiao");

-- CreateIndex
CREATE UNIQUE INDEX "@bairro_encontro_value_key" ON "@bairro_encontro"("value");

-- CreateIndex
CREATE UNIQUE INDEX "@bairro_encontro_bairro_key" ON "@bairro_encontro"("bairro");

-- CreateIndex
CREATE UNIQUE INDEX "@mora_com_id_key" ON "@mora_com"("id");

-- CreateIndex
CREATE UNIQUE INDEX "@mora_com_mora_com_key" ON "@mora_com"("mora_com");

-- CreateIndex
CREATE UNIQUE INDEX "@status_pais_id_key" ON "@status_pais"("id");

-- CreateIndex
CREATE UNIQUE INDEX "@status_pais_status_pais_key" ON "@status_pais"("status_pais");

-- CreateIndex
CREATE UNIQUE INDEX "@tamanho_camisa_id_key" ON "@tamanho_camisa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "@tamanho_camisa_tamanho_camisa_key" ON "@tamanho_camisa"("tamanho_camisa");

-- CreateIndex
CREATE UNIQUE INDEX "@cor_circulo_cor_key" ON "@cor_circulo"("cor");

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "@status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_religiao_fkey" FOREIGN KEY ("id_religiao") REFERENCES "@religiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_bairro_encontro_fkey" FOREIGN KEY ("id_bairro_encontro") REFERENCES "@bairro_encontro"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_moracom_fkey" FOREIGN KEY ("id_moracom") REFERENCES "@mora_com"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_statusPais_fkey" FOREIGN KEY ("id_statusPais") REFERENCES "@status_pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_tamanho_camisa_fkey" FOREIGN KEY ("id_tamanho_camisa") REFERENCES "@tamanho_camisa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_cor_circulo_fkey" FOREIGN KEY ("id_cor_circulo") REFERENCES "@cor_circulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
