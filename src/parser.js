const METHODS = new Set(["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"]);

// Namespace
const parser = {};

// Parse HTTP request line
parser.request = (lines) => {

  const isVersion = (value) => /^HTTP\/\d+\.\d+$/.test(value);
  

  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if (!line) continue;

    const parts = line.split(" ");
    const [method, path, version] = parts;
    
    // TODO: 3 parts, method in METHOD, path start with "/", version valid
    if(
      parts.length !== 3    || 
      !METHODS.has(method)  || 
      !path.startsWith("/") ||
      !isVersion(version)) {
      console.log("INVALID");
      continue;      
    }
    console.log(`METHOD=${method} PATH=${path} VERSION=${version}`);
  }
}

// Parse and Normalize HTTP headers
parser.headers = (lines) => {

  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if(!line) break; //stop at first blank line

    // malformed if no colon 
    if(!line.includes(":")) {
      console.log(`ERR malformed: ${line}`);
      continue;
    }

    const idx   = line.indexOf(":");
    let name    = line.slice(0, idx);
    let value   = line.slice(idx + 1);

    // normalize
    name        = name.trim().toLowerCase();
    value       = value.trim();

    console.log(`${name}: ${value}`);
  }
}

export default parser;