import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { ENV_MAP } from "./env.js";

// Load environment variables from .env file
dotenv.config();

// Define the app code type to match the keys in ENV_MAP
type AppCode = keyof typeof ENV_MAP;

/**
 * Updates the Cypress configuration file to use either local or production URLs
 * @param isProduction - Whether to use production URLs
 * @param productionUrl - The production URL to use (if in production mode)
 */
const updateCypressConfig = (isProduction: boolean, productionUrl?: string) => {
  const configPath = path.resolve(process.cwd(), "cypress.config.ts");

  if (!fs.existsSync(configPath)) {
    throw new Error("Cypress config file not found");
  }

  let configContent = fs.readFileSync(configPath, "utf8");

  // Define the URLs based on the mode
  const baseUrl =
    isProduction && productionUrl ? productionUrl : "http://localhost:3000";

  // Update the baseUrl and apiUrl in the config
  configContent = configContent.replace(
    /baseUrl: ".*?"/,
    `baseUrl: "${baseUrl}"`
  );

  configContent = configContent.replace(
    /apiUrl: ".*?"/,
    `apiUrl: "${baseUrl}"`
  );

  // Write the updated config back to the file
  fs.writeFileSync(configPath, configContent);

  console.log(
    `Cypress config updated to use ${
      isProduction ? "production" : "local"
    } URLs`
  );
  console.log(`Base URL: ${baseUrl}`);
};

/**
 * Finds the app code based on the current NEXT_PUBLIC_APP_NAME in .env
 * @returns The app code (BRAM, VERONIQUE, MIT, etc.)
 */
const findCurrentAppCode = (): AppCode | null => {
  const currentAppName = process.env.NEXT_PUBLIC_APP_NAME;

  if (!currentAppName) {
    throw new Error("NEXT_PUBLIC_APP_NAME not found in .env file");
  }

  // Find the app code by matching the NEXT_PUBLIC_APP_NAME
  for (const [appCode, envVars] of Object.entries(ENV_MAP)) {
    if (envVars.NEXT_PUBLIC_APP_NAME === currentAppName) {
      return appCode as AppCode;
    }
  }

  return null;
};

/**
 * Main function to run the setup process
 */
const main = () => {
  try {
    // Check if --production flag is provided
    const isProduction = process.argv.includes("--production");

    // Find the current app code
    const appCode = findCurrentAppCode();

    if (!appCode) {
      throw new Error(
        `Could not find app code for app name: ${process.env.NEXT_PUBLIC_APP_NAME}`
      );
    }

    console.log(`Current app: ${appCode}`);

    // Get the production URL if in production mode
    let productionUrl;
    if (isProduction) {
      productionUrl = ENV_MAP[appCode].PRODUCTION_URL;

      if (!productionUrl) {
        throw new Error(`Production URL not found for app code: ${appCode}`);
      }
    }

    // Update the Cypress config
    updateCypressConfig(isProduction, productionUrl);

    console.log("Cypress configuration updated successfully!");
  } catch (error) {
    console.error("Error occurred during setup:", error);
    process.exit(1);
  }
};

// Execute the main function
main();
