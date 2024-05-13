/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `pessoas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pessoas" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_slug_key" ON "pessoas"("slug");
