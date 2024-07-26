/*
  Warnings:

  - The primary key for the `equipes_montagem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idPessoa` on the `equipes_montagem` table. All the data in the column will be lost.
  - Added the required column `idEncontreiro` to the `equipes_montagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "equipes_montagem" DROP CONSTRAINT "equipes_montagem_idPessoa_fkey";

-- AlterTable
ALTER TABLE "equipes_montagem" DROP CONSTRAINT "equipes_montagem_pkey",
DROP COLUMN "idPessoa",
ADD COLUMN     "idEncontreiro" TEXT NOT NULL,
ADD CONSTRAINT "equipes_montagem_pkey" PRIMARY KEY ("idEncontreiro");

-- AddForeignKey
ALTER TABLE "equipes_montagem" ADD CONSTRAINT "equipes_montagem_idEncontreiro_fkey" FOREIGN KEY ("idEncontreiro") REFERENCES "encontreiros"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
