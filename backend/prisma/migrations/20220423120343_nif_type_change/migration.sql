/*
  Warnings:

  - You are about to drop the column `email` on the `cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `email`,
    MODIFY `nif` VARCHAR(50) NOT NULL;
