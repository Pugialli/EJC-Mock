/*
  Warnings:

  - Changed the type of `end_numero` on the `encontristas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "encontristas" DROP COLUMN "end_numero",
ADD COLUMN     "end_numero" INTEGER NOT NULL;
