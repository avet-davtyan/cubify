/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `UserAuthentication` will be added. If there are existing duplicate values, this will fail.
  - The required column `verificationToken` was added to the `UserAuthentication` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UserAuthentication" ADD COLUMN     "verificationToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentication_verificationToken_key" ON "UserAuthentication"("verificationToken");
