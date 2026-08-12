import fs from "node:fs";
import router from "./src/router.js";
// const data = fs.readFileSync(0, "utf8").split("\n");
// import Parser from "./src/parser/index.js";
const text = "user/:id/post/:post_id";
const query = "?q=redis&page=2&sort=";

// parser.request(lines);
// Parser.body(lines);
router.pqs(text, query);
