const router = {};

router.request = (data) => {
  let blank = data.indexOf("");
  if (blank < 0) blank = data.length;

  const routes = new Map();
  const allow = new Map();

  // build routing table
  for (const line of data.slice(0, blank)) {
    if (!line) continue;
    const parts = line.split(" ");
    if (parts.length < 3) continue;

    const method = parts[0];
    const path = parts[1];
    const handler = parts.slice(2).join(" ");

    routes.set(method + " " + path, handler);

    if (!allow.has(path)) allow.set(path, new Set());
    allow.get(path).add(method);
  }

  const results = [];

  // process request
  for (const line of data.slice(blank + 1)) {
    if (!line) continue;

    const idx = line.indexOf(" ");
    const method = idx >= 0 ? line.slice(0, idx) : line;
    let path = idx >= 0 ? line.slice(idx + 1) : "/";

    // strip query string
    const qIdx = path.indexOf("?");
    if (qIdx >= 0) path = path.slice(0, qIdx);

    const key = method + " " + path;

    if (routes.has(key)) {
      results.push("200", +routes.get(key));
    } else if (allow.has(path)) {
      results.push("405");
    } else {
      results.push("404");
    }
  }
  console.log(results.join("\n"));

  // return results;
};

router.pqs = (path, qs) => {
  const segments = path.split("/");
  console.log(segments);

  const params = new URLSearchParams(qs);
  const results = [];
  for (const [key, value] of params.entries()) {
    results[key] = value;
  }
  console.log(results)
}

export default router;
