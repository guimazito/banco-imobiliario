/*
  Warnings:

  - A unique constraint covering the columns `[invite]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invite` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Game` ADD COLUMN `invite` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Game_invite_key` ON `Game`(`invite`);
