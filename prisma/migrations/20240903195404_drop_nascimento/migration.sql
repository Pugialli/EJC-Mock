/*
  Warnings:

  - You are about to drop the column `nascimento` on the `encontreiros` table. All the data in the column will be lost.
  - Made the column `data_nasc` on table `encontreiros` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "encontreiros" DROP COLUMN "nascimento",
ALTER COLUMN "data_nasc" SET NOT NULL;
