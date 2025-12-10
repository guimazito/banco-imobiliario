/*
  Warnings:

  - You are about to alter the column `status` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[email]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(6) NULL,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('IDLE', 'RECEIVE', 'PAY') NOT NULL DEFAULT 'IDLE';

-- CreateIndex
CREATE UNIQUE INDEX `Player_email_key` ON `Player`(`email`);
