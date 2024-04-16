/*
  Warnings:

  - A unique constraint covering the columns `[id_contato1]` on the table `encontrista` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "encontrista_id_contato1_key" ON "encontrista"("id_contato1");

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_contato1_fkey" FOREIGN KEY ("id_contato1") REFERENCES "domainRelacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_contato2_fkey" FOREIGN KEY ("id_contato2") REFERENCES "domainRelacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
