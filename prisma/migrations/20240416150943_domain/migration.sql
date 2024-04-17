/*
  Warnings:

  - The primary key for the `carro_encontro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `carro_encontro` table. All the data in the column will be lost.
  - The primary key for the `domainBairroEncontro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nome_bairro` on the `domainBairroEncontro` table. All the data in the column will be lost.
  - The primary key for the `domainCorCirculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `domainCorCirculo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `id_contato1` on the `encontrista` table. All the data in the column will be lost.
  - You are about to drop the column `id_contato2` on the `encontrista` table. All the data in the column will be lost.
  - You are about to drop the `domainRelacao` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_carro,id_encontrista,id_encontro]` on the table `carro_encontro` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `domainBairroEncontro` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bairro]` on the table `domainBairroEncontro` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cor]` on the table `domainCorCirculo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `domainMoraCom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mora_com]` on the table `domainMoraCom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `domainPaisSeparados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status_pais]` on the table `domainPaisSeparados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `domainReligiao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[religiao]` on the table `domainReligiao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `domainStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `domainStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `domainTamanhoCamisa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tamanho_camisa]` on the table `domainTamanhoCamisa` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id_cor_circulo` on the `circulo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `bairro` to the `domainBairroEncontro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `domainBairroEncontro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zona` to the `domainBairroEncontro` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `domainBairroEncontro` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `parentesco_contato1` to the `encontrista` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "circulo" DROP CONSTRAINT "circulo_id_cor_circulo_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_bairro_encontro_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_contato1_fkey";

-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_contato2_fkey";

-- DropIndex
DROP INDEX "encontrista_id_contato1_key";

-- AlterTable
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "circulo" DROP COLUMN "id_cor_circulo",
ADD COLUMN     "id_cor_circulo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "domainBairroEncontro" DROP CONSTRAINT "domainBairroEncontro_pkey",
DROP COLUMN "nome_bairro",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
ADD COLUMN     "zona" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "domainBairroEncontro_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "domainCorCirculo" DROP CONSTRAINT "domainCorCirculo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "domainCorCirculo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "encontrista" DROP COLUMN "id_contato1",
DROP COLUMN "id_contato2",
ADD COLUMN     "parentesco_contato1" TEXT NOT NULL,
ADD COLUMN     "parentesco_contato2" TEXT,
ALTER COLUMN "nome_contato2" DROP NOT NULL,
ALTER COLUMN "tel_contato2" DROP NOT NULL;

-- DropTable
DROP TABLE "domainRelacao";

-- CreateIndex
CREATE UNIQUE INDEX "carro_encontro_id_carro_id_encontrista_id_encontro_key" ON "carro_encontro"("id_carro", "id_encontrista", "id_encontro");

-- CreateIndex
CREATE UNIQUE INDEX "domainBairroEncontro_value_key" ON "domainBairroEncontro"("value");

-- CreateIndex
CREATE UNIQUE INDEX "domainBairroEncontro_bairro_key" ON "domainBairroEncontro"("bairro");

-- CreateIndex
CREATE UNIQUE INDEX "domainCorCirculo_cor_key" ON "domainCorCirculo"("cor");

-- CreateIndex
CREATE UNIQUE INDEX "domainMoraCom_id_key" ON "domainMoraCom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "domainMoraCom_mora_com_key" ON "domainMoraCom"("mora_com");

-- CreateIndex
CREATE UNIQUE INDEX "domainPaisSeparados_id_key" ON "domainPaisSeparados"("id");

-- CreateIndex
CREATE UNIQUE INDEX "domainPaisSeparados_status_pais_key" ON "domainPaisSeparados"("status_pais");

-- CreateIndex
CREATE UNIQUE INDEX "domainReligiao_id_key" ON "domainReligiao"("id");

-- CreateIndex
CREATE UNIQUE INDEX "domainReligiao_religiao_key" ON "domainReligiao"("religiao");

-- CreateIndex
CREATE UNIQUE INDEX "domainStatus_id_key" ON "domainStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "domainStatus_status_key" ON "domainStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "domainTamanhoCamisa_id_key" ON "domainTamanhoCamisa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "domainTamanhoCamisa_tamanho_camisa_key" ON "domainTamanhoCamisa"("tamanho_camisa");

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_bairro_encontro_fkey" FOREIGN KEY ("id_bairro_encontro") REFERENCES "domainBairroEncontro"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulo" ADD CONSTRAINT "circulo_id_cor_circulo_fkey" FOREIGN KEY ("id_cor_circulo") REFERENCES "domainCorCirculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
