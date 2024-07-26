-- CreateEnum
CREATE TYPE "StatusEncontreiro" AS ENUM ('ATIVO', 'CONVIDADO_ESPECIAL', 'INATIVO');

-- AlterTable
ALTER TABLE "encontreiros" ADD COLUMN     "statusMontagem" "StatusEncontreiro";
