const data = require('fs').readFileSync(0, 'utf8').split('\n');

// Find the blank line separating the vhost table and request headers
let blank = data.findIndex(line => line.replace(/\r$/, '') === '');
if (blank < 0) blank = data.length;

const exact = new Map();
const wildcards = [];

for (const line of data.slice(0, blank)) {
  const cleanLine = line.replace(/\r$/, '').trim();
  if (!cleanLine) continue;
  
  const sp = cleanLine.search(/\s/);
  if (sp === -1) continue;

  const pat = cleanLine.slice(0, sp).toLowerCase();
  const site = cleanLine.slice(sp + 1).trim();

  if (pat.startsWith('*')) {
    wildcards.push({ suffix: pat.slice(1), site });
  } else {
    exact.set(pat, site);
  }
}

// Sort wildcards by descending suffix length (longest literal suffix wins)
wildcards.sort((a, b) => b.suffix.length - a.suffix.length);

function match(host) {
  if (!host) return "400";
  host = host.trim();
  if (!host) return "400";

  // Case-insensitive matching and strip optional :port suffix
  host = host.toLowerCase().replace(/:[0-9]*$/, '');
  if (!host) return "400";

  // 1. Exact match
  if (exact.has(host)) {
    return exact.get(host);
  }

  // 2. Wildcard match
  for (const wc of wildcards) {
    if (host.endsWith(wc.suffix)) {
      return wc.site;
    }
  }

  // 3. No match
  return "404";
}

for (const line of data.slice(blank + 1)) {
  console.log(match(line.replace(/\r$/, '')));
}