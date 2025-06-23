ALTER TABLE `users_table` DROP INDEX `emailindex`;--> statement-breakpoint
ALTER TABLE `users_table` ADD `role` enum('ADMIN','BASIC') DEFAULT 'BASIC' NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `userrole`;