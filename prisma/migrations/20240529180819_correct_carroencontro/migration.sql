/*
  Warnings:

  - The primary key for the `carro_encontro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_encontrista` on the `carro_encontro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_carro,id_encontro]` on the table `carro_encontro` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_id_encontrista_fkey";

-- DropIndex
DROP INDEX "carro_encontro_id_encontrista_key";

-- AlterTable
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_pkey",
DROP COLUMN "id_encontrista",
ADD COLUMN     "id" TEXT;

-- AlterTable
ALTER TABLE "encontristas" ADD COLUMN     "id_carro_encontro" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "carro_encontro_id_carro_id_encontro_key" ON "carro_encontro"("id_carro", "id_encontro");
