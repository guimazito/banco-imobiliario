/*
  Warnings:

  - You are about to drop the column `gameId` on the `Player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Player` DROP FOREIGN KEY `Player_gameId_fkey`;

-- DropIndex
DROP INDEX `Player_gameId_fkey` ON `Player`;

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `gameId`;

-- CreateTable
CREATE TABLE `GamePlayer` (
    `gameId` CHAR(36) NOT NULL,
    `playerId` CHAR(36) NOT NULL,

    PRIMARY KEY (`gameId`, `playerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GamePlayer` ADD CONSTRAINT `GamePlayer_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GamePlayer` ADD CONSTRAINT `GamePlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
