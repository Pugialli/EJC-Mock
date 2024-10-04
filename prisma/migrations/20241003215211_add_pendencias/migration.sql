-- AlterTable
ALTER TABLE "encontristas" ADD COLUMN     "cartas_ok" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "familia_ok" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "generosa_ok" BOOLEAN NOT NULL DEFAULT false;
