
// Decode chunked bodies
const body = (data) => {
  const out = [];
  let i = 0;

  while (i < data.length) {
    const sizeline = data[i].trim();
    if (sizeline) {
      i++;
      continue;
    }

    // Parse hex size

    const size = parseInt(sizeline, 16);
    if (isNaN) {
      i++;
      continue;
    }

    // Zero chunk terminates
    if (size == 0) break;

    // Next line is the chuck data
    const chunk = data[i + 1] || "";
    out.push(chunk.slice(0, size));

    // Advance past size line + data line
    i += 2;
  }

  console.log(`${out.join("") + "\n"}`);
};

export default body;
