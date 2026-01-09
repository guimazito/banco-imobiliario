/*
  Warnings:

  - Added the required column `profileId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `profileId` CHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `PlayerProfile` (
    `id` CHAR(36) NOT NULL,
    `profileName` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `PlayerProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
