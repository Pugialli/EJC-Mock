/*
  Warnings:

  - The primary key for the `lista_preferencia` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "lista_preferencia" DROP CONSTRAINT "lista_preferencia_id_pessoa_fkey";

-- AlterTable
ALTER TABLE "lista_preferencia" DROP CONSTRAINT "lista_preferencia_pkey",
ADD CONSTRAINT "lista_preferencia_pkey" PRIMARY KEY ("id_pessoa", "posicao");

-- AddForeignKey
ALTER TABLE "lista_preferencia" ADD CONSTRAINT "lista_preferencia_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "encontreiros"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;
