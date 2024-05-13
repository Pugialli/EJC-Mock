/*
  Warnings:

  - You are about to drop the `Cartas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cartas" DROP CONSTRAINT "Cartas_idEncontrista_fkey";

-- DropTable
DROP TABLE "Cartas";

-- CreateTable
CREATE TABLE "cartas" (
    "id" TEXT NOT NULL,
    "idEncontrista" TEXT NOT NULL,
    "para" TEXT NOT NULL,
    "de" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cartas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_idEncontrista_fkey" FOREIGN KEY ("idEncontrista") REFERENCES "encontristas"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
