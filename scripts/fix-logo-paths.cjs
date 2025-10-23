const fs = require("fs");
const file = "src/data/results.ts";
let s = fs.readFileSync(file, "utf8");

// Prefix a leading "/" on src: '...'/src: "..." if it doesn't already start with "/"
s = s.replace(/src:\s*(['"])(?!\/)([^'"]+)\1/g, (_m, q, p) => `src: ${q}/${p}${q}`);

fs.writeFileSync(file, s);
console.log('✅ prefixed leading "/" on logo src values where missing.');
