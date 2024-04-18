/*
  Warnings:

  - You are about to drop the column `username` on the `GoogleUser` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `UserAuthentication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "GoogleUser" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "UserAuthentication" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentication_username_key" ON "UserAuthentication"("username");
