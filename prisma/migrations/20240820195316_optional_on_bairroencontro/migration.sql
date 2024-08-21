-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_bairro_encontro_fkey";

-- AlterTable
ALTER TABLE "encontristas" ALTER COLUMN "id_bairro_encontro" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_bairro_encontro_fkey" FOREIGN KEY ("id_bairro_encontro") REFERENCES "@bairro_encontro"("value") ON DELETE SET NULL ON UPDATE CASCADE;
