/*
  Warnings:

  - You are about to drop the column `status` on the `@equipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[equipe]` on the table `@equipes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `equipe` to the `@equipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "@equipes_status_key";

-- AlterTable
ALTER TABLE "@equipes" DROP COLUMN "status",
ADD COLUMN     "equipe" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "@equipes_equipe_key" ON "@equipes"("equipe");
