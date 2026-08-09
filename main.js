
import fs from "node:fs";
const lines = fs.readFileSync(0, "utf8").split("\n");
import Parser from "./src/parser/index.js";

// parser.request(lines);
Parser.headers(lines);