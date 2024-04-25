ALTER TABLE "comment" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "parent_id" uuid;