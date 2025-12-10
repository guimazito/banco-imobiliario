/*
  Warnings:

  - You are about to alter the column `icon` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Player` MODIFY `icon` ENUM('PIX', 'SAVINGS', 'CREDIT_CARD', 'POINT_OF_SALE', 'MONETIZATION', 'SHOPPING_BAG', 'ACCOUNT_CIRCLE') NOT NULL DEFAULT 'ACCOUNT_CIRCLE';
