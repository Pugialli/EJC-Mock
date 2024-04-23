/*
  Warnings:

  - You are about to drop the column `createdAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_motorista,placa_carro]` on the table `carros` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `data_inicio` on the `encontros` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data_tema` on the `encontros` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "carro_encontro_id_carro_id_encontrista_id_encontro_key";

-- DropIndex
DROP INDEX "carros_id_motorista_key";

-- AlterTable
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_pkey" PRIMARY KEY ("id_carro", "id_encontrista", "id_encontro");

-- AlterTable
ALTER TABLE "encontros" DROP COLUMN "data_inicio",
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL,
DROP COLUMN "data_tema",
ADD COLUMN     "data_tema" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "verification_tokens";

-- CreateIndex
CREATE UNIQUE INDEX "carros_id_motorista_placa_carro_key" ON "carros"("id_motorista", "placa_carro");

-- CreateIndex
CREATE UNIQUE INDEX "encontros_data_inicio_key" ON "encontros"("data_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "encontros_data_tema_key" ON "encontros"("data_tema");
