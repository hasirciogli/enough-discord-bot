-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discordId` BIGINT NOT NULL,
    `coin` DECIMAL(65, 30) NOT NULL DEFAULT 300,

    UNIQUE INDEX `Users_id_key`(`id`),
    UNIQUE INDEX `Users_discordId_key`(`discordId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
