/*
  Warnings:

  - A unique constraint covering the columns `[predecessorId]` on the table `comment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `predecessorId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `comment_predecessorId_key` ON `comment`(`predecessorId`);

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_predecessorId_fkey` FOREIGN KEY (`predecessorId`) REFERENCES `comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
