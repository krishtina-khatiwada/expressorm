CREATE TABLE `userPreferences ` (

);
--> statement-breakpoint
ALTER TABLE `users_table` ADD `userrole` enum('ADMIN','BASIC') DEFAULT 'BASIC' NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD CONSTRAINT `emailindex` UNIQUE(`email`);