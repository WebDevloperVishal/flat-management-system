-- AddForeignKey
ALTER TABLE `flats` ADD CONSTRAINT `flats_sold_to_user_id_fkey` FOREIGN KEY (`sold_to_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
