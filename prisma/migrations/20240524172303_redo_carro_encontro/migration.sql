/*
  Warnings:

  - The primary key for the `carro_encontro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id_encontrista]` on the table `carro_encontro` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_pkey",
ADD CONSTRAINT "carro_encontro_pkey" PRIMARY KEY ("id_encontro", "numeroCarro");

-- CreateIndex
CREATE UNIQUE INDEX "carro_encontro_id_encontrista_key" ON "carro_encontro"("id_encontrista");
