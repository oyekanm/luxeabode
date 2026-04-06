PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_hosts` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`business_name` text NOT NULL,
	`slug` text ,
	`phone` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`country` text DEFAULT 'Nigeria' NOT NULL,
	`govt_id_key` text,
	`cac_doc_key` text,
	`bank_name` text,
	`bank_account` text NOT NULL,
	`bank_code` text,
	`account_holder_name` text,
	`commission_rate` real DEFAULT 0.1 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`rejection_reason` text,
	`rejected_at` integer,
	`rejected_name` text,
	`approved_at` integer,
	`approved_name` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
INSERT INTO `__new_hosts`("id", "owner_id", "business_name", "slug", "phone", "address", "city", "state", "country", "govt_id_key", "cac_doc_key", "bank_name", "bank_account", "bank_code", "account_holder_name", "commission_rate", "status", "rejection_reason", "rejected_at", "rejected_name", "approved_at", "approved_name", "created_at", "updated_at") SELECT "id", "owner_id", "business_name", "slug", "phone", "address", "city", "state", "country", "govt_id_key", "cac_doc_key", "bank_name", "bank_account", "bank_code", "account_holder_name", "commission_rate", "status", "rejection_reason", "rejected_at", "rejected_name", "approved_at", "approved_name", "created_at", "updated_at" FROM `hosts`;--> statement-breakpoint
DROP TABLE `hosts`;--> statement-breakpoint
ALTER TABLE `__new_hosts` RENAME TO `hosts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `hosts_owner_id_unique` ON `hosts` (`owner_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `hosts_slug_unique` ON `hosts` (`slug`);