import fs from 'node:fs';
import path from 'node:path';
const file = 'src/data/results.ts';
const src = fs.readFileSync(file,'utf8');
const re = /src:\s*['"]([^'"]+)['"]/g;
const missing = new Set();
let m;
while ((m = re.exec(src))) {
  const p = m[1];
  const full = path.join('public', p);
  if (!fs.existsSync(full)) missing.add(full);
}
if (missing.size) {
  console.log('MISSING files:');
  for (const f of missing) console.log(' -', f);
} else {
  console.log('✅ all referenced logo files exist under /public');
}
