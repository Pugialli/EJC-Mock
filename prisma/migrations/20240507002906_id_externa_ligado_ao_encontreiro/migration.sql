-- DropForeignKey
ALTER TABLE "responsavel_externa" DROP CONSTRAINT "responsavel_externa_id_externa_fkey";

-- AddForeignKey
ALTER TABLE "responsavel_externa" ADD CONSTRAINT "responsavel_externa_id_externa_fkey" FOREIGN KEY ("id_externa") REFERENCES "encontreiros"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
