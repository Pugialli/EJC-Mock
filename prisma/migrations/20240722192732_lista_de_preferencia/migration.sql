/*
  Warnings:

  - You are about to drop the column `primeiro` on the `ListaPreferencia` table. All the data in the column will be lost.
  - You are about to drop the column `segundo` on the `ListaPreferencia` table. All the data in the column will be lost.
  - You are about to drop the column `terceiro` on the `ListaPreferencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListaPreferencia" DROP COLUMN "primeiro",
DROP COLUMN "segundo",
DROP COLUMN "terceiro",
ADD COLUMN     "primeiraEquipeValue" TEXT,
ADD COLUMN     "segundaEquipeValue" TEXT,
ADD COLUMN     "terceiraEquipeValue" TEXT;

-- AddForeignKey
ALTER TABLE "ListaPreferencia" ADD CONSTRAINT "ListaPreferencia_primeiraEquipeValue_fkey" FOREIGN KEY ("primeiraEquipeValue") REFERENCES "@equipes"("equipe_value") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaPreferencia" ADD CONSTRAINT "ListaPreferencia_segundaEquipeValue_fkey" FOREIGN KEY ("segundaEquipeValue") REFERENCES "@equipes"("equipe_value") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaPreferencia" ADD CONSTRAINT "ListaPreferencia_terceiraEquipeValue_fkey" FOREIGN KEY ("terceiraEquipeValue") REFERENCES "@equipes"("equipe_value") ON DELETE SET NULL ON UPDATE CASCADE;
