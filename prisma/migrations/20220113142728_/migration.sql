/*
  Warnings:

  - You are about to drop the column `imagemUrl` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `informacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descricao` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "informacao" DROP CONSTRAINT "informacao_produtosId_fkey";

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "marca" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "imagemUrl";

-- DropTable
DROP TABLE "informacao";
