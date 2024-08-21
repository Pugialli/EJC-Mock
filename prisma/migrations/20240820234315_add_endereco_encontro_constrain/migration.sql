/*
  Warnings:

  - You are about to drop the column `domainBairroEncontroId` on the `encontristas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_domainBairroEncontroId_fkey";

-- AlterTable
ALTER TABLE "encontristas" DROP COLUMN "domainBairroEncontroId";

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_cep_encontro_fkey" FOREIGN KEY ("cep_encontro") REFERENCES "enderecos"("cep") ON DELETE SET NULL ON UPDATE CASCADE;
