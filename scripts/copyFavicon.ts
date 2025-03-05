import { isValidKey } from "@/lib/utils/typescript";
import { ENV_MAP } from "./env";
import * as path from "path";
import * as fs from "fs";

export const copyFavicon = (appCode: keyof typeof ENV_MAP): void => {
  try {
    // Validate app code

    const appName = ENV_MAP[appCode].NEXT_PUBLIC_APP_NAME;

    if (!appName) {
      console.error(
        "Error: NEXT_PUBLIC_APP_NAME environment variable is not set"
      );
      process.exit(1);
    }

    // Define the mapping of app names to favicon files
    const faviconMapping: Record<string, string> = {
      "MIT AI": "mit.ico",
      "Sales Vol Energie Ai": "bram.ico",
      "Veronique Prins Ai": "veronique.ico",
    };

    // Get the favicon filename based on the app name
    const faviconFilename = faviconMapping[appName];

    if (!faviconFilename) {
      console.error(
        `Error: No favicon mapping found for app name "${appName}"`
      );
      process.exit(1);
    }

    // Define source and destination paths
    const sourcePath = path.join(
      process.cwd(),
      "public",
      "favicons",
      faviconFilename
    );
    const destinationPath = path.join(
      process.cwd(),
      "src",
      "app",
      "favicon.ico"
    );

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.error(`Error: Source favicon file not found at ${sourcePath}`);
      process.exit(1);
    }

    // Copy the file
    fs.copyFileSync(sourcePath, destinationPath);

    console.log(
      `Successfully copied ${faviconFilename} to src/app/favicon.ico`
    );
  } catch (error) {
    console.error("Error occurred during favicon setup:", error);
    process.exit(1);
  }
};
