-- AlterTable
ALTER TABLE "encontreiros" ADD COLUMN     "data_nasc" TIMESTAMP(3),
ALTER COLUMN "nascimento" DROP NOT NULL;
