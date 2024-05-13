/*
  Warnings:

  - You are about to drop the column `idEncontrista` on the `cartas` table. All the data in the column will be lost.
  - Added the required column `slugEncontrista` to the `cartas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cartas" DROP CONSTRAINT "cartas_idEncontrista_fkey";

-- AlterTable
ALTER TABLE "cartas" DROP COLUMN "idEncontrista",
ADD COLUMN     "slugEncontrista" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_slugEncontrista_fkey" FOREIGN KEY ("slugEncontrista") REFERENCES "pessoas"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
