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

    content = content.replace(/([^\s"'()]+)\.png\b/gi, (match, file) => {
      const pngPath = path.join("_site", file + ".png");
      const webpPath = path.join("_site", file + ".webp");

      return fs.existsSync(webpPath)
        ? file + ".webp"
        : file + ".png";
    });

    fs.writeFileSync(fullPath, content);
  }
}

walk("_site");