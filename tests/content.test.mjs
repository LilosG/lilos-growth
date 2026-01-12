import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.resolve("src/content/blog");

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
};

describe("content frontmatter", () => {
  it("blog posts have title and description", () => {
    if (!fs.existsSync(contentDir)) {
      return;
    }

    const files = walk(contentDir);
    expect(files.length).toBeGreaterThan(0);

    const failures = [];
    for (const file of files) {
      const raw = fs.readFileSync(file, "utf8");
      const { data } = matter(raw);
      const title = typeof data.title === "string" ? data.title.trim() : "";
      const description = typeof data.description === "string" ? data.description.trim() : "";
      if (!title || !description) {
        failures.push(path.relative(path.resolve("."), file));
      }
    }

    expect(failures).toEqual([]);
  });
});
