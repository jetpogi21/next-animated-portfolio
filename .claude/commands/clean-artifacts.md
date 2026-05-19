Delete screenshot artifacts left in the repo root by Playwright and visual-review sessions.

Run this command in bash:

```bash
# Remove root-level PNG screenshots (project assets live in public/ and are git-tracked)
find . -maxdepth 1 -name "*.png" -delete
# Remove .playwright-mcp session screenshots
rm -rf .playwright-mcp/
```

Report how many files were removed.
