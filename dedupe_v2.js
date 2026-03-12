const fs = require('fs');
const content = fs.readFileSync('src/lib/useless-websites.ts', 'utf-8');
const sites = [];
const pattern = /\{\s*name:\s*"([^"]+)",\s*url:\s*"([^"]+)",\s*description:\s*"([^"]+)"\s*\}/g;
let match;
while ((match = pattern.exec(content)) !== null) {
  sites.push({ name: match[1], url: match[2], description: match[3] });
}

const uniqueSitesMap = new Map();
sites.forEach(site => {
  if (!uniqueSitesMap.has(site.url)) {
    uniqueSitesMap.set(site.url, site);
  }
});

const uniqueSites = Array.from(uniqueSitesMap.values());
console.log(`Original: ${sites.length}, Unique: ${uniqueSites.length}`);

// We need exactly 100.
// If we have more than 100, we'll keep the first 100.
// If we have fewer, we'll need to find more (but user said "showing 79 sites add 21 more", so we should have ~100).

const finalSites = uniqueSites.slice(0, 100);

let newContent = `export interface Website {
  name: string
  url: string
  description: string
}

export const websites: Website[] = [
`;

finalSites.forEach((site, index) => {
  newContent += `  {
    name: "${site.name}",
    url: "${site.url}",
    description: "${site.description}"
  }${index === finalSites.length - 1 ? '' : ','}\n`;
});

newContent += '];\n';

fs.writeFileSync('src/lib/useless-websites.ts', newContent);
console.log(`Updated file with ${finalSites.length} unique sites.`);
