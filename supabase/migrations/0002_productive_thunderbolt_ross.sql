CREATE TABLE "portfolio"."about_me" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"about_me" text NOT NULL
);
