-- DropForeignKey
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_id_carro_fkey";

-- DropForeignKey
ALTER TABLE "carro_encontro" DROP CONSTRAINT "carro_encontro_id_encontrista_fkey";

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_carro_fkey" FOREIGN KEY ("id_carro") REFERENCES "carros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro_encontro" ADD CONSTRAINT "carro_encontro_id_encontrista_fkey" FOREIGN KEY ("id_encontrista") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
