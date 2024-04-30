/*
  Warnings:

  - Made the column `side1` on table `Cube` required. This step will fail if there are existing NULL values in that column.
  - Made the column `side2` on table `Cube` required. This step will fail if there are existing NULL values in that column.
  - Made the column `side3` on table `Cube` required. This step will fail if there are existing NULL values in that column.
  - Made the column `side4` on table `Cube` required. This step will fail if there are existing NULL values in that column.
  - Made the column `side5` on table `Cube` required. This step will fail if there are existing NULL values in that column.
  - Made the column `side6` on table `Cube` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cube" ALTER COLUMN "side1" SET NOT NULL,
ALTER COLUMN "side2" SET NOT NULL,
ALTER COLUMN "side3" SET NOT NULL,
ALTER COLUMN "side4" SET NOT NULL,
ALTER COLUMN "side5" SET NOT NULL,
ALTER COLUMN "side6" SET NOT NULL;
