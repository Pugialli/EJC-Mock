-- DropForeignKey
ALTER TABLE "encontreiros" DROP CONSTRAINT "encontreiros_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_pessoa_fkey";

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
