-- DropForeignKey
ALTER TABLE "equipes_encontro" DROP CONSTRAINT "equipes_encontro_idPessoa_fkey";

-- AlterTable
ALTER TABLE "carro_encontro" ADD COLUMN     "observacao" TEXT;

-- AddForeignKey
ALTER TABLE "equipes_encontro" ADD CONSTRAINT "equipes_encontro_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "encontreiros"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;
