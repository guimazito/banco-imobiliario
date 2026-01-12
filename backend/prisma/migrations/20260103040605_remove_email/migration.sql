/*
  Warnings:

  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Player_email_key` ON `Player`;

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Player_username_key` ON `Player`(`username`);
