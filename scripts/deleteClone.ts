import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables from .env file (optional, can be removed if not needed)
dotenv.config();

const deleteCloneFolder = () => {
  try {
    // Use path.resolve to ensure proper path handling for the clone folder
    const cloneFolderPath = path.resolve(process.cwd(), "clone");

    // Check if clone folder exists
    if (fs.existsSync(cloneFolderPath)) {
      console.log(`Deleting clone folder at: ${cloneFolderPath}`);

      // Delete the folder recursively
      fs.rmSync(cloneFolderPath, { recursive: true, force: true });

      console.log("Clone folder deleted successfully");
    } else {
      console.log("Clone folder does not exist. No action taken.");
    }
  } catch (error) {
    console.error("Error deleting clone folder:", error);
    process.exit(1);
  }
};

// Execute the delete function
deleteCloneFolder();
