CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`company` text,
	`email` text,
	`phone` text
);

CREATE TABLE `invoice_item` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`hasrate` integer DEFAULT 0 NOT NULL,
	`hours` real DEFAULT 0,
	`rate` real DEFAULT 0,
	`total` real DEFAULT 0
);

CREATE TABLE `user_info` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`company` text,
	`country` text,
	`address` text,
	`zip` integer,
	`phone` text
);
