import fs from "node:fs";
import router from "./src/router.js";
const data = fs.readFileSync(0, "utf8").split("\n");
// import Parser from "./src/parser/index.js";

// parser.request(lines);
// Parser.body(lines);
const output = router.request(data);
console.log(output.join("\n"));
