-- DropForeignKey
ALTER TABLE "responsavel_externa" DROP CONSTRAINT "responsavel_externa_id_encontrista_fkey";

-- AddForeignKey
ALTER TABLE "responsavel_externa" ADD CONSTRAINT "responsavel_externa_id_encontrista_fkey" FOREIGN KEY ("id_encontrista") REFERENCES "encontristas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;
