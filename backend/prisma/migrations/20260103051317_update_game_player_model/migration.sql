/*
  Warnings:

  - You are about to drop the column `icon` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `money` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `GamePlayer` ADD COLUMN `playerIcon` ENUM('PIX', 'SAVINGS', 'CREDIT_CARD', 'POINT_OF_SALE', 'MONETIZATION', 'SHOPPING_BAG', 'ACCOUNT_CIRCLE') NOT NULL DEFAULT 'ACCOUNT_CIRCLE',
    ADD COLUMN `playerMoney` INTEGER NOT NULL DEFAULT 25000,
    ADD COLUMN `playerStatus` ENUM('IDLE', 'RECEIVE', 'PAY') NOT NULL DEFAULT 'IDLE';

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `icon`,
    DROP COLUMN `money`,
    DROP COLUMN `status`;
