CREATE TABLE "portfolio"."job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_name" text NOT NULL,
	"job_title" text NOT NULL,
	"job_description" text,
	"date_applied" timestamp DEFAULT now(),
	"status" text DEFAULT 'Applied',
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "portfolio"."resume_infos" ADD COLUMN "job_application_id" uuid;--> statement-breakpoint
ALTER TABLE "portfolio"."resume_infos" ADD CONSTRAINT "resume_infos_job_application_id_job_applications_id_fk" FOREIGN KEY ("job_application_id") REFERENCES "portfolio"."job_applications"("id") ON DELETE no action ON UPDATE no action;