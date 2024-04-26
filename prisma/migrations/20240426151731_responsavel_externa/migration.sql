-- CreateTable
CREATE TABLE "responsavel_externa" (
    "id_externa" TEXT NOT NULL,
    "id_encontrista" TEXT NOT NULL,
    "id_encontro" TEXT NOT NULL,

    CONSTRAINT "responsavel_externa_pkey" PRIMARY KEY ("id_encontrista","id_encontro")
);

-- CreateIndex
CREATE UNIQUE INDEX "responsavel_externa_id_encontrista_key" ON "responsavel_externa"("id_encontrista");

-- AddForeignKey
ALTER TABLE "responsavel_externa" ADD CONSTRAINT "responsavel_externa_id_externa_fkey" FOREIGN KEY ("id_externa") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsavel_externa" ADD CONSTRAINT "responsavel_externa_id_encontrista_fkey" FOREIGN KEY ("id_encontrista") REFERENCES "encontristas"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsavel_externa" ADD CONSTRAINT "responsavel_externa_id_encontro_fkey" FOREIGN KEY ("id_encontro") REFERENCES "encontros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
