-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "pagamento" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informacao" (
    "pagamento" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "produtosId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_produtosTousuarios" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "informacao_descricao_key" ON "informacao"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "_produtosTousuarios_AB_unique" ON "_produtosTousuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_produtosTousuarios_B_index" ON "_produtosTousuarios"("B");

-- AddForeignKey
ALTER TABLE "informacao" ADD CONSTRAINT "informacao_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_produtosTousuarios" ADD FOREIGN KEY ("A") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_produtosTousuarios" ADD FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
