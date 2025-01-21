import { seedResumes } from "@/app/resume/_lib/seed-resume";

const main = async () => {
  await seedResumes();
  process.exit(0);
};

main().catch((error) => {
  console.error("Error running seed script:", error);
  process.exit(1);
});
