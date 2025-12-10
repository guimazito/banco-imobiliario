-- CreateTable
CREATE TABLE `Transaction` (
    `id` CHAR(36) NOT NULL,
    `amount` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `type` ENUM('BETWEEN_PLAYERS', 'PAY_TO_BANK', 'RECEIVE_FROM_BANK') NOT NULL DEFAULT 'BETWEEN_PLAYERS',
    `playerIdPay` CHAR(36) NOT NULL,
    `playerIdReceive` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_playerIdPay_fkey` FOREIGN KEY (`playerIdPay`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_playerIdReceive_fkey` FOREIGN KEY (`playerIdReceive`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
