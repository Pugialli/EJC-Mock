/*
  Warnings:

  - You are about to drop the column `id_carona` on the `carros` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'TIOSECRETO';

-- DropForeignKey
ALTER TABLE "carros" DROP CONSTRAINT "carros_id_carona_fkey";

-- AlterTable
ALTER TABLE "carros" DROP COLUMN "id_carona";

-- AlterTable
ALTER TABLE "pessoas" ADD COLUMN     "slug" TEXT;

-- CreateTable
CREATE TABLE "Cartas" (
    "id" TEXT NOT NULL,
    "idEncontrista" TEXT NOT NULL,
    "para" TEXT NOT NULL,
    "de" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cartas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cartas" ADD CONSTRAINT "Cartas_idEncontrista_fkey" FOREIGN KEY ("idEncontrista") REFERENCES "encontristas"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
