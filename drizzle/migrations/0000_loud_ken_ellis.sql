CREATE TABLE `Task` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`taskname` varchar(255) NOT NULL,
	`status` varchar(15) NOT NULL,
	CONSTRAINT `Task_id` PRIMARY KEY(`id`)
);
