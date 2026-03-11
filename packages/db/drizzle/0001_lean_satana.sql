ALTER TABLE `room_images` RENAME COLUMN "r2_key" TO "key";--> statement-breakpoint
ALTER TABLE `rooms` ADD `has_sitting_room` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `floor_number`;--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `size_m2`;--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `cleaning_fee`;--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `security_deposit`;--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `cover_image_key`;--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `sort_order`;