const METHODS = new Set(["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"]);

function isVersion(value) {
  return /^HTTP\/\d+\.\d+$/.test(value);
}

const parse = {};

parse.request = (lines) => {
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

export default parse;