/*
  Warnings:

  - Made the column `id` on table `carro_encontro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "carro_encontro" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "carro_encontro_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_carro_encontro_fkey" FOREIGN KEY ("id_carro_encontro") REFERENCES "carro_encontro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
