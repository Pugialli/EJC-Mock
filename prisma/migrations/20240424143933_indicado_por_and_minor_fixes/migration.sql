/*
  Warnings:

  - You are about to drop the column `id_paissep` on the `encontristas` table. All the data in the column will be lost.
  - Added the required column `id_statusPais` to the `encontristas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `is_autofill` on the `encontristas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "encontreiros" DROP CONSTRAINT "encontreiros_id_encontro_fkey";

-- DropForeignKey
ALTER TABLE "encontreiros" DROP CONSTRAINT "encontreiros_id_tamanho_camisa_fkey";

-- DropForeignKey
ALTER TABLE "encontristas" DROP CONSTRAINT "encontristas_id_paissep_fkey";

-- DropIndex
DROP INDEX "encontreiros_id_pessoa_key";

-- DropIndex
DROP INDEX "encontristas_id_pessoa_key";

-- DropIndex
DROP INDEX "enderecos_cep_key";

-- AlterTable
ALTER TABLE "encontreiros" ALTER COLUMN "instagram" DROP NOT NULL,
ALTER COLUMN "id_tamanho_camisa" DROP NOT NULL,
ALTER COLUMN "id_encontro" DROP NOT NULL,
ADD CONSTRAINT "encontreiros_pkey" PRIMARY KEY ("id_pessoa");

-- AlterTable
ALTER TABLE "encontristas" DROP COLUMN "id_paissep",
ADD COLUMN     "id_statusPais" TEXT NOT NULL,
ADD COLUMN     "indicado_por_apelido" TEXT,
ADD COLUMN     "indicado_por_email" TEXT,
ADD COLUMN     "indicado_por_nome" TEXT,
ADD COLUMN     "indicado_por_tel" TEXT,
DROP COLUMN "is_autofill",
ADD COLUMN     "is_autofill" BOOLEAN NOT NULL,
ALTER COLUMN "movimento_anterior" DROP NOT NULL,
ALTER COLUMN "observacao" DROP NOT NULL,
ADD CONSTRAINT "encontristas_pkey" PRIMARY KEY ("id_pessoa");

-- AddForeignKey
ALTER TABLE "encontristas" ADD CONSTRAINT "encontristas_id_statusPais_fkey" FOREIGN KEY ("id_statusPais") REFERENCES "domainStatusPais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encontreiros" ADD CONSTRAINT "encontreiros_id_tamanho_camisa_fkey" FOREIGN KEY ("id_tamanho_camisa") REFERENCES "domainTamanhoCamisa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
