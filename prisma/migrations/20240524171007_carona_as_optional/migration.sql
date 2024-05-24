-- DropForeignKey
ALTER TABLE "carros" DROP CONSTRAINT "carros_id_carona_fkey";

-- AlterTable
ALTER TABLE "carros" ALTER COLUMN "id_carona" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_id_carona_fkey" FOREIGN KEY ("id_carona") REFERENCES "pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
