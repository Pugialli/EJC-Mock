-- CreateEnum
CREATE TYPE "DisponibilidadePre" AS ENUM ('MUITO_BAIXA', 'BAIXA', 'MEDIA', 'ALTA', 'MUITO_ALTA');

-- AlterTable
ALTER TABLE "encontreiros" ADD COLUMN     "disponibilidade" "DisponibilidadePre",
ADD COLUMN     "obs_banda" TEXT,
ADD COLUMN     "observacoes" TEXT;

-- CreateTable
CREATE TABLE "ListaPreferencia" (
    "id_pessoa" TEXT NOT NULL,
    "primeiro" TEXT,
    "segundo" TEXT,
    "terceiro" TEXT,

    CONSTRAINT "ListaPreferencia_pkey" PRIMARY KEY ("id_pessoa")
);

-- CreateTable
CREATE TABLE "EquipeEncontro" (
    "idPessoa" TEXT NOT NULL,
    "idEncontro" TEXT NOT NULL,
    "idEquipe" INTEGER NOT NULL,
    "coordenou" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EquipeEncontro_pkey" PRIMARY KEY ("idPessoa","idEncontro")
);

-- CreateTable
CREATE TABLE "@equipes" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "@equipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "@equipes_status_key" ON "@equipes"("status");

-- AddForeignKey
ALTER TABLE "ListaPreferencia" ADD CONSTRAINT "ListaPreferencia_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "encontreiros"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipeEncontro" ADD CONSTRAINT "EquipeEncontro_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "encontreiros"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipeEncontro" ADD CONSTRAINT "EquipeEncontro_idEncontro_fkey" FOREIGN KEY ("idEncontro") REFERENCES "encontros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipeEncontro" ADD CONSTRAINT "EquipeEncontro_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "@equipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
