-- DropForeignKey
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_id_encontrista_fkey";

-- AlterTable
ALTER TABLE "carro_encontro" ADD COLUMN     "idExterna" TEXT;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_encontrista_fkey" FOREIGN KEY ("id_encontrista") REFERENCES "encontristas"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_idExterna_fkey" FOREIGN KEY ("idExterna") REFERENCES "encontreiros"("id_pessoa") ON DELETE SET NULL ON UPDATE CASCADE;
