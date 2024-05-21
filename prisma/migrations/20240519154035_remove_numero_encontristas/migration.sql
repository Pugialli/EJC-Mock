/*
  Warnings:

  - You are about to drop the column `numero_encontristas` on the `circulos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "circulos" DROP CONSTRAINT "circulos_id_tio_aparente_fkey";

-- DropForeignKey
ALTER TABLE "circulos" DROP CONSTRAINT "circulos_id_tio_secreto_fkey";

-- AlterTable
ALTER TABLE "circulos" DROP COLUMN "numero_encontristas",
ALTER COLUMN "id_tio_aparente" DROP NOT NULL,
ALTER COLUMN "id_tio_secreto" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_tio_aparente_fkey" FOREIGN KEY ("id_tio_aparente") REFERENCES "pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circulos" ADD CONSTRAINT "circulos_id_tio_secreto_fkey" FOREIGN KEY ("id_tio_secreto") REFERENCES "pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
