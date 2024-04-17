/*
  Warnings:

  - A unique constraint covering the columns `[cep]` on the table `endereco` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "endereco_cep_key" ON "endereco"("cep");
