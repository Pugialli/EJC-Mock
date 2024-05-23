/*
  Warnings:

  - Added the required column `numeroCarro` to the `carro_encontro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_carona` to the `carros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carro_encontro" ADD COLUMN     "numeroCarro" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "carros" ADD COLUMN     "id_carona" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_id_carona_fkey" FOREIGN KEY ("id_carona") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
