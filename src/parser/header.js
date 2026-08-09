/** Parse and Normalize HTTP headers **/
const headers = (lines) => {
  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    if (!line) break; //stop at first blank line

    // malformed if no colon
    if (!line.includes(":")) {
      console.log(`ERR malformed: ${line}`);
      continue;
    }

    const idx = line.indexOf(":");
    let name = line.slice(0, idx);
    let value = line.slice(idx + 1);

    // normalize
    name = name.trim().toLowerCase();
    value = value.trim();

    console.log(`${name}: ${value}`);
  }
};

export default headers;
