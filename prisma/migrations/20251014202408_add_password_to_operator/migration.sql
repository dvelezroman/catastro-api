/*
  Warnings:

  - A unique constraint covering the columns `[identification]` on the table `operators` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identification` to the `operators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `operators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "operators" ADD COLUMN     "identification" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "operators_identification_key" ON "operators"("identification");
