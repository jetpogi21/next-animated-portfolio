import { promises as fs } from "fs";
import clipboardy from "clipboardy";
import path from "path";

// Types for file paths configuration
type FilePath = string | string[];
type FilePathsConfig = {
  [key: string]: FilePath;
};

// File paths mapped to keys for easy reference
const FILE_PATHS: FilePathsConfig = {
  schema: path.join("..", "notepads", "prompts", "schema-specific.md"),
  guide: path.join("..", "notepads", "coding-guide.md"),
  script: [
    path.join("..", "notepads", "prompts", "scripts", "writing-script.md"),
    path.join("..", "notepads", "prompts", "scripts", "script-guidelines.md"),
  ],
  requiredList: path.join("..", "notepads", "prompts", "required-list.md"),
  cypress: path.join(
    "..",
    "notepads",
    "prompts",
    "cypress",
    "creating a test file.md"
  ),
  prompt: path.join("..", "notepads", "prompts", "current-prompt.md"),
  app: path.join("..", "notepads", "prompts", "app-specific.md"),
  cleanup: path.join("..", "notepads", "prompts", "clean-up.md"),
  table: path.join("..", "notepads", "prompts", "table-specific.md"),
  errors: path.join("..", "notepads", "prompts", "fixing-errors.md"),
  debugging: path.join("..", "notepads", "prompts", "debugging.md"),
  modal: path.join("..", "notepads", "prompts", "modal-specific.md"),
  refactoring: path.join("..", "notepads", "prompts", "refactoring-prompt.md"),
  context: path.join("..", "notepads", "prompts", "context-specific.md"),
  simpletable: [
    path.join("..", "notepads", "prompts", "simple-table.md"),
    `C:\\Users\\USER\\Desktop\\Web Development\\vibram-purchase\\src\\components\\ui\\SimpleTable.tsx`,
    `C:\\Users\\USER\\Desktop\\Web Development\\vibram-purchase\\src\\interfaces\\SimpleTableColumns.ts`,
  ],
  modelWideActions: path.join(
    "..",
    "notepads",
    "prompts",
    "model-wide-actions.md"
  ),
  standalonePage: path.join(
    "..",
    "notepads",
    "prompts",
    "creating-a-standalone-page.md"
  ),
  dynamicSelect: path.join(
    "..",
    "notepads",
    "prompts",
    "dynamic-select-sql.md"
  ),
  documentation: path.join("..", "notepads", "prompts", "documentation.md"),
  plpgsql: path.join("..", "notepads", "prompts", "plpgsql.md"),
  dataFetching: [
    path.join("..", "notepads", "prompts", "data-fetching.md"),
    `C:\\Users\\USER\\Desktop\\Web Development\\vibram-purchase\\src\\hooks\\useFetch_rpc.ts`,
    `C:\\Users\\USER\\Desktop\\Web Development\\vibram-purchase\\src\\hooks\\useModelList.ts`,
    `C:\\Users\\USER\\Desktop\\Web Development\\vibram-purchase\\src\\hooks\\useModelQuery.ts`,
  ],
  componentSpecific: path.join(
    "..",
    "notepads",
    "prompts",
    "component-specific.md"
  ),
  // Add more mappings as needed
};

interface FileResult {
  path: string;
  content: string | null;
  error: string | null;
}

/**
 * Process a single file and return its content
 * @param filePath Path to the file to process
 * @returns Promise<FileResult>
 */
const processFile = async (filePath: string): Promise<FileResult> => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    let processedContent = content;

    // Special handling for current-prompt files
    if (filePath.toLowerCase().includes("current-prompt")) {
      const lines = content.split("\n");
      const startIndex = lines.findIndex((line) =>
        line.includes("Prompt starts here:")
      );
      if (startIndex !== -1) {
        processedContent = lines.slice(startIndex + 1).join("\n");
      }
    }

    return {
      path: filePath,
      content: processedContent,
      error: null,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      path: filePath,
      content: null,
      error: `Failed to read file: ${errorMessage}`,
    };
  }
};

/**
 * Get all file paths for the requested keys
 * @param requestedKeys Array of keys from FILE_PATHS
 * @returns Array of file paths
 */
const getFilePaths = (requestedKeys: string[]): string[] => {
  const pathsToUse: string[] = [];

  for (const key of requestedKeys) {
    if (!(key in FILE_PATHS)) {
      throw new Error(
        `Invalid key: ${key}. Available keys are: ${Object.keys(
          FILE_PATHS
        ).join(", ")}`
      );
    }

    const paths = FILE_PATHS[key];
    if (Array.isArray(paths)) {
      pathsToUse.push(...paths);
    } else {
      pathsToUse.push(paths);
    }
  }

  // Always add prompt at the end if not already included
  const promptPath = FILE_PATHS.prompt as string;
  if (!pathsToUse.includes(promptPath)) {
    pathsToUse.push(promptPath);
  }

  return pathsToUse;
};

/**
 * Handle errors from file processing results
 * @param results Array of FileResult
 */
const handleErrors = (results: FileResult[]): void => {
  const errors = results.filter((result) => result.error);
  if (errors.length > 0) {
    console.error("Errors occurred while reading files:");
    errors.forEach((error) => console.error(`${error.path}: ${error.error}`));
    process.exit(1);
  }
};

/**
 * Combines the contents of files based on provided keys and copies the result to clipboard
 * @param keys Comma-separated string of keys that map to file paths
 * @returns Promise<void>
 */
const combineFiles = async (keys: string): Promise<void> => {
  try {
    // Split the comma-separated keys and filter out empty strings
    const requestedKeys = keys
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (requestedKeys.length === 0) {
      throw new Error(
        "No valid keys provided. Please provide comma-separated keys."
      );
    }

    // Get all file paths to process
    const pathsToUse = getFilePaths(requestedKeys);

    // Process all files in parallel
    const results = await Promise.all(pathsToUse.map(processFile));

    // Handle any errors
    handleErrors(results);

    // Combine contents
    const combinedContent = results
      .map((result) => `${result.content}\n`)
      .join("\n");

    // Copy to clipboard
    await clipboardy.write(combinedContent);
    console.log("Successfully combined files and copied to clipboard!");
    console.log("Processed files:");
    results.forEach((result) => console.log(`- ${result.path}`));
  } catch (error: unknown) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
};

// Get comma-separated keys from command line arguments
const keys = process.argv[2];
if (!keys) {
  console.error("Please provide comma-separated keys as an argument");
  process.exit(1);
}

combineFiles(keys);
