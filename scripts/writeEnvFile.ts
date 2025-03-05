import * as fs from "fs";
import * as path from "path";
import { defaultEnv, ENV_MAP } from "./env";
import { isValidKey } from "@/lib/utils/typescript";

/**
 * Writes environment variables to .env file based on the provided app code
 * @param appCode - The application code (BRAM, VERONIQUE, MIT)
 */
export const writeEnvFile = (appCode: keyof typeof ENV_MAP): void => {
  try {
    const appEnv = ENV_MAP[appCode];

    // Create content for .env file
    let envContent = "";

    // Add default environment variables
    Object.entries(defaultEnv).forEach(([key, value]) => {
      envContent += `${key}=${value}\n`;
    });

    // Add a separator comment
    envContent += "\n## App-specific environment variables\n";

    // Add app-specific environment variables
    Object.entries(appEnv).forEach(([key, value]) => {
      envContent += `${key}=${value}\n`;
    });

    // Write to .env file
    const envFilePath = path.join(process.cwd(), ".env");
    fs.writeFileSync(envFilePath, envContent, "utf8");

    console.log(
      `Successfully updated .env file with ${appCode} environment variables`
    );
  } catch (error) {
    console.error("Error writing to .env file:", error);
    process.exit(1);
  }
};

export default writeEnvFile;
