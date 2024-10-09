CREATE TABLE `chats` (
	`id` varchar(200) NOT NULL DEFAULT '921dcc02-77c3-4fbe-a0cc-7b79c57be23f',
	`name` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content` text NOT NULL,
	`sent_at` timestamp NOT NULL DEFAULT (now()),
	`chat_id` varchar(200) NOT NULL,
	`user_id` varchar(200) NOT NULL,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`chat_id` varchar(200) NOT NULL,
	`user_id` varchar(200) NOT NULL,
	CONSTRAINT `participants_chat_id_user_id_pk` PRIMARY KEY(`chat_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` varchar(200) NOT NULL DEFAULT '556ed28e-03db-4854-a4c9-05b18ff8501a',
	`value` text NOT NULL,
	`user_id` varchar(200) NOT NULL,
	CONSTRAINT `tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(15) NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` text NOT NULL,
	`imageURL` text NOT NULL DEFAULT ('https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_chat_id_chats_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `participants` ADD CONSTRAINT `participants_chat_id_chats_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `participants` ADD CONSTRAINT `participants_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `index-username` ON `users` (`username`);--> statement-breakpoint
CREATE INDEX `index-email` ON `users` (`email`);