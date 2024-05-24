/*
  Warnings:

  - The primary key for the `carro_encontro` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_pkey",
ADD CONSTRAINT "carro_encontro_pkey" PRIMARY KEY ("id_encontro", "numeroCarro", "id_encontrista");
