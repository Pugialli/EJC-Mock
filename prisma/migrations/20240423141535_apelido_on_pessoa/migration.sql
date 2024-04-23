/*
  Warnings:

  - You are about to drop the column `apelido` on the `encontreiros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "encontreiros" DROP COLUMN "apelido";

-- AlterTable
ALTER TABLE "pessoas" ADD COLUMN     "apelido" TEXT;
