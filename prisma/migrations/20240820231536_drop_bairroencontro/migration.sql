/*
  Warnings:

  - You are about to drop the column `id_bairro_encontro` on the `encontristas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_bairro_encontro_fkey";

-- AlterTable
ALTER TABLE "encontristas" DROP COLUMN "id_bairro_encontro",
ADD COLUMN     "domainBairroEncontroId" INTEGER;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_domainBairroEncontroId_fkey" FOREIGN KEY ("domainBairroEncontroId") REFERENCES "@bairro_encontro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
