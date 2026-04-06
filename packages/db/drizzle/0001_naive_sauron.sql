ALTER TABLE `hosts` ADD `slug` text;--> statement-breakpoint
CREATE UNIQUE INDEX `hosts_slug_unique` ON `hosts` (`slug`);