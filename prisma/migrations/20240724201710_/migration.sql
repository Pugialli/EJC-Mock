/*
  Warnings:

  - You are about to drop the `EquipeEncontro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ListaPreferencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EquipeEncontro" DROP CONSTRAINT "EquipeEncontro_idEncontro_fkey";

-- DropForeignKey
ALTER TABLE "EquipeEncontro" DROP CONSTRAINT "EquipeEncontro_idEquipe_fkey";

-- DropForeignKey
ALTER TABLE "EquipeEncontro" DROP CONSTRAINT "EquipeEncontro_idPessoa_fkey";

-- DropForeignKey
ALTER TABLE "ListaPreferencia" DROP CONSTRAINT "ListaPreferencia_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "ListaPreferencia" DROP CONSTRAINT "ListaPreferencia_primeiraEquipeValue_fkey";

-- DropForeignKey
ALTER TABLE "ListaPreferencia" DROP CONSTRAINT "ListaPreferencia_segundaEquipeValue_fkey";

-- DropForeignKey
ALTER TABLE "ListaPreferencia" DROP CONSTRAINT "ListaPreferencia_terceiraEquipeValue_fkey";

-- DropTable
DROP TABLE "EquipeEncontro";

-- DropTable
DROP TABLE "ListaPreferencia";

-- CreateTable
CREATE TABLE "lista_preferencia" (
    "id_pessoa" TEXT NOT NULL,
    "posicao" INTEGER NOT NULL,
    "value_equipe" TEXT NOT NULL,

    CONSTRAINT "lista_preferencia_pkey" PRIMARY KEY ("id_pessoa")
);

-- CreateTable
CREATE TABLE "equipes_encontro" (
    "idPessoa" TEXT NOT NULL,
    "idEncontro" TEXT NOT NULL,
    "idEquipe" TEXT NOT NULL,
    "coordenou" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "equipes_encontro_pkey" PRIMARY KEY ("idPessoa","idEncontro")
);

-- AddForeignKey
ALTER TABLE "lista_preferencia" ADD CONSTRAINT "lista_preferencia_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "encontreiros"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lista_preferencia" ADD CONSTRAINT "lista_preferencia_value_equipe_fkey" FOREIGN KEY ("value_equipe") REFERENCES "@equipes"("equipe_value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipes_encontro" ADD CONSTRAINT "equipes_encontro_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "encontreiros"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipes_encontro" ADD CONSTRAINT "equipes_encontro_idEncontro_fkey" FOREIGN KEY ("idEncontro") REFERENCES "encontros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipes_encontro" ADD CONSTRAINT "equipes_encontro_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "@equipes"("equipe_value") ON DELETE RESTRICT ON UPDATE CASCADE;
