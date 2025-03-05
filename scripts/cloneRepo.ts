import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Load environment variables from .env file
dotenv.config();

const ensureCloneFolder = () => {
  // Use path.resolve to ensure proper path handling
  const cloneFolderPath = path.resolve(process.cwd(), "clone");

  console.log(`Preparing clone folder at: ${cloneFolderPath}`);

  // Check if clone folder exists
  if (fs.existsSync(cloneFolderPath)) {
    console.log("Clone folder exists, emptying it...");
    // Empty the folder
    fs.rmSync(cloneFolderPath, { recursive: true, force: true });
  } else {
    console.log("Clone folder doesn't exist, creating it...");
  }

  // Create the clone folder
  fs.mkdirSync(cloneFolderPath, { recursive: true });
  console.log("Clone folder is ready");

  return cloneFolderPath;
};

const ensureGitIgnore = () => {
  const gitIgnorePath = path.resolve(process.cwd(), ".gitignore");
  const ignoreEntry = "clone/**/*";

  console.log(`Checking .gitignore at: ${gitIgnorePath}`);

  if (fs.existsSync(gitIgnorePath)) {
    const content = fs.readFileSync(gitIgnorePath, "utf-8");

    // Check if the entry already exists
    if (!content.includes(ignoreEntry)) {
      console.log("Adding clone folder entry to .gitignore");
      // Add the entry to .gitignore
      fs.appendFileSync(gitIgnorePath, `\n${ignoreEntry}\n`);
      console.log("Added clone folder to .gitignore");
    } else {
      console.log("Clone folder entry already exists in .gitignore");
    }
  } else {
    console.log(".gitignore file not found, creating it");
    // Create .gitignore file with the entry
    fs.writeFileSync(gitIgnorePath, `${ignoreEntry}\n`);
    console.log("Created .gitignore file with clone folder entry");
  }
};

const cloneRepository = (
  repoUrl: string,
  branch: string,
  targetPath: string
) => {
  try {
    console.log(
      `Cloning repository: ${repoUrl}, branch: ${branch} to ${targetPath}`
    );

    // Use try-catch with more detailed output
    try {
      // Properly quote the target path to handle spaces
      const quotedTargetPath = `"${targetPath}"`;
      const gitCommand = `git clone -b ${branch} ${repoUrl} ${quotedTargetPath}`;
      console.log(`Executing: ${gitCommand}`);

      // Add verbose output to see what's happening
      execSync(gitCommand, {
        stdio: "inherit",
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" }, // Disable prompts
      });

      // Remove the origin remote to prevent accidental pushes
      console.log("Removing origin remote...");
      execSync("git remote remove origin", {
        stdio: "inherit",
        cwd: targetPath, // Use cwd option instead of cd command
      });

      console.log(
        `Repository cloned successfully to ${targetPath} and origin remote removed`
      );
    } catch (gitError) {
      console.error("Git clone failed. Trying without branch specification...");

      // If branch-specific clone fails, try cloning without branch specification
      try {
        // Properly quote the target path to handle spaces
        const quotedTargetPath = `"${targetPath}"`;
        const gitCommand = `git clone ${repoUrl} ${quotedTargetPath}`;
        console.log(`Executing: ${gitCommand}`);

        execSync(gitCommand, {
          stdio: "inherit",
          env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
        });

        // Then checkout the specific branch
        console.log(`Checking out branch: ${branch}`);
        execSync(`git checkout ${branch}`, {
          stdio: "inherit",
          cwd: targetPath, // Use cwd option instead of cd command
        });

        // Remove the origin remote to prevent accidental pushes
        console.log("Removing origin remote...");
        execSync("git remote remove origin", {
          stdio: "inherit",
          cwd: targetPath, // Use cwd option instead of cd command
        });

        console.log(
          `Repository cloned successfully to ${targetPath}, checked out branch ${branch}, and origin remote removed`
        );
      } catch (fallbackError) {
        throw new Error(
          `Failed to clone repository. Make sure the repository URL and branch name are correct.\nError details: ${fallbackError}`
        );
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to clone repository: ${error.message}`);
    } else {
      throw new Error(`Failed to clone repository: ${String(error)}`);
    }
  }
};

const main = () => {
  try {
    // Get repository URL and branch from command line arguments
    const args = process.argv.slice(2);
    const repoUrl = args[0];
    const branch = args[1] || "main"; // Default to main branch if not specified

    if (!repoUrl) {
      console.error("Repository URL is required");
      console.log("Usage: npm run clone-repo <repository-url> [branch-name]");
      console.log(
        "Example: npm run clone-repo https://github.com/user/repo.git develop"
      );
      process.exit(1);
    }

    // Validate repository URL format
    if (
      !repoUrl.match(/^https?:\/\/.*\.git$/) &&
      !repoUrl.match(/^git@.*:.+\.git$/)
    ) {
      console.warn(
        "Warning: Repository URL might not be in the correct format."
      );
      console.warn(
        "Expected format: https://github.com/user/repo.git or git@github.com:user/repo.git"
      );
      console.log("Continuing anyway...");
    }

    console.log(`Starting repository clone process...`);
    console.log(`Repository URL: ${repoUrl}`);
    console.log(`Branch: ${branch}`);

    // Ensure clone folder exists and is empty
    const cloneFolderPath = ensureCloneFolder();
    console.log(`Clone folder prepared: ${cloneFolderPath}`);

    // Ensure .gitignore contains entry for clone folder
    ensureGitIgnore();

    // Clone the repository
    cloneRepository(repoUrl, branch, cloneFolderPath);

    console.log("Repository cloning completed successfully");
  } catch (error) {
    console.error("Error occurred during setup:", error);
    process.exit(1);
  }
};

// Execute the main function
main();
