import { METHODS } from "../constants.js";

/** Parse HTTP request line **/
const request = (lines) => {
  const isVersion = (value) => /^HTTP\/\d+\.\d+$/.test(value);

  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if (!line) continue;

    const parts = line.split(" ");
    const [method, path, version] = parts;

    // TODO: 3 parts, method in METHOD, path start with "/", version valid
    if (
      parts.length !== 3 ||
      !METHODS.has(method) ||
      !path.startsWith("/") ||
      !isVersion(version)
    ) {
      console.log("INVALID");
      continue;
    }
    console.log(`METHOD=${method} PATH=${path} VERSION=${version}`);
  }
};

export default request;
