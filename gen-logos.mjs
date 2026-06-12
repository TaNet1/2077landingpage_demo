// Regenerate logo_cloud/manifest.json from whatever images are in logo_cloud/.
// The live site reads the folder directly on a dev server (npx serve), but static
// hosts (GitHub Pages, Netlify…) don't expose directory listings — so run this
// before deploying to refresh the fallback list:
//
//     node gen-logos.mjs
//
import { readdirSync, writeFileSync } from 'node:fs';

const DIR = 'logo_cloud';
const files = readdirSync(DIR)
  .filter((f) => /\.(png|jpe?g|webp|svg|gif)$/i.test(f))
  .sort();

writeFileSync(`${DIR}/manifest.json`, JSON.stringify(files, null, 2) + '\n');
console.log(`Wrote ${DIR}/manifest.json with ${files.length} logo(s).`);
