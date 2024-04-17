/*
  Warnings:

  - You are about to drop the `domainPaisSeparados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "encontrista" DROP CONSTRAINT "encontrista_id_paissep_fkey";

-- DropTable
DROP TABLE "domainPaisSeparados";

-- CreateTable
CREATE TABLE "domainStatusPais" (
    "id" TEXT NOT NULL,
    "status_pais" TEXT NOT NULL,

    CONSTRAINT "domainStatusPais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domainStatusPais_id_key" ON "domainStatusPais"("id");

-- CreateIndex
CREATE UNIQUE INDEX "domainStatusPais_status_pais_key" ON "domainStatusPais"("status_pais");

-- AddForeignKey
ALTER TABLE "encontrista" ADD CONSTRAINT "encontrista_id_paissep_fkey" FOREIGN KEY ("id_paissep") REFERENCES "domainStatusPais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
