/*
  Warnings:

  - The primary key for the `@equipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `equipe` on the `@equipes` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `@equipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[equipe_label]` on the table `@equipes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `equipe_label` to the `@equipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipe_value` to the `@equipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EquipeEncontro" DROP CONSTRAINT "EquipeEncontro_idEquipe_fkey";

-- DropIndex
DROP INDEX "@equipes_equipe_key";

-- AlterTable
ALTER TABLE "@equipes" DROP CONSTRAINT "@equipes_pkey",
DROP COLUMN "equipe",
DROP COLUMN "id",
ADD COLUMN     "equipe_label" TEXT NOT NULL,
ADD COLUMN     "equipe_value" TEXT NOT NULL,
ADD CONSTRAINT "@equipes_pkey" PRIMARY KEY ("equipe_value");

-- AlterTable
ALTER TABLE "EquipeEncontro" ALTER COLUMN "idEquipe" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "@equipes_equipe_label_key" ON "@equipes"("equipe_label");

-- AddForeignKey
ALTER TABLE "EquipeEncontro" ADD CONSTRAINT "EquipeEncontro_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "@equipes"("equipe_value") ON DELETE RESTRICT ON UPDATE CASCADE;
