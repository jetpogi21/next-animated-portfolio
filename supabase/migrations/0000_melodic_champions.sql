CREATE SCHEMA "portfolio";
--> statement-breakpoint
CREATE TABLE "portfolio"."resume_infos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"info" jsonb NOT NULL
);
