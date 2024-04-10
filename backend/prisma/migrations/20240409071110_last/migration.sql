/*
  Warnings:

  - A unique constraint covering the columns `[userId,cubeId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cube" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_cubeId_key" ON "Like"("userId", "cubeId");
