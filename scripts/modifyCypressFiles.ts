import * as fs from "fs";
import * as path from "path";
import { ENV_MAP } from "./env";
import { isValidKey } from "@/lib/utils/typescript";

// Define a type for valid app codes

/**
 * Updates the APP_NAME in cypress.env.json and modifies the Supabase URL and service key references
 * in cypress/support/supabase.ts based on the provided app code
 * @param appCode - The application code (BRAM, VERONIQUE, MIT)
 */
export const modifyCypressFiles = (appCode: keyof typeof ENV_MAP): void => {
  try {
    console.log(`Modifying Cypress files for app code: ${appCode}`);

    // Update APP_NAME in cypress.env.json
    updateCypressEnvJson(appCode);

    // Update Supabase references in cypress/support/supabase.ts
    updateSupabaseTs(appCode);

    console.log("Cypress files modified successfully");
  } catch (error) {
    console.error("Error modifying Cypress files:", error);
    throw error;
  }
};

/**
 * Updates the APP_NAME in cypress.env.json based on the app code
 * @param appCode - The application code (BRAM, VERONIQUE, MIT)
 */
const updateCypressEnvJson = (appCode: keyof typeof ENV_MAP): void => {
  try {
    const cypressEnvPath = path.resolve(process.cwd(), "cypress.env.json");

    // Read the current cypress.env.json file
    const cypressEnvContent = fs.readFileSync(cypressEnvPath, "utf8");
    const cypressEnv = JSON.parse(cypressEnvContent);

    // Get the app name from ENV_MAP
    const appName = ENV_MAP[appCode].NEXT_PUBLIC_APP_NAME;

    // Update the APP_NAME
    cypressEnv.APP_NAME = appName;

    // Write the updated content back to the file
    fs.writeFileSync(
      cypressEnvPath,
      JSON.stringify(cypressEnv, null, 2),
      "utf8"
    );

    console.log(`Updated APP_NAME in cypress.env.json to "${appName}"`);
  } catch (error) {
    console.error("Error updating cypress.env.json:", error);
    throw error;
  }
};

/**
 * Updates the Supabase URL and service key references in cypress/support/supabase.ts
 * @param appCode - The application code (BRAM, VERONIQUE, MIT)
 */
const updateSupabaseTs = (appCode: keyof typeof ENV_MAP): void => {
  try {
    const supabaseTsPath = path.resolve(
      process.cwd(),
      "cypress/support/supabase.ts"
    );

    // Read the current supabase.ts file
    let supabaseTsContent = fs.readFileSync(supabaseTsPath, "utf8");

    // Replace the Supabase URL and service key references
    supabaseTsContent = supabaseTsContent.replace(
      /const supabaseUrl = Cypress\.env\("([A-Z]+)_SUPABASE_URL"\);/,
      `const supabaseUrl = Cypress.env("${appCode}_SUPABASE_URL");`
    );

    supabaseTsContent = supabaseTsContent.replace(
      /const supabaseKey = Cypress\.env\("([A-Z]+)_SUPABASE_SERVICE_KEY"\);/,
      `const supabaseKey = Cypress.env("${appCode}_SUPABASE_SERVICE_KEY");`
    );

    // Write the updated content back to the file
    fs.writeFileSync(supabaseTsPath, supabaseTsContent, "utf8");

    console.log(
      `Updated Supabase references in cypress/support/supabase.ts to use ${appCode} environment variables`
    );
  } catch (error) {
    console.error("Error updating cypress/support/supabase.ts:", error);
    throw error;
  }
};
