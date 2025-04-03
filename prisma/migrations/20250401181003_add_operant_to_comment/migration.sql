/*
  Warnings:

  - Added the required column `operation` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `operation` VARCHAR(100) NOT NULL;
