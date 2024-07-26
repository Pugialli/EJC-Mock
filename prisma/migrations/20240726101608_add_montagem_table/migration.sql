-- CreateTable
CREATE TABLE "equipes_montagem" (
    "idPessoa" TEXT NOT NULL,
    "valueEquipe" TEXT NOT NULL,
    "coordenando" BOOLEAN NOT NULL,

    CONSTRAINT "equipes_montagem_pkey" PRIMARY KEY ("idPessoa")
);

-- AddForeignKey
ALTER TABLE "equipes_montagem" ADD CONSTRAINT "equipes_montagem_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipes_montagem" ADD CONSTRAINT "equipes_montagem_valueEquipe_fkey" FOREIGN KEY ("valueEquipe") REFERENCES "@equipes"("equipe_value") ON DELETE RESTRICT ON UPDATE CASCADE;
