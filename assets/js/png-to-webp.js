import fs from "fs";
import path from "path";

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".css",
  ".js",
  ".xml",
  ".json"
]);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      continue;
    }

    let content = fs.readFileSync(fullPath, "utf8");

    // Replace local .png references with .webp
    content = content.replace(
      /(?<!https?:\/\/[^"'()\s]*)\.png\b/gi,
      ".webp"
    );

    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${fullPath}`);
  }
}

walk("_site");