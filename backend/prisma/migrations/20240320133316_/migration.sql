/*
  Warnings:

  - You are about to drop the column `description` on the `Cube` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cube" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin";
