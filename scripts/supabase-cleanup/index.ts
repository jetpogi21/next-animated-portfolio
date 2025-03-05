//delete test users from cypress.env.json
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createOwnerUser, deleteUserByEmail } from "./libs/supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cleanup = async () => {
  try {
    // Read and parse the cypress.env.json file
    const cypressEnvPath = join(__dirname, "../../cypress.env.json");
    const cypressEnv = JSON.parse(await readFile(cypressEnvPath, "utf-8"));

    const testUserEmail = cypressEnv.TEST_USER_EMAIL;
    const adminUserEmail = cypressEnv.TEST_ADMIN_USER_EMAIL;

    console.log("Starting cleanup of test users...");

    //delete test users
    await deleteUserByEmail("jet_pradas@yahoo.com");
    await deleteUserByEmail("flyffonlines@gmail.com");
    await deleteUserByEmail("unconfirmed_user@example.com");
    await deleteUserByEmail(adminUserEmail);
    await deleteUserByEmail(testUserEmail);

    //This will recreate jet_pradas@yahoo.com
    await createOwnerUser();

    console.log("Successfully cleaned up test users");
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
};

// Execute the cleanup
cleanup();
