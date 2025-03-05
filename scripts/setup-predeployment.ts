import * as dotenv from "dotenv";

import { writeEnvFile } from "./writeEnvFile";
import { copyFavicon } from "./copyFavicon";
import { modifyCypressFiles } from "./modifyCypressFiles";
import { ENV_MAP } from "./env";
import { isValidKey } from "@/lib/utils/typescript";

// Load environment variables from .env file
dotenv.config();

/**
 * Copies the appropriate favicon based on the app code
 * @param appCode - The application code (BRAM, VERONIQUE, MIT)
 */

/**
 * Main function to run the setup process
 */
const main = () => {
  try {
    // Define the allowed app codes
    type AppCode = keyof typeof ENV_MAP;

    // Get app code from command line arguments
    const args = process.argv.slice(2);
    let appCode: AppCode = "MIT"; // Default app code
    console.log(args);

    // Parse command line arguments
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "--appCode" && i + 1 < args.length) {
        const inputAppCode = args[i + 1].toUpperCase();
        if (isValidKey(ENV_MAP, inputAppCode)) {
          appCode = inputAppCode as AppCode;
        }
        break;
      }
    }

    console.log(`Setting up application for app code: ${appCode}`);

    // Update .env file
    writeEnvFile(appCode);

    // Copy favicon
    copyFavicon(appCode);

    // Modify cypress related files
    modifyCypressFiles(appCode);

    console.log("Setup completed successfully!");
  } catch (error) {
    console.error("Error occurred during setup:", error);
    process.exit(1);
  }
};

// Execute the main function
main();
